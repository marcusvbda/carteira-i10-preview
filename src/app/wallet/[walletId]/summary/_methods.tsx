import { fetchServer } from '@/app/services/api';

export const getSummaryData = async (walletId: string): Promise<any> => {
	const result = await Promise.all([
		fetchServer(`summary/alerts/${walletId}`),
		fetchServer(`summary/info/${walletId}`),
		fetchServer(`summary/donutchart/${walletId}`),
		fetchServer(`summary/barchart/${walletId}/12/all`),
	]);
	return result;
};
