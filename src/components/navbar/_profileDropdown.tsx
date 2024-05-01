'use client';

import { CSSProperties, useCallback, useContext } from 'react';
import Dropdown from '../common/dropdown';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/authContext';
import Modal from '../common/modal';
import Icon from '../common/icon';

const MenuProfileItem = ({ icon, title, handler }: any) => {
    return (
        <div className="menu-profile-item" onClick={handler}>
            <Icon
                width="20px"
                height="20px"
                icon={`/images/theme/${icon}.svg`}
            />
            <div className="text">{title}</div>
        </div>
    );
};

const ContentSlot = ({ user, avatarUrl }: any) => {
    const router = useRouter();
    const items = [
        {
            icon: 'wallet',
            title: 'Minha carteira',
            handler: () => router.push('/')
        },
        {
            icon: 'pro',
            title: 'Investidor10 PRO',
            handler: () => router.push('#')
        },
        {
            icon: 'star',
            title: 'Indique e Ganhe',
            handler: () => router.push('#')
        },
        {
            icon: 'like',
            title: 'Ativos que sigo',
            handler: () => router.push('#')
        },
        {
            icon: 'medal',
            title: 'Minhas conquistas',
            handler: () => router.push('#')
        },
        {
            icon: 'settings',
            title: 'Configurações',
            handler: () => router.push('#')
        },
        {
            icon: 'help',
            title: 'Suporte',
            handler: () => router.push('/help')
        }
    ];

    const clickProfile = useCallback(() => {
        router.push('#');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="menu-profile-items no-border">
                <div className="menu-profile-item" onClick={clickProfile}>
                    <div
                        className="avatar"
                        style={
                            {
                                '--avatarUrl': `url(${avatarUrl})`
                            } as CSSProperties
                        }
                    />
                    <div className="info">
                        <div className="name">{user?.name}</div>
                        <div className="email">{user?.email}</div>
                    </div>
                    <div className="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M11.3535 8.35375L6.35354 13.3538C6.30708 13.4002 6.25193 13.4371 6.19124 13.4622C6.13054 13.4873 6.06549 13.5003 5.99979 13.5003C5.93409 13.5003 5.86904 13.4873 5.80834 13.4622C5.74764 13.4371 5.69249 13.4002 5.64604 13.3538C5.59958 13.3073 5.56273 13.2521 5.53759 13.1914C5.51245 13.1308 5.49951 13.0657 5.49951 13C5.49951 12.9343 5.51245 12.8692 5.53759 12.8086C5.56273 12.7479 5.59958 12.6927 5.64604 12.6462L10.2929 8L5.64604 3.35375C5.55222 3.25993 5.49951 3.13268 5.49951 3C5.49951 2.86732 5.55222 2.74007 5.64604 2.64625C5.73986 2.55243 5.86711 2.49972 5.99979 2.49972C6.13247 2.49972 6.25972 2.55243 6.35354 2.64625L11.3535 7.64625C11.4 7.69269 11.4369 7.74783 11.4621 7.80853C11.4872 7.86923 11.5002 7.93429 11.5002 8C11.5002 8.06571 11.4872 8.13077 11.4621 8.19147C11.4369 8.25217 11.4 8.30731 11.3535 8.35375Z"
                                fill="#778698"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="menu-profile-items">
                {items.map((item: any, index) => (
                    <MenuProfileItem key={index} {...item} />
                ))}
            </div>
        </>
    );
};

const FooterSlot = () => {
    const router = useRouter();
    return (
        <div className="menu-profile-items" style={{ marginTop: 50 }}>
            <MenuProfileItem
                icon="signout"
                title="Sair"
                handler={() => router.push('/auth/signout')}
            />
        </div>
    );
};

export default function ProfileDropdown(): JSX.Element {
    const avatarUrl = '/images/theme/avatar-placeholder.webp';
    const { user } = useContext(AuthContext);

    return (
        <Modal
            size="auto"
            type="side right profile-dropdown-modal"
            dropdown
            source={
                <div className="profile-dropdown">
                    <button className="hamburger-menu hide-on-mobile" />
                    <div
                        className="avatar"
                        style={
                            {
                                '--avatarUrl': `url(${avatarUrl})`
                            } as CSSProperties
                        }
                    />
                </div>
            }
            hideHeader
            content={<ContentSlot avatarUrl={avatarUrl} user={user} />}
            footer={<FooterSlot />}
        />
    );
}
