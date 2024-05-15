import { seo } from '@/constants/seo';
import { Metadata } from 'next';
import './_styles.scss';
import Profile from './_profile';

export const metadata: Metadata = seo.settings;

export default function ProfilePage(): JSX.Element {
    return (
        <div className="profile-page">
            <div className="page-container">
                <div className="content">
                    <div className="tab-settings">
                        <h4>Minha conta</h4>
                    </div>
                    <Profile />
                    <div className="form-footer">
                        <button className="btn dark">Salvar alterações</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
