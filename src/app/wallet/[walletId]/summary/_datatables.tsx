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
	infoData,
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

	const tickerInfo = useMemo(() => {
		return infoData.tickers.find((x: any) => x.type === 'Ticker');
	}, [infoData]);

	const fiiInfo = useMemo(() => {
		return infoData.tickers.find((x: any) => x.type === 'Fii');
	}, [infoData]);

	const cryptoInfo = useMemo(() => {
		return infoData.tickers.find((x: any) => x.type === 'Crypto');
	}, [infoData]);

	const fundInfo = useMemo(() => {
		return infoData.tickers.find((x: any) => x.type === 'Fund');
	}, [infoData]);

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
				tickerInfo={tickerInfo}
				infoData={infoData}
			/>
			<CollapseDatatable
				title="Fundos imobiliários"
				icon="/images/theme/fiis.svg"
				darkIcon="/images/theme/fiis-dark.svg"
				loading={false}
				rows={fiiData?.data || []}
				total={totalFiis}
				tickerType="Fii"
				tickerInfo={fiiInfo}
				infoData={infoData}
			/>
			<CollapseDatatable
				title="Criptomoedas"
				icon="/images/theme/crypto.svg"
				darkIcon="/images/theme/crypto-dark.svg"
				loading={false}
				rows={cryptoData?.data || []}
				total={totalCrypto}
				tickerType="Crypto"
				infoData={infoData}
				tickerInfo={cryptoInfo}
			/>
			<CollapseDatatable
				title="Investimentos"
				icon="/images/theme/investments.svg"
				darkIcon="/images/theme/investments-dark.svg"
				loading={false}
				rows={fundData?.data || []}
				total={totalFund}
				infoData={infoData}
				tickerType="Fund"
				tickerInfo={fundInfo}
			/>
		</section>
	);
}
