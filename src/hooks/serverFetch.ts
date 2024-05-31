import { getServerSession } from 'next-auth';
import { authOptions } from '@/authOptions';

export const userServerFetch = async (url: string) => {
	const session: any = await getServerSession(authOptions);
	const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/${url}`, {
		headers: {
			Authorization: `Bearer ${session?.user.jwt}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});
	return await res.json();
};
