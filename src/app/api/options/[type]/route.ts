import { apiCall } from '@/app/services/api';

export async function GET(req: any, { params }: any) {
	const { type } = params;
	const term = new URL(req.url).searchParams.get('term');
	const result = await apiCall(
		req,
		`api/buscar/${type}?term=${term}&_type=query&q=${term}`,
	);
	return Response.json(result);
}
