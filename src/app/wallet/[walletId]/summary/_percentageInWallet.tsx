'use client';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import Select2 from 'react-select2-wrapper';
import Icon from '@/components/common/icon';
import Modal from '@/components/common/modal';
import { useSwal } from '@/hooks/swal';
import 'react-select2-wrapper/css/select2.css';
const NewTypes = ({ types, setTypes }: any): ReactNode => {
	const [visible, setVisible] = useState(false);
	const { toast } = useSwal();
	const options = useMemo(() => {
		setVisible(false);
		const allOptions = [
			{ id: 'BDRs', text: 'BDRs' },
			{ id: 'Criptomoedas', text: 'Criptomoedas' },
			{ id: 'ETFs Internacionais', text: 'ETFs Internacionais' },
			{ id: 'Fundos imobiliarios', text: 'Fundos Iibiliarios' },
			{ id: 'Investimentos', text: 'Investimentos' },
			{ id: 'Rendas extras', text: 'Rendas extras' },
			{ id: 'Stocks', text: 'Stocks' },
			{ id: 'Outros', text: 'Outros' },
		];

		return allOptions.filter(
			(item: any) => !Object.keys(types).includes(item.id),
		);
	}, [types]);

	const [newType, setNewType] = useState('');
	const submit = () => {
		if (newType) {
			const keys = Object.keys(types);
			if (keys.includes(newType)) {
				return toast('error', 'Tipo ja existente');
			}
			setTypes({ ...types, [newType]: 0 });
			setNewType('');
			setVisible(false);
		}
	};

	if (!options.length) return <></>;

	return (
		<div className="new-type">
			{visible && (
				<div className="input">
					<Select2
						style={{ width: 200 }}
						value={newType}
						onSelect={(e: any) => setNewType(e.target.value)}
						data={options}
						options={{
							placeholder: 'Selecione',
							minimumResultsForSearch: -1,
						}}
					/>
					{newType && (
						<button className="btn primary small" onClick={() => submit()}>
							Adicionar
						</button>
					)}
				</div>
			)}
			{!visible && (
				<div className="add" onClick={() => setVisible(true)}>
					<Icon icon="/images/theme/plus.svg" width="16px" />
					Adicionar tipo de ativo
				</div>
			)}
		</div>
	);
};

const ItemValue = ({
	index,
	itemValues,
	setItemValues,
	value,
}: any): ReactNode => {
	const [newValue, setNewValue] = useState(value);
	const changeValue = (e: any) => {
		e.target.value = e.target.value.replace(/[^0-9]/g, '');
		if (e.target.value > 100) e.target.value = 100;
		if (e.target.value < 0) e.target.value = 0;
		setNewValue(Number(e.target.value));
	};

	const clickBtn = (e: any, type: string) => {
		e.preventDefault();

		if (type === 'add') {
			if (newValue >= 100) return;
			setNewValue(Number(newValue) + 1);
		} else {
			if (newValue <= 0) return;
			setNewValue(Number(newValue) - 1);
		}
	};

	useEffect(() => {
		setItemValues({ ...itemValues, [index]: newValue });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newValue]);

	const remove = (e: any) => {
		e.preventDefault();
		delete itemValues[index];
		setItemValues({ ...itemValues });
	};

	return (
		<div className="item-row">
			<div className="content-input">
				<div className="label">{index}</div>
				<div className="input">
					<a href="#" onClick={(e) => clickBtn(e, 'sub')}>
						<Icon icon="/images/theme/sub.svg" width="20px" />
					</a>
					<input type="percentage" onChange={changeValue} value={newValue} />
					<div className="perc-value">%</div>
					<a href="#" onClick={(e) => clickBtn(e, 'add')}>
						<Icon icon="/images/theme/add.svg" width="20px" />
					</a>
				</div>
			</div>
			<a href="#" onClick={(e) => remove(e)}>
				<Icon icon="/images/theme/trash.svg" width="24px" />
			</a>
		</div>
	);
};

const Total = ({ total }: any): ReactNode => {
	const valueClass = useMemo(() => {
		if (total === 0) return 'neutral';
		return total === 100 ? 'positive' : 'negative';
	}, [total]);

	return (
		<div className="total">
			<div className="total-row">
				<h3>Total</h3>
				<div className="percentages">
					<div className={`current-value ${valueClass}`}>{total}%</div>
					<div className="separator">/</div>
					<div className="ideal-value">100%</div>
				</div>
			</div>
			{total !== 100 && (
				<div className="disclaimer">
					Reorganize a distribuição dos ativos para alcançar 100%.
				</div>
			)}
		</div>
	);
};

const FormPercentage = ({ setModalVisible, setPercentage }: any) => {
	const [itemValues, setItemValues] = useState<any>({
		Ações: 0,
		'Fundos imobiliarios': 0,
		Criptomoedas: 0,
		Investimentos: 0,
	});
	const submit = () => {
		return alert('não implementado');
		setPercentage(totalValue);
		setModalVisible(false);
	};

	const totalValue: any = Object.values(itemValues).reduce(
		(a: any, b: any) => a + b,
		0,
	);

	return (
		<div className="form-percentage">
			<small>
				Adicione ou remova os tipos de ativo que deseja ter na carteira e então,
				defina a porcentagem ideal para cada um deles.
			</small>
			<div className="item-rows">
				{Object.keys(itemValues).map((key: any) => (
					<ItemValue
						key={key}
						index={key}
						value={itemValues[key]}
						setItemValues={setItemValues}
						itemValues={itemValues}
					/>
				))}
			</div>
			<Total total={totalValue} />
			<NewTypes types={itemValues} setTypes={setItemValues} />
			<div className="form-footer">
				<button
					className="btn link"
					style={{ paddingLeft: 0 }}
					onClick={() => setModalVisible(false)}
				>
					Cancelar
				</button>
				<button className="btn primary" onClick={() => submit()}>
					Salvar
				</button>
			</div>
		</div>
	);
};

export default function PercentageInWallet({ percentage }: any): ReactNode {
	const [modalVisible, setModalVisible] = useState(false);
	const [percentageValue, setPercentageValue] = useState(null);

	return (
		<>
			<strong>% na carteira</strong>
			<div className="percentage-ticker">
				<div className="muted">{parseInt(String(percentage))}%</div>
				<div className="dark dash">/</div>
				<Modal
					size="40%"
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					title="Porcentagem ideal por tipo de ativo"
					source={
						percentageValue === null ? (
							<span className="not-defined clickable">Definir % ideal</span>
						) : (
							<span className="dark clickable">{percentageValue}%</span>
						)
					}
					content={
						<FormPercentage
							setModalVisible={setModalVisible}
							setPercentage={setPercentageValue}
						/>
					}
				/>
			</div>
		</>
	);
}
