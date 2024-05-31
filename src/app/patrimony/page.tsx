import { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import ConsolidationChats from './_consolidationChats';
import Evolution from './_evolution';
import './_styles.scss';

export const metadata: Metadata = seo.patrimony;

export default function PatrimonyPage(): ReactNode {
	return (
		<section className="patrimony-page">
			<div className="page-container">
				<Evolution />
				<ConsolidationChats />
			</div>
		</section>
	);
}
