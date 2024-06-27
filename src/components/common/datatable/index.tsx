'use client';
import { ReactNode } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import DefaultCard from '@/components/cards/default';
import './_styles.scss';
import Collapse from '@/components/common/collapse';
import Icon from '../icon';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import If from '../if';

interface IProps {
	icon?: string;
	darkIcon?: string;
	title: string;
	className?: string;
	defaultCollapsed?: boolean;
	actions?: ReactNode;
	summary?: ReactNode;
	columns: any[];
	rows?: any[];
	pagination?: boolean;
}

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
			{postDatatableSlot && (
				<div className="post-datatable-slot">{postDatatableSlot}</div>
			)}
		</>
	);
};

export function Datatable({
	icon,
	title,
	defaultCollapsed,
	darkIcon,
	actions,
	summary,
	rows,
	columns,
	pagination,
}: IProps): ReactNode {
	return (
		<DefaultCard className="datatable-card" padding="0">
			<Collapse
				source={
					<Title
						title={title}
						icon={icon}
						darkIcon={darkIcon}
						postTitleSlot={summary}
					/>
				}
				content={
					<DatatableContent
						pagination={pagination}
						postDatatableSlot={actions}
						rows={rows}
						columns={columns}
					/>
				}
				defaultCollapsed={defaultCollapsed}
			/>
		</DefaultCard>
	);
}
