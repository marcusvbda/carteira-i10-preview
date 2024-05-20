'use client';

import Icon from '@/components/common/icon';
import { ProgressBar } from 'primereact/progressbar';
import ReactECharts from 'echarts-for-react';
import { useContext, useMemo } from 'react';
import { ThemeContext } from '@/context/themeContext';

export default function Summary(): JSX.Element {
    const { theme } = useContext(ThemeContext);

    const data = useMemo(() => {
        return [
            { value: 36, name: 'ETFs' },
            { value: 24, name: 'LCI' },
            { value: 11, name: 'Criptomoedas' },
            { value: 15, name: 'ETFs Internacional' },
            { value: 15, name: 'CDB' }
        ];
    }, []);

    const options = useMemo(() => {
        return {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                formatter: (params: any) => {
                    const item = data?.find((x: any) => x.name === params.name);
                    return item && `${params.name}: ${item.value}`;
                }
            },
            legend: {
                orient: 'vertical',
                left: 'right',
                top: 'center',
                formatter: (name: any) => {
                    const item = data?.find((x: any) => x.name === name);
                    return item && `${name}: ${item.value}%`;
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '80%'],
                    center: ['18%', '50%'],
                    label: {
                        show: false,
                        position: 'center'
                    },
                    avoidLabelOverlap: false,
                    data
                }
            ]
        };
    }, [data]);

    return (
        <div className="earnings-card summary">
            <div className="header card-content">Resumo</div>
            <div className="body card-content border-b">
                <h5>Média mensal</h5>
                <div className="value-row">
                    <span className="value">R$ 5.200,00</span>
                    <a href="#" className="percentage">
                        / Criar meta
                        <Icon icon="/images/theme/link-icon.svg" width="16px" />
                    </a>
                    <span className="value percentage-value">0%</span>
                </div>
                <ProgressBar value={50}></ProgressBar>
            </div>
            <div className="body card-content border-b">
                <h5>
                    Total últimos 12 meses
                    <a href="#" className="edit-link">
                        <Icon icon="/images/theme/edit.svg" width="12px" />
                    </a>
                </h5>
                <div className="value-row">
                    <span className="value">R$ 24.825,00</span>
                </div>
            </div>
            <div className="body card-content border-b">
                <h5>Total da carteira</h5>
                <div className="value-row">
                    <span className="value">R$ 575.200,00</span>
                </div>
            </div>
            <div className="body card-content">
                <h5>
                    Distribuição de ativos 12 meses{' '}
                    <a href="#" className="edit-link">
                        Ver todos
                    </a>
                </h5>
                <div className="value-row bottom">
                    <ReactECharts
                        option={options}
                        theme={theme}
                        style={{ height: 130, width: '100%' }}
                    />
                </div>
            </div>
        </div>
    );
}
