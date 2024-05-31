import { CSSProperties, ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import './_styles.scss';
import Fragments from './_fragments';

export const metadata: Metadata = seo.settings;

export default function WalletSettings(): ReactNode {
	return (
		<div className="wallet-settings-page">
			<div
				className="page-container"
				style={{ '--bg-color': 'var(--surface-primary)' } as CSSProperties}
			>
				<Fragments />
			</div>
		</div>
	);
}
