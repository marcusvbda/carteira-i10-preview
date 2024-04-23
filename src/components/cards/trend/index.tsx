import './_styles.scss';
import Skeleton from '@/components/common/skeleton';
import SensitiveContent from '@/components/common/sensitiveContent';
import DefaultCard from '../default';
import Icon from '@/components/common/icon';
import Trend from '@/components/common/trend';
import { parse } from 'path';
import { useHelpers } from '@/hooks/helpers';

interface IProps {
    title: string;
    icon: string;
    amount: string;
    investAmount: string;
    result: boolean;
    loading: boolean;
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
        </h4>
    );
};

const TrendResult = ({ result }: any): JSX.Element => {
    const trendClass = result === 0 ? '' : result > 0 ? 'positive' : 'negative';
    const positiveValue = result < 0 ? result * -1 : result;
    return <Trend type={trendClass} size="14px" value={`${positiveValue}%`} />;
};

const Content = ({ amount, investAmount, result }: any): JSX.Element => {
    const helpers = useHelpers();
    let trendPercentage = 0;
    if (result) {
        const total = helpers.parseMoneyToNumber(investAmount);
        const value = helpers.parseMoneyToNumber(amount);
        trendPercentage = Math.round(((value - total) / total) * 100);
    }
    return (
        <div className="card-trend--content">
            <strong>
                <SensitiveContent>{amount}</SensitiveContent>
                {result ? (
                    <SensitiveContent>
                        <TrendResult result={trendPercentage} />
                    </SensitiveContent>
                ) : (
                    <></>
                )}
            </strong>
            <div className="description">
                <small>Valor investido</small>
                <div className="amount-invested">
                    <SensitiveContent>{investAmount}</SensitiveContent>
                </div>
            </div>
        </div>
    );
};

export default function TrendCard({
    title,
    icon,
    amount,
    investAmount,
    result,
    loading
}: IProps): JSX.Element {
    if (loading) return <Skeleton height="122px" />;
    return (
        <DefaultCard className="card-trend" padding="12px">
            <Title title={title} icon={icon} />
            <Content
                amount={amount}
                investAmount={investAmount}
                result={result}
            />
        </DefaultCard>
    );
}
