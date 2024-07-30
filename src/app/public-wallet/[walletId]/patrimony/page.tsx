import { ReactNode } from 'react';
import { Metadata } from 'next';
import { fetchServer } from '@/app/services/api';
import ConsolidationChats from '@/app/wallet/[walletId]/patrimony/_consolidationChats';
import PatrimonyEvolution from '@/app/wallet/[walletId]/summary/_patrimonyEvolution';
import { seo } from '@/constants/seo';
import '@/app/wallet/[walletId]/patrimony/_styles.scss';

export const metadata: Metadata = seo.patrimony;

interface IProps {
	params: { walletId: string };
}
export default async function PublicPatrimonyPage({
	params,
}: IProps): Promise<ReactNode> {
	const { walletId } = params;

	const infoData = await fetchServer(`summary/info/${walletId}`);

	return (
		<div className="page-container patrimony-page">
			<PatrimonyEvolution maxRows={24} height="352px" />
			<ConsolidationChats infoData={infoData} />
		</div>
	);
}
