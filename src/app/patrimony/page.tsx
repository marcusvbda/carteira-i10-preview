import { seo } from '@/constants/seo';
import { Metadata } from 'next';

export const metadata: Metadata = seo.patrimony;

export default function PatrimonyPage(): JSX.Element {
    return (
        <>
            <div className="page-container">Patrimony</div>
        </>
    );
}
