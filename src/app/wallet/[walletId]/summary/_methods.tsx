import { fetchServer } from '@/app/services/api';

export const getSummaryData = async (walletId: string): Promise<any> => {
	const getDatatableContent = async (type: string) => {
		return fetchServer(`api/carteiras/datatable/ativos/${walletId}/${type}`);
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
		fetchServer(`api/carteiras/banner/${walletId}`),
		fetchServer(`api/rest/wallets/${walletId}/alert-banner`),
		getDatatableData(),
		fetchServer(`api/carteiras/charts/diversificacao/${walletId}/all`),
	]);
	return result;
};
