'use client';
import { ThemeContext } from '@/context/themeContext';
import { CSSProperties, useContext, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';

export default function Evolution(): JSX.Element {
    const [selectedOption, setSelectedOption] = useState<any>(1);
    const [selectedPeriod, setSelectedPeriod] = useState<any>(1);
    const [selectedQtyPeriod, setQtyPeriod] = useState<any>(12);
    const [optionList, setOptionList] = useState<any[]>([
        {
            id: 1,
            text: 'Recebidos e futuros'
        }
    ]);

    const [periodList, setPeriodList] = useState<any[]>([
        {
            id: 1,
            text: 'Mensal'
        }
    ]);

    const [qtyPeriodOptions, setQtyPeriodOptions] = useState<any[]>([
        {
            id: 12,
            text: '12 Meses'
        }
    ]);

    const { theme } = useContext(ThemeContext);

    const options = useMemo(() => {
        const options = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#ccc',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0
                    }
                }
            },
            xAxis: {
                data: [
                    '05/23',
                    '06/23',
                    '07/23',
                    '08/23',
                    '09/23',
                    '10/23',
                    '11/23',
                    '12/23',
                    '01/24',
                    '02/24',
                    '03/24',
                    '04/24',
                    '05/24'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    color: '#4778D1',
                    data: [
                        579.21, 579.21, 702.74, 702.74, 702.74, 702.74, 702.74,
                        702.74, 702.74, 769.87, 769.87, 4682.13, 323, 1234
                    ],
                    name: 'Proventos recebidos',
                    stack: 'Ad',
                    type: 'bar'
                },
                {
                    color: '#C2D2F0',
                    data: [
                        -96.06, 94.64, -67.28, -51.22, -41.21, -52.58, -52.58,
                        -52.58, -52.58, -52.2, -52.2, -386.84, -222, -2232
                    ],
                    name: 'Proventos a receber',
                    stack: 'Ad',
                    type: 'bar'
                }
            ],
            legend: {},
            grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                containLabel: true
            }
        };
        return options;
    }, []);

    return (
        <div className="earnings-card evolution">
            <div className="header card-content border-b">
                <h4>
                    Evolução de Proventos
                    <div
                        className="action-btns"
                        style={
                            {
                                gridTemplateColumns: '2fr 1fr 1fr'
                            } as CSSProperties
                        }
                    >
                        <Select2
                            style={{ width: 200 }}
                            value={selectedOption}
                            onSelect={setSelectedOption}
                            data={optionList}
                            options={{
                                placeholder: 'Recebidos e futuros'
                            }}
                        />
                        <Select2
                            style={{ width: 200 }}
                            value={selectedPeriod}
                            onSelect={setSelectedPeriod}
                            data={periodList}
                        />
                        <Select2
                            style={{ width: 200 }}
                            value={selectedQtyPeriod}
                            onSelect={setQtyPeriod}
                            data={qtyPeriodOptions}
                        />
                    </div>
                </h4>
            </div>
            <div className="card-content bottom">
                <ReactECharts
                    option={options}
                    theme={theme}
                    style={{ height: 409, width: '100%' }}
                />
            </div>
        </div>
    );
}
