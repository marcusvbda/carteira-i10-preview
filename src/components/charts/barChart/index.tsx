import { ReactNode, useContext, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import DefaultCard from '@/components/cards/default';
import Skeleton from '@/components/common/skeleton';
import './_styles.scss';

import { ThemeContext } from '@/context/themeContext';
import { useHelpers } from '@/hooks/helpers';

interface IProps {
	children?: ReactNode;
	width?: string;
	yAxesWidth?: string;
	height?: string;
	data?: any[];
	dates?: string[];
	loading: boolean;
}

export default function BarChart({
	width,
	height,
	data,
	yAxesWidth,
	children,
	loading,
	dates,
}: IProps): ReactNode {
	const { formatMoney } = useHelpers();
	const { theme } = useContext(ThemeContext);
	const sizes = useMemo(() => {
		const w = width || '100%';
		const h = height || '300px';
		const yw = yAxesWidth || '50px';
		return [w, h, yw];
	}, [width, height, yAxesWidth]);

	const options = {
		responsive: true,
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
		series: data,
		legend: {},
		grid: {
			left: '0%',
			right: '0%',
			bottom: '0%',
			containLabel: true,
		},
	};

	return (
		<DefaultCard className="chartbar" padding="24px 32px">
			{children && children}
			{loading ? (
				<Skeleton width={sizes[0]} height={sizes[1]} />
			) : (
				<div className="chartbar-content" style={{ height: sizes[1] }}>
					<ReactECharts
						option={options}
						theme={theme}
						style={{ height: sizes[1], width: sizes[0] }}
					/>
				</div>
			)}
		</DefaultCard>
	);
}
