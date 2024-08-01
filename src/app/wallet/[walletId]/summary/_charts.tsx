'use client';
import { ReactNode } from 'react';
import './_styles.scss';
import ActivesChart from './_activesChart';
import PatrimonyEvolution from './_patrimonyEvolution';

export default function Charts(): ReactNode {
	return (
		<section className="section-charts">
			<PatrimonyEvolution />
			<ActivesChart />
		</section>
	);
}
