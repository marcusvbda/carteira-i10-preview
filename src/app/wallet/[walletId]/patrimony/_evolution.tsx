'use client';
import { useContext, useMemo, useState, ReactNode, CSSProperties } from 'react';
import ReactECharts from 'echarts-for-react';
import Select2 from 'react-select2-wrapper';
import DefaultCard from '@/components/cards/default';
import { ThemeContext } from '@/context/themeContext';
import 'react-select2-wrapper/css/select2.css';
const Header = (): ReactNode => {
	const [selectedOption, setSelectedOption] = useState<any>(null);
	const [selectedPeriod, setSelectedPeriod] = useState<any>(null);
	const [optionList] = useState<any[]>([]);
	const [periodList] = useState<any[]>([]);

	return (
		<div className="header-title">
			<h4>Evolução do patrimônio</h4>
			<div
				className="action-btns"
				style={
					{
						gridTemplateColumns: '2fr 1fr 1fr',
					} as CSSProperties
				}
			>
				<Select2
					style={{ width: 200 }}
					value={selectedOption}
					onSelect={setSelectedOption}
					data={optionList}
					options={{
						placeholder: '2 anos',
					}}
				/>
				<Select2
					style={{ width: 200 }}
					value={selectedPeriod}
					onSelect={setSelectedPeriod}
					options={{
						placeholder: 'Todos os tipos',
					}}
					data={periodList}
				/>
			</div>
		</div>
	);
};

export default function Evolution(): ReactNode {
	const { theme } = useContext(ThemeContext);

	const options = useMemo(() => {
		const options = {
			backgroundColor: 'transparent',
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#ccc',
						borderColor: '#aaa',
						borderWidth: 1,
						shadowBlur: 0,
						shadowOffsetX: 0,
						shadowOffsetY: 0,
					},
				},
			},
			xAxis: {
				data: [
					'05/23',
					'06/23',
					'07/23',
					'08/23',
					'09/23',
					'10/23',
					'11/23',
					'12/23',
					'01/24',
					'02/24',
					'03/24',
					'04/24',
					'05/24',
				],
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{
					color: '#2cb875',
					data: [
						579.21, 579.21, 702.74, 702.74, 702.74, 702.74, 702.74, 702.74,
						702.74, 769.87, 769.87, 4682.13, 323, 1234,
					],
					name: 'Valor aplicado',
					stack: 'Ad',
					type: 'bar',
				},
				{
					color: '#96e9c1',
					data: [
						-96.06, 94.64, -67.28, -51.22, -41.21, -52.58, -52.58, -52.58,
						-52.58, -52.2, -52.2, -386.84, -222, -2232,
					],
					name: 'Ganho de capital',
					stack: 'Ad',
					type: 'bar',
				},
			],
			legend: {},
			grid: {
				left: '0%',
				right: '0%',
				bottom: '0%',
				containLabel: true,
			},
		};
		return options;
	}, []);

	return (
		<DefaultCard title={<Header />}>
			<div className="card-content bottom">
				<ReactECharts
					option={options}
					theme={theme}
					style={{ height: 409, width: '100%' }}
				/>
			</div>
		</DefaultCard>
	);
}
