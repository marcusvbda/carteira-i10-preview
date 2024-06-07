import { ReactNode } from 'react';
import { Metadata } from 'next';
import Icon from '@/components/common/icon';
import { seo } from '@/constants/seo';
import './_styles.scss';
import Tables from './_tables';

export const metadata: Metadata = seo.irpf;

const Alert = ({ children }: any): ReactNode => {
	return (
		<div className="alert-iprf">
			<Icon
				icon="/images/theme/iprf.svg"
				darkIcon="/images/theme/iprf-dark.svg"
				width="20px"
			/>
			{children}
		</div>
	);
};

export default function IrpfPage(): ReactNode {
	return (
		<section className="iprf-section">
			<div className="page-container">
				<Alert>
					Atenção! É de responsabilidade exclusiva do usuário a conferência dos
					dados disponibilizados. Esta ferramenta não substitui a consulta a um
					profissional qualificado.
				</Alert>
				<Tables />
				<Alert>
					De acordo com a lei 14.754/2023, a partir de 2024 a tributação de
					investimentos no exterior passa a ser anual, eliminando a obrigação de
					preenchimento do GCAP e Carnê Leão, o pagamento de imposto (DARF) será
					também anual. Estamos nos adequando a isso e em breve faremos a
					implementação
				</Alert>
			</div>
		</section>
	);
}
