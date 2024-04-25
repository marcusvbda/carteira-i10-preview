export const typeOptions: any[] = [
    { value: 'BUY', name: 'Compra' },
    { value: 'SELL', name: 'Venda' }
];

export const tickerTypeOptions: any[] = [
    {
        value: 'Ticker',
        name: 'Ações',
        fields: ['qty', 'cost']
    },
    {
        value: 'Fund',
        name: 'Fundos de Investimentos',
        fields: ['applid', 'cost']
    },
    { value: 'Fii', name: 'FIIs', fields: ['applid', 'cost'] },
    {
        value: 'Crypto',
        name: 'Criptomoedas',
        fields: ['applid', 'cost', 'price']
    },
    { value: 'Stock', name: 'Stock', fields: ['applid', 'cost'] },
    { value: 'Reit', name: 'Reit', fields: ['applid', 'cost'] },
    { value: 'StockBdr', name: 'BDRs', fields: ['applid', 'cost'] },
    { value: 'Etf', name: 'ETFs', fields: ['applid', 'cost'] },
    {
        value: 'EtfInternational',
        name: 'ETFs Internacionais',
        fields: ['applid', 'cost']
    },
    { value: 'Treasure', name: 'Tesouro Direto', fields: ['applid', 'cost'] },
    {
        value: 'FixedIncome',
        name: 'Renda Fixa (CDB/LCI/LCA/LC/LF/RDB)',
        fields: [
            'emitter',
            'investment_type',
            'rate_type',
            'indexer',
            'due_date',
            'percentage_cdi'
        ]
    },
    { value: 'Other', name: 'Outros', fields: [] }
];

export const currencyOptions: any[] = [
    { value: 'BRL', name: 'Real', symbol: 'R$', language: 'pt-BR' },
    { value: 'USD', name: 'Dólar', symbol: 'US$', language: 'en-US' }
];

export const investmentTypeOptions: any[] = [
    { value: 'LCI', name: 'LCI' },
    { value: 'CDB', name: 'CDB' },
    { value: 'LCA', name: 'LCA' },
    { value: 'LC', name: 'LC' },
    { value: 'LF', name: 'LF' },
    { value: 'RDB', name: 'RDB' },
    { value: 'DEBENTURE', name: 'Debênture' },
    { value: 'CRI', name: 'CRI' },
    { value: 'CRA', name: 'CRA' },
    { value: 'CCB', name: 'CCB' }
];

export const rateTypeOptions: any[] = [
    { value: 'POST', name: 'Pós-fixado' },
    { value: 'PRE', name: 'Pré-fixado' }
];

export const indexerOptions: any[] = [
    { value: 'CDI', name: 'CDI' },
    { value: 'CDI_PLUS', name: 'CDI+' },
    { value: 'IPCA', name: 'IPCA+' }
];
