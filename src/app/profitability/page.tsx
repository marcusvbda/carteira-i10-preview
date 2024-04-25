import { seo } from '@/constants/seo';
import { Metadata } from 'next';

export const metadata: Metadata = seo.profitability;

export default function ProfitabilityPage(): JSX.Element {
    return (
        <>
            <div className="page-container">Profitabily</div>
        </>
    );
}
