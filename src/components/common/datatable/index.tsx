'use client';
import DefaultCard from '@/components/cards/default';
import './_styles.scss';
import Collapse from '@/components/common/collapse';
import Icon from '../icon';
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import If from '../if';

interface IProps {
    icon: string;
    darkIcon: string;
    title: string;
    className?: string;
    defaultCollapsed?: boolean;
    actions?: JSX.Element;
    summary?: JSX.Element;
    columns: any[];
    rows?: any[];
}

const Title = ({ title, icon, darkIcon, postTitleSlot }: any) => {
    return (
        <h5 className="datatable-title">
            <div className="title-row">
                <Icon icon={icon} darkIcon={darkIcon} width="24px" />
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
    rows
}: any): JSX.Element => {
    return (
        <>
            <DataTable value={rows} className="theme-datatable">
                {(columns || []).map((row: any, index: number) => (
                    <Column
                        key={index}
                        header={row.title}
                        sortable={row.sortable}
                        body={(x) => (row.body ? row.body(x) : x[row.field])}
                        style={{ ...row?.style }}
                    />
                ))}
            </DataTable>
            {postDatatableSlot ? (
                <div className="post-datatable-slot">{postDatatableSlot}</div>
            ) : (
                <></>
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
    columns
}: IProps): JSX.Element {
    const [visible, setVisible] = useState(defaultCollapsed ?? false);

    const onCollapseHandler = (value: boolean): void => {
        setVisible(value);
    };

    return (
        <DefaultCard className="datatable-card" padding="0">
            <Collapse
                onChange={onCollapseHandler as any}
                source={
                    <Title
                        title={title}
                        icon={icon}
                        darkIcon={darkIcon}
                        postTitleSlot={visible ? actions : summary}
                    />
                }
                content={
                    <DatatableContent
                        postDatatableSlot={summary}
                        rows={rows}
                        columns={columns}
                    />
                }
                defaultCollapsed={defaultCollapsed}
            />
        </DefaultCard>
    );
}
