import { fetchServer } from '@/app/services/api';

export const getProfitabilityData = async (walletId: string): Promise<any> => {
	const result = await Promise.all([
		fetchServer(`profitability/${walletId}/table`),
		fetchServer(`profitability/${walletId}/summary`),
	]);
	return result;
};
