import './_styles.scss';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import EarningsPageContent from './_earningPageContent';
import { getEarningsData } from './_methods';

export const metadata: Metadata = seo.earnings;
interface IProps {
	params: { walletId: string };
}

export default async function EarningsPage({
	params,
}: IProps): Promise<ReactNode> {
	const { walletId } = params;
	const [barchartData, detailsData, summaryData] =
		await getEarningsData(walletId);

	return (
		<EarningsPageContent
			walletId={walletId}
			barchartData={barchartData}
			detailsData={detailsData}
			summaryData={summaryData}
		/>
	);
}
