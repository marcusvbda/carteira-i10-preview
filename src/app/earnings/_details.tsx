'use client';
import { useMemo, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import { Column } from 'primereact/column';
import Icon from '@/components/common/icon';
import InvestmentType from '@/components/common/investimentType';

export default function Details(): JSX.Element {
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
                    Detalhes
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
                <Column
                    header="Ativo"
                    body={(x) => {
                        return (
                            <div className="datatable-cell-row">
                                <span className="hidden">VALE3</span>
                                <a
                                    className="ticker_link"
                                    target="_blank"
                                    href="http://localhost/acoes/vale3/"
                                >
                                    <span className="image">
                                        <span className="border">
                                            <img
                                                src="http://localhost/storage/companies/5ed732e52690e.png"
                                                loading="lazy"
                                            />
                                        </span>
                                        <div className="name">VALE3</div>
                                    </span>
                                </a>
                            </div>
                        );
                    }}
                />
                <Column
                    header="Tipo de ativo"
                    body={(x) => (
                        <div className="datatable-cell-row">
                            <InvestmentType content="Ações" />
                        </div>
                    )}
                />
                <Column header="Tipo de pagamento" body={(x) => x} />
                <Column header="Data com" body={(x) => x} />
                <Column header="Data pagamento" body={(x) => x} />
                <Column header="Quantidade" body={(x) => x} />
                <Column header="Valor do dividendo" body={(x) => x} />
                <Column header="Valor total" body={(x) => x} />
                <Column header="Total liquido" body={(x) => x} />
            </DataTable>
        </div>
    );
}
