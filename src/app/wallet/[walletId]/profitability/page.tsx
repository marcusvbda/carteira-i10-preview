import { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import './_styles.scss';
import PageContent from './_content';

export const metadata: Metadata = seo.profitability;

export default function ProfitabilityPage(): ReactNode {
	return <PageContent />;
}
