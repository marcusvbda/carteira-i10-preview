'use client';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { seo } from '@/constants/seo';
import { WalletContext } from '@/context/walletContext';
import Icon from '../common/icon';

export default function B3Integration() {
	const { walletId } = useContext(WalletContext);
	const router = useRouter();
	const path = `/wallet/${walletId}${seo.integrationB3.path}`;

	const goToPage = () => router.push(path);

	return (
		<button className="btn" onClick={goToPage}>
			<Icon icon="/images/theme/b3.svg" width="20px" height="16px" />
			Integração B3
		</button>
	);
}
