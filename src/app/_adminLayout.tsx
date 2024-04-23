'use client';

import { Footer } from '@/components/footer';
import { NavBar } from '@/components/navbar';
import ScrollToTop from '@/components/scrollTop';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: any): JSX.Element {
    const pathname = usePathname();
    const isAuthRoute = pathname.startsWith('/auth');

    if (isAuthRoute) {
        return <>{children}</>;
    }

    return (
        <>
            <NavBar />
            {children}
            <Footer />
            <ScrollToTop />
        </>
    );
}
