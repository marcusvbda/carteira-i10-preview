'use client';

import { CSSProperties, useContext } from 'react';
import Dropdown from '../common/dropdown';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/authContext';

export default function ProfileDropdown(): JSX.Element {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const avatarUrl = '/images/theme/avatar-placeholder.webp';
    const items = [
        {
            id: 'signout',
            name: 'Sair',
            handler: () => router.push('/auth/signout')
        }
    ];

    const selectedOption = (item: any) =>
        (items.find((x: any) => x.id === item.id) as any).handler();

    return (
        <Dropdown
            modalTitle={user?.email || ''}
            btnContent={
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
                    <button className="btn-plus hide-on-desktop hide-on-tablet" />
                </div>
            }
            options={items}
            action={selectedOption}
        />
    );
}
