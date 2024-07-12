import { apiCall } from '@/app/services/api';

export async function GET(req: any, { params }: any) {
	const result = await apiCall(
		req,
		`summary/actives/${params.walletId}/${params.type}`,
	);
	return Response.json(result);
}
