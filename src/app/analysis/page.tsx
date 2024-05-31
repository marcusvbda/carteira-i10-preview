import { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';

export const metadata: Metadata = seo.analysis;

export default function AnalysisPage(): ReactNode {
	return (
		<>
			<div className="page-container">Analysis</div>
		</>
	);
}
