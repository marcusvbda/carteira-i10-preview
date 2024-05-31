'use client';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';

export default function Signin({ searchParams }: any) {
	const session = useSession();
	const { callbackUrl, token } = searchParams;
	const serverUri = process.env.NEXT_PUBLIC_SERVER_URI;
	const currentUrl = encodeURIComponent(window.location.href);

	useEffect(() => {
		(async () => {
			const redirectTo = callbackUrl || '/';
			if (session.data?.user) {
				window.location.href = redirectTo;
				return;
			}
			if (token) {
				await signIn('credentials', {
					token,
					callbackUrl: redirectTo,
				});
				return;
			}
			window.location.href = `${serverUri}/get-wallet-token?callbackUrl=${currentUrl}`;
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>Redirecionando ...</>;
}
