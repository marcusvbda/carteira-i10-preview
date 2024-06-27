import { apiCall } from '@/app/services/api';

export async function GET(req: any, { params }: any) {
	const urlRaw = new URL(req.url);
	const date = urlRaw.searchParams.get('date');
	const type = urlRaw.searchParams.get('type');
	const payload = {
		ticker_type: params.type,
		ticker: params.id,
		date,
		type,
	};
	const urlParams = new URLSearchParams(payload as any).toString();
	const url = `quotation?${urlParams}`;
	const result = await apiCall(req, url);
	return Response.json(result);
}
