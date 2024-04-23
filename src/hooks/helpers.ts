export const useHelpers = () => {
    return {
        formatMoney: (value: number, currency = 'BRL'): string => {
            try {
                const currencyMap = {
                    BRL: 'pt-BR',
                    USD: 'en-US'
                };

                return new Intl.NumberFormat((currencyMap as any)[currency], {
                    style: 'currency',
                    currency
                }).format(value);
            } catch (error) {
                return ' - ';
            }
        },
        parseMoneyToNumber: (value: string): number => {
            try {
                return parseFloat(
                    value.replace('R$', '').replace('.', '').replace(',', '.')
                );
            } catch (error) {
                return 0;
            }
        },
        cutText: (text: string, length: number): string => {
            const value = (text || '');
            return (value || '').length > length
                ? `${value.substring(0, length)}...`
                : value;
        }
    };
};
