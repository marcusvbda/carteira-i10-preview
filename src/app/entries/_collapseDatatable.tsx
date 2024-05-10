'use client';

import { Datatable } from '@/components/common/datatable';
import Skeleton from '@/components/common/skeleton';
import Icon from '@/components/common/icon';
import InvestmentType from '@/components/common/investimentType';
import { useMemo } from 'react';
import TableFilter from './_tableFilter';
import SensitiveContent from '@/components/common/sensitiveContent';
interface IProps {
    loading: boolean;
    defaultCollapsed?: boolean;
    rows: any;
    title: string;
    icon?: string;
    darkIcon?: string;
}

export default function CollapseDatatable({
    loading,
    rows,
    title,
    defaultCollapsed
}: IProps): JSX.Element {
    const columns = useMemo(() => {
        return [
            {
                field: 'ticker',
                title: 'Ativo',
                body: (row: any): JSX.Element => {
                    return (
                        <div className="datatable-cell-row">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: row.ticker_img
                                }}
                            />
                        </div>
                    );
                }
            },
            {
                field: 'type_investment',
                title: 'Tipo de investimento',
                body: (row: any): JSX.Element => (
                    <div className="datatable-cell-row">
                        <InvestmentType
                            content={row.type_investment
                                .replace(/(<([^>]+)>)/gi, '')
                                .replace('&nbsp;', ' ')}
                        />
                    </div>
                )
            },
            {
                field: 'type',
                title: 'Tipo de ordem',
                body: (row: any): JSX.Element => (
                    <div className="datatable-cell-row">
                        {row.type === 'Compra' ? (
                            <Icon width="16px" icon="/images/theme/buy.svg" />
                        ) : (
                            <Icon width="16px" icon="/images/theme/sell.svg" />
                        )}
                        {row.type}
                    </div>
                )
            },
            { field: 'date', title: 'Data' },
            {
                field: 'qty',
                title: 'Quantidade',
                body: (row: any): JSX.Element => (
                    <div dangerouslySetInnerHTML={{ __html: row.qty }} />
                )
            },
            {
                field: 'price',
                title: 'Preço unitário',
                body: (row: any): JSX.Element => (
                    <SensitiveContent>
                        <div dangerouslySetInnerHTML={{ __html: row.price }} />
                    </SensitiveContent>
                )
            },
            {
                field: 'total',
                title: 'Total',
                body: (row: any): JSX.Element => (
                    <SensitiveContent>
                        <div dangerouslySetInnerHTML={{ __html: row.total }} />
                    </SensitiveContent>
                )
            },
            {
                field: 'source',
                title: 'Fonte',
                body: (row: any): JSX.Element => (
                    <div className="datatable-cell-row">
                        <InvestmentType content={row.source.toLowerCase()} />
                    </div>
                )
            }
        ];
    }, []);

    if (loading) {
        return <Skeleton height="150px" />;
    }

    return (
        <Datatable
            title={title}
            defaultCollapsed={defaultCollapsed === true}
            pagination
            actions={<TableFilter />}
            columns={columns as any}
            rows={rows}
        />
    );
}
