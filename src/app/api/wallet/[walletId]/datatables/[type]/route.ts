import { apiCall } from '@/app/services/api';

export async function GET(req: any, { params }: any) {
	const result = await apiCall(
		req,
		`api/carteiras/datatable/ativos/${params.walletId}/${params.type}`,
	);
	return Response.json(result);
}
