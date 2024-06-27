import { fetchServer } from '@/app/services/api';

export const getSummaryData = async (walletId: string): Promise<any> => {
	const getDatatableContent = async (type: string) => {
		return fetchServer(`summary/actives/${walletId}/${type}`);
	};

	const getDatatableData = async () => {
		const [tickerData, fiiData, cryptoData, fundData] = await Promise.all([
			getDatatableContent('Ticker'),
			getDatatableContent('Fii'),
			getDatatableContent('Crypto'),
			getDatatableContent('Fund'),
		]);

		return { tickerData, fiiData, cryptoData, fundData };
	};

	const result = await Promise.all([
		fetchServer(`summary/alerts/${walletId}`),
		getDatatableData(),
		fetchServer(`summary/donutchart/${walletId}`),
		fetchServer(`summary/barchart/${walletId}/12/all`),
	]);
	return result;
};
