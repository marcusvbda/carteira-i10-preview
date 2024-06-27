import { apiCall } from '@/app/services/api';

export async function PUT(req: any) {
	const body = await req.json();
	const result = await apiCall(req, `ticker/update`, {
		method: 'PUT',
		body: JSON.stringify(body),
	});
	return Response.json(result);
}
