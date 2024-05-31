import { apiCall } from '@/app/services/api';

export async function GET(req: any, { params }: any) {
	const result = await apiCall(
		req,
		`api/carteiras/charts/diversificacao/${params.walletId}/all`,
	);
	return Response.json(result);
}
