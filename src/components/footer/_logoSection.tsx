import { ReactNode } from 'react';
import Link from 'next/link';
import { footerRoutes } from '@/constants/footerRoutes';
import Icon from '../common/icon';

export default function LogoSection(): ReactNode {
	return (
		<div className="container w-100 flex justify-center">
			<section className="logo-section">
				<div className="complete-logo">
					<Icon icon="/images/complete-logo.webp" width="100%" height="100%" />
				</div>
				<div className="social-links">
					{footerRoutes.social.map((link, index) => (
						<Link
							href={(link.url || '') as string}
							target="_blank"
							className={`social-link ${link.name}`}
							key={index}
						/>
					))}
				</div>
			</section>
		</div>
	);
}
