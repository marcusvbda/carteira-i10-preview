import { ReactNode } from 'react';
import { Metadata } from 'next';
import { getSummaryData } from '@/app/wallet/[walletId]/page';
import SummaryPage from '@/app/wallet/[walletId]/summary/page';
import { seo } from '@/constants/seo';
export const metadata: Metadata = seo.summary;

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
