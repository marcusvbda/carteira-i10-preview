/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import { useMemo, ReactNode } from 'react';
import { DataTable } from 'primereact/datatable';
import 'react-select2-wrapper/css/select2.css';
// eslint-disable-next-line import/order
import { Column } from 'primereact/column';
import InvestmentType from '@/components/common/investimentType';

export default function Details({ defaultData }: any): ReactNode {
	const rows = useMemo(() => {
		const values = defaultData?.data || [];
		return values;
	}, [defaultData]);

	return (
		<div className="earnings-card history">
			<div className="header card-content">
				<h4 style={{ lineHeight: '42px' }}>Detalhes</h4>
			</div>
			<DataTable
				value={rows as any}
				className="theme-datatable"
				emptyMessage="Nenhum registro."
			>
				<Column
					header="Ativo"
					sortable
					field="ticker_name"
					body={(x: any) => {
						return (
							<div className="datatable-cell-row">
								<div className="ticker_link">
									<div dangerouslySetInnerHTML={{ __html: x.ticker }} />
								</div>
							</div>
						);
					}}
				/>
				<Column
					header="Tipo de ativo"
					body={(x: any) => (
						<div className="datatable-cell-row">
							<InvestmentType content={x.category} />
						</div>
					)}
				/>
				<Column header="Tipo de pagamento" sortable field="type" />
				<Column
					header="Data com"
					field="date_with"
					sortable
					body={(x: any) => (
						<div dangerouslySetInnerHTML={{ __html: x.date_with }} />
					)}
				/>
				<Column header="Data pagamento" field="date_payment" sortable />
				<Column header="Quantidade" field="qty" sortable />
				<Column header="Valor do dividendo" field="qty" sortable />
				<Column
					header="Valor total"
					sortable
					field="value"
					body={(x: any) => x.total}
				/>
				<Column
					header="Total liquido"
					sortable
					field="total"
					body={(x: any) => x.total}
				/>
			</DataTable>
		</div>
	);
}
