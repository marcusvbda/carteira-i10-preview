interface IBackend {
    [key: string]: string | boolean | number;
}

export const makeUrl = (route: any, params: any = {}): string => {
    let url = route || '';
    for (const key in params) {
        url = url.replace(`:${key}`, params[key]);
    }
    return url;
};

export const backend: IBackend = {
    routeSummaryBanners: '/api/carteiras/banner/:walletId',
    routeSummaryAlerts: '/api/rest/wallets/:walletId/alert-banner',
    routeSummaryEvolutionChart:
        '/api/carteiras/charts/evolucao-patrimonio/:walletId/:qtyMonths/:type',
    routeSummaryDonutChart:
        '/api/carteiras/charts/diversificacao/:walletId/all',
    routeSummaryDatatable: '/api/carteiras/datatable/ativos/:walletId/:type'
};
