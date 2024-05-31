import { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';

export const metadata: Metadata = seo.help;

export default function HelpPage(): ReactNode {
	return (
		<>
			<div className="page-container">Help</div>
		</>
	);
}
