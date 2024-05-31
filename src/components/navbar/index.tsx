import './_styles.scss';
import { ReactNode } from 'react';
import Link from 'next/link';
import { seo } from '@/constants/seo';
import B3Integration from '../b3Integration';
import Icon from '../common/icon';
import ModalEntries from '../modalEntries';
import Actions from './_actions';
import MenuItems from './_menuItems';
import ProfileDropdown from './_profileDropdown';
import SelectWallet from './_selectWallet';

const Logo = (): ReactNode => {
	return (
		<Link href={seo.summary.path} className="logo">
			<Icon icon="/images/logo.webp" width="100%" height="100%" />
		</Link>
	);
};

export const NavBar = (): ReactNode => {
	// const selectWallet = (item: any) => {
	//     setWalletId(item.id);
	// };

	return (
		<nav className="default-navbar">
			<div className="primary-row container">
				<Logo />
				<div className="divisor" />
				<SelectWallet />
				{/* <Dropdown
                    modalTitle="Outras carteiras"
                    title={selectedWallet?.name || ''}
                    options={wallets.filter(
                        (wallet: any) => wallet.id !== selectedWallet?.id
                    )}
                    action={selectWallet}
                /> */}
				<Actions />
				<ProfileDropdown />
				<div className="btn-plus hide-on-desktop hide-on-tablet">
					<ModalEntries className="very-small" hideText />
				</div>
			</div>
			<div className="secondary-row container">
				<MenuItems />
				<div className="create-btns hide-on-mobile hide-on-tablet">
					<B3Integration />
					<ModalEntries />
				</div>
			</div>
		</nav>
	);
};
