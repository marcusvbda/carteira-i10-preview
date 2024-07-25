'use client';
import { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Dropdown } from 'primereact/dropdown';
import DefaultCard from '@/components/cards/default';
import Icon from '@/components/common/icon';
import Skeleton from '@/components/common/skeleton';
import { WalletContext } from '@/context/walletContext';
import { useFetch } from '@/hooks/fetch';

const optionList = [
	{
		id: 'all',
		text: 'Todos os tipos',
	},
	{
		id: 'Ticker',
		text: 'Ações',
	},
	{
		id: 'Fund',
		text: 'Fundos',
	},
];

const periodList = [
	{
		id: 9999999,
		text: 'Desde o inicio',
	},
	{
		id: 12,
		text: '12 Meses',
	},
	{
		id: 24,
		text: '2 Anos',
	},
	{
		id: 36,
		text: '5 Anos',
	},
	{
		id: 60,
		text: '10 Anos',
	},
];

export default function CompareChart({ theme }: any): ReactNode {
	const { walletId } = useContext(WalletContext);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<any>({});
	const [selectedOption, setSelectedOption] = useState<any>(optionList[0]);
	const [selectedPeriod, setSelectedPeriod] = useState<any>(periodList[0]);
	const { fetch: fectchData } = useFetch({
		autoDispatch: false,
		callback: (data: any) => {
			setData(data);
			setLoading(false);
		},
	});

	useEffect(() => {
		setLoading(true);
		fectchData({
			route: `/api/profitability/${walletId}/compare-chart/${selectedPeriod.id}/${selectedOption.id}`,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOption, selectedPeriod]);

	const charLineOps = useMemo(() => {
		if (!data) return {};

		const legend = Object.keys(data);
		const longestLegend = legend.reduce(
			(acc, key) => (data[acc].length < data[key].length ? key : acc),
			legend[0],
		);

		const dates = (data[longestLegend] || []).map((x: any) => x.date);

		const series = legend.map((name) => {
			const serieDates = dates.map(
				(date: any) =>
					(data[name] || []).find((x: any) => x.date === date)?.profitability ||
					0,
			);
			return {
				name,
				type: 'line',
				stack: 'Total',
				data: serieDates,
				areaStyle: name === 'Rentabilidade' ? {} : null,
				emphasis: {
					focus: 'series',
				},
				symbol: 'none',
			};
		});

		const getTooltipFormatter = (params: any) => `
			<div class='chartbar-tooltip'>
				<div class="date">${params[0].name}</div>
				${params
					.map(
						(param: any) => `
					<div class="label">
						<div class="color" style="background-color: ${param.color}"></div>
						<div class="name">${param.seriesName}</div>
					</div>
					<div class="value">${param.value.toFixed(2)}%</div>`,
					)
					.join('')}
			</div>`;

		return {
			backgroundColor: 'transparent',
			legend: {
				data: [
					'Rentabilidade',
					'CDI',
					'IPCA',
					'IBOV',
					'SMLL',
					'SPX',
					'IDIV',
					'IVVB11',
				],
				selected: {
					Rentabilidade: true,
					CDI: true,
					IPCA: true,
					IBOV: false,
					SMLL: false,
					SPX: false,
					IDIV: false,
					IVVB11: false,
				},
			},
			tooltip: {
				trigger: 'axis',
				formatter: getTooltipFormatter,
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true,
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: dates,
			},
			yAxis: {
				type: 'value',
			},
			series: series.filter((s) =>
				[
					'Rentabilidade',
					'CDI',
					'IPCA',
					'IBOV',
					'SMLL',
					'SPX',
					'IDIV',
					'IVVB11',
				].includes(s.name),
			),
		};
	}, [data]);

	return (
		<DefaultCard className="box-chart-line">
			<div className="header card-content">
				<h4 style={{ lineHeight: '42px' }}>
					Rentabilidade comparada com índices
				</h4>
				<div className="actions">
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
				</div>
			</div>
			<div className="content">
				{loading ? (
					<Skeleton width="100%" height="340px" />
				) : (
					<ReactECharts
						option={charLineOps}
						theme={theme}
						style={{ height: 340, width: '100%' }}
					/>
				)}
			</div>
		</DefaultCard>
	);
}
