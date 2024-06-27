import { apiCall } from '@/app/services/api';

export async function POST(req: any) {
	const payload = await req.json();
	const result = await apiCall(req, `entry/store`, {
		method: 'POST',
		body: JSON.stringify(payload),
	});
	return Response.json(result);
}
