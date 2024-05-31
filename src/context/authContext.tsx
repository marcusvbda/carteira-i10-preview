'use client';

import { ReactNode, createContext, useState } from 'react';

export const AuthContext = createContext<any>({});

export const AuthProvider = ({ children, session }: any): ReactNode => {
	const [jwt, setJwt] = useState<any>(session?.user?.jwt || '');
	const [user, setUser] = useState<any>(session?.user?.user || {});

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				jwt,
				setJwt,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
