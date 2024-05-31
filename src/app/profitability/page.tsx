import { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';

export const metadata: Metadata = seo.profitability;

export default function ProfitabilityPage(): ReactNode {
	return (
		<>
			<div className="page-container">Profitabily</div>
		</>
	);
}
