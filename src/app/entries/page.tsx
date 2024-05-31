import { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import Datatables from './_datatables';
import './_styles.scss';

export const metadata: Metadata = seo.releases;

export default function EntriesPage(): ReactNode {
	return (
		<div className="page-container">
			<Datatables />
		</div>
	);
}
