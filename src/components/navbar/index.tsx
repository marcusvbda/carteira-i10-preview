import './_styles.scss';
import { ReactNode, useMemo } from 'react';
import Link from 'next/link';
import { seo } from '@/constants/seo';
import B3Integration from '../b3Integration';
import Icon from '../common/icon';
import ModalEntries from '../modalEntries';
import Actions from './_actions';
import MenuItems from './_menuItems';
import ProfileDropdown from './_profileDropdown';
import PublicActions from './_publicActions';
import PublicAvatar from './_publicAvatar';
import SelectWallet from './_selectWallet';

interface IProps {
	pathname: string;
}

export const NavBar = ({ pathname }: IProps): ReactNode => {
	const isPublicRoute = useMemo(() => {
		return pathname.startsWith('/public-wallet');
	}, [pathname]);

	const isFaq = useMemo(() => {
		return /^\/help(\/(?:\w+))?$/.test(pathname);
	}, [pathname]);

	return (
		<nav className="default-navbar" id="navbar">
			<div className="primary-row container">
				<Link
					href={isPublicRoute ? '/public-wallet' : seo.summary.path}
					className="logo"
				>
					<Icon icon="/images/logo.webp" width="100%" height="100%" />
				</Link>
				<div className="divisor" />
				{!isPublicRoute && <SelectWallet />}
				{isPublicRoute && <PublicAvatar />}
				<Actions isPublicRoute={isPublicRoute} />
				{!isPublicRoute && <ProfileDropdown />}
				{isPublicRoute && <PublicActions />}
				{isPublicRoute && (
					<div className="btn-plus hide-on-desktop hide-on-tablet">
						<ModalEntries className="very-small" hideText />
					</div>
				)}
			</div>
			{!isFaq && (
				<div className={`secondary-row container`}>
					<>
						<MenuItems isPublicRoute={isPublicRoute} />
						{!isPublicRoute && (
							<>
								<div className="create-btns hide-on-mobile hide-on-tablet">
									<B3Integration />
									<ModalEntries />
								</div>
							</>
						)}
					</>
				</div>
			)}
		</nav>
	);
};
