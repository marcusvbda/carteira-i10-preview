'use client';
import { ThemeContext } from '@/context/themeContext';
import { useMemo, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import { Column } from 'primereact/column';
import Icon from '@/components/common/icon';

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

    const rows = useMemo(() => {
        return Array.from({ length: 2024 - 2010 + 1 }, (v, i) => 2010 + i);
    }, []);

    return (
        <div className="earnings-card history">
            <div className="header card-content">
                <h4>
                    Histórico mensal
                    <div className="action-btns">
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
                        <button className="btn root">
                            <Icon
                                icon="/images/theme/search.svg"
                                width="16px"
                            />
                        </button>
                    </div>
                </h4>
            </div>
            <DataTable
                value={rows as any}
                className="theme-datatable"
                emptyMessage="Nenhum registro."
                paginator
                rows={10}
                paginatorTemplate="PrevPageLink PageLinks NextPageLink"
            >
                <Column header="Ano" body={(x) => x} />
                <Column header="Jan" body={(x) => x} />
                <Column header="Fev" body={(x) => x} />
                <Column header="Mar" body={(x) => x} />
                <Column header="Abr" body={(x) => x} />
                <Column header="Mai" body={(x) => x} />
                <Column header="Jun" body={(x) => x} />
                <Column header="Jul" body={(x) => x} />
                <Column header="Ago" body={(x) => x} />
                <Column header="Set" body={(x) => x} />
                <Column header="Out" body={(x) => x} />
                <Column header="Nov" body={(x) => x} />
                <Column header="Dez" body={(x) => x} />
                <Column header="Média" body={(x) => x} />
                <Column
                    header="Total"
                    body={(x) => x}
                    style={{ backgroundColor: '#cbcbcb2b' }}
                />
            </DataTable>
        </div>
    );
}
