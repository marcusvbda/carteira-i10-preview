import './_styles.scss';
import React, { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import Details from './_details';
import Evolution from './_evolution';
import History from './_history';
import Summary from './_summary';

export const metadata: Metadata = seo.earnings;
interface IProps {
	walletId: string;
	summaryData: any;
	barchartData: any;
	detailsData: any;
	totalMonths: any;
}

export default function EarningsPageContent({
	walletId,
	summaryData,
	barchartData,
	detailsData,
	totalMonths,
}: IProps): ReactNode {
	return (
		<div className="page-container earnings-page">
			<div className="container-row">
				<Summary
					defaultData={summaryData}
					totalMonths={totalMonths}
					detailsData={detailsData}
				/>
				<Evolution defaultData={barchartData} walletId={walletId} />
			</div>
			<History defaultData={barchartData} />
			<Details defaultData={detailsData} />
		</div>
	);
}
