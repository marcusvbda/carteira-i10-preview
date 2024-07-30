'use client';
import {
	CSSProperties,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import ReactECharts from 'echarts-for-react';
import DefaultCard from '@/components/cards/default';
import Icon from '@/components/common/icon';
import Skeleton from '@/components/common/skeleton';
import InputSwitch from '@/components/inputSwitch/inputSwitch';
import RadioTab from '@/components/radioTab/radioTab';
import { ThemeContext } from '@/context/themeContext';
import { WalletContext } from '@/context/walletContext';
import { useFetch } from '@/hooks/fetch';

const CardTitle = ({
	title,
	setShowIdeal,
	showIdeal,
	selectedOption,
	setSelectedOption,
	options,
}: any): ReactNode => {
	return (
		<div className="header-title">
			<h4 dangerouslySetInnerHTML={{ __html: title }} />
			<RadioTab
				options={options}
				value={selectedOption}
				onChange={setSelectedOption}
			/>
			<div>
				<div className="switch-position">
					Exibir posição ideal
					<Icon icon={'/images/theme/question.svg'} width="20px" />
					<InputSwitch value={showIdeal} onChange={setShowIdeal} />
				</div>
			</div>
		</div>
	);
};

const CompleteChart = ({ theme, option, showIdeal }: any) => {
	const [modelOptions, setModelOptions] = useState([]);
	const chartRef = useRef(null);
	useEffect(() => {
		if (chartRef.current) {
			const model = (chartRef.current as any).getEchartsInstance().getModel();
			console.log(model.option);
			const colors = model.option.color;
			setModelOptions(
				(model.option.series[0]?.data || []).map((x: any, key: number) => {
					return {
						...x,
						color: colors[key],
					};
				}),
			);
		}
	}, [chartRef]);

	return (
		<div className="complete-chart-content">
			<ReactECharts
				ref={chartRef}
				theme={theme}
				option={option}
				style={{ height: showIdeal ? 300 : 450, width: '100%' }}
			/>
			<div className="chart-legend">
				{modelOptions.map((x: any, key: number) => {
					return (
						<div key={key} className="legend-row">
							<div className="value">
								{x.percent
									? `${parseFloat(x.percent.toFixed(2))}%`
									: `${parseFloat(x.value.toFixed(2))}`}
							</div>
							<div
								className="name"
								style={{ '--legend-color': x.color } as CSSProperties}
							>
								{x.name}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const ActiveCard = ({
	title,
	type,
	setSelectedOption,
	selectedOption,
	options,
}: any): ReactNode => {
	const { walletId } = useContext(WalletContext);
	const { theme } = useContext(ThemeContext);
	const [showIdeal, setShowIdeal] = useState(true);

	const {
		data,
		loading,
		fetch: fetchData,
	} = useFetch({
		autoDispatch: false,
	});

	useEffect(() => {
		fetchData({ route: `/api/patrimony/${walletId}/consolidation/${type}` });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type]);

	const calculateOptions = (values: any) => {
		values = !Array.isArray(values) ? [] : values;
		return {
			backgroundColor: 'transparent',
			tooltip: {
				trigger: 'item',
			},
			series: [
				{
					type: 'pie',
					radius: ['50%', '70%'],
					center: ['40%', '50%'],
					avoidLabelOverlap: false,
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)',
						},
					},
					data: values.map((item: any) => {
						return {
							...item,
							value: parseFloat(item.value.toFixed(2)),
						};
					}),
					label: {
						show: !showIdeal,
					},
				},
			],
		};
	};

	const option = useMemo(() => {
		return calculateOptions(data?.values || []);
	}, [data]);

	const optionIdeal = useMemo(() => {
		return calculateOptions(data?.ideal || []);
	}, [data]);

	return (
		<DefaultCard
			className="active-card"
			modalContentStyles={{ minHeight: 512 }}
			title={
				<CardTitle
					title={title}
					showIdeal={showIdeal}
					setShowIdeal={setShowIdeal}
					setSelectedOption={setSelectedOption}
					selectedOption={selectedOption}
					options={options}
				/>
			}
		>
			<div style={{ height: 450, padding: '50px 0' }}>
				{loading || !data ? (
					<Skeleton width="100%" height="100%" />
				) : (
					<div className={`charts-row ${showIdeal && 'ideal'}`}>
						<CompleteChart
							theme={theme}
							option={option}
							style={{ height: showIdeal ? 300 : 450, width: '100%' }}
						/>
						{showIdeal && (
							<CompleteChart
								theme={theme}
								option={optionIdeal}
								style={{ height: 300, width: '100%' }}
							/>
						)}
					</div>
				)}
			</div>
		</DefaultCard>
	);
};

const TickersRow = ({ row }: any) => {
	const [selectedOption, setSelectedOption] = useState(0);

	const makeIndex = (index: any = null) => {
		const typeFetch = (row.type || '').toLowerCase();
		if (typeFetch === 'ticker') {
			return index ? `${index},ideal-${index}` : `${typeFetch},ideal`;
		}
		return index
			? `${typeFetch}-${index},${index}-ideal-${typeFetch}`
			: `${typeFetch},${typeFetch}-ideal`;
	};

	const type = useMemo(() => {
		const options = [
			makeIndex(),
			makeIndex('per-sector'),
			makeIndex('per-segment'),
		];
		return options[selectedOption];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOption]);

	return (
		<ActiveCard
			title={row.class}
			type={type}
			selectedOption={selectedOption}
			setSelectedOption={setSelectedOption}
			options={
				row.type === 'Ticker'
					? ['Consolidado', 'Por setor', 'Por segmento']
					: []
			}
		/>
	);
};

export default function ConsolidationChats({ infoData }: any): ReactNode {
	const [selectedOption, setSelectedOption] = useState(0);
	const type = useMemo(() => {
		const options = [
			'all,ideal-per-type',
			'tickers,ideal',
			'exterior,exterior-ideal',
		];
		return options[selectedOption];
	}, [selectedOption]);

	return (
		<>
			<div className="consolidation-chats">
				<h4 className="principal-title ">Consolidação do patrimônio</h4>
				<ActiveCard
					title="Tipo de ativos"
					type={type}
					selectedOption={selectedOption}
					setSelectedOption={setSelectedOption}
					options={['Tipo de ativos', 'Ativos', 'Exposição ao exterior']}
				/>
				{(infoData.tickers || []).map((x: any, key: number) => (
					<TickersRow key={key} row={x} />
				))}
			</div>
		</>
	);
}
