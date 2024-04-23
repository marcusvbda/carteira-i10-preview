'use client';

import { createContext, useState } from 'react';

export const AuthContext = createContext<any>({});

export const AuthProvider = ({ children, session }: any): JSX.Element => {
    const [jwt, setJwt] = useState<any>(session?.user?.jwt || '');
    const [user, setUser] = useState<any>(session?.user?.user || {});

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                jwt,
                setJwt
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
