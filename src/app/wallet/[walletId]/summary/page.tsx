import { CSSProperties, ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import Charts from './_charts';
import Datatables from './_datatables';
import Metrics from './_metrics';

export const metadata: Metadata = seo.summary;

interface IProps {
	metricsData: any[];
	alertsData: any[];
	donutChartData: any[];
	defaultBarChartData: any[];
	infoData: any;
}

export default function SummaryPage({
	metricsData,
	alertsData,
	donutChartData,
	defaultBarChartData,
	infoData,
}: IProps): ReactNode {
	return (
		<div
			className="page-container"
			style={{ '--bg-color': 'var(--surface-secondary)' } as CSSProperties}
		>
			<Metrics data={metricsData} alerts={alertsData} />
			<Charts
				donutChartData={donutChartData}
				defaultBarChartData={defaultBarChartData}
			/>
			<Datatables infoData={infoData} />
		</div>
	);
}
