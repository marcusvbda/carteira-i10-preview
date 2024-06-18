'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Footer } from '@/components/footer';
import { NavBar } from '@/components/navbar';
import ScrollToTop from '@/components/scrollTop';
import './_styles.scss';

export default function DefaultLayout({ children }: any): ReactNode {
	const pathname = usePathname();
	const isAuthRoute = pathname.startsWith('/auth');

	if (isAuthRoute) {
		return <>{children}</>;
	}

	return (
		<>
			<NavBar pathname={pathname} />
			{children}
			<Footer />
			<ScrollToTop />
		</>
	);
}
