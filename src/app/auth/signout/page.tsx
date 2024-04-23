'use client';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function Signout() {
    const uri = process.env.NEXT_PUBLIC_SERVER_URI;
    useEffect(() => {
        signOut({
            callbackUrl: '/',
            redirect: false
        }).then(() => {
            return (window.location.href = `${uri}/logout`);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>Redirecionando ...</>;
}
