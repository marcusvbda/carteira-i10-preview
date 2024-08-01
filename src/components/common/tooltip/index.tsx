import './_styles.scss';
import { ReactNode } from 'react';
import MuiTooltip from '@mui/material/Tooltip';
interface IProps {
	title?: string | ReactNode;
	content: string | ReactNode;
	children: ReactNode;
}

export default function Tooltip({
	title,
	content,
	children,
}: IProps): ReactNode {
	const Content = (): ReactNode => {
		return (
			<>
				{title && (
					<>
						<strong>{title}</strong>
						<br />
						<br />
					</>
				)}
				{content}
			</>
		);
	};

	return (
		<MuiTooltip title={<Content />} placement="bottom" arrow>
			<div>{children}</div>
		</MuiTooltip>
	);
}
