'use client';
import { ReactNode, useContext, useEffect, useState } from 'react';
import './_styles.scss';
import If from '@/components/common/if';
import { ThemeContext } from '@/context/themeContext';
import Icon from '../icon';

interface IProps {
	className?: string;
	source: ReactNode;
	content: ReactNode;
	defaultCollapsed?: boolean;
	paddingSource?: string;
	onChange?: (value: boolean) => void;
}

export const CollapseBtn = () => {
	return (
		<button className="collapse-btn">
			<Icon icon="/images/theme/secondary-arrow-down.svg" width="16px" />
		</button>
	);
};

export default function Collapse({
	className,
	source,
	content,
	defaultCollapsed,
	paddingSource,
	onChange,
}: IProps) {
	const [visible, setVisible] = useState(defaultCollapsed ?? false);
	const { screenFormat } = useContext(ThemeContext);

	useEffect(() => {
		onChange && onChange(visible);
	}, [visible, onChange]);

	return (
		<div
			className={`collapse-component ${className || ''} ${visible ? 'opened' : ''}`}
		>
			<div
				className="collapse-component--source"
				onClick={() => setVisible(!visible)}
				style={{ padding: paddingSource ? paddingSource : '12px 24px' }}
			>
				{source}
				{['desktop'].includes(screenFormat) && <CollapseBtn />}
			</div>
			<If condition={visible}>
				<div className="collapse-component--content">
					<>{content}</>
				</div>
			</If>
		</div>
	);
}
