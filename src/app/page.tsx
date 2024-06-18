'use client';
import { useContext, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { WalletContext } from '@/context/walletContext';

export default function Page() {
	const { walletId } = useContext(WalletContext);

	useEffect(() => {
		redirect(`/wallet/${walletId}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>Redirecionando carteira...</>;
}
