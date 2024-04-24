import { apiCall } from '@/app/services/api';

export async function GET(req: any, { params }: any) {
    const date = new URL(req.url).searchParams.get('date');
    const type = new URL(req.url).searchParams.get('type');
    const result = await apiCall(req, `api/minhas-carteiras/quotation`, {
        method: 'POST',
        body: JSON.stringify({
            ticker_type: params.type,
            ticker: params.id,
            date,
            type
        })
    });
    return Response.json(result);
}
