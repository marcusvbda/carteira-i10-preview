import { getToken } from 'next-auth/jwt';
import { envoriment } from '@/constants/environment';

export const apiCall = async (req: any, url: string, settings = {}) => {
	const cx = await getToken({ req });
	const { user } = cx as any;
	const res = await fetch(`${envoriment.apiUrl}/${url}`, {
		headers: {
			Authorization: `Bearer ${user.jwt}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		...settings,
	});
	if (res.ok) return await res.json();
	const error = await res.json();
	return {
		error: error?.message,
		status: res?.status,
		errors: error?.errors || [],
	};
};
