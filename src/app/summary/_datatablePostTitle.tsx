'use client';

import DonutChart from '@/components/charts/donutChart';
import Icon from '@/components/common/icon';
import If from '@/components/common/if';
import Modal from '@/components/common/modal';
import ModalEntries from '@/components/modalEntries';
import { seo } from '@/constants/seo';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

interface IProps {
    rows: any[];
    columns: any[];
    onChange: any;
    tickerType: string;
}

const ColumnSwitch = ({ index, columns, column, onClick }: any) => {
    // const toggleVisible = useCallback(() => {
    //     const _columns = columns;
    //     _columns[index].visible = !_columns[index].visible;
    //     // setColumns(_columns);
    // }, [columns, index, setColumns]);

    return (
        <label
            className={`column-switch ${column.visible ? 'active' : ''}`}
            onClick={onClick}
        >
            <If condition={column.visible}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.05859 16.9068V16.9068C3.95432 16.086 0.999994 12.4823 1 8.29671V5.44445C1 2.98985 2.98985 1 5.44444 1H12.5556C15.0102 1 17 2.98985 17 5.44445V8.29669C17 12.4822 14.0458 16.0858 9.94161 16.9067H9.9414C9.31996 17.0311 8.68004 17.0311 8.05859 16.9068V16.9068Z"
                        stroke="#D3B583"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M7.09662 10.5556C7.448 11.2768 8.19922 11.7154 9 11.6667C9.97736 11.7734 10.8628 11.0847 11 10.1112V10.1112C11 9.43925 10.5257 8.86075 9.86689 8.72898L8.13311 8.38222C7.47425 8.25045 7 7.67195 7 7.00004V7.00004C7.13717 6.02649 8.02264 5.33779 9 5.44449C9.80078 5.39585 10.552 5.83439 10.9034 6.5556"
                        stroke="#C5CBD3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </If>
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

const EditColumns = ({ columns, onChange }: any) => {
    const columnsGrouped = useMemo(() => {
        const result = columns.reduce((acc: any, column: any) => {
            if (!acc[column.group]) {
                acc[column.group] = [];
            }
            acc[column.group].push(column);
            return acc;
        }, {});
        return result;
    }, [columns]);

    const handleSetEditableColumns = (column: any) => {
        onChange(column.field, !column.visible);
    };

    return (
        <Modal
            size="50%"
            tabletSize="80%"
            mobileSize="90%"
            title="Editar colunas"
            type="side right"
            source={
                <button className="btn small no-shadow">
                    <Icon icon="/images/theme/table-columns.svg" width="16px" />
                    Editar colunas
                </button>
            }
            content={
                <div className="fields-edit-list">
                    {Object.keys(columnsGrouped).map((group, index) => (
                        <div key={index} style={{ marginBottom: 50 }}>
                            <h6>{group}</h6>
                            <div className="input-list">
                                {columnsGrouped[group].map(
                                    (column: any, index: number) => (
                                        <ColumnSwitch
                                            key={index}
                                            column={column}
                                            columns={columns}
                                            onClick={() =>
                                                handleSetEditableColumns(column)
                                            }
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            }
        />
    );
};

export default function DatatablePostTitle({
    rows,
    columns,
    onChange,
    tickerType
}: IProps): JSX.Element {
    const router = useRouter();
    const goToEntries = (e: any) => {
        e.stopPropagation();
        router.push(seo.entries.path);
    };

    const charData = useMemo(() => {
        const value = rows.map((row: any) => {
            const result = {
                name: row.ticker.replace(/(<([^>]+)>)/gi, '').split('\n')[0],
                value: row.equity_total
            };
            return result;
        });
        return value;
    }, [rows]);

    return (
        <>
            <button
                onClick={goToEntries}
                className="btn small no-shadow no-border"
            >
                Lançamentos
                <Icon icon="/images/theme/link.svg" width="16px" />
            </button>
            <Modal
                title="Ativos na Carteira"
                source={
                    <button className="btn small no-shadow">
                        <Icon icon="/images/theme/bar-chart.svg" width="16px" />
                        Gráficos
                    </button>
                }
                content={
                    <DonutChart
                        loading={false}
                        size="299px"
                        data={charData}
                        noCard={true}
                    />
                }
            />
            <EditColumns columns={columns} onChange={onChange} />
            <ModalEntries className="small" tickerType={tickerType} />
        </>
    );
}
