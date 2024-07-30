'use client';
import { ReactNode } from 'react';
import DonutChart from '@/components/charts/donutChart';
import './_styles.scss';
import PatrimonyEvolution from './_patrimonyEvolution';

export default function Charts({ donutChartData }: any): ReactNode {
	return (
		<section className="section-charts">
			<PatrimonyEvolution />
			<DonutChart loading={false} data={donutChartData}>
				<div className="chart-header">
					<h4 className="chart-header__title">Ativos na Carteira</h4>
				</div>
			</DonutChart>
		</section>
	);
}
