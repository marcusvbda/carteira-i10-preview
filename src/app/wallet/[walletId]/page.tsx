import { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import { getSummaryData } from './summary/_methods';
import SummaryPage from './summary/page';

export const metadata: Metadata = seo.default;

interface IProps {
	params: { walletId: string };
}

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
