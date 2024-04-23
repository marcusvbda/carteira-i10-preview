'use client';

import DonutChart from '@/components/charts/donutChart';
import './_styles.scss';
import BarChart from '@/components/charts/barChart';
import { useContext, useEffect, useMemo, useState } from 'react';
// import Dropdown from '@/components/common/dropdown';
import Icon from '@/components/common/icon';
import { backend, makeUrl } from '@/constants/backend';
import { useFetch } from '@/hooks/fetch';
import { WalletContext } from '@/context/walletContext';
import { Dropdown } from 'primereact/dropdown';

const qtyMonthOptions: any[] = [
    {
        id: 9999999,
        name: 'Desde o início'
    },
    {
        id: 12,
        name: '12 Meses'
    },
    {
        id: 24,
        name: '2 Anos'
    },
    {
        id: 36,
        name: '5 Anos'
    },
    {
        id: 60,
        name: '10 Anos'
    }
];

const typesOptions: any[] = [
    {
        id: 'all',
        name: 'Todos os tipos'
    },
    {
        id: 'ticker',
        name: 'Ações'
    },
    {
        id: 'Fii',
        name: 'Fiis'
    },
    {
        id: 'Fund',
        name: 'Fundos'
    },
    {
        id: 'Crypto',
        name: 'Criptomoedas'
    }
];

export default function Charts(): JSX.Element {
    const { walletId } = useContext(WalletContext);

    const [qtyMonths, setQtyMonths] = useState<any>(qtyMonthOptions[1] as any);
    const [type, setType] = useState<any>(typesOptions[0] as any);

    const routeDonutChart = useMemo(
        () => makeUrl(backend.routeSummaryDonutChart, { walletId }),
        [walletId]
    );

    const {
        data: donutChartData,
        loading: donutChartLoading,
        fetch: fetchDonutChart
    } = useFetch({
        route: routeDonutChart
    });

    const routeBarChart = useMemo(() => {
        return makeUrl(backend.routeSummaryEvolutionChart, {
            walletId,
            qtyMonths: qtyMonths.id,
            type: type.id
        });
    }, [walletId, qtyMonths, type]);

    const {
        data: barChartData,
        loading: barChartLoading,
        fetch: fetchBarChart
    } = useFetch({
        route: routeBarChart,
        autoDispatch: false
    });

    useEffect(() => {
        fetchBarChart({ route: routeBarChart });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [qtyMonths, type]);

    const barChartInfo = useMemo(() => {
        const primaryColor = '#2cb875';
        const secondaryColor = '#96e9c1';
        const primaryLabel = 'Valor aplicado';
        const secondaryLabel = 'Ganho capital';
        const results = [
            {
                name: primaryLabel,
                type: 'bar',
                stack: 'Ad',
                color: primaryColor,
                data: (barChartData || []).map((x: any) => {
                    const applied = x?.sum_applied || 0;
                    return parseFloat(applied.toFixed(2));
                })
            },
            {
                name: secondaryLabel,
                type: 'bar',
                stack: 'Ad',
                color: secondaryColor,
                data: (barChartData || []).map((x: any) => {
                    const applied = parseFloat(
                        (x?.sum_applied || 0).toFixed(2)
                    );
                    const total = parseFloat((x?.sum_equity || 0).toFixed(2));
                    const earnings = parseFloat((total - applied).toFixed(2));
                    return earnings;
                })
            }
        ];
        const dates = (barChartData || []).map((x: any) => x?.month);
        return {
            results,
            dates
        };
    }, [barChartData]);

    return (
        <section className="section-charts">
            <BarChart
                loading={barChartLoading}
                data={barChartInfo.results}
                dates={barChartInfo.dates}
            >
                <div className="chart-header">
                    <h4 className="chart-header__title">
                        Evolução do Patrimônio
                    </h4>
                    <div className="chart-header__filter">
                        <Dropdown
                            value={qtyMonths}
                            onChange={(e) => setQtyMonths(e.value)}
                            options={qtyMonthOptions}
                            optionLabel="name"
                            valueTemplate={(item) => (
                                <div className="filter-date">
                                    <Icon
                                        icon="/images/theme/date.svg"
                                        width="12px"
                                    />
                                    {item.name}
                                </div>
                            )}
                        />
                        <Dropdown
                            value={type}
                            onChange={(e) => setType(e.value)}
                            options={typesOptions}
                            optionLabel="name"
                            valueTemplate={(item) => (
                                <div className="filter-date">
                                    <div className="default-dropdown--btn-money" />
                                    <Icon
                                        icon="/images/theme/money.svg"
                                        width="16px"
                                    />
                                    {item.name}
                                </div>
                            )}
                        />
                    </div>
                </div>
            </BarChart>
            <DonutChart loading={donutChartLoading} data={donutChartData}>
                <div className="chart-header">
                    <h4 className="chart-header__title">Ativos na Carteira</h4>
                </div>
            </DonutChart>
        </section>
    );
}
