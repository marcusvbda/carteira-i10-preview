import { ReactNode } from 'react';

interface IProps {
	condition: any;
	children: ReactNode;
}

export default function If({ condition, children }: IProps) {
	return condition ? children : null;
}
