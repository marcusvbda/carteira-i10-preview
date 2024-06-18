import { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import Datatables from './_datatables';
import './_styles.scss';
import { getEntriesData } from './_methods';

export const metadata: Metadata = seo.releases;
interface IProps {
	params: { walletId: string };
}
export default async function EntriesPage({
	params,
}: IProps): Promise<ReactNode> {
	const { walletId } = params;

	const data = await getEntriesData(walletId);

	return (
		<div className="page-container">
			<Datatables data={data} />
		</div>
	);
}
