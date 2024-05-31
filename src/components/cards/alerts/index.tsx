import { CSSProperties, ReactNode } from 'react';
import './_styles.scss';
import Link from 'next/link';
import Icon from '@/components/common/icon';
import If from '@/components/common/if';
import Skeleton from '@/components/common/skeleton';
import { seo } from '@/constants/seo';
import { useHelpers } from '@/hooks/helpers';
import DefaultCard from '../default';

interface IProps {
	title: string;
	icon: string;
	loading: boolean;
	messages: any[];
}

const Title = ({ title, icon, hasMessages }: any): ReactNode => {
	return (
		<h4>
			<div
				className="card-alerts--icon"
				style={
					{
						'--iconUrl': `url(/images/theme/${icon}.svg)`,
					} as CSSProperties
				}
			/>
			{title}
			<If condition={hasMessages}>
				<Link href={seo.analysis.path}>
					Ver todas
					<Icon icon="/images/theme/see-more.svg" width="12px" />
				</Link>
			</If>
		</h4>
	);
};

export const Messages = ({ messages }: any): ReactNode => {
	const helpers = useHelpers();
	return (
		<div className="message-list">
			<If condition={messages.length === 0}>
				<div className="message-item">Nenhum alerta</div>
			</If>
			{(messages || []).map((x: any, i: number) => (
				<div key={i} className="message-item">
					{helpers.cutText(x.stripped, 40)}
				</div>
			))}
		</div>
	);
};

export default function AlertsCard({
	title,
	icon,
	loading,
	messages,
}: IProps): ReactNode {
	if (loading) return <Skeleton height="122px" />;
	return (
		<DefaultCard className="card-alerts" padding="12px">
			<Title title={title} icon={icon} hasMessages={messages.length} />
			<Messages messages={messages} />
		</DefaultCard>
	);
}
