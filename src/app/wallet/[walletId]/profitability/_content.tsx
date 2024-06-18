'use client';
import { ReactNode, useContext, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import Select2 from 'react-select2-wrapper';
import DefaultCard from '@/components/cards/default';
import Trend from '@/components/common/trend';
import { ThemeContext } from '@/context/themeContext';
import 'react-select2-wrapper/css/select2.css';
export default function PageContent(): ReactNode {
	const { theme } = useContext(ThemeContext);
	const [selectedOption, setSelectedOption] = useState<any>(1);

	const rows = useMemo(() => {
		return Array.from({ length: 2024 - 2022 + 1 }, (v, i) => 2010 + i);
	}, []);

	const charLineOps = useMemo(
		() => ({
			backgroundColor: 'transparent',
			tooltip: {
				trigger: 'axis',
			},
			legend: {
				data: ['Rentabilidade', 'CDI', 'IBOV', 'SMLL', 'SPX', 'IDIV', 'IVVB11'],
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
					name: 'Rentabilidade',
					type: 'line',
					stack: 'Total',
					data: [0, 10, 10, 6, 8, 1, 2, 5, 5, 7, 5, 3, 1],
				},
				{
					name: 'CDI',
					type: 'line',
					stack: 'Total',
					data: [8, 0, 0, 9, 4, 2, 5, 8, 4, -1, 2, -1, 1],
				},
				{
					name: 'IBOV',
					type: 'line',
					stack: 'Total',
					data: [3, 0, -2, 3, 10, 1, 3, 6, 2, 6, -1, 3, 1],
				},
				{
					name: 'SMLL',
					type: 'line',
					stack: 'Total',
					data: [5, 5, 2, 1, -2, -1, 2, 0, 8, 6, 5, 3, 1],
				},
				{
					name: 'SPX',
					type: 'line',
					stack: 'Total',
					data: [8, 6, 10, 1, 5, 10, 1, 4, 0, 8, 4, 3, 1],
				},
				{
					name: 'IDIV',
					type: 'line',
					stack: 'Total',
					data: [10, 1, 9, 5, , 0, 8, 9, -2, 1, -1, 2, 1],
				},
				{
					name: 'IVVB11',
					type: 'line',
					stack: 'Total',
					data: [1, 1, 9, 0, 8, 9, 1, 10, 9, 5, 9, -1, 1],
				},
			],
		}),
		[],
	);

	return (
		<div id="profitabily" className="page-container">
			<DefaultCard className="metric-card box-profitabily">
				<h4>Total</h4>
				<div>
					<small>Rentabilidade</small>
				</div>
				<Trend type="positive" size="20px" value={`${22.13}%`} transparent />
				<div>
					<small>22% acima do CDI</small>
				</div>
			</DefaultCard>
			<DefaultCard className="metric-card box-last12">
				<h4>Últimos 12 meses</h4>
				<div>
					<small>Rentabilidade</small>
				</div>
				<Trend type="positive" size="20px" value={`${8.97}%`} transparent />
				<div>
					<small>22% acima do CDI</small>
				</div>
			</DefaultCard>
			<DefaultCard className="metric-card box-last4">
				<h4>Últimas 4 semanas</h4>
				<div>
					<small>Rentabilidade</small>
				</div>
				<Trend type="negative" size="20px" value={`${-2.23}%`} transparent />
				<div>
					<small>12% abaixo do CDI</small>
				</div>
			</DefaultCard>
			<DefaultCard className="box-chart-line">
				<div className="header card-content">
					<h4>Rentabilidade comparada com índices</h4>
					<div className="actions">
						<Select2
							style={{ width: 200 }}
							value={selectedOption}
							onSelect={setSelectedOption}
							data={[]}
							options={{
								placeholder: '12 meses',
							}}
						/>
						<Select2
							style={{ width: 200 }}
							value={selectedOption}
							onSelect={setSelectedOption}
							data={[]}
							options={{
								placeholder: 'Todos os tipos',
							}}
						/>
					</div>
				</div>
				<div className="content">
					<ReactECharts
						option={charLineOps}
						theme={theme}
						style={{ height: 409, width: '100%' }}
					/>
				</div>
			</DefaultCard>
			<DefaultCard className="table">
				<div className="header card-content">
					<h4>Rentabilidade</h4>
					<div className="actions">
						<Select2
							style={{ width: 200 }}
							value={selectedOption}
							onSelect={setSelectedOption}
							data={[]}
							options={{
								placeholder: 'Todos os tipos de ativos',
							}}
						/>
					</div>
				</div>
				<DataTable
					value={rows as any}
					className="theme-datatable"
					emptyMessage="Nenhum registro."
					paginator
					rows={10}
					paginatorTemplate="PrevPageLink PageLinks NextPageLink"
				>
					<Column header="Ano" body={(x) => x} />
					<Column header="Jan" className="neutral" body={(x) => `${x}%`} />
					<Column header="Fev" className="danger" body={(x) => `${x}%`} />
					<Column header="Mar" className="success" body={(x) => `${x}%`} />
					<Column header="Abr" className="neutral" body={(x) => `${x}%`} />
					<Column header="Mai" className="success" body={(x) => `${x}%`} />
					<Column header="Jun" className="danger" body={(x) => `${x}%`} />
					<Column header="Jul" className="success" body={(x) => `${x}%`} />
					<Column header="Ago" className="neutral" body={(x) => `${x}%`} />
					<Column header="Set" className="danger" body={(x) => `${x}%`} />
					<Column header="Out" className="success" body={(x) => `${x}%`} />
					<Column header="Nov" className="neutral" body={(x) => `${x}%`} />
					<Column header="Dez" className="danger" body={(x) => `${x}%`} />
					<Column
						header="Acumulado"
						body={(x) => x}
						style={{ backgroundColor: '#cbcbcb2b' }}
					/>
				</DataTable>
			</DefaultCard>
		</div>
	);
}
