'use client';

import { ReactNode } from 'react';
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

export default function MenuItems(): ReactNode {
	const items = [
		{
			icon: 'summary',
			label: 'Resumo',
			route: seo.summary.path,
		},
		{
			icon: 'earnings',
			label: 'Proventos',
			route: seo.earnings.path,
		},
		{
			icon: 'profitability',
			label: 'Rentabilidade',
			route: seo.profitability.path,
		},
		{
			icon: 'patrimony',
			label: 'Patrimônio',
			route: seo.patrimony.path,
		},
		{
			icon: 'goals',
			label: 'Metas',
			route: seo.goals.path,
		},
		{
			icon: 'analysis',
			label: 'Análise',
			route: seo.analysis.path,
		},
		{
			icon: 'releases',
			label: 'Lançamentos',
			route: seo.entries.path,
		},
		{
			icon: 'irpf',
			label: 'IRPF',
			route: seo.irpf.path,
		},
	];

	return (
		<div className="menu-items">
			{items.map((item) => (
				<MenuItem key={item.label} {...item} />
			))}
		</div>
	);
}
