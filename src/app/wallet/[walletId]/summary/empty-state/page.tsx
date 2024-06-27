import { CSSProperties, ReactNode } from 'react';
import './_styles.scss';
import Link from 'next/link';
import Icon from '@/components/common/icon';
import ModalEntries from '@/components/modalEntries';
import { seo } from '@/constants/seo';

const B3Card = ({ walletId }: any) => {
	return (
		<Link
			href={`/wallet/${walletId}${seo.integrationB3.path}`}
			className="card b3"
		>
			<Icon icon="/images/theme/b3-color-logo.svg" width="60px" height="48px" />
			<div className="title">Integrar com a B3</div>
			<div className="description">
				Conecte sua conta da B3 e importe automaticamente suas operações na
				Bolsa direto para sua carteira do Investidor10.
			</div>
		</Link>
	);
};

const ManualCard = () => {
	return (
		<div className="card manual">
			<ModalEntries
				defaultSource={
					<>
						<div className="icon-section">
							<Icon icon="/images/theme/plus.svg" width="24px" height="24px" />
						</div>

						<div className="title">Adicionar ativos manualmente</div>
						<div className="description">
							Faça você mesmo o controle de todas as suas operações na Bolsa.
						</div>
					</>
				}
			/>
		</div>
	);
};
export default function EmptyState({ walletId }: any): ReactNode {
	return (
		<div
			className="page-container empty-state lock-scroll"
			style={
				{
					'--bg-color': 'var(--surface-secondary)',
				} as CSSProperties
			}
		>
			<div
				className="background-image hide-on-table hide-on-mobile"
				style={
					{
						'--bg-image': 'url(/images/theme/empty-state.svg)',
					} as CSSProperties
				}
			/>
			<div className="modal-assesment">
				<div className="header">
					<h2>Bem-vindo ao novo lar dos seus investimentos</h2>
					<small>
						Acompanhe o crescimento do seu patrimônio, rentabilidade e
						dividendos. Estabeleça metas financeiras, receba insights valiosos e
						explore diversas funcionalidades.
					</small>

					<div className="cards">
						<B3Card walletId={walletId} />
						<ManualCard />
					</div>
				</div>
			</div>
		</div>
	);
}
