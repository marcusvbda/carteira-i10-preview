'use client';
import { ReactNode, useMemo, useState } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import DefaultCard from '@/components/cards/default';
import Icon from '@/components/common/icon';
import RadioTab from '@/components/radioTab/radioTab';

const CardTitle = ({
	selectedOption,
	setSelectedOption,
	options,
}: any): ReactNode => {
	return (
		<div className="header-title">
			<RadioTab
				options={options}
				value={selectedOption}
				onChange={setSelectedOption}
			/>
		</div>
	);
};
export default function Tables(): ReactNode {
	const options = useMemo(
		() => [
			'Bens e Direitos',
			'Ganho de capital ( FIIs)',
			'Renda variável tributada',
			'Meu DARF',
		],
		[],
	);
	const [selectedOption, setSelectedOption] = useState(0);
	const currentOption = useMemo(
		() => options[selectedOption],
		[selectedOption, options],
	);

	const rowsTable1 = useMemo(() => {
		return [
			{
				group: 'Petrobrás',
				cnpj: '33.000.167/0001-01',
				qty: 200,
				code: 'PETR4',
				_2023: '-',
				_2024: 'R$ 21.345,00',
			},
			{
				group: 'Klabin',
				cnpj: '33.000.167/0001-01',
				qty: 325,
				code: 'KLBN3',
				_2023: 'R$ 13.767,20',
				_2024: 'R$ 4.140,00',
			},
			{
				group: 'CPFL ENERGIA',
				cnpj: '33.000.167/0001-01',
				qty: 470,
				code: 'CPFE3',
				_2023: '-',
				_2024: 'R$ 13.767,20',
			},
			{
				group: 'CEMIG',
				cnpj: '33.000.167/0001-01',
				qty: 245,
				code: 'CMIG3',
				_2023: 'R$ 4.140,00',
				_2024: 'R$ 36.090,00',
			},
		];
	}, []);

	const rowsTable2 = useMemo(() => {
		return [
			{
				group: 'Tesouro IPCA+ 2024',
				cnpj: '-',
				qty: '100,00',
				code: 'TESOURO IPCA+ 2024',
				_2023: <Icon icon="/images/theme/alert.svg" width="16px" />,
				_2024: <Icon icon="/images/theme/alert.svg" width="16px" />,
			},
			{
				group: 'RDB - Banco do Brasil - Pós-fixado - 33.33% CDI',
				cnpj: '-',
				qty: '1,00',
				code: 'RDB',
				_2023: <Icon icon="/images/theme/alert.svg" width="16px" />,
				_2024: <Icon icon="/images/theme/alert.svg" width="16px" />,
			},
			{
				group: 'LF - Banco do Brasil - Pós-fixado - 222.34% CDI',
				cnpj: '-',
				qty: '1,00',
				code: 'LF',
				_2023: <Icon icon="/images/theme/alert.svg" width="16px" />,
				_2024: <Icon icon="/images/theme/alert.svg" width="16px" />,
			},
			{
				group: 'CDB - Banco do Brasil - Pré-fixado - 10.00%',
				cnpj: '-',
				qty: '1,00',
				code: 'CDB',
				_2023: <Icon icon="/images/theme/alert.svg" width="16px" />,
				_2024: <Icon icon="/images/theme/alert.svg" width="16px" />,
			},
		];
	}, []);

	const rowsTable3 = useMemo(() => {
		return [
			{
				group: 'LCI - Banco do Brasil - Pós-fixado - IPCA + 4.00%',
				cnpj: '-',
				qty: '100,00',
				code: 'LCI',
				_2023: <Icon icon="/images/theme/alert.svg" width="16px" />,
				_2024: <Icon icon="/images/theme/alert.svg" width="16px" />,
			},
			{
				group: 'LCA - Banco do Brasil - Pós-fixado - 11.99% CDI',
				cnpj: '-',
				qty: '1,00',
				code: 'LCA',
				_2023: <Icon icon="/images/theme/alert.svg" width="16px" />,
				_2024: <Icon icon="/images/theme/alert.svg" width="16px" />,
			},
		];
	}, []);

	return (
		<DefaultCard
			className="irpf-card"
			title={
				<CardTitle
					selectedOption={selectedOption}
					setSelectedOption={setSelectedOption}
					options={options}
				/>
			}
		>
			<h4 className="card-title">{currentOption}</h4>
			<DataTable
				value={rowsTable1 as any}
				className="theme-datatable"
				emptyMessage="Nenhum registro."
				paginatorTemplate="PrevPageLink PageLinks NextPageLink"
			>
				<Column
					header={
						<div className="datatable-header-group">
							<strong>Grupo 03 - Participações Societárias</strong>
							<small>Código 01 - Ações</small>
						</div>
					}
					body={(x) => x.group}
				/>
				<Column header="CNPJ" body={(x) => x.group} />
				<Column header="Código" body={(x) => x.code} />
				<Column header="Quantidade" body={(x) => x.qty} />
				<Column header="2023" body={(x) => x._2023} />
				<Column header="2024" body={(x) => x._2024} />
			</DataTable>

			<DataTable
				value={rowsTable2 as any}
				className="theme-datatable"
				emptyMessage="Nenhum registro."
				paginatorTemplate="PrevPageLink PageLinks NextPageLink"
			>
				<Column
					header={
						<div className="datatable-header-group">
							<strong>Grupo 04 - Aplicações e Investimentos </strong>
							<small>
								Código 02 - Títulos públicos e privadas sujeitos à tributação
								(Tesouro Direto, CDB, RDB e outros)
							</small>
						</div>
					}
					body={(x) => x.group}
				/>
				<Column header="CNPJ" body={(x) => x.cnpj} />
				<Column header="Código" body={(x) => x.code} />
				<Column header="Quantidade" body={(x) => x.qty} />
				<Column header="2023" body={(x) => x._2023} />
				<Column header="2024" body={(x) => x._2024} />
			</DataTable>

			<DataTable
				value={rowsTable3 as any}
				className="theme-datatable"
				emptyMessage="Nenhum registro."
				paginatorTemplate="PrevPageLink PageLinks NextPageLink"
			>
				<Column
					header={
						<div className="datatable-header-group">
							<strong>Grupo 04 </strong>
							<small>Código 03 - Títulos isentos de tributação</small>
						</div>
					}
					body={(x) => x.group}
				/>
				<Column header="CNPJ" body={(x) => x.cnpj} />
				<Column header="Código" body={(x) => x.code} />
				<Column header="Quantidade" body={(x) => x.qty} />
				<Column header="2023" body={(x) => x._2023} />
				<Column header="2024" body={(x) => x._2024} />
			</DataTable>

			<DataTable
				value={rowsTable2 as any}
				className="theme-datatable"
				emptyMessage="Nenhum registro."
				paginatorTemplate="PrevPageLink PageLinks NextPageLink"
			>
				<Column
					header={
						<div className="datatable-header-group">
							<strong>Grupo 08 - Criptoativos </strong>
						</div>
					}
					body={(x) => x.group}
				/>
				<Column header="CNPJ" body={(x) => x.cnpj} />
				<Column header="Código" body={(x) => x.code} />
				<Column header="Quantidade" body={(x) => x.qty} />
				<Column header="2023" body={(x) => x._2023} />
				<Column header="2024" body={(x) => x._2024} />
			</DataTable>
			<DataTable
				value={rowsTable2 as any}
				className="theme-datatable"
				emptyMessage="Nenhum registro."
				paginatorTemplate="PrevPageLink PageLinks NextPageLink"
			>
				<Column
					header={
						<div className="datatable-header-group">
							<strong>Grupo 99 - Outros bens e direitos </strong>
							<small>Código 07 - JSCP creditado, mas não pago</small>
						</div>
					}
					body={(x) => x.group}
				/>
				<Column header="CNPJ" body={(x) => x.cnpj} />
				<Column header="Código" body={(x) => x.code} />
				<Column header="Quantidade" body={(x) => x.qty} />
				<Column header="2023" body={(x) => x._2023} />
				<Column header="2024" body={(x) => x._2024} />
			</DataTable>

			<h4 className="subtitle">Rendimentos isentos e não tributáveis</h4>
			<DataTable
				value={rowsTable2 as any}
				className="theme-datatable"
				emptyMessage="Nenhum registro."
				paginatorTemplate="PrevPageLink PageLinks NextPageLink"
			>
				<Column
					header={
						<div className="datatable-header-group">
							<strong>Código 09 - Lucros e dividendos recebidos </strong>
						</div>
					}
					body={(x) => x.group}
				/>
				<Column header="CNPJ" body={(x) => x.cnpj} />
				<Column header="Código" body={(x) => x.code} />
				<Column header="Quantidade" body={(x) => x.qty} />
				<Column header="2023" body={(x) => x._2023} />
				<Column header="2024" body={(x) => x._2024} />
			</DataTable>
			<DataTable
				value={rowsTable2 as any}
				className="theme-datatable"
				emptyMessage="Nenhum registro."
				paginatorTemplate="PrevPageLink PageLinks NextPageLink"
			>
				<Column
					header={
						<div className="datatable-header-group">
							<strong>Código 09 - Lucros e dividendos recebidos </strong>
						</div>
					}
					body={(x) => x.group}
				/>
				<Column header="CNPJ" body={(x) => x.cnpj} />
				<Column header="Código" body={(x) => x.code} />
				<Column header="Quantidade" body={(x) => x.qty} />
				<Column header="2023" body={(x) => x._2023} />
				<Column header="2024" body={(x) => x._2024} />
			</DataTable>

			<h4 className="subtitle">Rendimentos sujeitos à tributação exclusiva</h4>
			<DataTable
				value={rowsTable2 as any}
				className="theme-datatable"
				emptyMessage="Nenhum registro."
				paginatorTemplate="PrevPageLink PageLinks NextPageLink"
			>
				<Column
					header={
						<div className="datatable-header-group">
							<strong>Código 10 - Juros sobre capital próprio</strong>
						</div>
					}
					body={(x) => x.group}
				/>
				<Column header="CNPJ" body={(x) => x.cnpj} />
				<Column header="Código" body={(x) => x.code} />
				<Column header="Quantidade" body={(x) => x.qty} />
				<Column header="2023" body={(x) => x._2023} />
				<Column header="2024" body={(x) => x._2024} />
			</DataTable>
		</DefaultCard>
	);
}
