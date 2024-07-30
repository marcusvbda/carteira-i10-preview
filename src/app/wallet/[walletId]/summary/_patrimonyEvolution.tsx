'use client';
import { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import BarChart from '@/components/charts/barChart';
import Icon from '@/components/common/icon';
import { WalletContext } from '@/context/walletContext';
import { useFetch } from '@/hooks/fetch';

const qtyMonthOptions: any[] = [
	{
		id: 9999999,
		name: 'Desde o início',
	},
	{
		id: 12,
		name: '12 Meses',
	},
	{
		id: 24,
		name: '2 Anos',
	},
	{
		id: 36,
		name: '5 Anos',
	},
	{
		id: 60,
		name: '10 Anos',
	},
];

const typesOptions: any[] = [
	{
		id: 'all',
		name: 'Todos os tipos',
	},
	{
		id: 'ticker',
		name: 'Ações',
	},
	{
		id: 'Fii',
		name: 'Fiis',
	},
	{
		id: 'Fund',
		name: 'Fundos',
	},
	{
		id: 'Crypto',
		name: 'Criptomoedas',
	},
];

export default function PatrimonyEvolution({
	maxRows = 12,
	height = '300px',
}: {
	maxRows?: number;
	height?: string;
}): ReactNode {
	const { walletId } = useContext(WalletContext);
	const [qtyMonths, setQtyMonths] = useState<any>(qtyMonthOptions[1] as any);
	const [type, setType] = useState<any>(typesOptions[0] as any);

	const {
		data: barChartData,
		loading: barChartLoading,
		fetch: fetchBarChart,
	} = useFetch({
		autoDispatch: false,
		defaultLoading: false,
	});

	useEffect(() => {
		fetchBarChart({
			route: `/api/summary/${walletId}/barchart/${qtyMonths.id}/${type.id}`,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [qtyMonths, type]);

	const barChartInfo = useMemo(() => {
		const primaryColor = '#2cb875';
		const secondaryColor = '#96e9c1';
		const primaryLabel = 'Valor aplicado';
		const secondaryLabel = 'Ganho capital';

		const splitData = (items: any[]) => {
			const qty = items.length;
			if (qty <= maxRows) return items;
			const step = Math.ceil((qty - 2) / (maxRows - 2));
			const result = [items[0]];
			for (let i = 1; i < qty - 1; i += step) {
				result.push(items[i]);
				if (result.length === maxRows - 1) break;
			}
			result.push(items[qty - 1]);
			while (result.length > maxRows) result.splice(result.length - 2, 1);
			return result;
		};

		const rows = splitData(barChartData || []);

		const results = [
			{
				name: primaryLabel,
				type: 'bar',
				stack: 'Ad',
				color: primaryColor,
				data: rows.map((x: any) => {
					const applied = x?.sum_applied || 0;
					return parseFloat(applied.toFixed(2));
				}),
			},
			{
				name: secondaryLabel,
				type: 'bar',
				stack: 'Ad',
				color: secondaryColor,
				data: rows.map((x: any) => {
					const applied = parseFloat((x?.sum_applied || 0).toFixed(2));
					const total = parseFloat((x?.sum_equity || 0).toFixed(2));
					const earnings = parseFloat((total - applied).toFixed(2));
					return earnings;
				}),
			},
		];
		const dates = rows.map((x: any) => x?.month);
		return {
			results,
			dates,
		};
	}, [barChartData, maxRows]);

	return (
		<BarChart
			loading={barChartLoading}
			data={barChartInfo.results}
			dates={barChartInfo.dates}
			height={height}
		>
			<div className="chart-header">
				<h4 className="chart-header__title">Evolução do Patrimônio</h4>
				<div className="chart-header__filter">
					<Dropdown
						value={qtyMonths}
						onChange={(e) => setQtyMonths(e.value)}
						options={qtyMonthOptions}
						optionLabel="name"
						valueTemplate={(item) => (
							<div className="select-dropdown-label">
								<Icon icon="/images/theme/date.svg" width="12px" />
								{item.name}
							</div>
						)}
						dropdownIcon={() => (
							<Icon
								icon="/images/theme/dropdown-icon.svg"
								width="10.33px"
								height="6.99px"
							/>
						)}
					/>
					<Dropdown
						value={type}
						onChange={(e) => setType(e.value)}
						options={typesOptions}
						optionLabel="name"
						dropdownIcon={() => (
							<Icon
								icon="/images/theme/dropdown-icon.svg"
								width="10.33px"
								height="6.99px"
							/>
						)}
						valueTemplate={(item) => (
							<div className="select-dropdown-label">
								<div className="default-dropdown--btn-money" />
								<Icon icon="/images/theme/money.svg" width="16px" />
								{item.name}
							</div>
						)}
					/>
				</div>
			</div>
		</BarChart>
	);
}
