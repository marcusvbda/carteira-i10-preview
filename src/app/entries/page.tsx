import { seo } from '@/constants/seo';
import { Metadata } from 'next';
import Datatables from './_datatables';
import './_styles.scss';

export const metadata: Metadata = seo.releases;

export default function EntriesPage(): JSX.Element {
    return (
        <div className="page-container">
            <Datatables />
        </div>
    );
}
