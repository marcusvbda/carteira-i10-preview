import { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import Fragments from './_fragments';
import './_styles.scss';

export const metadata: Metadata = seo.analysis;

export default function AnalysisPage(): ReactNode {
	return (
		<section className="analysis-section">
			<div className="page-container">
				<Fragments />
			</div>
		</section>
	);
}
