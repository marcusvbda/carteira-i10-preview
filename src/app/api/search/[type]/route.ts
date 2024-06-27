import { apiCall } from '@/app/services/api';

export async function GET(req: any, { params }: any) {
	const { type } = params;
	const term = new URL(req.url).searchParams.get('term');
	const result = await apiCall(req, `search/${type}/${term}`);
	return Response.json(result);
}
