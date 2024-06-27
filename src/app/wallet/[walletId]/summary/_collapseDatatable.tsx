'use client';

import React, {
	useEffect,
	useMemo,
	useState,
	ReactNode,
	useContext,
} from 'react';
import { useRouter } from 'next/navigation';
import { Datatable } from '@/components/common/datatable';
import Icon from '@/components/common/icon';
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
import { useHelpers } from '@/hooks/helpers';
import DatatableFooter from './_datatableFooter';
import DatatablePostTitle from './_datatablePostTitle';

interface IProps {
	loading: boolean;
	defaultCollapsed?: boolean;
	rows: any;
	total: number;
	title: string;
	icon: string;
	tickerType: string;
	darkIcon: string;
	weighted: number;
}

export default function CollapseDatatable({
	loading,
	rows,
	total,
	title,
	icon,
	darkIcon,
	defaultCollapsed,
	tickerType,
	weighted,
}: IProps): ReactNode {
	const helpers = useHelpers();
	const router = useRouter();
	const { walletId } = useContext(WalletContext);

	const localStorageColumns = useMemo(() => {
		return JSON.parse(
			localStorage.getItem(`datatable-columns-${title}`) || '[]',
		);
	}, [title]);

	const defaultColumns = useMemo(
		() => [
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
		],
		[],
	);

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
			title: 'Valorização',
			group: 'Dados básicos',
			sortable: true,
			visible: checkIsVisible('appreciation'),
			body(row: any): ReactNode {
				let value = row.appreciation;
				let type = '';
				if (value !== 0) {
					type = value > 0 ? 'positive' : 'negative';
					if (type === 'negative') value *= -1;
					value = value.toFixed(2);
					if (value.endsWith('.00')) {
						value = value.replace('.00', '');
					}
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
			field: 'bazin',
			visible: checkIsVisible('bazin'),
			title: (): ReactNode => {
				return (
					<div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
						<div>
							Preço Justo
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
			body: (row: any): ReactNode => (
				<LockedComponent content={helpers.formatMoney(row.bazin)} />
			),
		},
		{
			field: 'score',
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
					type={tickerType}
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
				const percentage = row.percent_wallet;
				let value = percentage.toFixed(2);
				if (value.endsWith('.00')) {
					value = value.replace('.00', '');
				}
				return <div className="datatable-cell-row">{value}%</div>;
			},
		},
		{
			field: 'buy',
			title: 'Comprar',
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
			field: 'payout',
			title: 'payout',
			group: 'Dados fundamentais',
			sortable: true,
			visible: checkIsVisible('payout'),
			body: (row: any) => `${row.payout}%`,
		},
		{
			field: 'gnp',
			title: 'CAGR Lucros (5 anos)',
			visible: checkIsVisible('gnp'),
			sortable: true,
			group: 'Dados fundamentais',
			body: (row: any) => `${row.gnp}%`,
		},
		{
			field: 'dy',
			title: 'DY',
			visible: checkIsVisible('dy'),
			sortable: true,
			group: 'Dados fundamentais',
			body: (row: any) => `${row.dy}%`,
		},
		{
			field: 'pvp',
			title: 'P/VP',
			visible: checkIsVisible('pvp'),
			sortable: true,
			group: 'Dados fundamentais',
			body: (row: any) => `${row.p_vp}%`,
		},
		{
			field: 'p_l',
			title: 'P/L',
			visible: checkIsVisible('p_l'),
			sortable: true,
			group: 'Dados fundamentais',
			body: (row: any) => `${row.p_l}%`,
		},
		{
			field: 'yoc',
			title: 'Yield On Cost (YOC)',
			visible: checkIsVisible('yoc'),
			group: 'Dados fundamentais',
			sortable: true,
			body: (row: any) => `${row.yoc}%`,
		},
		{
			field: 'net_margin',
			title: 'Margem Líquida',
			visible: checkIsVisible('net_margin'),
			group: 'Dados fundamentais',
			sortable: true,
			body: (row: any) => `${row.net_margin}%`,
		},
		{
			field: 'roe',
			title: 'ROE',
			visible: checkIsVisible('roe'),
			group: 'Dados fundamentais',
			sortable: true,
			body: (row: any) => `${row.roe}%`,
		},
		{
			field: 'gross_margin',
			title: 'Margem Bruta',
			visible: checkIsVisible('gross_margin'),
			group: 'Dados fundamentais',
			sortable: true,
			body: (row: any) => `${row.gross_margin}%`,
		},
		{
			field: 'gnr',
			title: 'CAGR Receitas (5 anos) ',
			visible: checkIsVisible('gnr'),
			sortable: true,
			group: 'Dados fundamentais',
			body: (row: any) => `${row.gnr}%`,
		},
		{
			field: 'options',
			title: 'Opções',
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
						]}
					/>
				);
			},
		},
	]);

	useEffect(() => {
		localStorage.setItem(`datatable-columns-${title}`, JSON.stringify(columns));
	}, [columns, title]);

	const totalAmount = useMemo(() => {
		return (rows || []).reduce((acc: number, row: any) => {
			return acc + row.equity_total;
		}, 0);
	}, [rows]);

	const walletPercentage = useMemo(() => {
		const percentage = (rows || []).reduce((acc: number, row: any) => {
			return acc + row.percent_wallet;
		}, 0);
		let value = percentage.toFixed(2);
		if (value.endsWith('.00')) {
			value = value.replace('.00', '');
		}
		return value;
	}, [rows]);

	if (loading) {
		return <Skeleton height="150px" />;
	}

	return (
		<Datatable
			title={title}
			icon={icon}
			darkIcon={darkIcon}
			defaultCollapsed={defaultCollapsed === true}
			pagination={false}
			actions={
				<DatatablePostTitle
					rows={rows}
					columns={columns}
					setColumns={setColumns}
					tickerType={tickerType}
					defaultColumns={defaultColumns}
				/>
			}
			summary={
				<DatatableFooter
					qty={total}
					totalAmount={totalAmount}
					walletPercentage={walletPercentage}
					profitability={weighted}
				/>
			}
			columns={columns.filter((x: any) => x.visible)}
			rows={rows}
		/>
	);
}
