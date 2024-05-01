'use client';

import { Datatable } from '@/components/common/datatable';
import DatatableFooter from './_datatableFooter';
import Skeleton from '@/components/common/skeleton';
import { useEffect, useMemo, useState } from 'react';
import DatatablePostTitle from './_datatablePostTitle';
import SensitiveContent from '@/components/common/sensitiveContent';
import LockedComponent from '@/components/locked';
import YesOrNo from '@/components/common/yesOrNo';
import { useHelpers } from '@/hooks/helpers';
import ScoreComponent from '@/components/score';
import Trend from '@/components/common/trend';

interface IProps {
    loading: boolean;
    defaultCollapsed?: boolean;
    rows: any;
    total: number;
    title: string;
    icon: string;
    tickerType: string;
    darkIcon: string;
}

export default function CollapseDatatable({
    loading,
    rows,
    total,
    title,
    icon,
    darkIcon,
    defaultCollapsed,
    tickerType
}: IProps): JSX.Element {
    const helpers = useHelpers();

    const localStorageColumns = useMemo(() => {
        return JSON.parse(
            localStorage.getItem(`datatable-columns-${title}`) || '[]'
        );
    }, [title]);

    const defaultColumns = useMemo(
        () => [
            'ticker',
            'quantity',
            'avg_price',
            'current_price',
            'appreciation',
            'equity_total',
            'bazin',
            'score',
            'percent_wallet',
            'buy'
        ],
        []
    );

    const checkIsVisible = (field: string) => {
        const persistValue = (localStorageColumns || []).find(
            (x: any) => x.field === field
        );
        if (persistValue !== undefined) {
            return persistValue?.visible;
        }
        return defaultColumns.includes(field);
    };

    const [columns, setColumns] = useState<any>([
        {
            field: 'ticker',
            title: 'Ativo',
            group: 'Dados básicos',
            visible: true,
            locked: true,
            body: (row: any): JSX.Element => {
                return (
                    <div className="datatable-cell-row">
                        <div dangerouslySetInnerHTML={{ __html: row.ticker }} />
                    </div>
                );
            }
        },
        {
            field: 'quantity',
            group: 'Dados básicos',
            title: 'Quantidade',
            visible: true,
            locked: true,
            body: (row: any): JSX.Element => (
                <div className="datatable-cell-row">
                    <SensitiveContent>{row.quantity}</SensitiveContent>
                </div>
            )
        },
        {
            field: 'avg_price',
            title: 'Preço médio',
            group: 'Dados básicos',
            visible: checkIsVisible('avg_price'),
            body: (row: any): JSX.Element => {
                return (
                    <div className="datatable-cell-row">
                        <SensitiveContent>
                            {helpers.formatMoney(row.avg_price)}
                        </SensitiveContent>
                    </div>
                );
            }
        },
        {
            field: 'current_price',
            title: 'Preço atual',
            group: 'Dados básicos',
            visible: checkIsVisible('current_price'),
            body: (row: any): JSX.Element => {
                return (
                    <div className="datatable-cell-row">
                        <SensitiveContent>
                            {helpers.formatMoney(row.current_price)}
                        </SensitiveContent>
                    </div>
                );
            }
        },
        {
            field: 'appreciation',
            title: 'Valorização',
            group: 'Dados básicos',
            visible: checkIsVisible('appreciation'),
            body(row: any): JSX.Element {
                let value = row.appreciation;
                let type = '';
                if (value !== 0) {
                    type = value > 0 ? 'positive' : 'negative';
                    if (type === 'negative') value *= -1;
                    value = value.toFixed(2);
                    if (value.endsWith('.00')) {
                        value = value.replace('.00', '');
                    }
                }
                return <Trend type={type} size="14px" value={`${value}%`} />;
            }
        },
        {
            field: 'equity_total',
            title: 'Saldo',
            group: 'Dados básicos',
            visible: checkIsVisible('equity_total'),
            body: (row: any): JSX.Element => {
                return (
                    <div className="datatable-cell-row">
                        <SensitiveContent>
                            {helpers.formatMoney(row.equity_total)}
                        </SensitiveContent>
                    </div>
                );
            }
        },
        {
            field: 'bazin',
            visible: checkIsVisible('bazin'),
            title: 'Preço Justo Bazin',
            group: 'Dados básicos',
            body: (row: any): JSX.Element => (
                <LockedComponent>
                    {helpers.formatMoney(row.bazin)}
                </LockedComponent>
            )
        },
        {
            field: 'score',
            title: 'Nota',
            group: 'Dados básicos',
            visible: checkIsVisible('score'),
            body: (row: any): JSX.Element => (
                <ScoreComponent value={row.rating} />
            )
        },
        {
            field: 'percent_wallet',
            title: '% na carteira',
            group: 'Dados básicos',
            visible: checkIsVisible('percent_wallet'),
            body: (row: any): JSX.Element => {
                const percentage = row.percent_wallet;
                let value = percentage.toFixed(2);
                if (value.endsWith('.00')) {
                    value = value.replace('.00', '');
                }
                return <div className="datatable-cell-row">{value}%</div>;
            }
        },
        {
            field: 'buy',
            title: 'Comprar',
            group: 'Dados básicos',
            visible: checkIsVisible('buy'),
            body: (row: any): JSX.Element => {
                const value = (row.buy || '').replace(/(<([^>]+)>)/gi, '');
                const valueBool = value === 'SIM';
                return <YesOrNo value={valueBool} />;
            }
        },
        {
            field: 'payout',
            title: 'payout',
            group: 'Dados fundamentais',
            visible: checkIsVisible('payout'),
            body: (row: any) => `${row.payout}%`
        },
        {
            field: 'gnp',
            title: 'CAGR Lucros (5 anos)',
            visible: checkIsVisible('gnp'),
            group: 'Dados fundamentais',
            body: (row: any) => `${row.gnp}%`
        },
        {
            field: 'dy',
            title: 'DY',
            visible: checkIsVisible('dy'),
            group: 'Dados fundamentais',
            body: (row: any) => `${row.dy}%`
        },
        {
            field: 'pvp',
            title: 'P/VP',
            visible: checkIsVisible('pvp'),
            group: 'Dados fundamentais',
            body: (row: any) => `${row.p_vp}%`
        },
        {
            field: 'p_l',
            title: 'P/L',
            visible: checkIsVisible('p_l'),
            group: 'Dados fundamentais',
            body: (row: any) => `${row.p_l}%`
        },
        {
            field: 'yoc',
            title: 'Yield On Cost (YOC)',
            visible: checkIsVisible('yoc'),
            group: 'Dados fundamentais',
            body: (row: any) => `${row.yoc}%`
        },
        {
            field: 'net_margin',
            title: 'Margem Líquida',
            visible: checkIsVisible('net_margin'),
            group: 'Dados fundamentais',
            body: (row: any) => `${row.net_margin}%`
        },
        {
            field: 'roe',
            title: 'ROE',
            visible: checkIsVisible('roe'),
            group: 'Dados fundamentais',
            body: (row: any) => `${row.roe}%`
        },
        {
            field: 'gross_margin',
            title: 'Margem Bruta',
            visible: checkIsVisible('gross_margin'),
            group: 'Dados fundamentais',
            body: (row: any) => `${row.gross_margin}%`
        },
        {
            field: 'gnr',
            title: 'CAGR Receitas (5 anos) ',
            visible: checkIsVisible('gnr'),
            group: 'Dados fundamentais',
            body: (row: any) => `${row.gnr}%`
        }
        // {
        //     field: 'options',
        //     title: 'Opções',
        //     body: (row: any): JSX.Element => {
        //         return (
        //             <svg
        //                 xmlns="http://www.w3.org/2000/svg"
        //                 width="17"
        //                 height="16"
        //                 viewBox="0 0 17 16"
        //                 fill="none"
        //             >
        //                 <path
        //                     d="M10.25 8C10.25 8.34612 10.1474 8.68446 9.95507 8.97225C9.76278 9.26003 9.48947 9.48434 9.1697 9.61679C8.84993 9.74924 8.49806 9.7839 8.15859 9.71637C7.81913 9.64885 7.50731 9.48218 7.26256 9.23744C7.01782 8.9927 6.85115 8.68087 6.78363 8.34141C6.7161 8.00194 6.75076 7.65007 6.88321 7.3303C7.01567 7.01053 7.23997 6.73722 7.52775 6.54493C7.81554 6.35264 8.15388 6.25 8.5 6.25C8.96413 6.25 9.40925 6.43437 9.73744 6.76256C10.0656 7.09075 10.25 7.53587 10.25 8ZM3.5 6.25C3.15388 6.25 2.81554 6.35264 2.52775 6.54493C2.23997 6.73722 2.01566 7.01053 1.88321 7.3303C1.75076 7.65007 1.7161 8.00194 1.78363 8.34141C1.85115 8.68087 2.01782 8.9927 2.26256 9.23744C2.50731 9.48218 2.81913 9.64885 3.15859 9.71637C3.49806 9.7839 3.84993 9.74924 4.1697 9.61679C4.48947 9.48434 4.76278 9.26003 4.95507 8.97225C5.14737 8.68446 5.25 8.34612 5.25 8C5.25 7.53587 5.06563 7.09075 4.73744 6.76256C4.40925 6.43437 3.96413 6.25 3.5 6.25ZM13.5 6.25C13.1539 6.25 12.8155 6.35264 12.5278 6.54493C12.24 6.73722 12.0157 7.01053 11.8832 7.3303C11.7508 7.65007 11.7161 8.00194 11.7836 8.34141C11.8512 8.68087 12.0178 8.9927 12.2626 9.23744C12.5073 9.48218 12.8191 9.64885 13.1586 9.71637C13.4981 9.7839 13.8499 9.74924 14.1697 9.61679C14.4895 9.48434 14.7628 9.26003 14.9551 8.97225C15.1474 8.68446 15.25 8.34612 15.25 8C15.25 7.77019 15.2047 7.54262 15.1168 7.3303C15.0288 7.11798 14.8999 6.92507 14.7374 6.76256C14.5749 6.60006 14.382 6.47116 14.1697 6.38321C13.9574 6.29526 13.7298 6.25 13.5 6.25Z"
        //                     fill="#778698"
        //                 />
        //             </svg>
        //         );
        //     }
        // }
    ]);

    useEffect(() => {
        localStorage.setItem(
            `datatable-columns-${title}`,
            JSON.stringify(columns)
        );
    }, [columns, title]);

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
            defaultCollapsed={defaultCollapsed === true}
            actions={
                <DatatablePostTitle
                    rows={rows}
                    columns={columns}
                    setColumns={setColumns}
                    tickerType={tickerType}
                    defaultColumns={defaultColumns}
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
