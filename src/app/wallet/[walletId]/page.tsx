import { ReactNode } from 'react';
import { Metadata } from 'next';
import { fetchServer } from '@/app/services/api';
import { seo } from '@/constants/seo';
import SummaryPage from './summary/page';

export const metadata: Metadata = seo.default;

interface IProps {
	params: { walletId: string };
}

export const getSummaryData = async (walletId: string): Promise<any> => {
	const getDatatableContent = async (type: string) => {
		return fetchServer(`api/carteiras/datatable/ativos/${walletId}/${type}`);
	};

	const getDatatableData = async () => {
		const [tickerData, fiiData, cryptoData, fundData] = await Promise.all([
			getDatatableContent('Ticker'),
			getDatatableContent('Fii'),
			getDatatableContent('Crypto'),
			getDatatableContent('Fund'),
		]);

		return { tickerData, fiiData, cryptoData, fundData };
	};

	const result = await Promise.all([
		fetchServer(`api/carteiras/banner/${walletId}`),
		fetchServer(`api/rest/wallets/${walletId}/alert-banner`),
		getDatatableData(),
		fetchServer(`api/carteiras/charts/diversificacao/${walletId}/all`),
	]);
	return result;
};

export default async function WalletPage({
	params,
}: IProps): Promise<ReactNode> {
	const { walletId } = params;

	const [metricsData, alertsData, datatableData, donutChartData] =
		await getSummaryData(walletId);

	return (
		<SummaryPage
			metricsData={metricsData}
			alertsData={alertsData}
			datatableData={datatableData}
			donutChartData={donutChartData}
		/>
	);
}
