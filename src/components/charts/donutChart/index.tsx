import './_styles.scss';
import { ReactNode, useContext, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import DefaultCard from '@/components/cards/default';
import If from '@/components/common/if';
import Skeleton from '@/components/common/skeleton';
import { ThemeContext } from '@/context/themeContext';
import { useHelpers } from '@/hooks/helpers';

interface IProps {
	children?: ReactNode;
	size?: string;
	data?: any[];
	loading: boolean;
	noCard?: boolean;
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
}: IProps): ReactNode {
	const { screenFormat, theme } = useContext(ThemeContext);
	const sizes = useMemo(() => [size || '299px'], [size]);
	const { formatMoney } = useHelpers();

	const options = useMemo(() => {
		return {
			backgroundColor: 'transparent',
			tooltip: {
				trigger: 'item',
				formatter: (params: any) => {
					if (params.percent) {
						return `
					<div class="chartdonut-tooltip">
						<div class="color" style="background-color: ${params.color}"></div>
						<div class="label">
							<div class="name">${params.data.name} - ${params.percent}%</div>
							<div class="value">${formatMoney(params.data.value)}</div>
						</div>
					</div>`;
					}
					return `${params.data.name}: ${params.data.value}`;
				},
			},
			legend: {
				orient: screenFormat === 'mobile' ? 'horizontal' : 'vertical',
				left: screenFormat === 'mobile' ? 'center' : 'right',
				top: screenFormat === 'mobile' ? 'top' : 'center',
				formatter: (name: any) => {
					const item = data?.find((x: any) => x.name === name);
					if (item) {
						return item.percentage
							? `${item.name} - ${item.percent}%`
							: `${item.name} - ${formatMoney(item.value)}`;
					}
				},
			},
			series: [
				{
					type: 'pie',
					radius: ['40%', '70%'],
					center: [
						screenFormat === 'mobile' ? '50%' : '30%',
						screenFormat === 'mobile' ? '60%' : '50%',
					],
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
	}, [data, screenFormat]);

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
