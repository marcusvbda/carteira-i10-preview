import './_styles.scss';
import Dropdown from '@/components/common/dropdown';
import Actions from './_actions';
import ProfileDropdown from './_profileDropdown';
import MenuItems from './_menuItems';
import { seo } from '@/constants/seo';
import Link from 'next/link';
import Icon from '../common/icon';
import { useContext } from 'react';
import { WalletContext } from '@/context/walletContext';
import B3Integration from '../b3Integration';
import ModalActive from '../modalActive';

const Logo = (): JSX.Element => {
    return (
        <Link href={seo.summary.path} className="logo">
            <Icon icon="/images/logo.webp" width="100%" height="100%" />
        </Link>
    );
};

export const NavBar = (): JSX.Element => {
    const { setWalletId, selectedWallet, wallets } = useContext(WalletContext);
    const selectWallet = (item: any) => {
        setWalletId(item.id);
    };

    return (
        <nav className="default-navbar">
            <div className="primary-row container">
                <Logo />
                <div className="divisor" />
                <Dropdown
                    modalTitle="Outras carteiras"
                    title={selectedWallet?.name || ''}
                    options={wallets.filter(
                        (wallet: any) => wallet.id !== selectedWallet?.id
                    )}
                    action={selectWallet}
                />
                <Actions />
                <ProfileDropdown />
            </div>
            <div className="secondary-row container">
                <MenuItems />
                <div className="create-btns hide-on-mobile hide-on-tablet">
                    <B3Integration />
                    <ModalActive />
                </div>
            </div>
        </nav>
    );
};
