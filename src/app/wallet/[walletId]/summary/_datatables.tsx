'use client';

import { useMemo } from 'react';
import CollapseDatatable from './_collapseDatatable';

const QtyTotal = ({
	tickerLoading,
	fiiLoading,
	cryptoLoading,
	fundLoading,
	totalTicker,
	totalFiis,
	totalCrypto,
	totalFund,
}: any) => {
	const someTableIsLoading = [
		tickerLoading,
		fiiLoading,
		cryptoLoading,
		fundLoading,
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

export default function Datatables({
	fundData,
	cryptoData,
	tickerData,
	fiiData,
}: any) {
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

	return (
		<section className="section-actives">
			<QtyTotal
				tickerLoading={false}
				fiiLoading={false}
				cryptoLoading={false}
				fundLoading={false}
				totalTicker={totalTicker}
				totalFiis={totalFiis}
				totalCrypto={totalCrypto}
				totalFund={totalFund}
			/>
			<CollapseDatatable
				title="Ações"
				icon="/images/theme/actions.svg"
				darkIcon="/images/theme/actions-dark.svg"
				defaultCollapsed
				loading={false}
				rows={tickerData?.data || []}
				total={totalTicker}
				tickerType="Ticker"
				weighted={tickerData.weighted || 0}
			/>
			<CollapseDatatable
				title="Fundos imobiliários"
				icon="/images/theme/fiis.svg"
				darkIcon="/images/theme/fiis-dark.svg"
				loading={false}
				rows={fiiData?.data || []}
				total={totalFiis}
				tickerType="Fii"
				weighted={fiiData.weighted || 0}
			/>
			<CollapseDatatable
				title="Criptomoedas"
				icon="/images/theme/crypto.svg"
				darkIcon="/images/theme/crypto-dark.svg"
				loading={false}
				rows={cryptoData?.data || []}
				total={totalCrypto}
				tickerType="Crypto"
				weighted={cryptoData.weighted || 0}
			/>
			<CollapseDatatable
				title="Investimentos"
				icon="/images/theme/investments.svg"
				darkIcon="/images/theme/investments-dark.svg"
				loading={false}
				rows={fundData?.data || []}
				total={totalFund}
				tickerType="Fund"
				weighted={fundData.weighted || 0}
			/>
		</section>
	);
}
