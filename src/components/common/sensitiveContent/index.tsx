'use client';
import './_styles.scss';
import { ReactNode, useContext } from 'react';
import If from '@/components/common/if';
import { DefinitionsContext } from '@/context/definitionsContext';

interface IProps {
    children: ReactNode;
}

export default function SensitiveContent({ children }: IProps): JSX.Element {
    const { showSensitiveContent } = useContext(DefinitionsContext);
    return (
        <div className="sensitive-content">
            <If condition={!showSensitiveContent}>
                <div className="sensitive-content--overlay" />
            </If>
            {children}
        </div>
    );
}
