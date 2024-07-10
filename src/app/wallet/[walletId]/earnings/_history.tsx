'use client';
import { ReactNode, useMemo } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import 'react-select2-wrapper/css/select2.css';

const months = [
	'Jan',
	'Fev',
	'Mar',
	'Abr',
	'Mai',
	'Jun',
	'Jul',
	'Ago',
	'Set',
	'Out',
	'Nov',
	'Dez',
];

export default function Evolution({ defaultData }: any): ReactNode {
	const rows = useMemo(() => {
		const items = defaultData;
		if (!items || !items.length) return [];
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
			return values;
		}
	}, [defaultData]);

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
					style={{ backgroundColor: '#cbcbcb2b' }}
				/>
			</DataTable>
		</div>
	);
}
