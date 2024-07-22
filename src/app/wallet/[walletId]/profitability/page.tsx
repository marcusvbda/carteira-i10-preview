import { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import './_styles.scss';
import PageContent from './_content';
import { getProfitabilityData } from './_methods';

export const metadata: Metadata = seo.profitability;
interface IProps {
	params: { walletId: string };
}
export default async function ProfitabilityPage({
	params,
}: IProps): Promise<ReactNode> {
	const { walletId } = params;
	const [tableData, summaryData] = await getProfitabilityData(walletId);
	return <PageContent tableData={tableData} summaryData={summaryData} />;
}
