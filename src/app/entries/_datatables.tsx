'use client';

import { useContext } from 'react';
import { WalletContext } from '@/context/walletContext';
import { useFetch } from '@/hooks/fetch';
import CollapseDatatable from './_collapseDatatable';

export default function Datatables() {
	const { walletId } = useContext(WalletContext);
	const { loading: variableLoading, data: variableData } = useFetch({
		route: `/api/entries/${walletId}/fetch/1`,
	});

	const { loading: cryptoLoading, data: cryptoData } = useFetch({
		route: `/api/entries/${walletId}/fetch/2`,
	});

	const { loading: fixedLoading, data: fixedData } = useFetch({
		route: `/api/entries/${walletId}/fetch/3`,
	});

	const { loading: treasureLoading, data: treasureData } = useFetch({
		route: `/api/entries/${walletId}/fetch/4`,
	});

	const { loading: othersLoading, data: otherData } = useFetch({
		route: `/api/entries/${walletId}/fetch/5`,
	});

	return (
		<section className="section-actives">
			<CollapseDatatable
				title="Renda variável"
				defaultCollapsed
				loading={variableLoading}
				rows={variableData?.data || []}
			/>
			<CollapseDatatable
				title="Criptomoedas"
				loading={cryptoLoading}
				rows={cryptoData?.data || []}
			/>
			<CollapseDatatable
				title="Renda fixa"
				loading={fixedLoading}
				rows={fixedData?.data || []}
			/>
			<CollapseDatatable
				title="Tesouro direto"
				loading={treasureLoading}
				rows={treasureData?.data || []}
			/>
			<CollapseDatatable
				title="Outros"
				loading={othersLoading}
				rows={otherData?.data || []}
			/>
		</section>
	);
}
