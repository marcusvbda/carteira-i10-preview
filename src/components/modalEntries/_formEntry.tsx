'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import Select2 from 'react-select2-wrapper';
import {
	currencyOptions,
	indexerOptions,
	investmentTypeOptions,
	rateTypeOptions,
	tickerTypeOptions,
	typeOptions,
} from '@/constants/options';
import { WalletContext } from '@/context/walletContext';
import { useFetch } from '@/hooks/fetch';
import { useHelpers } from '@/hooks/helpers';
import { useSwal } from '@/hooks/swal';
import Icon from '../common/icon';
import 'react-select2-wrapper/css/select2.css';
import If from '../common/if';
import InputCurrency from '../common/InputCurrency';
import LazySelect from '../common/lazySelect';

const SwitchTypeEntry = ({ options, value, onChange, style }: any) => {
	const [active, setActive] = useState(value);
	return (
		<div className="switch-type-entry" style={{ ...style }}>
			{options.map((option: any, index: number) => (
				<button
					type="button"
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

interface IProps {
	closeModal: any;
	tickerType?: string;
	onSubmitAction?: any;
}

export default function FormEntry({
	closeModal,
	tickerType,
	onSubmitAction,
}: IProps) {
	const defaultState = {
		type: 'BUY',
		tickerType: tickerType || 'Ticker',
		otherName: '',
		ticker: '',
		date: new Date().toISOString().split('T')[0],
		qty: 1,
		applied: 1,
		price: 0,
		cost: 0,
		emitter: '',
		indexer: '',
		due_date: '',
		percentage_cdi: 0,
		rate_type: 'POST',
		investment_type: 'LCI',
	};

	const [, setTickerTypeData] = useState([]);
	const { toast } = useSwal();
	const { walletId } = useContext(WalletContext);
	const helpers = useHelpers();
	const [currency, setCurrency] = useState('BRL');
	const [form, setForm] = useState(defaultState);

	const { data: priceQuotation, fetch: fetchQuotation } = useFetch({
		autoDispatch: false,
	});

	const {
		data: submitResult,
		loading: submitLoading,
		fetch: postSubmit,
	} = useFetch({
		autoDispatch: false,
	});

	useEffect(() => {
		if (form.tickerType && form.tickerType !== 'Other') {
			if (['Reit', 'Stock', 'EtfInternational'].includes(form.tickerType)) {
				setCurrency('USD');
			} else {
				setCurrency('BRL');
			}
			setTickerTypeData([]);
			setForm({ ...form, ticker: '', price: 0 });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.tickerType]);

	useEffect(() => {
		if (form.tickerType != 'Crypto' && form.ticker && !form.price) {
			fetchQuotation({
				route: `/api/quotation/${form.tickerType}/${form.ticker}/price?date=${form.date}&type=${form.type}`,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.ticker]);

	useEffect(() => {
		if (priceQuotation) {
			setForm({ ...form, price: priceQuotation });
			toast('success', 'Sugestão de cotação recuperada para a data informada');
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
		const response = isNaN(total) ? 0 : total.toFixed(2);
		return response === 'Infinity' ? 0 : response;
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
		closeModal && closeModal();
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		const selectedTickerFields =
			tickerTypeOptions.find((x: any) => x.value === form.tickerType)?.fields ||
			[];

		const formFields: any = {};
		selectedTickerFields.forEach((field: string) => {
			formFields[field] = (form as any)[field];
		});

		postSubmit({
			method: 'POST',
			route: `/api/entries/store`,
			params: {
				...formFields,
				ticker: form.ticker,
				user_wallet_id: walletId,
				source: 'MANUAL',
				ticker_type: form.tickerType,
				date: new Date(form.date).toLocaleDateString('pt-BR'),
				price: form.price,
			},
			autoDispatch: true,
		});
	};

	useEffect(() => {
		if (!submitResult) return;
		if (submitResult?.response) {
			setForm({ ...defaultState });
			return onSubmitAction && onSubmitAction();
		}
		if (submitResult?.status === 422) {
			const errors = submitResult?.errors || {};
			const errorText = Object.keys(errors)
				.map((key: string) => `- ${errors[key]}\n`)
				.join('');
			toast('error', errorText);
		} else {
			toast('error', 'Erro ao adicionar ativo');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submitResult]);

	return (
		<form
			className={`form-entries ${submitLoading ? 'is-loading lock-mouse' : ''}`}
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
							setForm({
								...form,
								tickerType: e.target.value,
							});
						}}
						data={tickerTypeOptions.map((option) => ({
							id: option.value,
							text: option.name,
						}))}
						options={{
							placeholder: 'Selecionar',
							minimumResultsForSearch: -1,
						}}
					/>
				</div>
			</div>
			<div className="form-row">
				<div className="form-col">
					<If condition={form.tickerType === 'Other'}>
						<>
							<label>Nome do ativo</label>
							<InputText
								value={form.otherName}
								onChange={(e) =>
									setForm({
										...form,
										otherName: e.target.value,
									})
								}
							/>
						</>
					</If>
					<If
						condition={
							form.tickerType !== 'Other' && form.tickerType !== 'FixedIncome'
						}
					>
						<>
							<label>Ativo</label>
							<LazySelect
								setOptionsData={setTickerTypeData}
								value={form.ticker}
								onSelect={(value: any) => setForm({ ...form, ticker: value })}
								url={`/api/search/${form.tickerType}`}
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
									emitter: e.target.value,
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
									investment_type: e.target.value,
								});
							}}
							data={investmentTypeOptions.map((option) => ({
								id: option.value,
								text: option.name,
							}))}
							options={{
								placeholder: 'Selecionar',
							}}
						/>
					</div>
				</div>
			</If>
			<div className="form-row">
				<div className="form-col">
					<label>Data da {form.type === 'BUY' ? 'compra' : 'venda'}</label>
					<InputText
						type="date"
						required
						value={form.date}
						onChange={(e) =>
							setForm({
								...form,
								date: e.target.value,
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
									indexer: e.target.value,
								});
							}}
							data={indexerOptions.map((option) => ({
								id: option.value,
								text: option.name,
							}))}
							options={{
								placeholder: 'Selecionar',
							}}
						/>
					</div>
				</If>
				<If condition={form.tickerType !== 'FixedIncome'}>
					<div className="form-col">
						<label>
							{form.tickerType === 'Fund' ? 'Valor investido' : 'Quantidade'}
						</label>
						<If condition={form.tickerType === 'Fund'}>
							<InputNumber
								required
								value={form.applied}
								onChange={(e) =>
									setForm({
										...form,
										applied: e.value as any,
									})
								}
							/>
						</If>
						<If condition={form.tickerType !== 'Fund'}>
							<>
								<If condition={form.tickerType === 'Crypto'}>
									<input
										type="number"
										required
										className="p-inputnumber-input p-inputtext p-component p-filled"
										value={form.qty}
										step="0.00001"
										onChange={(e) =>
											setForm({
												...form,
												qty: e.target.value as any,
											})
										}
									/>
								</If>
								<If condition={form.tickerType !== 'Crypto'}>
									<InputNumber
										required
										value={form.qty}
										onChange={(e) =>
											setForm({
												...form,
												qty: e.value as any,
											})
										}
									/>
								</If>
							</>
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
					<InputCurrency
						value={form.price}
						onChange={(e) => setForm({ ...form, price: e })}
					/>
				</div>
				<If condition={form.tickerType !== 'FixedIncome'}>
					<div className="form-col">
						<label>
							Outros custos
							<small>(Opcional)</small>
						</label>
						<InputCurrency
							value={form.cost}
							onChange={(e) => setForm({ ...form, cost: e })}
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
									due_date: e.target.value,
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
									percentage_cdi: e.value as any,
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
									rate_type: e.target.value,
								});
							}}
							data={rateTypeOptions.map((option) => ({
								id: option.value,
								text: option.name,
							}))}
							options={{
								placeholder: 'Selecionar',
							}}
						/>
					</div>
				</div>
			</If>
			<If condition={form.tickerType === 'Fund' && form.ticker}>
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
}
