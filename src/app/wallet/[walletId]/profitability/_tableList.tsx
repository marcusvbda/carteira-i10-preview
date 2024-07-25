import { useMemo } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import DefaultCard from '@/components/cards/default';
import { months } from '@/constants/options';

export default function TableList({ tableData, theme }: any) {
	const rows = useMemo(() => {
		const items = tableData;
		const years = Object.keys(items);
		const values = [];
		for (let i = 0; i < years.length; i++) {
			const fullYear = years[i];
			const rowsItems = items[years[i]];
			const yearly = parseFloat(
				parseFloat(tableData[years[i]].yearly).toFixed(2),
			);
			const accumulated_data = parseFloat(
				parseFloat(tableData[years[i]].accumulated_data).toFixed(2),
			);
			const monthValues: any = {};
			for (let j = 0; j < months.length; j++) {
				const monthNumber = j + 1 < 10 ? `0${j + 1}` : `${j + 1}`;
				const month = months[j];
				const year = fullYear.slice(-2);
				const value = rowsItems[`${monthNumber}/${year}`];
				monthValues[month] = value
					? parseFloat(parseFloat(value).toFixed(2))
					: null;
			}
			values.push({
				year: fullYear,
				accumulated_data,
				yearly,
				monthValues,
			});
		}
		return values;
	}, [tableData]);

	const highlightColumnStyle = useMemo(() => {
		return {
			backgroundColor: theme === 'dark' ? '#292929' : '#cbcbcb2b',
		};
	}, [theme]);
	return (
		<DefaultCard className="table">
			<div className="header card-content">
				<h4 style={{ lineHeight: '42px' }}>Rentabilidade</h4>
			</div>
			<DataTable
				value={rows || []}
				className="theme-datatable"
				emptyMessage="Nenhum registro."
			>
				<Column
					sortable
					field="year"
					header="Ano"
					body={(x: any) => <strong>{x.year}</strong>}
				/>
				{months.map((month, key) => (
					<Column
						sortable
						field={`monthValues.${month}`}
						header={month}
						key={key}
						body={(x: any) => {
							const val = x.monthValues[month];
							if (val === null) return '-';
							const className = val >= 0 ? 'value-positive' : 'value-negative';
							return <span className={className}>{val}%</span>;
						}}
					/>
				))}
				<Column
					header="Ano"
					sortable
					field="yearly"
					style={highlightColumnStyle}
					body={(x: any) => `${x.yearly}%`}
				/>
				<Column
					header="Acumulado"
					sortable
					field="accumulated_data"
					style={highlightColumnStyle}
					body={(x: any) => `${x.accumulated_data}%`}
				/>
			</DataTable>
		</DefaultCard>
	);
}
