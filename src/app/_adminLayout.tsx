'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Footer } from '@/components/footer';
import { NavBar } from '@/components/navbar';
import ScrollToTop from '@/components/scrollTop';

export default function AdminLayout({ children }: any): ReactNode {
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
