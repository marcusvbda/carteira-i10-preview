'use client';
import { ReactNode, useContext, useMemo, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import Select2 from 'react-select2-wrapper';
import AspectRatio from '@/components/common/aspectRatio';
import Icon from '@/components/common/icon';
import InputCurrency from '@/components/common/InputCurrency';
import Modal from '@/components/common/modal';
import RadioType from '@/components/common/radioType';
import 'react-select2-wrapper/css/select2.css';
import Tooltip from '@/components/common/tooltip';
import { WalletContext } from '@/context/walletContext';

const FormStep = ({ step, setStep, defaultType, onSaved }: any) => {
	const [loading, setLoading] = useState(false);
	const { walletId } = useContext(WalletContext);
	const [provenForm, setProvenForm] = useState({
		type: ['Ticker', 'Fii', 'Stock', 'StockBdr'],
		value: 0,
	});

	const categories = useMemo(
		() => [
			{ id: 'Equity', text: 'Total de patrimônio' },
			{ id: 'National', text: 'Total investido no Brasil' },
			{ id: 'International', text: 'Total investido no exterior' },
			{ id: 'Ticker', text: 'Total investido em Ações' },
			{ id: 'Fund', text: 'Total investido em Fundos de Investimentos' },
			{ id: 'Fii', text: 'Total investido em FIIs' },
			{ id: 'Etf', text: 'Total investido em ETFs' },
			{
				id: 'EtfInternational',
				text: 'Total investido em ETFs Internacionais',
			},
			{ id: 'Stock', text: 'Total investido em Stocks' },
			{ id: 'StockBdr', text: 'Total investido em BDRs' },
			{ id: 'Crypto', text: 'Total investido em Criptomoedas' },
			{ id: 'Treasure', text: 'Total investido em Tesouro Direto' },
			{ id: 'FixedIncome', text: 'Total Investido em Renda Fixa' },
			{ id: 'Other', text: 'Total em Outros' },
		],
		[],
	);

	const activeTypes = useMemo(
		() => [
			{ id: 'Ticker', text: 'Ações' },
			{ id: 'Fund', text: 'Fundos de Investimentos' },
			{ id: 'Fii', text: 'FIIs' },
			{ id: 'Crypto', text: 'Criptomoedas' },
			{ id: 'Stock', text: 'Stock' },
			{ id: 'StockBdr', text: 'BDRs' },
			{ id: 'Etf', text: 'ETFs' },
			{ id: 'EtfInternational', text: 'ETFs Internacionais' },
			{ id: 'Treasure', text: 'Tesouro Direto' },
			{ id: 'CDB', text: 'CDB', group: 'Renda Fixa' },
			{ id: 'LCI', text: 'LCI', group: 'Renda Fixa' },
			{ id: 'LCA', text: 'LCA', group: 'Renda Fixa' },
			{ id: 'LC', text: 'LC', group: 'Renda Fixa' },
			{ id: 'LF', text: 'LF', group: 'Renda Fixa' },
			{ id: 'RDB', text: 'RDB', group: 'Renda Fixa' },
		],
		[],
	);

	const saveHandler = () => {
		setLoading(true);
		if (step === 'proven') {
			const types: any = {};
			for (let i = 0; i < provenForm.type.length; i++) {
				types[provenForm.type[i]] = true;
			}

			const payload = {
				type: 'payments',
				user_wallet_id: walletId,
				target_equity: provenForm.value,
				types,
			};

			fetch('/api/goals/store', {
				method: 'POST',
				body: JSON.stringify(payload),
			}).then(() => {
				setLoading(false);
				onSaved && onSaved();
			});
		}
	};

	const cancel = (e: any) => {
		e.preventDefault();
		setStep(null);
	};

	return (
		<div className="form-step">
			<div className="goal-dialog-content">
				{step === 'patrimony' && (
					<>
						<div className="form-row">
							<div className="type-badge">Meta de Patrimônio</div>
						</div>
						<div className="form-row">
							<div className="input-item">
								<label>Escolha uma categoria para sua meta</label>
								<Select2
									data={categories}
									options={{
										placeholder: 'Selecionar ...',
									}}
								/>
							</div>
							<div className="input-item">
								<label>Valor total</label>
								<InputText placeholder="R$ 20.000,00" />
							</div>
						</div>
						<h5 className="description">
							Como você planeja alcançar essa meta?
						</h5>
						<div className="form-row with-desc">
							<div className="input-item">
								<label>Aporte mensal</label>
								<InputText placeholder="R$ 5.000,00" />
							</div>
							<div className="input-item">
								<label>Estimativa de variação anual</label>
								<InputText placeholder="10%" />
							</div>
						</div>
					</>
				)}
				{step === 'actives' && (
					<>
						<div className="form-row">
							<div className="type-badge">Meta de Ativos</div>
						</div>
						<div className="form-row">
							<div className="input-item">
								<label>Tipo de ativo</label>
								<Select2
									data={activeTypes}
									options={{
										placeholder: 'Selecionar',
									}}
								/>
							</div>
							<div className="input-item">
								<label>Ativo</label>
								<Select2
									data={[]}
									options={{
										placeholder: 'Selecionar',
									}}
								/>
							</div>
						</div>
						<h5 className="description">
							Como você planeja alcançar essa meta?
						</h5>
						<div className="form-row with-desc">
							<div className="input-item">
								<label>Aporte mensal</label>
								<InputText placeholder="R$ 5.000,00" />
							</div>
							<div className="input-item">
								<label>Estimativa de variação anual</label>
								<InputText placeholder="10%" />
							</div>
						</div>
						<div className="form-row with-desc">
							<div className="input-item">
								<label>Valor final da meta</label>
								<InputText placeholder="R$ 20.000,00" />
							</div>
							<div className="input-item"></div>
						</div>
					</>
				)}
				{step === 'proven' && (
					<>
						<div className="form-row">
							<div className="type-badge">Meta de Proventos</div>
						</div>
						<div className="form-row">
							<div className="input-item">
								<label>Selecione os tipos de ativos</label>
								<RadioType
									options={[
										{
											id: 'Ticker',
											text: 'Ações',
											icon: '/images/theme/ticker-icon.svg',
										},
										{
											id: 'Stock',
											text: 'Stocks',
											icon: '/images/theme/stocks-icon.svg',
										},
										{
											id: 'Fii',
											text: 'FIIs',
											icon: '/images/theme/fiis-icon.svg',
										},
										{
											id: 'StockBdr',
											text: 'BDRs',
											icon: '/images/theme/bdrs-icon.svg',
										},
									]}
									value={provenForm.type}
									onChange={(value: any) =>
										setProvenForm({ ...provenForm, type: value })
									}
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="input-item">
								<label>
									Média de proventos que deseja receber mensalmente (R$)
								</label>
								<InputCurrency
									value={provenForm.value}
									onChange={(value: any) =>
										setProvenForm({ ...provenForm, value })
									}
								/>
								<div className="input-desc">
									<Tooltip content="Considerando a média de proventos recebidos nos 'últimos 12 meses'.">
										<AspectRatio
											src="/images/theme/info-icon.svg"
											size={{ width: 16 }}
										/>
									</Tooltip>
									Consideramos a média de proventos recebidos nos últimos 12
									meses.
								</div>
							</div>
						</div>
					</>
				)}
			</div>
			<div className="form-footer" style={{ marginTop: 24 }}>
				{[undefined, null].includes(defaultType) && (
					<button className="btn link" onClick={cancel}>
						Cancelar
					</button>
				)}
				<button
					className="btn primary"
					style={{ marginLeft: 'auto' }}
					onClick={() => saveHandler()}
					disabled={loading}
				>
					{loading ? 'Aguarde' : 'Salvar'}
				</button>
			</div>
		</div>
	);
};

const GoalTypeBtn = ({ icon, title, description, onClick }: any): ReactNode => {
	return (
		<div className="goal-type-item" onClick={onClick}>
			<div className="icon-ball">
				<Icon icon={`/images/theme/${icon}.svg`} width="23px" height="23px" />
			</div>
			<div className="info">
				<div className="title">{title}</div>
				<div className="description">{description}</div>
			</div>
		</div>
	);
};

export const GoalDialogContent = ({ defaultType, onSaved }: any): ReactNode => {
	const [step, setStep] = useState<string | null>(
		defaultType ? defaultType : null,
	);
	return (
		<>
			{step === null ? (
				<div className="goal-dialog-content">
					<GoalTypeBtn
						onClick={() => setStep('patrimony')}
						icon="patrimony-icon"
						title="Meta de patrimônio"
						description="Defina uma meta de patrimônio que melhor se alinhe com seu perfil de investimento e seus objetivos pessoais."
					/>
					<GoalTypeBtn
						onClick={() => setStep('actives')}
						icon="wallet-icon"
						title="Meta de ativos"
						description="Estabeleça metas por tipos de ativos de acordo com seu perfil."
					/>
					<GoalTypeBtn
						onClick={() => setStep('proven')}
						icon="coins-icon"
						title="Meta de proventos"
						description="Estabeleça a média de proventos que deseja receber mensalmente por tipo de ativo."
					/>
				</div>
			) : (
				<FormStep
					step={step}
					setStep={setStep}
					defaultType={defaultType}
					onSaved={onSaved}
				/>
			)}
		</>
	);
};

export const CreateGoalBtn = ({
	text,
	source,
	defaultType,
	onSaved,
}: any): ReactNode => {
	return (
		<Modal
			size="min(90%,800px)"
			title="Criar nova meta"
			source={
				source ? (
					source
				) : (
					<button className="btn primary btn-create">
						<Icon icon="/images/theme/plus.svg" width="16px" />
						{text}
					</button>
				)
			}
			content={
				<GoalDialogContent defaultType={defaultType} onSaved={onSaved} />
			}
		/>
	);
};

export default function ModalCreate(): ReactNode {
	return (
		<>
			<Icon
				className="icon-start"
				icon="/images/theme/goals-create.svg"
				height="125.385px"
				width="105.333px"
			/>
			<h4>Comece a criar suas metas financeiras</h4>
			<div className="description">
				Metas financeiras servem como um guia para as decisões sobre o dinheiro,
				ajudando a manter o foco e a disciplina, bem como permitir que o
				indivíduo avalie o progresso em relação aos seus objetivos. 
			</div>
			<CreateGoalBtn text="Criar meta" />
		</>
	);
}
