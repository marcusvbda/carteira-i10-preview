import { fetchServer } from '@/app/services/api';

export const getEntriesData = async (walletId: string): Promise<any> => {
	const getDatatableContent = async (type: number) => {
		return fetchServer(`api/carteiras/lancamentos/${walletId}/${type}`);
	};

	const result = await Promise.all([
		getDatatableContent(1),
		getDatatableContent(2),
		getDatatableContent(3),
		getDatatableContent(4),
		getDatatableContent(5),
	]);
	return result;
};
