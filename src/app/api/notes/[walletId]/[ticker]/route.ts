import { apiCall } from '@/app/services/api';

export async function GET(req: any, { params }: any) {
	const result = await apiCall(
		req,
		`notes/${params.walletId}/${params.ticker}`,
	);
	return Response.json(result);
}

export async function POST(req: any, { params }: any) {
	const payload = await req.json();
	const result = await apiCall(
		req,
		`notes/${params.walletId}/${params.ticker}`,
		{
			method: 'POST',
			body: JSON.stringify({ ...payload, other: 0, ticker_id: params.ticker }),
		},
	);
	return Response.json(result);
}
