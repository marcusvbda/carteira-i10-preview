import { ReactNode } from 'react';
import { Metadata } from 'next';
import { fetchServer } from '@/app/services/api';
import { seo } from '@/constants/seo';
import './_styles.scss';
import PatrimonyEvolution from '../summary/_patrimonyEvolution';
import ConsolidationChats from './_consolidationChats';

export const metadata: Metadata = seo.patrimony;

interface IProps {
	params: { walletId: string };
}
export default async function PatrimonyPage({
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
