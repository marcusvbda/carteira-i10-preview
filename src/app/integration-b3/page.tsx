import './_styles.scss';
import { CSSProperties, ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import Fragments from './_fragments';

export const metadata: Metadata = seo.goals;

export default function IntegrationB3Page(): ReactNode {
	return (
		<div
			className="page-container b3"
			style={
				{
					'--bg-color': 'var(--surface-primary)',
				} as CSSProperties
			}
		>
			<div className="b3-container">
				<Fragments />
			</div>
		</div>
	);
}
