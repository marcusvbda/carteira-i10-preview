'use client';

import TrendCard from '@/components/cards/trend';
import VariationCard from '@/components/cards/variation';
import './_styles.scss';
import AlertsCard from '@/components/cards/alerts';
import { useContext, useEffect } from 'react';
import { WalletContext } from '@/context/walletContext';
import { useFetch } from '@/hooks/fetch';
import { useHelpers } from '@/hooks/helpers';
import { backend, makeUrl } from '@/constants/backend';

export default function Metrics(): JSX.Element {
    const helpers = useHelpers();
    const { walletId } = useContext(WalletContext);
    const {
        loading: metricsLoading,
        data: metricsData,
        fetch: fetchMetricsData
    } = useFetch({
        route: makeUrl(backend.routeSummaryBanners, { walletId }),
        autoDispatch: false
    });

    const {
        loading: alertsLoading,
        data: alertsData,
        fetch: fetchAlerts
    } = useFetch({
        route: makeUrl(backend.routeSummaryAlerts, { walletId }),
        autoDispatch: false
    });

    useEffect(() => {
        fetchMetricsData({
            route: makeUrl(backend.routeSummaryBanners, { walletId })
        });
        fetchAlerts({
            route: makeUrl(backend.routeSummaryAlerts, { walletId })
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletId]);

    return (
        <section className="section-metrics">
            <TrendCard
                title="Patrimônio real"
                icon="patrimony"
                amount={metricsData?.equity}
                investAmount={metricsData?.applied}
                result={true}
                loading={metricsLoading}
            />
            <TrendCard
                title="Proventos recebidos"
                icon="earnings"
                amount={metricsData?.payments_total}
                investAmount={metricsData?.applied}
                loading={metricsLoading}
                result={false}
            />
            <VariationCard
                title="Rentabilidade"
                icon="profitability"
                variation={metricsData?.variation}
                variationAmount={
                    helpers.parseMoneyToNumber(metricsData?.equity || 0) -
                    helpers.parseMoneyToNumber(metricsData?.applied || 0)
                }
                profit={metricsData?.profit_twr}
                loading={metricsLoading}
            />
            <AlertsCard
                title="Análise"
                icon="analysis"
                loading={alertsLoading}
                messages={alertsData}
            />
        </section>
    );
}
