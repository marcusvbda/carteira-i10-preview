import { fetchServer } from '@/app/services/api';

export const getEarningsData = async (walletId: string): Promise<any> => {
	const result = await Promise.all([
		fetchServer(`earnings/barchart/${walletId}/received`),
		fetchServer(`earnings/list/${walletId}`),
		fetchServer(`earnings/summary-card/${walletId}`),
	]);
	return result;
};
