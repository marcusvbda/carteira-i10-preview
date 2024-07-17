import './_styles.scss';
import { ReactNode } from 'react';
import Link from 'next/link';
import Icon from '@/components/common/icon';
import SensitiveContent from '@/components/common/sensitiveContent';
import Skeleton from '@/components/common/skeleton';
import Trend from '@/components/common/trend';
import { useHelpers } from '@/hooks/helpers';
import DefaultCard from '../default';

interface IProps {
	title: string;
	icon: string;
	loading: boolean;
	variation: string;
	profit: string;
	variationAmount: number;
}

const Content = ({ profit, variation, variationAmount }: any): ReactNode => {
	const helpers = useHelpers();
	let varitionTrendClass = '';
	if (variation?.includes('-')) {
		varitionTrendClass = 'negative';
	} else if (variation != '0%') {
		varitionTrendClass = 'positive';
	}

	let profitTrendClass = '';
	if (profit?.includes('-')) {
		profitTrendClass = 'negative';
	} else if (profit != '0') {
		profitTrendClass = 'positive';
	}
	let formatedVariationAmount = '';
	if (variationAmount < 0) {
		formatedVariationAmount = `- ${helpers.formatMoney(variationAmount * -1)}`;
	} else {
		if (variationAmount === 0) {
			formatedVariationAmount = helpers.formatMoney(variationAmount);
		} else {
			formatedVariationAmount = `+ ${helpers.formatMoney(variationAmount)}`;
		}
	}
	const formatedVariation = variation?.replace('-', '');
	return (
		<div className="card-variation--content">
			<div className="card-variation--content-col">
				<Trend
					type={profitTrendClass}
					size="20px"
					value={profit}
					transparent
					strong
				/>
			</div>
			<div className="card-variation--content-col">
				<Trend
					type={varitionTrendClass}
					size="20px"
					value={formatedVariation}
					transparent
					strong
					dark
				/>
				<div className="description">
					<SensitiveContent>
						<small>{formatedVariationAmount}</small>
					</SensitiveContent>
				</div>
			</div>
		</div>
	);
};

export default function VariationCard({
	title,
	icon,
	loading,
	variation,
	profit,
	variationAmount,
}: IProps): ReactNode {
	if (loading) return <Skeleton height="122px" />;
	return (
		<DefaultCard className="card-variation" padding="12px">
			<h4 style={{ display: 'flex' }}>
				<div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 6 }}>
					<Icon icon={`/images/theme/${icon}.svg`} width="14px" opacity="0.7" />
					{title}
				</div>
				<Link style={{ flex: 1 }} href="#" className="variation">
					Variação
				</Link>
			</h4>
			<Content
				variation={variation}
				profit={profit}
				variationAmount={variationAmount}
			/>
		</DefaultCard>
	);
}
