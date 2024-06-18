'use client';

import { CSSProperties, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import Icon from '@/components/common/icon';
import Security from './_security';

export default function Profile() {
	const [broker, setBroker] = useState(null);
	const brokers: any[] = [];

	return (
		<form className="profile-form-section">
			<div className="content-avatar">
				<div
					className="input-avatar"
					style={
						{
							'--image-avatar': `url(/images/theme/avatar-example.svg)`,
						} as CSSProperties
					}
				>
					<a href="#">
						<Icon icon="/images/theme/edit-icon.svg" width="12px" />
					</a>
				</div>
			</div>
			<div className="form-content">
				<h5>Meus dados</h5>
				<div className="input-group">
					<label>Nome completo</label>
					<input value="Monique Grant" />
				</div>
				<div className="input-group">
					<label>Email</label>
					<input value="monique.grant@domain.com" />
				</div>
				<div className="input-group">
					<label>Celular</label>
					<input value="+ 11 9 1234-56789" />
				</div>
				<div className="input-group">
					<label>Principal corretora</label>
					<Dropdown
						value={broker}
						onChange={(e: any) => setBroker(e.value)}
						options={brokers}
						optionLabel="name"
						placeholder="Selecionar ..."
					/>
				</div>
				<h5 className="mt-24">Endereço</h5>
				<div className="input-row">
					<div className="input-group">
						<label>Principal corretora</label>
						<Dropdown
							value={broker}
							onChange={(e: any) => setBroker(e.value)}
							options={brokers}
							optionLabel="name"
							placeholder="Selecionar ..."
						/>
					</div>
					<div className="input-group">
						<label>Cidade</label>
						<Dropdown
							value={broker}
							onChange={(e: any) => setBroker(e.value)}
							options={brokers}
							optionLabel="name"
							placeholder="Selecionar ..."
						/>
					</div>
				</div>
				<h5 className="mt-24">Minha assinatura</h5>
				<div className="signature-label">
					<Icon icon="/images/theme/signature-pro.svg" width="29px" />
					Você é assinante PRO desde 01/12/2023
				</div>
				<Security />
			</div>
		</form>
	);
}
