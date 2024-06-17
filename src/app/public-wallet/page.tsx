import { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import SummaryPage from '../summary/page';
import './_styles.scss';
export const metadata: Metadata = seo.summary;

export default function PublicWalletPage(): ReactNode {
	return <SummaryPage />;
}
