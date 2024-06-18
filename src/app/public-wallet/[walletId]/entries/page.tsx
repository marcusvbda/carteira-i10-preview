import { ReactNode } from 'react';
import { Metadata } from 'next';
import Datatables from '@/app/wallet/[walletId]/entries/_datatables';
import { getEntriesData } from '@/app/wallet/[walletId]/entries/_methods';
import { seo } from '@/constants/seo';

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
