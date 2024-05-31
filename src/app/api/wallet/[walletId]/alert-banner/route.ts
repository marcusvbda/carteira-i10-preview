import { apiCall } from '@/app/services/api';

export async function GET(req: any, { params }: any) {
	const result = await apiCall(
		req,
		`api/rest/wallets/${params.walletId}/alert-banner`,
	);
	return Response.json(result);
}
