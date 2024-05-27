import { seo } from '@/constants/seo';
import { Metadata } from 'next';
import './_styles.scss';
import Fragments from './_fragments';
import { CSSProperties } from 'react';

export const metadata: Metadata = seo.settings;

export default function WalletSettings(): JSX.Element {
    return (
        <div className="wallet-settings-page">
            <div
                className="page-container"
                style={
                    { '--bg-color': 'var(--surface-primary)' } as CSSProperties
                }
            >
                <Fragments />
            </div>
        </div>
    );
}
