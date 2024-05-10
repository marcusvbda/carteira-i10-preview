import { seo } from '@/constants/seo';
import { Metadata } from 'next';

export const metadata: Metadata = seo.goals;

export default function GoalsPage(): JSX.Element {
    return (
        <>
            <div className="page-container">Goals</div>
        </>
    );
}
