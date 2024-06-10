import { ReactNode } from 'react';
import Icon from '@/components/common/icon';

interface IProps {
	icon: string;
	title?: string;
	size?: string;
	titleIcon?: ReactNode;
	children: ReactNode;
	darkIcon?: string;
	type?: string;
}
export default function AlertSection({
	icon,
	title,
	children,
	titleIcon,
	darkIcon,
	size,
	type,
}: IProps): ReactNode {
	return (
		<div className={`alert-section ${type ? type : 'default'}`}>
			<Icon
				icon={icon}
				darkIcon={darkIcon ? darkIcon : icon}
				width={size || '32px'}
				className="icon"
			/>
			<div className="content">
				{title ? (
					<div className="title">
						{title} {titleIcon ? titleIcon : <></>}
					</div>
				) : (
					<> </>
				)}
				<div className="message">{children}</div>
			</div>
		</div>
	);
}
