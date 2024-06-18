'use client';

import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useParams } from 'next/navigation';
import { AuthContext } from './authContext';

export const WalletContext = createContext<any>({});

export const WalletProvider = ({ children }: any): ReactNode => {
	const params = useParams();
	const { user } = useContext(AuthContext);
	const [wallets, setWallets] = useState<any>((user as any)?.wallets || []);
	const [walletId, setWalletId] = useState<any>(
		((user as any)?.wallets || [])[0]?.id || '',
	);

	useEffect(() => {
		const pId = params?.walletId || ((user as any)?.wallets || [])[0]?.id;
		setWalletId(pId);
	}, [params?.walletId, setWalletId, user]);

	const selectedWallet = useMemo(() => {
		return wallets.find((w: any) => parseInt(w.id) === parseInt(walletId));
	}, [walletId, wallets]);

	return (
		<WalletContext.Provider
			value={{
				walletId,
				selectedWallet,
				wallets,
				setWallets,
			}}
		>
			{children}
		</WalletContext.Provider>
	);
};
