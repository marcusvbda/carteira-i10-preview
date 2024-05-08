import './_styles.scss';
import Skeleton from '@/components/common/skeleton';
import Link from 'next/link';
import SensitiveContent from '@/components/common/sensitiveContent';
import DefaultCard from '../default';
import Icon from '@/components/common/icon';
import Trend from '@/components/common/trend';
import { useHelpers } from '@/hooks/helpers';

interface IProps {
    title: string;
    icon: string;
    loading: boolean;
    variation: string;
    profit: string;
    variationAmount: number;
}

const Title = ({ title, icon }: any): JSX.Element => {
    return (
        <h4>
            <Icon
                icon={`/images/theme/${icon}.svg`}
                width="14px"
                opacity="0.7"
            />
            {title}
            <Link href="#" className="variation">
                Variação
                <Icon icon="/images/theme/questions.svg" width="14px" />
            </Link>
            {/* <Link href="#" className="edit">
                <Icon
                    icon="/images/theme/edit.svg"
                    width="14px"
                    opacity="0.7"
                />
            </Link> */}
        </h4>
    );
};

const Content = ({ profit, variation, variationAmount }: any): JSX.Element => {
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
        formatedVariationAmount = `- ${helpers.formatMoney(
            variationAmount * -1
        )}`;
    } else {
        if (variationAmount === 0) {
            formatedVariationAmount = helpers.formatMoney(variationAmount);
        } else {
            formatedVariationAmount = `+ ${helpers.formatMoney(
                variationAmount
            )}`;
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
    variationAmount
}: IProps): JSX.Element {
    if (loading) return <Skeleton height="122px" />;
    return (
        <DefaultCard className="card-variation" padding="12px">
            <Title title={title} icon={icon} />
            <Content
                variation={variation}
                profit={profit}
                variationAmount={variationAmount}
            />
        </DefaultCard>
    );
}
