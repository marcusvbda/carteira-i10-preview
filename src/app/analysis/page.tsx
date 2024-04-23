import { seo } from '@/constants/seo';
import { Metadata } from 'next';

export const metadata: Metadata = seo.analysis;

export default function AnalysisPage(): JSX.Element {
    return (
        <>
            <div className="page-container">Analysis</div>;
        </>
    );
}
