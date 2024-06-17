'use client';

import { ReactNode, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { seo } from '@/constants/seo';
import Icon from '../common/icon';

interface MenuItemProps {
	icon: string;
	label: string;
	route: string;
}

const MenuItem = ({ icon, label, route }: MenuItemProps): ReactNode => {
	const pathName = usePathname();
	const isCurrentRoute = pathName === route;

	return (
		<Link href={route} className={`menu-item ${isCurrentRoute && 'active'} `}>
			<Icon
				icon={`/images/theme/${icon}.svg`}
				width="16px"
				filter="brightness(2)"
			/>
			<span className="label">{label}</span>
		</Link>
	);
};

export default function MenuItems({ isPublicRoute }: any): ReactNode {
	const items = useMemo(() => {
		const items = [
			{
				icon: 'summary',
				label: 'Resumo',
				route: isPublicRoute ? `/public-wallet` : seo.summary.path,
			},
			{
				icon: 'earnings',
				label: 'Proventos',
				route: isPublicRoute ? `/public-wallet/earnings` : seo.earnings.path,
			},
			{
				icon: 'profitability',
				label: 'Rentabilidade',
				route: isPublicRoute
					? `/public-wallet/profitability`
					: seo.profitability.path,
			},
			{
				icon: 'patrimony',
				label: 'Patrimônio',
				route: isPublicRoute ? `/public-wallet/patrimony` : seo.patrimony.path,
			},
		];

		if (!isPublicRoute) {
			items.push({
				icon: 'goals',
				label: 'Metas',
				route: seo.goals.path,
			});
			items.push({
				icon: 'analysis',
				label: 'Análise',
				route: seo.analysis.path,
			});
		}

		items.push({
			icon: 'releases',
			label: 'Lançamentos',
			route: isPublicRoute ? `/public-wallet/entries` : seo.entries.path,
		});

		if (!isPublicRoute) {
			items.push({
				icon: 'irpf',
				label: 'IRPF',
				route: seo.irpf.path,
			});
		}

		return items;
	}, [isPublicRoute]);

	return (
		<div className="menu-items">
			{items.map((item) => (
				<MenuItem key={item.label} {...item} />
			))}
		</div>
	);
}
