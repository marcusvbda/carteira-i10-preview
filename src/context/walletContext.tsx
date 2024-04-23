'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { AuthContext } from './authContext';

export const WalletContext = createContext<any>({});

export const WalletProvider = ({ children }: any): JSX.Element => {
    const { user } = useContext(AuthContext);
    const [wallets, setWallets] = useState<any>((user as any)?.wallets || []);
    const [walletId, setWalletId] = useState<any>(
        ((user as any)?.wallets || [])[0]?.id || ''
    );

    const selectedWallet = useMemo(() => {
        return wallets.find((w: any) => w.id === walletId);
    }, [walletId, wallets]);

    return (
        <WalletContext.Provider
            value={{
                walletId,
                setWalletId,
                selectedWallet,
                wallets,
                setWallets
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};
