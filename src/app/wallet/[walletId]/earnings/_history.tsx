'use client';
import { ReactNode, useContext, useMemo } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { months } from '@/constants/options';
import { ThemeContext } from '@/context/themeContext';

export default function Evolution({ defaultData }: any): ReactNode {
	const { theme } = useContext(ThemeContext);
	const rows = useMemo(() => {
		const items = defaultData;
		const values = [];
		const keys = Object.keys(items);
		let sum: number = 0;
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const monthValues: any = {};
			sum = 0;
			for (let j = 0; j < months.length; j++) {
				const month = months[j];
				const value = Number(
					(items[key]?.months ? items[key]?.months[j]?.amount : 0) || 0,
				);
				monthValues[month] = value.toFixed(2);
				sum += value;
			}
			monthValues.total = Number(items[key]?.total || 0).toFixed(2);
			const average = Number(sum / months.length).toFixed(2);
			values.push({
				year: key,
				average,
				...monthValues,
			});
		}
		return values;
	}, [defaultData]);

	const highlightColumnStyle = useMemo(() => {
		return {
			backgroundColor: theme === 'dark' ? '#292929' : '#cbcbcb2b',
		};
	}, [theme]);

	return (
		<div className="earnings-card history">
			<div className="header card-content">
				<h4 style={{ lineHeight: '42px' }}>Histórico mensal</h4>
			</div>
			<DataTable
				value={rows || []}
				className="theme-datatable"
				emptyMessage="Nenhum registro."
			>
				<Column sortable field="year" header="Ano" body={(x: any) => x.year} />
				{months.map((month, key) => (
					<Column sortable field={month} header={month} key={key} />
				))}
				<Column header="Média" sortable field="average" />
				<Column
					header="Total"
					sortable
					field="total"
					style={highlightColumnStyle}
				/>
			</DataTable>
		</div>
	);
}
