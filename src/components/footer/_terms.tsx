import { ReactNode } from 'react';
import Link from 'next/link';
import { footerRoutes } from '@/constants/footerRoutes';

export default function Terms(): ReactNode {
	return (
		<div className="container w-100 hide-on-mobile hide-on-tablet">
			<section className="terms-section">
				<div className="term-link">
					{footerRoutes.terms.map((link, index) => (
						<span key={`term_${index}`}>
							<Link href={link.url} target="_blank">
								{link.name}
							</Link>
							{index < footerRoutes.terms.length - 1 && (
								<span className="separator">/</span>
							)}
						</span>
					))}
				</div>
			</section>
		</div>
	);
}
