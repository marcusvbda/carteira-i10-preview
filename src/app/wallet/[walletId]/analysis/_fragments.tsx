'use client';
import { ComponentType, ReactNode, useState } from 'react';
import FilledView from './_filledView';

export default function Fragments(): ReactNode {
	const [ViewComponent] = useState<ComponentType<any>>(() => FilledView);

	return <ViewComponent />;
}
