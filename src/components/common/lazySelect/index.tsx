'use client';
import { useEffect, useState } from 'react';

import Select2 from 'react-select2-wrapper';
import { useFetch } from '@/hooks/fetch';
import 'react-select2-wrapper/css/select2.css';

interface IProps {
	url: string;
	value: any;
	onSelect: (e: any) => void;
	setOptionsData?: any;
}

export default function LazySelect({
	url,
	value,
	onSelect,
	setOptionsData,
}: IProps) {
	const [v, setV] = useState(value);
	const { data } = useFetch({
		autoDispatch: false,
	});

	useEffect(() => {
		if (setOptionsData) {
			setOptionsData(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const handleSelect = (e: any) => {
		const _value = e.target.value;
		setV(_value);
		onSelect(_value);
	};

	useEffect(() => {
		setV(value);
	}, [value]);

	return (
		<Select2
			data={data || []}
			value={v}
			onSelect={handleSelect}
			options={{
				minimumInputLength: 2,
				placeholder: 'Selecionar',
				language: {
					noResults: function () {
						return 'Nenhum ativo encontrado';
					},
					searching: function () {
						return 'Carregando...';
					},
					inputTooShort: function () {
						return 'Digite 2 ou mais caracteres';
					},
				},
				data: (params: any) => {
					return {
						term: params.term,
					};
				},
				ajax: {
					url: url,
					dataType: 'json',
					type: 'GET',
					processResults: (data: any) => {
						return {
							results: (data || [])?.map((item: any) => {
								return {
									text: item.name,
									id: item.id,
								};
							}),
						};
					},
				},
			}}
		/>
	);
}
