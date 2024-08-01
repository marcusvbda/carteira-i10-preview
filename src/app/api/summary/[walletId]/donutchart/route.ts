import { apiCall } from '@/app/services/api';

export async function GET(req: any, { params }: any) {
	const result = await apiCall(req, `summary/donutchart/${params.walletId}`);
	return Response.json(result);
}
