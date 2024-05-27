import './_styles.scss';
import { seo } from '@/constants/seo';
import { Metadata } from 'next';
import Fragments from './_fragments';
import { CSSProperties } from 'react';

export const metadata: Metadata = seo.goals;

export default function IntegrationB3Page(): JSX.Element {
    return (
        <div
            className="page-container b3"
            style={
                {
                    '--bg-color': 'var(--surface-primary)'
                } as CSSProperties
            }
        >
            <div className="b3-container">
                <Fragments />
            </div>
        </div>
    );
}
