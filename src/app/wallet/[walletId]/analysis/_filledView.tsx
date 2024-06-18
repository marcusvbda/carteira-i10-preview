'use client';
import { ReactNode, useMemo } from 'react';
import Icon from '@/components/common/icon';
import IAIcon from '@/components/IAIcon';
import AlertSection from './_alertSection';
import Card from './_card';

export default function FilledView(): ReactNode {
	const cards = useMemo(() => {
		return {
			general: [
				{
					title: 'Mais de 10% do seu patrimônio está em [TICKER]',
					content:
						'Você está concentrando uma grande quantidade de seus recursos financeiros em uma única empresa. Isso pode ser considerado como uma estratégia de investimento de alto risco, pois se a empresa tiver problemas financeiros ou enfrentar outros problemas, isso pode resultar em grandes perdas para você. A diversificação é considerada importante porque pode ajudar a minimizar o risco de perda.',
					tip: 'Considere diversificar seu patrimônio',
				},
				{
					title:
						'Você possui mais de 25% de seu patrimônio em [AÇÕES / FIIS / ETC].',
					content: '',
					tip: 'Considere diversificar seu patrimônio',
				},
				{
					title: 'Você possui menos de 30% de exposição ao exterior.',
					content: '',
					tip: 'Considere diversificar seu patrimônio',
				},
				{
					title: 'Você possui menos de 10 ativos em sua carteira.',
					content: '',
					tip: 'Considere diversificar seu patrimônio',
				},
			],
			stocks: [
				{
					title: 'A empresa [TICKER] está com o ROE abaixo de 10%.',
					content: '',
					tip: 'Considere diversificar seu patrimônio',
				},
				{
					title:
						'A empresa [TICKER] teve uma queda de no valor de seu patrimônio se comparado com o ano anterior.',
					content: '',
					tip: 'Considere diversificar seu patrimônio',
				},
				{
					title:
						'O Fundo Imobiliário [TICKER] está pagamento um Dividend Yield XX% menor que a média do segmento (considerando outros fundos de tijolo/papel).',
					content: '',
					tip: 'Considere diversificar seu patrimônio',
				},
			],
		};
	}, []);

	return (
		<div className="filled-view">
			<AlertSection
				icon="/images/theme/robot.svg"
				title="Análise inteligente de carteira"
				titleIcon={<IAIcon />}
			>
				Nossa analise inteligente da carteira consiste em trazer os melhores
				insights fundamentalistas para te auxiliar na gestão de seu portfólio de
				ativos. Tenha acesso rápido e fácil aos principais pontos de atenção
				para que possa fazer a melhor gestão possível de seus ativos.
			</AlertSection>
			<div className="card-list">
				<h2>Insights gerais</h2>
				{cards.general.map((card: any, index: number) => (
					<Card
						key={index}
						title={card.title}
						tip={card.tip}
						content={card.content}
						className="general"
					/>
				))}

				<h2 className="mt-32">Ações / Stocks</h2>
				{cards.stocks.map((card: any, index: number) => (
					<Card
						key={index}
						title={card.title}
						tip={card.tip}
						content={card.content}
						className="stock-card"
					/>
				))}
			</div>
			<div className="show-more-section">
				<button>
					<Icon
						className="hide"
						icon="/images/theme/closed-eye.svg"
						darkIcon="/images/theme/dark-closed-eye.svg"
						width="15px"
						height="13.333px"
					/>
					Mostrar todos os insights
				</button>
			</div>

			<AlertSection
				size="20px"
				icon="/images/theme/papers.svg"
				darkIcon="/images/theme/dark-papers.svg"
				type="light"
			>
				*Os insights acima não devem ser considerados como recomendações e
				também não existe qualquer análise humana em sua carteira, nosso sistema
				somente analisa os indicadores das empresas lhe trazendo pontos de
				alertas que o investidores Buy And Hold consideram importantes em suas
				análises.
			</AlertSection>
		</div>
	);
}
