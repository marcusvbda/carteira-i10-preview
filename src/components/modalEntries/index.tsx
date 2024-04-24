'use client';
import './_styles.scss';
import Icon from '../common/icon';
import Modal from '../common/modal';
import { useContext, useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import {
    currencyOptions,
    indexerOptions,
    investmentTypeOptions,
    rateTypeOptions,
    tickerTypeOptions,
    typeOptions
} from '@/constants/options';
import If from '../common/if';
import { InputText } from 'primereact/inputtext';
import LazySelect from '../common/lazySelect';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import { InputNumber } from 'primereact/inputnumber';
import { useHelpers } from '@/hooks/helpers';
import { useFetch } from '@/hooks/fetch';
import { WalletContext } from '@/context/walletContext';

interface IProps {
    className?: string;
}

export default function ModalEntries({ className }: IProps) {
    const closeModal = () => (Modal as any).setVisible(false);

    return (
        <Modal
            size="50%"
            tabletSize="80%"
            mobileSize="90%"
            title="Adicionar Ativo"
            source={
                <button className={`btn primary ${className ? className : ''}`}>
                    <Icon icon="/images/theme/plus.svg" width="16px" />
                    Adicionar Ativo
                </button>
            }
            content={<FormActive closeModal={closeModal} />}
        />
    );
}

const SwitchTypeEntry = ({ options, value, onChange, style }: any) => {
    const [active, setActive] = useState(value);
    return (
        <div className="switch-type-entry" style={{ ...style }}>
            {options.map((option: any, index: number) => (
                <button
                    key={index}
                    className={`switch-type-entry--item ${
                        active === option.value ? 'active' : ''
                    }`}
                    onClick={() => {
                        setActive(option.value);
                        onChange(option.value);
                    }}
                >
                    <Icon icon="/images/theme/entry-type.svg" width="16px" />
                    {option.name}
                </button>
            ))}
        </div>
    );
};

const LazySelectTickerType = LazySelect;

const FormActive = ({ closeModal }: any) => {
    const { walletId } = useContext(WalletContext);
    const helpers = useHelpers();
    const [currency, setCurrency] = useState('BRL');
    const [form, setForm] = useState({
        type: 'BUY',
        tickerType: null,
        otherName: '',
        ticker: '',
        date: new Date().toISOString().split('T')[0],
        qty: 1,
        applied: 0,
        price: 0,
        cost: 0,
        emitter: '',
        indexer: '',
        due_date: '',
        percentage_cdi: 0,
        rate_type: 'POST',
        investment_type: 'LCI'
    });

    const {
        data: priceQuotation,
        loading: loadingQuotation,
        fetch: fetchQuotation
    } = useFetch({
        autoDispatch: false
    });

    const {
        data: submitResult,
        loading: submitLoading,
        fetch: postSubmit
    } = useFetch({
        autoDispatch: false
    });

    useEffect(() => {
        if (form.tickerType && form.tickerType !== 'Other') {
            if (
                ['Reit', 'Stock', 'EtfInternational'].includes(form.tickerType)
            ) {
                setCurrency('USD');
            } else {
                setCurrency('BRL');
            }
            (LazySelectTickerType as any).setData([]);
            setForm({ ...form, ticker: '', price: 0 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.tickerType]);

    useEffect(() => {
        if (form.tickerType != 'Crypto' && form.ticker && !form.price) {
            fetchQuotation({
                route: `api/quotation/${form.tickerType}/${form.ticker}/price?date=${form.date}&type=${form.type}`
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.ticker]);

    useEffect(() => {
        if (priceQuotation) {
            setForm({ ...form, price: priceQuotation });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceQuotation]);

    const selectedCurrency = useMemo(() => {
        return currencyOptions.find((item) => item.value === currency);
    }, [currency]);

    const qtyEntries = useMemo(() => {
        const applied = form.applied || 0;
        const price = form.price || 0;
        const total = applied / price;
        return isNaN(total) ? 0 : total.toFixed(2);
    }, [form.price, form.applied]);

    const total = useMemo(() => {
        const price = form.price || 0;
        const qty = form.qty || 0;
        const cost = form.cost || 0;
        const total = price * qty + cost;
        return helpers.formatMoney(total, currency);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.price, form.qty, form.cost]);

    const cancelClick = (e: any) => {
        e.preventDefault();
        closeModal();
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        const payload = {
            ...form,
            ticker_type: form.tickerType,
            user_wallet_id: walletId,
            source: 'MANUAL'
        };

        postSubmit({
            method: 'POST',
            route: `api/entries/${walletId}/store`,
            params: payload,
            autoDispatch: true
        });
    };

    useEffect(() => {
        if (submitResult?.status === 422) {
            const errors = submitResult?.errors || {};
            const errorText = Object.keys(errors)
                .map((key: string) => `- ${errors[key]}\n`)
                .join('');
            Swal.fire({
                icon: 'error',
                title: errorText,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
        }
        console.log(submitResult);
    }, [submitResult]);

    return (
        <form
            className={`form-entries ${
                submitLoading ? 'is-loading lock-mouse' : ''
            }`}
            onSubmit={onSubmit}
        >
            <SwitchTypeEntry
                options={typeOptions}
                value={form.type}
                onChange={(val: string) => setForm({ ...form, type: val })}
                style={{ marginBottom: '16px' }}
            />
            <div className="form-row">
                <div className="form-col">
                    <label>Tipo de ativo</label>
                    <Select2
                        value={form.tickerType}
                        onSelect={(e: any) => {
                            setForm({ ...form, tickerType: e.target.value });
                        }}
                        data={tickerTypeOptions.map((option) => ({
                            id: option.value,
                            text: option.name
                        }))}
                        options={{
                            placeholder: 'Selecionar'
                        }}
                    />
                </div>
                <div className="form-col">
                    <If condition={form.tickerType === 'Other'}>
                        <>
                            <label>Nome do ativo</label>
                            <InputText
                                value={form.otherName}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        otherName: e.target.value
                                    })
                                }
                            />
                        </>
                    </If>
                    <If
                        condition={
                            form.tickerType !== 'Other' &&
                            form.tickerType !== 'FixedIncome'
                        }
                    >
                        <>
                            <label>Ativo</label>
                            <LazySelectTickerType
                                value={form.ticker}
                                onSelect={(value: any) =>
                                    setForm({ ...form, ticker: value })
                                }
                                url={`api/options/${form.tickerType}`}
                            />
                        </>
                    </If>
                </div>
            </div>
            <If condition={form.tickerType === 'FixedIncome'}>
                <div className="form-row">
                    <div className="form-col">
                        <label>Emissor</label>
                        <InputText
                            required
                            value={form.emitter}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    emitter: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className="form-col">
                        <label>Tipo de título</label>
                        <Select2
                            value={form.investment_type}
                            onSelect={(e: any) => {
                                setForm({
                                    ...form,
                                    investment_type: e.target.value
                                });
                            }}
                            data={investmentTypeOptions.map((option) => ({
                                id: option.value,
                                text: option.name
                            }))}
                            options={{
                                placeholder: 'Selecionar'
                            }}
                        />
                    </div>
                </div>
            </If>
            <div className="form-row">
                <div className="form-col">
                    <label>
                        Data da {form.type === 'BUY' ? 'compra' : 'venda'}
                    </label>
                    <InputText
                        type="date"
                        required
                        value={form.date}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                date: e.target.value
                            })
                        }
                    />
                </div>
                <If condition={form.tickerType === 'FixedIncome'}>
                    <div className="form-col">
                        <label>Indexador</label>
                        <Select2
                            value={form.indexer}
                            onSelect={(e: any) => {
                                setForm({
                                    ...form,
                                    indexer: e.target.value
                                });
                            }}
                            data={indexerOptions.map((option) => ({
                                id: option.value,
                                text: option.name
                            }))}
                            options={{
                                placeholder: 'Selecionar'
                            }}
                        />
                    </div>
                </If>
                <If condition={form.tickerType !== 'FixedIncome'}>
                    <div className="form-col">
                        <label>
                            {form.tickerType === 'Fund'
                                ? 'Total investido'
                                : 'Quantidade'}
                        </label>
                        <If condition={form.tickerType === 'Fund'}>
                            <InputNumber
                                required
                                value={form.applied}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        applied: e.value as any
                                    })
                                }
                            />
                        </If>
                        <If condition={form.tickerType !== 'Fund'}>
                            <InputNumber
                                required
                                value={form.qty}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        qty: e.value as any
                                    })
                                }
                            />
                        </If>
                    </div>
                </If>
            </div>
            <div className="form-row">
                <div className="form-col">
                    <label>
                        {form.tickerType === 'FixedIncome' ? 'Valor' : 'Preço'}{' '}
                        {form.tickerType === 'Fund' ? 'da cota' : ''} em{' '}
                        {selectedCurrency?.symbol}
                    </label>
                    <InputNumber
                        value={form.price}
                        onValueChange={(e) =>
                            setForm({ ...form, price: e.value as any })
                        }
                        mode="currency"
                        currency={selectedCurrency?.value}
                        locale={selectedCurrency?.language}
                        disabled={loadingQuotation}
                    />
                </div>
                <If condition={form.tickerType !== 'FixedIncome'}>
                    <div className="form-col">
                        <label>
                            Outros custos
                            <small>(Opcional)</small>
                        </label>
                        <InputNumber
                            required
                            value={form.cost}
                            mode="currency"
                            currency={selectedCurrency?.value}
                            locale={selectedCurrency?.language}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    cost: e.value as any
                                })
                            }
                        />
                    </div>
                </If>
                <If condition={form.tickerType === 'FixedIncome'}>
                    <div className="form-col">
                        <label>Data de vencimento</label>
                        <InputText
                            type="date"
                            required
                            value={form.due_date}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    due_date: e.target.value
                                })
                            }
                        />
                    </div>
                </If>
            </div>
            <If condition={form.tickerType === 'FixedIncome'}>
                <div className="form-row">
                    <div className="form-col">
                        <label>Taxa do CDI+</label>
                        <InputNumber
                            value={form.percentage_cdi}
                            onValueChange={(e) =>
                                setForm({
                                    ...form,
                                    percentage_cdi: e.value as any
                                })
                            }
                            suffix="%"
                        />
                    </div>
                    <div className="form-col">
                        <label>Forma</label>
                        <Select2
                            value={form.rate_type}
                            onSelect={(e: any) => {
                                setForm({
                                    ...form,
                                    rate_type: e.target.value
                                });
                            }}
                            data={rateTypeOptions.map((option) => ({
                                id: option.value,
                                text: option.name
                            }))}
                            options={{
                                placeholder: 'Selecionar'
                            }}
                        />
                    </div>
                </div>
            </If>
            <If condition={form.tickerType === 'Fund'}>
                <div className="form-row">
                    <div className="form-col total">
                        <div>Quantidade de cotas</div>
                        <div>{qtyEntries}</div>
                    </div>
                </div>
            </If>
            <div className="form-row">
                <div className="form-col total">
                    <div>Valor total</div>
                    <div>{total}</div>
                </div>
            </div>
            <div className="form-row" style={{ marginTop: 10 }}>
                <div className="form-col center-y">
                    <If condition={!submitLoading}>
                        <a href="#" onClick={cancelClick}>
                            Cancelar
                        </a>
                    </If>
                </div>
                <div className="form-col">
                    <button
                        className="btn primary"
                        type="submit"
                        disabled={submitLoading}
                    >
                        <Icon icon="/images/theme/plus.svg" width="16px" />
                        Adicionar
                    </button>
                </div>
            </div>
        </form>
    );
};
