import { ReactNode } from 'react';
import Icon from '../common/icon';
import './_styles.scss';

export default function IAIcon(): ReactNode {
	return (
		<small className="ia-icon">
			<Icon icon="/images/theme/ia-icon.svg" width="16px" />
			IA
		</small>
	);
}
