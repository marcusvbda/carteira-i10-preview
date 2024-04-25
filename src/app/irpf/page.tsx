import { seo } from '@/constants/seo';
import { Metadata } from 'next';

export const metadata: Metadata = seo.irpf;

export default function IrpfPage(): JSX.Element {
    return (
        <>
            <div className="page-container">IRPF</div>
        </>
    );
}
