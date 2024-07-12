'use client';

import { useContext, useMemo, ReactNode, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { ProgressBar } from 'primereact/progressbar';
import Icon from '@/components/common/icon';
import { ThemeContext } from '@/context/themeContext';
import { useHelpers } from '@/hooks/helpers';
import { CreateGoalBtn } from '../goals/_goalCreate';

export default function Summary({ defaultData }: any): ReactNode {
	const { formatMoney } = useHelpers();
	const [createVisible, setCreateVisible] = useState(true);
	const { theme } = useContext(ThemeContext);

	const data = useMemo(() => {
		return [
			{ value: 36, name: 'ETFs' },
			{ value: 24, name: 'LCI' },
			{ value: 11, name: 'Criptomoedas' },
			{ value: 15, name: 'ETFs Internacional' },
			{ value: 15, name: 'CDB' },
		];
	}, []);

	const options = useMemo(() => {
		return {
			backgroundColor: 'transparent',
			tooltip: {
				trigger: 'item',
				formatter: (params: any) => {
					const item = data?.find((x: any) => x.name === params.name);
					return item && `${params.name}: ${item.value}`;
				},
			},
			legend: {
				orient: 'vertical',
				left: 'right',
				top: 'center',
				formatter: (name: any) => {
					const item = data?.find((x: any) => x.name === name);
					return item && `${name}: ${item.value}%`;
				},
			},
			series: [
				{
					type: 'pie',
					radius: ['40%', '80%'],
					center: ['18%', '50%'],
					label: {
						show: false,
						position: 'center',
					},
					avoidLabelOverlap: false,
					data,
				},
			],
		};
	}, [data]);

	const onSaved = () => {
		setCreateVisible(false);
		window.location.reload();
	};

	const totalGoals = useMemo(() => {
		return defaultData?.greatest_goal?.target_equity || 0;
	}, [defaultData]);

	const total = useMemo(() => {
		return defaultData?.total || 0;
	}, [defaultData]);

	const totalLastYear = useMemo(() => {
		return defaultData?.total_last_year || 0;
	}, [defaultData]);

	const totalPercentage = useMemo(() => {
		return totalGoals ? Math.round((total / totalGoals) * 100) : 0;
	}, [totalGoals, total]);

	return (
		<div className="earnings-card summary">
			<div className="header card-content">Resumo</div>
			<div className="body card-content border-b">
				<h5>Média mensal</h5>
				<div className="value-row">
					<span className="value">{formatMoney(total)}</span>
					{createVisible && (
						<CreateGoalBtn
							onSaved={onSaved}
							defaultType="proven"
							source={
								<a href="#" className="percentage">
									{totalGoals <= 0 ? (
										<>
											/ Criar meta
											<Icon icon="/images/theme/link-icon.svg" width="16px" />
										</>
									) : (
										<>{formatMoney(totalGoals)}</>
									)}
								</a>
							}
						/>
					)}
					<span className="value percentage-value">{totalPercentage}%</span>
				</div>
				<ProgressBar value={totalPercentage}></ProgressBar>
			</div>
			<div className="body card-content border-b">
				<h5>Total últimos 12 meses</h5>
				<div className="value-row">
					<span className="value">{formatMoney(totalLastYear)}</span>
				</div>
			</div>
			<div className="body card-content border-b">
				<h5>Total da carteira</h5>
				<div className="value-row">
					<span className="value">{formatMoney(total)}</span>
				</div>
			</div>
			<div className="body card-content">
				<h5>
					Distribuição de ativos 12 meses{' '}
					<a href="#" className="edit-link">
						Ver todos
					</a>
				</h5>
				<div className="value-row bottom">
					<ReactECharts
						option={options}
						theme={theme}
						style={{ height: 130, width: '100%' }}
					/>
				</div>
			</div>
		</div>
	);
}
