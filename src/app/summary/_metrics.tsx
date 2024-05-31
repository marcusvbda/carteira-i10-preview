'use client';

import { useContext, useEffect, ReactNode } from 'react';
import AlertsCard from '@/components/cards/alerts';
import TrendCard from '@/components/cards/trend';

import VariationCard from '@/components/cards/variation';
import './_styles.scss';
import { WalletContext } from '@/context/walletContext';
import { useFetch } from '@/hooks/fetch';
import { useHelpers } from '@/hooks/helpers';

export default function Metrics(): ReactNode {
	const helpers = useHelpers();
	const { walletId } = useContext(WalletContext);
	const {
		loading: metricsLoading,
		data: metricsData,
		fetch: fetchMetricsData,
	} = useFetch({
		autoDispatch: false,
	});

	const {
		loading: alertsLoading,
		data: alertsData,
		fetch: fetchAlerts,
	} = useFetch({
		autoDispatch: false,
	});

	useEffect(() => {
		fetchMetricsData({
			route: `/api/wallet/${walletId}/banner`,
		});
		fetchAlerts({
			route: `/api/wallet/${walletId}/alert-banner`,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [walletId]);

	return (
		<section className="section-metrics trends">
			<TrendCard
				title="Patrimônio real"
				icon="patrimony"
				amount={metricsData?.equity}
				investAmount={metricsData?.applied}
				result
				loading={metricsLoading}
			/>
			<TrendCard
				title="Proventos recebidos"
				icon="earnings"
				amount={metricsData?.payments_total}
				investAmount={metricsData?.applied}
				loading={metricsLoading}
				result={false}
			/>
			<VariationCard
				title="Rentabilidade"
				icon="profitability"
				variation={metricsData?.variation}
				variationAmount={
					helpers.parseMoneyToNumber(metricsData?.equity || 0) -
					helpers.parseMoneyToNumber(metricsData?.applied || 0)
				}
				profit={metricsData?.profit_twr}
				loading={metricsLoading}
			/>
			<AlertsCard
				title="Análise"
				icon="analysis"
				loading={alertsLoading}
				messages={alertsData}
			/>
		</section>
	);
}
