import { apiCall } from '@/app/services/api';

export async function POST(req: any) {
	const body = await req.json();
	const result = await apiCall(req, `goals/store`, {
		method: 'POST',
		body: JSON.stringify(body),
	});
	return Response.json(result);
}
