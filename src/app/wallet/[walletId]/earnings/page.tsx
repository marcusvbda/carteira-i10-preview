import './_styles.scss';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import Details from './_details';
import Evolution from './_evolution';
import History from './_history';
import { getEarningsData } from './_methods';
import Summary from './_summary';

export const metadata: Metadata = seo.earnings;
interface IProps {
	params: { walletId: string };
}

export default async function EarningsPage({
	params,
}: IProps): Promise<ReactNode> {
	const { walletId } = params;
	const [barchartData, detailsData, summaryData] =
		await getEarningsData(walletId);
	return (
		<section className="earnings-page">
			<div className="page-container">
				<div className="container-row">
					<Summary defaultData={summaryData} />
					<Evolution defaultData={barchartData} walletId={walletId} />
				</div>
				<History defaultData={barchartData} />
				<Details defaultData={detailsData} />
			</div>
		</section>
	);
}
