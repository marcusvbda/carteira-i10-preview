import { apiCall } from '@/app/services/api';

export async function GET(req: any, { params }: any) {
	const result = await apiCall(
		req,
		`profitability/${params.walletId}/compare-chart/${params.months}/${params.type}`,
	);
	return Response.json(result);
}
