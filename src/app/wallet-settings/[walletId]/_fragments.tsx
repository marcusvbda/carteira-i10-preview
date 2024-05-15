'use client';

import Icon from '@/components/common/icon';
import InputSwitch from '@/components/inputSwitch/inputSwitch';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';

export default function Fragments() {
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);
    const [b3, setB3] = useState(false);

    return (
        <div className="wallet-settings-page">
            <div className="page-container">
                <div className="content">
                    <h4>Configurações da carteira</h4>
                    <div className="content-card">
                        <h5>Cateira 1</h5>
                        <div className="form-row">
                            <label>URL</label>
                            <span>
                                https://investidor10.com.br/carteira/705939
                            </span>
                        </div>
                        <div className="form-row">
                            <label>Nome</label>
                            <input />
                        </div>
                        <div className="form-cols">
                            <div className="form-row">
                                <label>Visibilidade</label>
                                <Dropdown
                                    value={item}
                                    onChange={(e: any) => setItem(e.value)}
                                    options={items}
                                    optionLabel="name"
                                    placeholder="Selecionar ..."
                                />
                            </div>
                            <div className="form-row">
                                <label>Demora na atualização</label>
                                <Dropdown
                                    value={item}
                                    onChange={(e: any) => setItem(e.value)}
                                    options={items}
                                    optionLabel="name"
                                    placeholder="Selecionar ..."
                                />
                            </div>
                        </div>
                        <h5 className="mt-4">Integrações</h5>
                        <div className="b3-card">
                            <div className="title">
                                <Icon
                                    icon="/images/theme/b3-color-logo.svg"
                                    width="40px"
                                />
                                Conecte sua conta da B3 para acompanhar o
                                desempenho de suas carteiras.
                            </div>
                            <div className="card--footer">
                                <span>Conectar com a B3</span>
                                <InputSwitch />
                            </div>
                        </div>
                        <div className="section-footer">
                            <a href="#">
                                <Icon
                                    width="16px"
                                    icon="/images/theme/trash.svg"
                                />
                                Deletar carteira
                            </a>
                            <div className="btn dark">Salvar alterações</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
