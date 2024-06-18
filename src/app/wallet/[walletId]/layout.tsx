import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/authOptions';
import DefaultLayout from '@/layouts/default';

interface IProps {
	children: ReactNode;
	params: { walletId: string };
}
export default async function RootLayout({ params, children }: IProps) {
	const session = await getServerSession(authOptions);
	const wallets = (session as any)?.user.user.wallets || [];
	const { walletId } = params;
	const selectedWallet = wallets.find(
		(w: any) => parseInt(w.id) === parseInt(walletId),
	);
	if (!selectedWallet) {
		return notFound();
	}
	return <DefaultLayout>{children}</DefaultLayout>;
}
