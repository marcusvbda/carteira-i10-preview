'use client';
import { ReactNode, useContext } from 'react';
// import { Column } from 'primereact/column';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import DefaultCard from '@/components/cards/default';
import './_styles.scss';
import Collapse, { CollapseBtn } from '@/components/common/collapse';
import { ThemeContext } from '@/context/themeContext';
import Icon from '../icon';

import If from '../if';
import Skeleton from '../skeleton';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

const Title = ({ title, icon, darkIcon, postTitleSlot }: any) => {
	return (
		<h5 className="datatable-title">
			<div className="title-row">
				{icon && <Icon icon={icon} darkIcon={darkIcon} width="24px" />}
				{title}
			</div>
			<If condition={postTitleSlot}>
				<div className="post-title-slot">{postTitleSlot}</div>
			</If>
		</h5>
	);
};

const DatatableContent = ({
	postDatatableSlot,
	columns,
	rows,
	pagination,
	screenFormat,
}: any): ReactNode => {
	return (
		<>
			<DataTable
				value={rows}
				className="theme-datatable"
				emptyMessage="Nenhum registro."
				paginator={pagination ? true : false}
				rows={10}
				paginatorTemplate="PrevPageLink PageLinks NextPageLink"
			>
				{(columns || []).map((row: any, index: number) => (
					<Column
						key={index}
						header={row.title}
						field={row.field}
						sortable={row.sortable}
						body={(x) => (row.body ? row.body(x) : x[row.field])}
						style={{ ...row?.style }}
					/>
				))}
			</DataTable>
			{postDatatableSlot && ['desktop'].includes(screenFormat) && (
				<div className="post-datatable-slot">{postDatatableSlot}</div>
			)}
		</>
	);
};

export function Datatable({
	title,
	defaultCollapsed,
	actions,
	summary,
	rows,
	columns,
	loading,
}: any): ReactNode {
	const { screenFormat } = useContext(ThemeContext);

	return (
		<DefaultCard className="datatable-card" padding="0">
			<Collapse
				source={
					<Title
						title={
							<>
								{title}
								{!['desktop'].includes(screenFormat) && (
									<div className="actions-row">
										{actions}
										<CollapseBtn />
									</div>
								)}
							</>
						}
						icon="/images/theme/actions.svg"
						darkIcon="/images/theme/actions-dark.svg"
						postTitleSlot={summary}
					/>
				}
				content={
					loading ? (
						<div style={{ padding: 10 }}>
							<Skeleton height="150px" />
						</div>
					) : (
						<DatatableContent
							postDatatableSlot={actions}
							rows={rows}
							columns={columns}
							screenFormat={screenFormat}
						/>
					)
				}
				defaultCollapsed={defaultCollapsed}
			/>
		</DefaultCard>
	);
}
