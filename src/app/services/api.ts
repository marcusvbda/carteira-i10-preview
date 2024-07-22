import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { authOptions } from '@/authOptions';
import { envoriment } from '@/constants/environment';

export const apiCall = async (req: any, url: string, settings = {}) => {
	const cx = await getToken({ req });
	try {
		const { user } = cx as any;
		const res = await fetch(`${envoriment.apiUrl}/api/wallet-app/${url}`, {
			headers: {
				Authorization: `Bearer ${user.jwt}`,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			...settings,
		});
		if (res.ok) {
			return await res.json();
		}
		const error = await res.json();
		return {
			error: error?.message,
			status: res?.status,
			errors: error?.errors || [],
		};
	} catch (error: any) {
		// console.log(error);
		return {
			error: error?.message,
			status: 500,
			errors: error?.errors || [],
		};
	}
};

export const fetchServer = async (
	url: string,
	settings = {},
	apiRoute = false,
) => {
	const session = await getServerSession(authOptions);
	const token = (session?.user as any)?.jwt || '';
	// const { user } = cx as any;
	try {
		const request = await fetch(
			apiRoute ? url : `${envoriment.apiUrl}/api/wallet-app/${url}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				...settings,
			},
		);
		// console.log(`${envoriment.apiUrl}/api/wallet-app/${url}`, token);

		if (request.ok) return await request.json();
	} catch (error) {
		console.log(error);
		return null;
	}
};
