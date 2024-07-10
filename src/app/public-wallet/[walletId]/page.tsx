import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchServer } from '@/app/services/api';
import { getSummaryData } from '@/app/wallet/[walletId]/summary/_methods';
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

	const [infoData, metricsData] = await Promise.all([
		fetchServer(`summary/info/${walletId}`),
		fetchServer(`summary/metrics/${walletId}`),
	]);

	if (Number(metricsData?.applied || 0) === 0) {
		return notFound();
	}

	const [alertsData, datatableData, donutChartData, defaultBarChartData] =
		await getSummaryData(walletId);

	return (
		<SummaryPage
			infoData={infoData}
			metricsData={metricsData}
			alertsData={alertsData}
			datatableData={datatableData}
			donutChartData={donutChartData}
			defaultBarChartData={defaultBarChartData}
		/>
	);
}
