import { apiCall } from '@/app/services/api';

export async function GET(req: any, { params }: any) {
    const result = await apiCall(
        req,
        `api/carteiras/charts/evolucao-patrimonio/${params.walletId}/${params.qtyMonths}/${params.type}`
    );
    return Response.json(result);
}
