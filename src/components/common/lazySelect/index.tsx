'use client';
import { useFetch } from '@/hooks/fetch';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import { useEffect, useState } from 'react';

interface IProps {
    url: string;
    value: any;
    onSelect: (e: any) => void;
}

export default function LazySelect({ url, value, onSelect }: IProps) {
    const [v, setV] = useState(value);
    const { data, setData } = useFetch({
        autoDispatch: false
    });

    (LazySelect as any).setData = setData;

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
                    }
                },
                data: (params: any) => {
                    return {
                        term: params.term
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
                                    id: item.id
                                };
                            })
                        };
                    }
                }
            }}
        />
    );
}
