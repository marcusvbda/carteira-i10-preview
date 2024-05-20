'use client';
import DateRange from '@/components/common/dateRange';
import Icon from '@/components/common/icon';
import Modal from '@/components/common/modal';
import { Calendar } from 'primereact/calendar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

const ColumnItem = ({ children }: any) => {
    return (
        <label className="column-switch active">
            {children}
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
                ></path>
            </svg>
        </label>
    );
};

const ModalContent = () => {
    const [_dateStart, setDateStart] = useState<Date | null>(null);
    const [_dateEnd, setDateEnd] = useState<Date | null>(null);

    const handleChangeDate = (start: Date, end: Date) => {
        setDateStart(start);
        setDateEnd(end);
    };

    return (
        <div className="fields-edit-list">
            <div style={{ marginBottom: 50 }}>
                <h6>Período</h6>
                <div className="flex-row gap">
                    <DateRange handleChange={handleChangeDate} />
                </div>
            </div>
            <div style={{ marginBottom: 50 }}>
                <h6>Tipo de ordem</h6>
                <div className="input-list">
                    <ColumnItem>Compra</ColumnItem>
                    <ColumnItem>Venda</ColumnItem>
                </div>
            </div>
            <div style={{ marginBottom: 50 }}>
                <h6>Tipo de investimento</h6>
                <div className="input-list">
                    <ColumnItem>Ações</ColumnItem>
                    <ColumnItem>FIIs</ColumnItem>
                    <ColumnItem>Criptomoedas</ColumnItem>
                    <ColumnItem>ETFs</ColumnItem>
                    <ColumnItem>Stocks</ColumnItem>
                    <ColumnItem>ETFs internacionais</ColumnItem>
                    <ColumnItem>Fundos de investimentos</ColumnItem>
                    <ColumnItem>Reits</ColumnItem>
                    <ColumnItem>BDRs</ColumnItem>
                    <ColumnItem>Tesouro direto</ColumnItem>
                </div>
            </div>
        </div>
    );
};

export default function TableFilter(_cx: any) {
    const [filter, setFilter] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <div className="post-title-btns">
            <Modal
                size="40%"
                tabletSize="70%"
                mobileSize="90%"
                title="Filtros"
                type="side right"
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                source={
                    <button className="btn-filter-datatable">
                        <Icon width="16px" icon="/images/theme/menu.svg" />
                    </button>
                }
                content={<ModalContent />}
                footer={
                    <>
                        <a className="btn small link" href="#">
                            Restaurar padrão
                        </a>
                        <button className="btn small primary">Salvar</button>
                    </>
                }
            />
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText
                    onClick={(e: any) => e.stopPropagation()}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Buscar lançamentos ..."
                />
            </IconField>
        </div>
    );
}
