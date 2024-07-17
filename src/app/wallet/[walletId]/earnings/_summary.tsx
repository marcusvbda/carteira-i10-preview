'use client';

import { useContext, useMemo, ReactNode, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { ProgressBar } from 'primereact/progressbar';
import Icon from '@/components/common/icon';
import Modal from '@/components/common/modal';
import DropdownMenu from '@/components/dropdownMenu';
import { ThemeContext } from '@/context/themeContext';
import { WalletContext } from '@/context/walletContext';
import { useFetch } from '@/hooks/fetch';
import { useHelpers } from '@/hooks/helpers';
import { CreateGoalBtn } from '../goals/_goalCreate';

export default function Summary({
	defaultData,
	totalMonths,
	detailsData,
}: any): ReactNode {
	const { walletId } = useContext(WalletContext);
	const [totalMonthsValue, setTotalMonthsValue] = useState(
		totalMonths?.total || 0,
	);
	const [monthsTotal, setMonthsTotal] = useState<any>(12);
	const { fetch: fetchTotalMonths } = useFetch({
		autoDispatch: false,
		defaultLoading: false,
		callback: (data: any) => {
			setTotalMonthsValue(data.total || 0);
		},
	});

	const { formatMoney } = useHelpers();
	const [createVisible, setCreateVisible] = useState(true);
	const { theme } = useContext(ThemeContext);

	const data = useMemo(() => {
		return (detailsData?.data || []).map((row: any) => ({
			name: row.name,
			value: Number(row.value),
		}));
	}, [detailsData]);

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

	const totalPercentage = useMemo(() => {
		return totalGoals ? Math.round((total / totalGoals) * 100) : 0;
	}, [totalGoals, total]);

	const fetchTotalMonthsHandler = (value: number | string) => {
		fetchTotalMonths({
			route: `/api/earnings/${walletId}/total-months/${value}`,
		});
	};

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
										<>/ Criar meta</>
									) : (
										<>{formatMoney(totalGoals)}</>
									)}
									<Icon icon="/images/theme/link-icon.svg" width="16px" />
								</a>
							}
						/>
					)}
					<span className="value percentage-value">{totalPercentage}%</span>
				</div>
				<ProgressBar value={totalPercentage}></ProgressBar>
			</div>
			<div className="body card-content border-b">
				<h5>
					Total{' '}
					{monthsTotal === 12
						? 'últimos 12 meses'
						: monthsTotal === 'year'
							? 'do ano'
							: 'último mês'}{' '}
					<DropdownMenu
						className="dropdown-menu-summary"
						source={
							<Icon
								icon="/images/theme/arrow-menu.svg"
								width="16px"
								height="6px"
							/>
						}
						items={[
							{
								label: 'Período',
								className: 'title',
							},
							{
								label: 'Total do mês',
								className: monthsTotal === 1 ? 'active' : '',
								action: () => {
									setMonthsTotal(1);
									fetchTotalMonthsHandler(1);
								},
							},
							{
								label: 'Total do ano',
								className: monthsTotal === 'year' ? 'active' : '',
								action: () => {
									setMonthsTotal('year');
									fetchTotalMonthsHandler('year');
								},
							},
							{
								label: 'Total últimos 12 meses',
								className: monthsTotal === 12 ? 'active' : '',
								action: () => {
									setMonthsTotal(12);
									fetchTotalMonthsHandler(12);
								},
							},
						]}
					/>
				</h5>
				<div className="value-row">
					<span className="value">{formatMoney(totalMonthsValue)}</span>
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
					<Modal
						size="50%"
						title="Ativos na Carteira"
						source={
							<a href="#" className="edit-link">
								Ver todos
							</a>
						}
						content={
							<ReactECharts
								option={options}
								theme={theme}
								style={{ height: 299, width: '100%' }}
							/>
						}
					/>
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
