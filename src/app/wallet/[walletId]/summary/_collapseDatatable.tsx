'use client';

import React, {
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import AspectRatio from '@/components/common/aspectRatio';
import { Datatable } from '@/components/common/datatable';
import Icon from '@/components/common/icon';
import Modal from '@/components/common/modal';
import SensitiveContent from '@/components/common/sensitiveContent';
import Skeleton from '@/components/common/skeleton';
import Tooltip from '@/components/common/tooltip';
import Trend from '@/components/common/trend';
import YesOrNo from '@/components/common/yesOrNo';
import DropdownMenu from '@/components/dropdownMenu';
import LockedComponent from '@/components/locked';
import ScoreComponent from '@/components/score';
import { envoriment } from '@/constants/environment';
import { WalletContext } from '@/context/walletContext';
import { useFetch } from '@/hooks/fetch';
import { useHelpers } from '@/hooks/helpers';
import DatatableInfo from './_datatableInfo';
import DatatablePostTitle from './_datatablePostTitle';

const defaultColumns = [
	'ticker',
	'quantity',
	'avg_price',
	'current_price',
	'appreciation',
	'equity_total',
	'bazin',
	'score',
	'percent_wallet',
	'buy',
];

export default function CollapseDatatable({
	defaultCollapsed,
	infoData,
	type,
}: any): ReactNode {
	const { walletId } = useContext(WalletContext);
	const helpers = useHelpers();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [rows, setRows] = useState<any[]>([]);
	const [obsModalVisible, setObsModalVisible] = useState(false);
	const [rowObs, setRowObs] = useState<any>(null);

	const title = useMemo(() => {
		const classValue = (type?.class || '') as string;
		return classValue
			.replace(/(<([^>]+)>)/gi, ' ')
			.replace('&nbsp;', '')
			.trim();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const total = useMemo(() => {
		return type?.count || 0;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const totalAmount = useMemo(() => {
		return type?.equity || 0;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const percent = useMemo(() => {
		return type?.percent || 0;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const rentability = useMemo(() => {
		return type?.rentability || 0;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const balancing = useMemo(() => {
		return type?.balancing || 0;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const localStorageColumns = useMemo(() => {
		return JSON.parse(
			localStorage.getItem(`datatable-columns-${title}`) || '[]',
		);
	}, [title]);

	const checkIsVisible = (field: string) => {
		const persistValue = (localStorageColumns || []).find(
			(x: any) => x.field === field,
		);
		if (persistValue !== undefined) {
			return persistValue?.visible;
		}
		return defaultColumns.includes(field);
	};

	const [columns, setColumns] = useState<any>([
		{
			field: 'ticker',
			title: 'Ativo',
			group: 'Dados básicos',
			visible: true,
			locked: true,
			sortable: true,
			body: (row: any): ReactNode => {
				return (
					<div className="datatable-cell-row">
						<div dangerouslySetInnerHTML={{ __html: row.ticker }} />
					</div>
				);
			},
		},
		{
			field: 'quantity',
			group: 'Dados básicos',
			title: 'Quantidade',
			visible: true,
			sortable: true,
			locked: true,
			body: (row: any): ReactNode => (
				<div className="datatable-cell-row">
					<SensitiveContent>{row.quantity}</SensitiveContent>
				</div>
			),
		},
		{
			field: 'avg_price',
			title: 'Preço médio',
			group: 'Dados básicos',
			sortable: true,
			visible: checkIsVisible('avg_price'),
			body: (row: any): ReactNode => {
				return (
					<div className="datatable-cell-row">
						<SensitiveContent>
							{helpers.formatMoney(row.avg_price)}
						</SensitiveContent>
					</div>
				);
			},
		},
		{
			field: 'current_price',
			title: 'Preço atual',
			group: 'Dados básicos',
			visible: checkIsVisible('current_price'),
			body: (row: any): ReactNode => {
				return (
					<div className="datatable-cell-row">
						<SensitiveContent>
							{helpers.formatMoney(row.current_price)}
						</SensitiveContent>
					</div>
				);
			},
		},
		{
			field: 'appreciation',
			title: 'Variação',
			group: 'Dados básicos',
			sortable: true,
			visible: checkIsVisible('appreciation'),
			body(row: any): ReactNode {
				let value = row.appreciation;
				let type = '';
				if (value !== 0) {
					type = value > 0 ? 'positive' : 'negative';
					if (type === 'negative') value *= -1;
					value = helpers.formatNumber(value);
				}
				return <Trend type={type} size="14px" value={`${value}%`} />;
			},
		},
		{
			field: 'equity_total',
			title: 'Saldo',
			group: 'Dados básicos',
			sortable: true,
			visible: checkIsVisible('equity_total'),
			body: (row: any): ReactNode => {
				return (
					<div className="datatable-cell-row">
						<SensitiveContent style={{ textAlign: 'left' }}>
							{helpers.formatMoney(row.equity_total)}
						</SensitiveContent>
					</div>
				);
			},
		},
		{
			field: 'graham',
			name: 'Preço justo ( Graham )',
			visible: checkIsVisible('graham'),
			title: (): ReactNode => {
				return (
					<div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
						<div>
							Preço Justo
							<br />
							<small>Graham</small>
						</div>
						<Tooltip content="Indica o valor máximo a ser pago por uma ação, de acordo com a metodologia de Décio Bazin.">
							<Icon
								className="hide"
								icon="/images/theme/info.svg"
								width="12px"
								height="12px"
							/>
						</Tooltip>
					</div>
				);
			},
			group: 'Dados básicos',
			body: (row: any): ReactNode =>
				row.graham ? (
					' - '
				) : (
					<LockedComponent content={helpers.formatMoney(row.graham)} />
				),
		},
		{
			field: 'bazin',
			name: 'Preço teto ( Bazin )',
			visible: checkIsVisible('bazin'),
			title: (): ReactNode => {
				return (
					<div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
						<div>
							Preço teto
							<br />
							<small>Bazin</small>
						</div>
						<Tooltip content="Indica o valor máximo a ser pago por uma ação, de acordo com a metodologia de Décio Bazin.">
							<Icon
								className="hide"
								icon="/images/theme/info.svg"
								width="12px"
								height="12px"
							/>
						</Tooltip>
					</div>
				);
			},
			group: 'Dados básicos',
			body: (row: any): ReactNode =>
				row.bazin ? (
					' - '
				) : (
					<LockedComponent content={helpers.formatMoney(row.bazin)} />
				),
		},
		{
			field: 'score',
			name: 'Minha nota',
			title: (): ReactNode => {
				return (
					<div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
						Nota
						<Tooltip content="Com base na nota informada pra cada ativo, o Investidor10 calcula a porcentagem ideal que você deve ter do ativo em sua carteira.">
							<Icon
								className="hide"
								icon="/images/theme/info.svg"
								width="12px"
								height="12px"
							/>
						</Tooltip>
					</div>
				);
			},
			group: 'Dados básicos',
			visible: checkIsVisible('score'),
			sortable: true,
			body: (row: any): ReactNode => (
				<ScoreComponent
					row={row as any}
					type={type?.type}
					onSubmit={(val: any) => (row.raw_rating = val)}
				/>
			),
		},
		{
			field: 'percent_wallet',
			title: '% na carteira',
			group: 'Dados básicos',
			visible: checkIsVisible('percent_wallet'),
			sortable: true,
			body: (row: any): ReactNode => {
				return (
					<div className="datatable-cell-row">
						{helpers.formatNumber(row.percent_wallet)}%
					</div>
				);
			},
		},
		{
			field: 'percent_ideal',
			title: '% ideal',
			group: 'Dados básicos',
			visible: checkIsVisible('percent_ideal'),
			sortable: true,
			body: (row: any): ReactNode => {
				return (
					<div className="datatable-cell-row">
						{helpers.formatNumber(row.percent_ideal)}%
					</div>
				);
			},
		},
		{
			field: 'buy',
			title: 'Comprar ?',
			group: 'Dados básicos',
			sortable: true,
			visible: checkIsVisible('buy'),
			body: (row: any): ReactNode => {
				const value = (row.buy || '').replace(/(<([^>]+)>)/gi, '');
				const valueBool = value === 'SIM';
				return <YesOrNo value={valueBool} />;
			},
		},
		{
			field: 'avg_rating',
			group: 'Dados básicos',
			title: 'Média de Avaliações',
			name: 'Média de Avaliações',
			sortable: false,
			visible: checkIsVisible('avg_rating'),
			body: (row: any): ReactNode => {
				const count = row?.raw_avg_rating || 0;
				const stars = new Array(count).fill(<span>⭐</span>);
				const rest = new Array(5 - count).fill(
					<span style={{ filter: 'grayscale(1)' }}>⭐</span>,
				);
				return stars.concat(rest);
			},
		},
		{
			field: 'payout',
			title: 'Payout',
			name: 'Payout',
			group: 'Dados fundamentais',
			sortable: true,
			visible: checkIsVisible('payout'),
			body: (row: any) =>
				row.payout ? ' - ' : `${helpers.formatNumber(row.payout)}%`,
		},
		{
			field: 'dy',
			title: 'DY',
			visible: checkIsVisible('dy'),
			sortable: true,
			group: 'Dados fundamentais',
			body: (row: any) => (row.dy ? ' - ' : `${helpers.formatNumber(row.dy)}%`),
		},
		{
			field: 'pvp',
			title: 'P/VP',
			visible: checkIsVisible('pvp'),
			sortable: true,
			group: 'Dados fundamentais',
			body: (row: any) => `${helpers.formatNumber(row.p_vp)}%`,
		},
		{
			field: 'p_l',
			title: 'P/L',
			visible: checkIsVisible('p_l'),
			sortable: true,
			group: 'Dados fundamentais',
			body: (row: any) => `${helpers.formatNumber(row.p_l)}%`,
		},
		{
			field: 'yoc',
			title: 'Yield On Cost (YOC)',
			visible: checkIsVisible('yoc'),
			group: 'Dados fundamentais',
			sortable: true,
			body: (row: any) => helpers.formatNumber(row.yoc),
		},
		{
			field: 'net_margin',
			title: 'Margem Líquida',
			visible: checkIsVisible('net_margin'),
			group: 'Dados fundamentais',
			sortable: true,
			body: (row: any) => `${helpers.formatNumber(row.net_margin)}%`,
		},
		{
			field: 'roe',
			title: 'ROE',
			visible: checkIsVisible('roe'),
			group: 'Dados fundamentais',
			sortable: true,
		},
		{
			field: 'gross_margin',
			title: 'Margem Bruta',
			visible: checkIsVisible('gross_margin'),
			group: 'Dados fundamentais',
			sortable: true,
			body: (row: any) => `${helpers.formatNumber(row.gross_margin)}%`,
		},
		{
			field: 'gnr',
			title: 'CAGR Receitas (5 anos) ',
			visible: checkIsVisible('gnr'),
			sortable: true,
			group: 'Dados fundamentais',
			body: (row: any) => (row.gnr ? '-' : `${helpers.formatNumber(row.gnr)}%`),
		},
		{
			field: 'gnp',
			title: 'CAGR Lucros (5 anos) ',
			visible: checkIsVisible('gnp'),
			sortable: true,
			group: 'Dados fundamentais',
			body: (row: any) => (row.gnp ? '-' : `${helpers.formatNumber(row.gnp)}%`),
		},
		{
			field: 'options',
			title: 'Opções',
			group: 'settings',

			visible: true,
			body: (row: any): ReactNode => {
				return (
					<DropdownMenu
						items={[
							{
								label: 'Ver lançamentos',
								action: () => router.push(`/wallet/${walletId}/entries`),
							},
							{
								label: 'Ver fundamentos',
								action: () =>
									router.push(`${envoriment.apiUrl}/acoes/${row.ticker_name}`),
							},
							{
								label: 'Minhas observações',
								action: () => [setRowObs(row), setObsModalVisible(true)],
							},
						]}
					/>
				);
			},
		},
	]);

	useEffect(() => {
		fetch(`/api/summary/${walletId}/actives/${type.type}`).then(
			(response: any) => {
				response.json().then((result: any) => {
					setRows(result.data);
					setLoading(false);
				});
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Datatable
				title={title}
				defaultCollapsed={defaultCollapsed === true}
				pagination={false}
				loading={loading}
				actions={
					<DatatablePostTitle
						rows={rows}
						columns={columns}
						setColumns={setColumns}
						tickerType={type}
						defaultColumns={defaultColumns}
					/>
				}
				summary={
					<DatatableInfo
						qty={total}
						totalAmount={totalAmount}
						percent={percent}
						profitability={rentability}
						percentageIdeal={balancing}
						infoData={infoData}
					/>
				}
				columns={columns.filter((x: any) => x.visible)}
				rows={rows}
			/>
			<ObsModal
				row={rowObs}
				modalVisible={obsModalVisible}
				setModalVisible={setObsModalVisible}
			/>
		</>
	);
}

const ObsForm = ({ ticker, setModalVisible }: any) => {
	const { walletId } = useContext(WalletContext);
	const { loading, data } = useFetch({
		route: `/api/notes/${walletId}/${ticker.id}`,
	});

	const saveNewNote = (e: any, value: string, id?: number) => {
		e.preventDefault();
		setModalVisible && setModalVisible(false);
		Swal.fire({
			title: 'Confirmação',
			text: 'Tem certeza que deseja salvar ?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sim, salvar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				setModalVisible && setModalVisible(false);
				fetch(`/api/notes/${walletId}/${ticker.id}`, {
					method: 'POST',
					body: JSON.stringify({
						note: value,
						note_id: id,
					}),
				});
			}
		});
	};

	const deleteNote = (e: any, id: number) => {
		e.preventDefault();
		Swal.fire({
			title: 'Confirmação',
			text: 'Tem certeza que deseja deletar ?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sim, deletar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				setModalVisible && setModalVisible(false);
				fetch(`/api/notes/${walletId}/delete/${id}`, {
					method: 'DELETE',
				});
			}
		});
	};

	if (loading) return <Skeleton width="100%" height="300px" />;

	return (
		<>
			<div className="obs-list">
				{(data || [])?.map &&
					(data || []).map((item: any, key: number) => (
						<Accordion key={key} className="obs-item">
							<AccordionSummary
								className="obs-title"
								expandIcon={
									<div className="obs-icon">
										<ExpandMoreIcon />
									</div>
								}
							>
								{new Date(item.created_at).toLocaleDateString('pt-BR')}
							</AccordionSummary>
							<AccordionDetails>
								<textarea rows={6} id={`obs-value-${item.id}`}>
									{item.note}
								</textarea>
								<div className="obs-actions">
									<a
										href="#"
										className="delete"
										onClick={(e: any) => deleteNote(e, item.id)}
									>
										<AspectRatio
											src="/images/theme/trash-red.svg"
											size={{ width: 16 }}
										/>
										Deletar observação
									</a>
									<button
										className="btn primary"
										onClick={(e: any) =>
											saveNewNote(
												e,
												(document.querySelector(`#obs-value-${item.id}`) as any)
													?.value,
												item.id,
											)
										}
									>
										Salvar alterações
									</button>
								</div>
							</AccordionDetails>
						</Accordion>
					))}
			</div>
			<div className="obs-list">
				<Accordion className="obs-item" defaultExpanded>
					<AccordionSummary
						className="obs-title"
						expandIcon={
							<div className="obs-icon">
								<ExpandMoreIcon />
							</div>
						}
					>
						{new Date().toLocaleDateString('pt-BR')}
					</AccordionSummary>
					<AccordionDetails>
						<textarea rows={6} id="new-obs-value" />
						<div className="obs-actions">
							<a
								href="#"
								onClick={(e: any) => [
									e.preventDefault(),
									setModalVisible(false),
								]}
								className="cancel"
							>
								Cancelar
							</a>
							<button
								className="btn primary"
								onClick={(e: any) =>
									saveNewNote(
										e,
										(document.querySelector(`#new-obs-value`) as any)?.value,
									)
								}
							>
								Salvar alterações
							</button>
						</div>
					</AccordionDetails>
				</Accordion>
			</div>
		</>
	);
};

const ObsModal = ({ row, modalVisible, setModalVisible }: any) => {
	return (
		<div className="flex rating-component">
			<Modal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				size="650px"
				title={`Minhas observações (${row?.ticker_name || ''})`}
				source={<></>}
				content={<ObsForm ticker={row} setModalVisible={setModalVisible} />}
			/>
		</div>
	);
};
