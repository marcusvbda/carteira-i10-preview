'use client';

import { ReactNode } from 'react';
import AlertsCard from '@/components/cards/alerts';
import TrendCard from '@/components/cards/trend';

import VariationCard from '@/components/cards/variation';
import './_styles.scss';
import { useHelpers } from '@/hooks/helpers';

export default function Metrics({ data, alerts }: any): ReactNode {
	const helpers = useHelpers();

	return (
		<section className="section-metrics trends">
			<TrendCard
				title="Patrimônio real"
				icon="patrimony"
				amount={data?.equity}
				investAmount={data?.applied}
				result
				loading={false}
			/>
			<TrendCard
				title="Proventos recebidos"
				icon="earnings"
				amount={data?.payments_total}
				investAmount={data?.applied}
				loading={false}
				result={false}
			/>
			<VariationCard
				title="Rentabilidade"
				icon="profitability"
				variation={data?.variation}
				variationAmount={
					helpers.parseMoneyToNumber(data?.equity || 0) -
					helpers.parseMoneyToNumber(data?.applied || 0)
				}
				profit={data?.profit_twr}
				loading={false}
			/>
			<AlertsCard
				title="Análise"
				icon="analysis"
				loading={false}
				messages={alerts}
			/>
		</section>
	);
}
