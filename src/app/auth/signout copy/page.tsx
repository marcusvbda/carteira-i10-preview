'use client';
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { envoriment } from '@/constants/environment';

export default function Signout() {
	const uri = envoriment.apiUrl;
	useEffect(() => {
		signOut({
			callbackUrl: '/',
			redirect: false,
		}).then(() => {
			return (window.location.href = `${uri}/logout`);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>Redirecionando ...</>;
}
