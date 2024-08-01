'use client';
import { ReactNode, useContext } from 'react';
import Skeleton from '@/components/common/skeleton';
import { ThemeContext } from '@/context/themeContext';

export const LoadingContent = (): ReactNode => {
	const { screenFormat } = useContext(ThemeContext);
	return (
		<>
			{['desktop'].includes(screenFormat) && (
				<div className="page-container">
					<div className="flex-row gap-10">
						<Skeleton width="33%" height="122px" />
						<Skeleton width="33%" height="122px" />
						<Skeleton width="33%" height="122px" />
						<Skeleton width="33%" height="122px" />
					</div>
					<div className="flex-row gap-10">
						<Skeleton width="100%" height="50px" />
					</div>
					<div className="flex-row gap-10">
						<Skeleton width="70%" height="100px" />
						<Skeleton width="30%" height="100px" />
					</div>
					<div className="flex-row gap-10">
						<Skeleton width="33%" height="110px" />
						<Skeleton width="33%" height="110px" />
						<Skeleton width="33%" height="110px" />
					</div>
					<div className="flex-row gap-10">
						<Skeleton width="100%" height="90px" />
					</div>
				</div>
			)}
			{!['desktop'].includes(screenFormat) && (
				<div className="page-container">
					<div className="flex-row gap-10">
						<Skeleton width="100%" height="50px" />
					</div>
					<div className="flex-row gap-10">
						<Skeleton width="100%" height="200px" />
					</div>
					<div className="flex-row gap-10">
						<Skeleton width="100%" height="50px" />
					</div>
					<div className="flex-row gap-10">
						<Skeleton width="100%" height="50px" />
					</div>
					<div className="flex-row gap-10">
						<Skeleton width="100%" height="10px" />
					</div>
					<div className="flex-row gap-10">
						<Skeleton width="100%" height="100px" />
					</div>
					<div className="flex-row gap-10">
						<Skeleton width="100%" height="200px" />
					</div>
					<div className="flex-row gap-10">
						<Skeleton width="100%" height="50px" />
					</div>
					<div className="flex-row gap-10">
						<Skeleton width="100%" height="50px" />
					</div>
				</div>
			)}
		</>
	);
};

export default function Loading() {
	return <LoadingContent />;
}
