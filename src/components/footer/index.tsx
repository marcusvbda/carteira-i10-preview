import './_styles.scss';
import { ReactNode } from 'react';
import Links from './_links';
import LogoSection from './_logoSection';
import Terms from './_terms';

export function Footer(): ReactNode {
	return (
		<footer className="default-navbar">
			<LogoSection />
			<Links />
			<hr className="separator" />
			<div className="disclaimer">
				O Investidor10 não tem como objetivo a recomendação e/ou sugestão de
				compra de ativos. Nosso site possui caráter meramente informativo e
				educativo, sempre trazendo informações de fontes públicas (B3, CVM e RI
				das empresas, etc.), deste modo, não nos responsabilizamos por qualquer
				decisão que o investidor venha a tomar a partir das informações contidas
				em nosso site.
			</div>
			<Terms />
			<hr className="separator hide-on-desktop" />
			<div className="copywrite">
				Copywriter ©️ Investidor10. Todos os direitos reservados.
			</div>
		</footer>
	);
}
