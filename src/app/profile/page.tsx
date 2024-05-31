import { ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import './_styles.scss';
import Profile from './_profile';

export const metadata: Metadata = seo.settings;

export default function ProfilePage(): ReactNode {
	return (
		<div className="profile-page">
			<div className="page-container">
				<div className="content">
					<div className="tab-settings">
						<h4>Minha conta</h4>
					</div>
					<Profile />
					<div className="form-footer">
						<button className="btn primary">Salvar alterações</button>
					</div>
				</div>
			</div>
		</div>
	);
}
