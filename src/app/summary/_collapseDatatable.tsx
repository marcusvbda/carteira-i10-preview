'use client';

import { Datatable } from '@/components/common/datatable';
import DatatableFooter from './_datatableFooter';
import Skeleton from '@/components/common/skeleton';
import { useMemo } from 'react';
import DatatablePostTitle from './_datatablePostTitle';

interface IProps {
    loading: boolean;
    defaultCollapsed?: boolean;
    rows: any;
    total: number;
    title: string;
    icon: string;
    darkIcon: string;
    columns: any[];
    onChangeColumn: any;
}

export default function CollapseDatatable({
    loading,
    rows,
    total,
    title,
    icon,
    darkIcon,
    defaultCollapsed,
    columns,
    onChangeColumn
}: IProps): JSX.Element {
    const totalAmount = useMemo(() => {
        return (rows || []).reduce((acc: number, row: any) => {
            return acc + row.equity_total;
        }, 0);
    }, [rows]);

    const walletPercentage = useMemo(() => {
        const percentage = (rows || []).reduce((acc: number, row: any) => {
            return acc + row.percent_wallet;
        }, 0);
        let value = percentage.toFixed(2);
        if (value.endsWith('.00')) {
            value = value.replace('.00', '');
        }
        return value;
    }, [rows]);

    if (loading) {
        return <Skeleton height="150px" />;
    }

    return (
        <Datatable
            title={title}
            icon={icon}
            darkIcon={darkIcon}
            defaultCollapsed={defaultCollapsed ? defaultCollapsed : false}
            actions={
                <DatatablePostTitle
                    rows={rows}
                    columns={columns}
                    onChange={onChangeColumn}
                />
            }
            summary={
                <DatatableFooter
                    qty={total}
                    totalAmount={totalAmount}
                    walletPercentage={walletPercentage}
                />
            }
            columns={columns.filter((x: any) => x.visible)}
            rows={rows}
        />
    );
}
