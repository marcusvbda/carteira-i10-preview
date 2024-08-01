import './_styles.scss';
import { ReactNode } from 'react';
import AspectRatio from '@/components/common/aspectRatio';
import Icon from '@/components/common/icon';
import SensitiveContent from '@/components/common/sensitiveContent';
import Skeleton from '@/components/common/skeleton';
import Tooltip from '@/components/common/tooltip';
import Trend from '@/components/common/trend';
import { useHelpers } from '@/hooks/helpers';
import DefaultCard from '../default';

interface IProps {
	title: string;
	icon: string;
	loading: boolean;
	variation: string;
	profit: string;
	variationAmount: number;
}

const ContentProfit = ({ profit }: any): ReactNode => {
	let profitTrendClass = '';
	if (profit?.includes('-')) {
		profitTrendClass = 'negative';
	} else if (profit != '0') {
		profitTrendClass = 'positive';
	}
	return (
		<div className="card-variation--content">
			<div className="card-variation--content-col">
				<Trend
					type={profitTrendClass}
					size="20px"
					value={profit}
					transparent
					strong
				/>
			</div>
		</div>
	);
};

const ContentVariation = ({ variation, variationAmount }: any): ReactNode => {
	const helpers = useHelpers();
	let varitionTrendClass = '';
	if (variation?.includes('-')) {
		varitionTrendClass = 'negative';
	} else if (variation != '0%') {
		varitionTrendClass = 'positive';
	}

	let formatedVariationAmount = '';
	if (variationAmount < 0) {
		formatedVariationAmount = `- ${helpers.formatMoney(variationAmount * -1)}`;
	} else {
		if (variationAmount === 0) {
			formatedVariationAmount = helpers.formatMoney(variationAmount);
		} else {
			formatedVariationAmount = `+ ${helpers.formatMoney(variationAmount)}`;
		}
	}
	const formatedVariation = variation?.replace('-', '');
	return (
		<div className="card-variation--content" style={{ paddingLeft: 0 }}>
			<div className="card-variation--content-col">
				<Trend
					type={varitionTrendClass}
					size="20px"
					value={formatedVariation}
					transparent
					strong
					dark
				/>
				<div className="description">
					<SensitiveContent>
						<small>{formatedVariationAmount}</small>
					</SensitiveContent>
				</div>
			</div>
		</div>
	);
};

export default function VariationCard({
	title,
	icon,
	loading,
	variation,
	profit,
	variationAmount,
}: IProps): ReactNode {
	if (loading) return <Skeleton height="122px" />;
	return (
		<DefaultCard className="card-variation" padding="12px">
			<div>
				<h4>
					<div
						style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 6 }}
					>
						<div className="icon-ball-gray">
							<Icon
								icon={`/images/theme/${icon}.svg`}
								width="14px"
								opacity="0.7"
							/>
						</div>

						{title}
					</div>
				</h4>
				<ContentProfit profit={profit} />
			</div>
			<div>
				<h4 style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
					Variação
					<Tooltip
						content={
							<>
								<strong>Variação: {variation}%</strong>
								<br />
								<br />
								<strong>Rentabilidade: {profit}%</strong>
								<br />
								<br />
								<strong>Variação</strong>: Informa de fato quanto foi o seu
								ganho real, levando em conta o valor investido e o saldo atual.
								Não considera o pagamento de dividendos.
								<br />
								<br />
								<strong>Rentabilidade</strong>: Utilizamos a Rentabilidade
								Ponderada, esse método permite ver a rentabilidade da carteira
								excluindo distorções causadas pelos aportes ou retiradas.
								Considera o pagamento de dividendos.
								<br />
								<br />
								<strong>Importante</strong>: O sistema calcula a Rentabilidade
								Ponderada apenas uma vez ao dia.
							</>
						}
					>
						<AspectRatio
							src="/images/theme/ask-info.svg"
							size={{ width: 10 }}
						/>
					</Tooltip>
				</h4>
				<ContentVariation
					variation={variation}
					variationAmount={variationAmount}
				/>
			</div>
		</DefaultCard>
	);
}
