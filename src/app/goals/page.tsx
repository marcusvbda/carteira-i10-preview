import { seo } from '@/constants/seo';
import './_styles.scss';
import { Metadata } from 'next';
import { CSSProperties } from 'react';
import GoalsCrud from './_goalsCrud';

export const metadata: Metadata = seo.goals;

export default function GoalsPage(): JSX.Element {
    return (
        <>
            <div
                className="page-container"
                style={
                    {
                        '--bg-color': 'var(--surface-secondary)'
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
