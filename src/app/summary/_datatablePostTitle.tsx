'use client';

import { useMemo, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import DonutChart from '@/components/charts/donutChart';
import Icon from '@/components/common/icon';
import If from '@/components/common/if';
import Modal from '@/components/common/modal';
import ModalEntries from '@/components/modalEntries';
import { seo } from '@/constants/seo';
import { useHelpers } from '@/hooks/helpers';

interface IProps {
	rows: any[];
	columns: any[];
	setColumns: any;
	tickerType: string;
	defaultColumns: string[];
}

const ColumnSwitch = ({ column, onClick }: any) => {
	const handleClick = () => {
		if (column.locked) return;
		onClick(column);
	};

	return (
		<label
			className={`column-switch ${column.visible && 'active'} ${
				column.locked && 'locked'
			}`}
			onClick={handleClick}
		>
			{column.title}
			<If condition={column.visible}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M14.3535 4.85375L6.35354 12.8538C6.3071 12.9002 6.25196 12.9371 6.19126 12.9623C6.13056 12.9874 6.0655 13.0004 5.99979 13.0004C5.93408 13.0004 5.86902 12.9874 5.80832 12.9623C5.74762 12.9371 5.69248 12.9002 5.64604 12.8538L2.14604 9.35375C2.05222 9.25993 1.99951 9.13268 1.99951 9C1.99951 8.86732 2.05222 8.74007 2.14604 8.64625C2.23986 8.55243 2.36711 8.49972 2.49979 8.49972C2.63247 8.49972 2.75972 8.55243 2.85354 8.64625L5.99979 11.7931L13.646 4.14625C13.7399 4.05243 13.8671 3.99972 13.9998 3.99972C14.1325 3.99972 14.2597 4.05243 14.3535 4.14625C14.4474 4.24007 14.5001 4.36732 14.5001 4.5C14.5001 4.63268 14.4474 4.75993 14.3535 4.85375Z"
						fill="white"
					/>
				</svg>
			</If>
		</label>
	);
};

const EditColumns = ({ columns, setColumns, defaultColumns }: any) => {
	const [modalVisible, setModalVisible] = useState(false);

	const closeModal = () => {
		setModalVisible(false);
	};

	const [columnsGrouped, setColumnsGrouped] = useState(
		(columns || []).reduce((acc: any, column: any) => {
			if (!acc[column.group]) {
				acc[column.group] = [];
			}
			acc[column.group].push(column);
			return acc;
		}, {}),
	);

	const clicked = (group: string, column: any) => {
		const newColumns = columnsGrouped[group].map((c: any) => {
			if (c.field === column.field) {
				c.visible = !c.visible;
			}
			return c;
		});
		setColumnsGrouped({
			...columnsGrouped,
			[group]: newColumns,
		});
	};

	const saveColumnsChange = () => {
		const unGroupedColumns = Object.keys(columnsGrouped).reduce(
			(acc: any, group: any) => {
				return acc.concat(columnsGrouped[group]);
			},
			[],
		);
		setColumns && setColumns(unGroupedColumns as any);
		closeModal();
	};

	const reset = (e: any) => {
		e.preventDefault();
		const unGroupedColumns = Object.keys(columnsGrouped).reduce(
			(acc: any, group: any) => {
				return acc.concat(columnsGrouped[group]);
			},
			[],
		);

		unGroupedColumns.forEach((column: any) => {
			column.visible = defaultColumns.includes(column.field);
		});

		setColumns && setColumns(unGroupedColumns as any);
		closeModal();
	};

	return (
		<Modal
			size="50%"
			tabletSize="80%"
			mobileSize="90%"
			title="Editar colunas"
			type="side right"
			setModalVisible={setModalVisible}
			modalVisible={modalVisible}
			source={
				<button className="btn small transparent">
					<Icon icon="/images/theme/table-columns.svg" width="16px" />
					<label> Editar colunas</label>
				</button>
			}
			content={
				<>
					<div className="fields-edit-list">
						{Object.keys(columnsGrouped).map((group, index) => (
							<div key={index} style={{ marginBottom: 50 }}>
								<h6>{group}</h6>
								<div className="input-list">
									{columnsGrouped[group].map((column: any, index: number) => (
										<ColumnSwitch
											key={index}
											column={column}
											onClick={(field: any) => clicked(group, field)}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				</>
			}
			footer={
				<>
					<a className="btn small link" href="#" onClick={reset}>
						Restaurar padrão
					</a>
					<button onClick={saveColumnsChange} className="btn small primary">
						Salvar
					</button>
				</>
			}
		/>
	);
};

export default function DatatablePostTitle({
	rows,
	columns,
	setColumns,
	tickerType,
	defaultColumns,
}: IProps): ReactNode {
	const { formatMoney } = useHelpers();
	const router = useRouter();
	const goToEntries = (e: any) => {
		e.stopPropagation();
		router.push(seo.entries.path);
	};

	const charData = useMemo(() => {
		const value = rows.map((row: any) => {
			const result = {
				name: row.ticker.replace(/(<([^>]+)>)/gi, '').split('\n')[0],
				value: row.equity_total,
			};
			return result;
		});
		return value;
	}, [rows]);

	const customLegendDonut = (item: any) => {
		return `${item.name}: ${formatMoney(item.value)}`;
	};

	return (
		<>
			<button onClick={goToEntries} className="btn small no-border transparent">
				<label>Lançamentos</label>
				<Icon icon="/images/theme/link.svg" width="16px" />
			</button>
			<Modal
				size="50%"
				title="Ativos na Carteira"
				source={
					<button className="btn small transparent">
						<Icon icon="/images/theme/bar-chart.svg" width="16px" />
						<label>Gráficos</label>
					</button>
				}
				content={
					<DonutChart
						customLegend={customLegendDonut}
						loading={false}
						size="299px"
						data={charData}
						noCard
					/>
				}
			/>
			<EditColumns
				columns={columns}
				setColumns={setColumns}
				defaultColumns={defaultColumns}
			/>
			<ModalEntries className="small" tickerType={tickerType} />
		</>
	);
}
