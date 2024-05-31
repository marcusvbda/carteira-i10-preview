import { ReactNode } from 'react';
import Link from 'next/link';
import If from '@/components/common/if';
import { footerRoutes } from '@/constants/footerRoutes';
import Icon from '../common/icon';

export default function Links(): ReactNode {
	return (
		<div className="container w-100">
			<section className="links-section">
				<div className="links-column">
					<h4>Nacional</h4>
					<div className="links">
						{footerRoutes.nacional.map((link, index) => (
							<Link href={link.url} target="_blank" key={`nacional_${index}`}>
								{link.name}
							</Link>
						))}
					</div>
				</div>
				<div className="links-column">
					<h4>Internacional</h4>
					<div className="links">
						{footerRoutes.international.map((link, index) => (
							<Link
								href={link.url}
								target="_blank"
								key={`international_${index}`}
							>
								{link.name}
							</Link>
						))}
					</div>
					<h4>Startups</h4>
					<div className="links">
						{footerRoutes.startups.map((link, index) => (
							<Link href={link.url} target="_blank" key={`startups_${index}`}>
								{link.name}
							</Link>
						))}
					</div>
					<h4>Conteúdo</h4>
					<div className="links">
						{footerRoutes.blog.map((link, index) => (
							<Link href={link.url} target="_blank" key={`blog_${index}`}>
								{link.name}
							</Link>
						))}
					</div>
				</div>
				<div className="links-column">
					<h4>Ferramentas</h4>
					<div className="links">
						{footerRoutes.tools.map((link, index) => (
							<Link href={link.url} target="_blank" key={`tools_${index}`}>
								{link.name}
							</Link>
						))}
					</div>
				</div>
				<div className="links-column">
					<h4>Cursos</h4>
					<div className="links">
						{footerRoutes.courses.map((link, index) => (
							<Link href={link.url} target="_blank" key={`courses_${index}`}>
								{link.name}
								<If condition={link?.icon}>
									<Icon icon={link?.icon || ''} width="12px" />
								</If>
							</Link>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
