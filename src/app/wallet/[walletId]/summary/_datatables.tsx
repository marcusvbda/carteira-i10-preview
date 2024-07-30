'use client';

import { useMemo } from 'react';
import CollapseDatatable from './_collapseDatatable';

export default function Datatables({ infoData }: any) {
	const types = useMemo(() => {
		return infoData?.tickers || [];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const total = useMemo(() => {
		return types.reduce((acc: any, cur: any) => acc + cur.count, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section className="section-actives">
			<h4 className="actives-total">
				Ativos <span>({total})</span>
			</h4>
			{types.map((type: any, key: number) => (
				<CollapseDatatable
					key={key}
					type={type}
					infoData={infoData}
					defaultCollapsed={key === 0}
				/>
			))}
		</section>
	);
}
