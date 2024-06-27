'use client';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { envoriment } from '@/constants/environment';

export default function Signin({ searchParams }: any) {
	const session = useSession();
	const { callbackUrl, token } = searchParams;
	const serverUri = envoriment.apiUrl;
	const currentUrl = encodeURIComponent(window.location.href);

	useEffect(() => {
		(async () => {
			const redirectTo = callbackUrl || '/';
			if (session.data?.user) {
				window.location.href = redirectTo;
				return;
			}
			if (token) {
				return await signIn('credentials', {
					token,
					callbackUrl: redirectTo,
					redirect: true,
				});
			}
			window.location.href = `${serverUri}/get-wallet-token?callbackUrl=${currentUrl}`;
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>Redirecionando ...</>;
}
