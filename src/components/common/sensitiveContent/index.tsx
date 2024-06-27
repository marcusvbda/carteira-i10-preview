'use client';
import './_styles.scss';
import { ReactNode, useContext } from 'react';
import If from '@/components/common/if';
import { DefinitionsContext } from '@/context/definitionsContext';

interface IProps {
	children: ReactNode;
	style?: any;
}

export default function SensitiveContent({
	children,
	style = {},
}: IProps): ReactNode {
	const { showSensitiveContent } = useContext(DefinitionsContext);
	return (
		<div className="sensitive-content" style={style}>
			<If condition={!showSensitiveContent}>
				<div className="sensitive-content--overlay" />
			</If>
			{children}
		</div>
	);
}
