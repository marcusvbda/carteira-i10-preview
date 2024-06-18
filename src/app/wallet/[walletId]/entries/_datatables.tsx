'use client';

import CollapseDatatable from './_collapseDatatable';

export default function Datatables({ data }: any) {
	const [variableData, cryptoData, fixedData, treasureData, otherData] = data;

	return (
		<section className="section-actives">
			<CollapseDatatable
				title="Renda variável"
				defaultCollapsed
				loading={false}
				rows={variableData?.data || []}
			/>
			<CollapseDatatable
				title="Criptomoedas"
				loading={false}
				rows={cryptoData?.data || []}
			/>
			<CollapseDatatable
				title="Renda fixa"
				loading={false}
				rows={fixedData?.data || []}
			/>
			<CollapseDatatable
				title="Tesouro direto"
				loading={false}
				rows={treasureData?.data || []}
			/>
			<CollapseDatatable
				title="Outros"
				loading={false}
				rows={otherData?.data || []}
			/>
		</section>
	);
}
