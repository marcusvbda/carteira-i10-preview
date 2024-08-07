import { ReactNode } from 'react';
import { Metadata } from 'next';
import { fetchServer } from '@/app/services/api';
import { seo } from '@/constants/seo';
import { getSummaryData } from './summary/_methods';
import EmptyState from './summary/empty-state/page';
import SummaryPage from './summary/page';

export const metadata: Metadata = seo.default;

interface IProps {
	params: { walletId: string };
}

export default async function WalletPage({
	params,
}: IProps): Promise<ReactNode> {
	const { walletId } = params;

	const metricsData = await fetchServer(`summary/metrics/${walletId}`);

	if (Number(metricsData?.applied || 0) === 0) {
		return <EmptyState walletId={walletId} />;
	}

	const [alertsData, infoData] = await getSummaryData(walletId);

	return (
		<SummaryPage
			infoData={infoData}
			metricsData={metricsData}
			alertsData={alertsData}
		/>
	);
}
