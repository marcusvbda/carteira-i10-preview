'use client';
import { ReactNode, useState } from 'react';
import DefaultCard from '@/components/cards/default';
import AspectRatio from '@/components/common/aspectRatio';
import Collapse from '@/components/common/collapse';
import Icon from '@/components/common/icon';
import Tooltip from '@/components/common/tooltip';
import AlertSection from './_alertSection';
interface IProps {
	title: string;
	content: string;
	tip: string;
	className?: string;
}

export const Title = ({ title }: any): ReactNode => {
	return (
		<h4 className="title">
			{title}
			<Tooltip
				title="Esconder este insight."
				content="Você poderá vê-lo novamente quando quiser."
			>
				<Icon
					className="hide"
					icon="/images/theme/closed-eye.svg"
					darkIcon="/images/theme/dark-closed-eye.svg"
					width="15px"
					height="13.333px"
				/>
			</Tooltip>
		</h4>
	);
};

const Content = ({ className, children, tip }: any) => {
	return (
		<div className="container">
			{['general'].includes(className) && (
				<AlertSection
					icon="/images/theme/chart.svg"
					darkIcon="/images/theme/chart-dark.svg"
					size="20px"
					type="small"
				>
					{tip}
				</AlertSection>
			)}
			{['stock-card'].includes(className) && (
				<div style={{ display: 'flex' }}>
					<div className="ticker-icon">
						<div className="image-card">
							<AspectRatio src="/images/theme/bb.png" size={{ height: 20 }} />
						</div>
						BBAS3
					</div>
				</div>
			)}
			{children}
		</div>
	);
};

export default function Card({
	title,
	content,
	tip,
	className,
}: IProps): ReactNode {
	const [collapsed, setCollapsed] = useState(true);
	return (
		<DefaultCard className={`analisys-card ${className || ''}`} padding="0">
			<Collapse
				onChange={setCollapsed as any}
				defaultCollapsed={collapsed}
				source={<Title title={title} />}
				content={
					<Content className={className} tip={tip}>
						{content}
					</Content>
				}
			/>
		</DefaultCard>
	);
}
