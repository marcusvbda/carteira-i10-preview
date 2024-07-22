'use client';
import { useContext, useMemo, useState, ReactNode, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Dropdown } from 'primereact/dropdown';
import Icon from '@/components/common/icon';
import Skeleton from '@/components/common/skeleton';
import { ThemeContext } from '@/context/themeContext';
import { useFetch } from '@/hooks/fetch';
import { useHelpers } from '@/hooks/helpers';

const maxRows = 12;

const optionList = [
	{
		id: 'all',
		text: 'Recebidos e futuros',
	},
	{
		id: 'received',
		text: 'Recebidos',
	},
	{
		id: 'future',
		text: 'Futuros',
	},
];

const periodList = [
	{
		id: 'monthly',
		text: 'Mensal',
	},
	{
		id: 'yearly',
		text: 'Anual',
	},
];

export default function Evolution({ defaultData, walletId }: any): ReactNode {
	const { formatMoney } = useHelpers();
	const [initialized, setInitialized] = useState(false);
	const [data, setData] = useState<any>(defaultData || []);
	const [selectedOption, setSelectedOption] = useState<any>(optionList[1]);
	const [selectedPeriod, setSelectedPeriod] = useState<any>(periodList[0]);

	const { theme } = useContext(ThemeContext);

	const { loading: barChartLoading, fetch: fetchBarChart } = useFetch({
		autoDispatch: false,
		defaultLoading: false,
		callback: (data: any) => {
			setData(data);
		},
	});

	useEffect(() => {
		if (initialized) {
			fetchBarChart({
				route: `/api/earnings/${walletId}/barchart/${selectedOption.id}`,
			});
		}
		setInitialized(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOption]);

	const options = useMemo(() => {
		const primaryColor = '#4778D1';
		const primaryLabel = 'Proventos recebidos';

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

		let dataItems: any = [];
		const keys = Object.keys(data || {});

		for (let i = 0; i < keys.length; i++) {
			if (selectedPeriod.id === 'monthly') {
				dataItems = [...dataItems, ...(data[keys[i]]?.months || [])];
			} else {
				dataItems.push({
					month: keys[i],
					amount: (data[keys[i]]?.months || []).reduce(
						(a: any, b: any) => a + b.amount,
						0,
					),
				});
			}
		}
		const rows = splitData(dataItems || []);
		const results = [
			{
				name: primaryLabel,
				type: 'bar',
				stack: 'Ad',
				color: primaryColor,
				data: rows.map((x: any) => {
					const value = x?.amount || 0;
					return parseFloat(value.toFixed(2));
				}),
			},
		];
		const dates = rows.map((x: any) => {
			const date = new Date(x.month);
			const month = date.getMonth() + 1;
			const year = date.getFullYear();
			return `${month.toString().padStart(2, '0')}/${year}`;
		});

		return {
			backgroundColor: 'transparent',
			tooltip: {
				trigger: 'axis',
				formatter: (params: any) => {
					return `
					<div class='chartbar-tooltip'>
						<div class="date">${params[0].name}</div>
						${params
							.map((param: any) => {
								return `
								<div class="label">
									<div class="color" style="background-color: ${param.color}"></div>
									<div class="name">${param.seriesName}</div>
								</div>
								<div class="value">${formatMoney(param.value)}</div>`;
							})
							.join('')}
					</div>`;
				},
			},
			xAxis: {
				data: dates,
			},
			yAxis: {
				type: 'value',
			},
			series: results,
			legend: {},
			grid: {
				left: '0%',
				right: '0%',
				bottom: '0%',
				containLabel: true,
			},
		};
	}, [data, formatMoney, selectedPeriod]);

	return (
		<div className="earnings-card evolution">
			<div className="header card-content border-b">
				<h4>
					Evolução de Proventos
					<div className="action-btns">
						<Dropdown
							value={selectedOption}
							onChange={(e) => setSelectedOption(e.value)}
							options={optionList}
							optionLabel="text"
							dropdownIcon={() => (
								<Icon
									icon="/images/theme/dropdown-icon.svg"
									width="10.33px"
									height="6.99px"
								/>
							)}
							valueTemplate={(item) => (
								<div className="select-dropdown-label">
									<Icon icon="/images/theme/coins-icon.svg" width="12px" />
									{item.text}
								</div>
							)}
						/>
						<Dropdown
							value={selectedPeriod}
							onChange={(e) => setSelectedPeriod(e.value)}
							options={periodList}
							optionLabel="text"
							dropdownIcon={() => (
								<Icon
									icon="/images/theme/dropdown-icon.svg"
									width="10.33px"
									height="6.99px"
								/>
							)}
							valueTemplate={(item) => (
								<div className="select-dropdown-label">
									<Icon icon="/images/theme/date.svg" width="12px" />
									{item?.text}
								</div>
							)}
						/>
					</div>
				</h4>
			</div>
			<div className="card-content bottom">
				{barChartLoading ? (
					<Skeleton width="100%" height="409px" />
				) : (
					<ReactECharts
						option={options}
						theme={theme}
						style={{ height: 409, width: '100%' }}
					/>
				)}
			</div>
		</div>
	);
}
