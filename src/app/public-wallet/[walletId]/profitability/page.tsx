import { ReactNode } from 'react';
import PageContent from '@/app/wallet/[walletId]/profitability/_content';
import { getProfitabilityData } from '@/app/wallet/[walletId]/profitability/_methods';

interface IProps {
	params: { walletId: string };
}
export default async function PublicProfitabilityPage({
	params,
}: IProps): Promise<ReactNode> {
	const { walletId } = params;
	const [tableData, summaryData] = await getProfitabilityData(walletId);

	return <PageContent tableData={tableData} summaryData={summaryData} />;
}
