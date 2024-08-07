import { fetchServer } from '@/app/services/api';

export const getSummaryData = async (walletId: string): Promise<any> => {
	const result = await Promise.all([
		fetchServer(`summary/alerts/${walletId}`),
		fetchServer(`summary/info/${walletId}`),
	]);
	return result;
};
