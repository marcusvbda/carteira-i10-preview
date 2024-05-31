import { CSSProperties, ReactNode } from 'react';
import { Metadata } from 'next';
import { seo } from '@/constants/seo';
import './_styles.scss';
import GoalsCrud from './_goalsCrud';

export const metadata: Metadata = seo.goals;

export default function GoalsPage(): ReactNode {
	return (
		<>
			<div
				className="page-container"
				style={
					{
						'--bg-color': 'var(--surface-secondary)',
					} as CSSProperties
				}
			>
				<div id="goals-page">
					<div className="card-start">
						<GoalsCrud />
					</div>
				</div>
			</div>
		</>
	);
}
