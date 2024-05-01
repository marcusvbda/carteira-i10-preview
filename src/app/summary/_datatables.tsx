'use client';

import { useContext, useMemo, useState } from 'react';
import { useFetch } from '@/hooks/fetch';
import { WalletContext } from '@/context/walletContext';
import CollapseDatatable from './_collapseDatatable';
import YesOrNo from '@/components/common/yesOrNo';
import ScoreComponent from '@/components/score';
import Trend from '@/components/common/trend';
import { useHelpers } from '@/hooks/helpers';
import LockedComponent from '@/components/locked';
import SensitiveContent from '@/components/common/sensitiveContent';

export default function Datatables() {
    const { walletId } = useContext(WalletContext);
    const { loading: tickerLoading, data: tickerData } = useFetch({
        route: `api/wallet/${walletId}/datatables/Ticker`
    });

    const { loading: fiiLoading, data: fiiData } = useFetch({
        route: `api/wallet/${walletId}/datatables/Fii`
    });

    const { loading: cryptoLoading, data: cryptoData } = useFetch({
        route: `api/wallet/${walletId}/datatables/Crypto`
    });

    const { loading: fundLoading, data: fundData } = useFetch({
        route: `api/wallet/${walletId}/datatables/Fund`
    });

    const totalFund = useMemo(() => {
        return fundData?.total || 0;
    }, [fundData]);

    const totalCrypto = useMemo(() => {
        return cryptoData?.total || 0;
    }, [cryptoData]);

    const totalTicker = useMemo(() => {
        return tickerData?.total || 0;
    }, [tickerData]);

    const totalFiis = useMemo(() => {
        return fiiData?.total || 0;
    }, [fiiData]);

    const QtyTotal = () => {
        const someTableIsLoading = [
            tickerLoading,
            fiiLoading,
            cryptoLoading,
            fundLoading
        ].some((loading) => loading);
        if (someTableIsLoading) {
            return <h4 className="actives-total">Ativos</h4>;
        }
        const total = totalTicker + totalFiis + totalCrypto + totalFund;
        return (
            <h4 className="actives-total">
                Ativos <span>({total})</span>
            </h4>
        );
    };

    return (
        <section className="section-actives">
            <QtyTotal />
            <CollapseDatatable
                title="Ações"
                icon="/images/theme/actions.svg"
                darkIcon="/images/theme/actions-dark.svg"
                defaultCollapsed
                loading={tickerLoading}
                rows={tickerData?.data || []}
                total={totalTicker}
                tickerType="Ticker"
            />
            <CollapseDatatable
                title="Fundos imobiliários"
                icon="/images/theme/fiis.svg"
                darkIcon="/images/theme/fiis-dark.svg"
                loading={fiiLoading}
                rows={fiiData?.data || []}
                total={totalFiis}
                tickerType="Fii"
            />
            <CollapseDatatable
                title="Criptomoedas"
                icon="/images/theme/crypto.svg"
                darkIcon="/images/theme/crypto-dark.svg"
                loading={cryptoLoading}
                rows={cryptoData?.data || []}
                total={totalCrypto}
                tickerType="Crypto"
            />
            <CollapseDatatable
                title="Investimentos"
                icon="/images/theme/investments.svg"
                darkIcon="/images/theme/investments-dark.svg"
                loading={fundLoading}
                rows={fundData?.data || []}
                total={totalFund}
                tickerType="Fund"
            />
        </section>
    );
}
