import { apiCall } from '@/app/services/api';

export async function GET(req: any, { params }: any) {
	const result = await apiCall(
		req,
		`earnings/summary-card/${params.walletId}/total-months?qtyMonths=${params.qty}`,
	);
	return Response.json(result);
}
