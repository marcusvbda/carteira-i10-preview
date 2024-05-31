'use client';

import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { AuthContext } from './authContext';

export const WalletContext = createContext<any>({});

export const WalletProvider = ({ children }: any): ReactNode => {
	const [visible, setVisible] = useState(false);
	const { user } = useContext(AuthContext);
	const [wallets, setWallets] = useState<any>((user as any)?.wallets || []);
	const [walletId, setWalletId] = useState<any>(
		((user as any)?.wallets || [])[0]?.id || '',
	);

	const selectedWallet = useMemo(() => {
		return wallets.find((w: any) => w.id === walletId);
	}, [walletId, wallets]);

	useEffect(() => {
		setVisible(false);
		setTimeout(() => {
			setVisible(true);
		});
	}, [walletId]);

	if (!visible) return <></>;

	return (
		<WalletContext.Provider
			value={{
				walletId,
				setWalletId,
				selectedWallet,
				wallets,
				setWallets,
			}}
		>
			{children}
		</WalletContext.Provider>
	);
};
