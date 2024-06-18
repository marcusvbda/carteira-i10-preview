import React, { ReactNode } from 'react';
import Icon from '@/components/common/icon';
import IAIcon from '@/components/IAIcon';

export default function EmptyView(): ReactNode {
	return (
		<div className="empty-view">
			<Icon
				icon="/images/theme/icon-analysis.svg"
				width="83.97px"
				height="77.61px"
			/>
			<h1>
				Análise inteligente de carteira
				<IAIcon />
			</h1>
			<div className="description">
				Nossa analise inteligente da carteira consiste em trazer os melhores
				insights fundamentalistas para te auxiliar na gestão de seu portfólio de
				ativos. Tenha acesso rápido e fácil aos principais pontos de atenção
				para que possa fazer a melhor gestão possível de seus ativos.
			</div>
			<button className="btn primary">
				<Icon icon="/images/theme/plus.svg" width="16px" />
				Adicionar Ativo
			</button>
		</div>
	);
}
