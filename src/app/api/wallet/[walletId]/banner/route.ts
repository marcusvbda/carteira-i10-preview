import { apiCall } from '@/app/services/api';

export async function GET(req: any, { params }: any) {
	const result = await apiCall(req, `api/carteiras/banner/${params.walletId}`);
	return Response.json(result);
}
