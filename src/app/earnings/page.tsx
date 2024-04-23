import { seo } from '@/constants/seo';
import { Metadata } from 'next';

export const metadata: Metadata = seo.earnings;

export default function EarningsPage(): JSX.Element {
    return (
        <>
            <div className="page-container">Earnings</div>
        </>
    );
}
