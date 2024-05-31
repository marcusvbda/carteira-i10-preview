import { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';

export const metadata: Metadata = seo.irpf;

export default function IrpfPage(): ReactNode {
	return (
		<>
			<div className="page-container">IRPF</div>
		</>
	);
}
