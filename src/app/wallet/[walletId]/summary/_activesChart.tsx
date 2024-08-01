'use client';

import { ReactNode, useContext } from 'react';
import DonutChart from '@/components/charts/donutChart';
import { WalletContext } from '@/context/walletContext';
import { useFetch } from '@/hooks/fetch';

export default function ActivesChart(): ReactNode {
	const { walletId } = useContext(WalletContext);

	const { data: donutChartData, loading: donutChartLoading } = useFetch({
		route: `/api/summary/${walletId}/donutchart`,
	});

	return (
		<DonutChart loading={donutChartLoading} data={donutChartData}>
			<div className="chart-header">
				<h4 className="chart-header__title">Ativos na Carteira</h4>
			</div>
		</DonutChart>
	);
}
