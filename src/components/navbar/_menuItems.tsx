'use client';

import { ReactNode, useContext, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { seo } from '@/constants/seo';
import { WalletContext } from '@/context/walletContext';
import { useHelpers } from '@/hooks/helpers';
import Icon from '../common/icon';

interface MenuItemProps {
	icon: string;
	label: string;
	route: string;
}

const MenuItem = ({ icon, label, route }: MenuItemProps): ReactNode => {
	const { cleanPath } = useHelpers();
	const pathName = cleanPath(usePathname());
	const isCurrentRoute = pathName === cleanPath(route);

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
	const { walletId } = useContext(WalletContext);

	const items = useMemo(() => {
		const items = [
			{
				icon: 'summary',
				label: 'Resumo',
				route: `${isPublicRoute ? `/public-wallet` : '/wallet'}/${walletId}${seo.summary.path}`,
			},
			{
				icon: 'earnings',
				label: 'Proventos',
				route: `${isPublicRoute ? `/public-wallet` : '/wallet'}/${walletId}${seo.earnings.path}`,
			},
			{
				icon: 'profitability',
				label: 'Rentabilidade',
				route: `${isPublicRoute ? `/public-wallet` : '/wallet'}/${walletId}${seo.profitability.path}`,
			},
			{
				icon: 'patrimony',
				label: 'Patrimônio',
				route: `${isPublicRoute ? `/public-wallet` : '/wallet'}/${walletId}${seo.patrimony.path}`,
			},
		];

		if (!isPublicRoute) {
			items.push({
				icon: 'goals',
				label: 'Metas',
				route: `/wallet/${walletId}${seo.goals.path}`,
			});
			items.push({
				icon: 'analysis',
				label: 'Análise',
				route: `/wallet/${walletId}${seo.analysis.path}`,
			});
		}

		items.push({
			icon: 'releases',
			label: 'Lançamentos',
			route: `${isPublicRoute ? `/public-wallet` : '/wallet'}/${walletId}${seo.entries.path}`,
		});

		if (!isPublicRoute) {
			items.push({
				icon: 'irpf',
				label: 'IRPF',
				route: `/wallet/${walletId}${seo.irpf.path}`,
			});
		}

		return items;
	}, [isPublicRoute, walletId]);

	return (
		<div className="menu-items">
			{items.map((item) => (
				<MenuItem key={item.label} {...item} />
			))}
		</div>
	);
}
