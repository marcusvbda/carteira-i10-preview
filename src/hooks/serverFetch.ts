import { getServerSession } from 'next-auth';
import { authOptions } from '@/authOptions';
import { envoriment } from '@/constants/environment';

export const userServerFetch = async (url: string) => {
	const session: any = await getServerSession(authOptions);
	const res = await fetch(`${envoriment.apiUrl}/api/wallet-app/${url}`, {
		headers: {
			Authorization: `Bearer ${session?.user.jwt}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});
	return await res.json();
};
