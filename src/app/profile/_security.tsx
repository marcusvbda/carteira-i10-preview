'use client';

import { CSSProperties } from 'react';
import Collapse from '@/components/common/collapse';
import Icon from '@/components/common/icon';

const CardTitle = ({ title, icon, iconSize }: any) => {
	return (
		<h4 className="card-title">
			<Icon icon={`/images/theme/icon-${icon}.svg`} width={iconSize} />
			{title}
		</h4>
	);
};

const NewPassword = () => {
	return (
		<div className="form-content">
			<div className="input-group">
				<label>Nova senha</label>
				<input type="password" />
			</div>
			<div className="input-group">
				<label>Confirmar nova senha</label>
				<input type="password" />
			</div>
		</div>
	);
};

const Account = ({ provider }: any) => {
	return (
		<div className="account-item">
			<div
				className="avatar-account"
				style={
					{
						'--image-avatar': `url(/images/theme/avatar-example.svg)`,
					} as CSSProperties
				}
			>
				<div className="provider-icon">
					<Icon
						icon={`/images/theme/icon-${provider.toLowerCase()}.svg`}
						width="13px"
					/>
				</div>
			</div>
			<div className="account-info">
				<div className="account-name">Monique Grant</div>
				<div className="provider-name">{provider}</div>
			</div>
			<a href="#">Remover</a>
		</div>
	);
};

const ConnectedAccounts = () => {
	return (
		<div className="connected-accounts">
			<Account provider="Google" />
			<Account provider="Facebook" />
			<a href="#" className="add-account">
				<Icon icon="/images/theme/plus.svg" width="13px" />
				Adicionar conta
			</a>
		</div>
	);
};

export default function Security() {
	return (
		<>
			<h5 className="mt-24">Segurança</h5>
			<Collapse
				className="security-card"
				source={
					<CardTitle icon="locked" title="Alterar senha" iconSize="16px" />
				}
				content={<NewPassword />}
				defaultCollapsed
			/>
			<Collapse
				className="security-card"
				source={
					<CardTitle icon="account" title="Contas conectadas" iconSize="20px" />
				}
				content={<ConnectedAccounts />}
				defaultCollapsed
			/>
		</>
	);
}
