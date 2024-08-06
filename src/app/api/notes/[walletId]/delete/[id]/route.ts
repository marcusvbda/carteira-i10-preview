import { apiCall } from '@/app/services/api';

export async function DELETE(req: any, { params }: any) {
	const result = await apiCall(req, `notes/${params.walletId}/${params.id}`, {
		method: 'DELETE',
	});
	return Response.json(result);
}
