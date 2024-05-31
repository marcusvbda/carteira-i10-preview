import './_styles.scss';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import Details from './_details';
import Evolution from './_evolution';
import History from './_history';
import Summary from './_summary';

export const metadata: Metadata = seo.earnings;

export default function EarningsPage(): ReactNode {
	return (
		<section className="earnings-page">
			<div className="page-container">
				<div className="container-row">
					<Summary />
					<Evolution />
				</div>
				<History />
				<Details />
			</div>
		</section>
	);
}
