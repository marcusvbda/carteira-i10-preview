import { ReactNode } from 'react';
import EarningsPageContent from '@/app/wallet/[walletId]/earnings/_earningPageContent';
import { getEarningsData } from '@/app/wallet/[walletId]/earnings/_methods';
interface IProps {
	params: { walletId: string };
}

export default async function EarningsPagePublic({
	params,
}: IProps): Promise<ReactNode> {
	const { walletId } = params;
	const [barchartData, detailsData, summaryData, totalMonths] =
		await getEarningsData(walletId);

	return (
		<EarningsPageContent
			walletId={walletId}
			barchartData={barchartData}
			detailsData={detailsData}
			summaryData={summaryData}
			totalMonths={totalMonths}
		/>
	);
}
