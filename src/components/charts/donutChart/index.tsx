import './_styles.scss';
import { ReactNode, useContext, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import DefaultCard from '@/components/cards/default';
import If from '@/components/common/if';
import Skeleton from '@/components/common/skeleton';
import { ThemeContext } from '@/context/themeContext';

interface IProps {
	children?: ReactNode;
	size?: string;
	data?: any[];
	loading: boolean;
	noCard?: boolean;
	customLegend?: any;
}

const Content = ({ loading, children, sizes, options, theme }: any) => {
	return (
		<>
			{children && children}
			<If condition={loading}>
				<Skeleton width="100%" height={sizes[0]} />
			</If>
			<If condition={!loading}>
				<div className="chart-content" style={{ height: sizes[1] }}>
					<ReactECharts option={options} theme={theme} />
				</div>
			</If>
		</>
	);
};

export default function DonutChart({
	data,
	children,
	size,
	loading,
	noCard,
	customLegend,
}: IProps): ReactNode {
	const { theme } = useContext(ThemeContext);
	const sizes = useMemo(() => [size || '299px'], [size]);

	const options = {
		backgroundColor: 'transparent',
		tooltip: {
			trigger: 'item',
			formatter: (params: any) => {
				const item = data?.find((x: any) => x.name === params.name);
				if (customLegend) return customLegend(item);
				if (item && item.percent) {
					return item && `${params.name}: ${item.percent}%`;
				}
				return item && `${params.name}: ${item.value}`;
			},
		},
		legend: {
			orient: 'vertical',
			left: 'right',
			top: 'center',
			formatter: (name: any) => {
				const item = data?.find((x: any) => x.name === name);
				if (customLegend) return customLegend(item);
				if (item && item.percent) {
					return item && `${name}: ${item.percent}%`;
				}
				return item && `${name}: ${item.value}`;
			},
		},
		series: [
			{
				type: 'pie',
				radius: ['40%', '70%'],
				center: ['30%', '50%'],
				label: {
					show: false,
					position: 'center',
				},
				avoidLabelOverlap: false,
				data: (data || []).map((x: any) => {
					let value = x?.percent || 0;
					if (x?.value) value = x.value;
					return {
						value,
						name: x.name || '',
					};
				}),
			},
		],
	};

	if (noCard) {
		return (
			<Content loading={loading} theme={theme} sizes={sizes} options={options}>
				{children}
			</Content>
		);
	}

	return (
		<DefaultCard className="donut-chart" padding="24px 32px">
			<Content loading={loading} theme={theme} sizes={sizes} options={options}>
				{children}
			</Content>
		</DefaultCard>
	);
}
