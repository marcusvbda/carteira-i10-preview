import { seo } from '@/constants/seo';
import { Metadata } from 'next';
import Metrics from './_metrics';
import Charts from './_charts';
import Datatables from './_datatables';
import { CSSProperties } from 'react';

export const metadata: Metadata = seo.summary;

export default function SummaryPage(): JSX.Element {
    return (
        <div
            className="page-container"
            style={
                { '--bg-color': 'var(--surface-secondary)' } as CSSProperties
            }
        >
            <Metrics />
            <Charts />
            <Datatables />
        </div>
    );
}
