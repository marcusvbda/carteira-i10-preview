import { seo } from '@/constants/seo';
import { Metadata } from 'next';

export const metadata: Metadata = seo.releases;

export default function EntriesPage(): JSX.Element {
    return (
        <>
            <div className="page-container">Entries</div>;
        </>
    );
}
