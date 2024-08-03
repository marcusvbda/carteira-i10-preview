export const useHelpers = () => {
	return {
		formatNumber: (value: number | string): string => {
			try {
				const val = new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				}).format(typeof value === 'string' ? parseFloat(value) : value);

				return val.replace('R$', '').replace(',00', '');
			} catch (error) {
				return '0';
			}
		},
		formatMoney: (value: number, params: any = {}): string => {
			const currency = params.currency || 'BRL';
			try {
				const currencyMap = {
					BRL: 'pt-BR',
					USD: 'en-US',
				};

				const symbol = currency === 'USD' ? '$ ' : 'R$ ';

				if (params?.short) {
					if (value >= 1000000000) {
						return (
							symbol + (value / 1000000000).toFixed(1).replace('.0', '') + 'B'
						);
					} else if (value >= 1000000) {
						return (
							symbol + (value / 1000000).toFixed(1).replace('.0', '') + 'M'
						);
					} else if (value >= 100000) {
						return symbol + Math.floor(value / 1000) + 'K';
					} else if (value >= 1000) {
						return symbol + (value / 1000).toFixed(1).replace('.0', '') + 'K';
					} else {
						return new Intl.NumberFormat((currencyMap as any)[currency], {
							style: 'currency',
							currency,
						}).format(value);
					}
				}
				return new Intl.NumberFormat((currencyMap as any)[currency], {
					style: 'currency',
					currency,
				}).format(value);
			} catch (error) {
				return ' - ';
			}
		},
		parseMoneyToNumber: (value: string): number => {
			try {
				return parseFloat(
					value.replace('R$', '').replace('.', '').replace(',', '.'),
				);
			} catch (error) {
				return 0;
			}
		},
		cutText: (text: string, length: number): string => {
			const value = text || '';
			return (value || '').length > length
				? `${value.substring(0, length)}...`
				: value;
		},
		cleanPath(str: string): string {
			if (str.endsWith('/')) {
				return str.slice(0, -1);
			}
			return str;
		},
	};
};
