import { seo } from '@/constants/seo';
import { Metadata } from 'next';

export const metadata: Metadata = seo.help;

export default function HelpPage(): JSX.Element {
    return (
        <>
            <div className="page-container">Help</div>
        </>
    );
}
