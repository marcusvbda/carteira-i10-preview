import { apiCall } from '@/app/services/api';

export async function POST(req: any, { params }: any) {
	const payload = await req.json();
	const result = await apiCall(
		req,
		`api/minhas-carteiras/lancamentos/${params.walletId}`,
		{
			method: 'POST',
			body: JSON.stringify(payload),
		},
	);
	return Response.json(result);
}
