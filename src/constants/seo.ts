import { envoriment } from './environment';

interface ISeoItem {
    title: string;
    description: string;
    path: string;
}
interface ISeo {
    [key: string]: ISeoItem;
}

const defaultSeo: ISeoItem = {
    title: `${envoriment.appName} | Carteira`,
    description: '...',
    path: '/'
};

export const seo: ISeo = {
    default: defaultSeo,
    summary: {
        ...defaultSeo,
        ...{
            title: `${envoriment.appName} | Resumo`,
            path: '/'
        }
    },
    integrationB3: {
        ...defaultSeo,
        ...{
            title: `${envoriment.appName} | Integração B3`,
            path: '/integration-b3'
        }
    },
    profile: {
        ...defaultSeo,
        ...{
            title: `${envoriment.appName} | Perfil`,
            path: '/profile'
        }
    },
    walletSettings: {
        ...defaultSeo,
        ...{
            title: `${envoriment.appName} | Configuração da carteira`,
            path: '/wallet-settings/{walletId}'
        }
    },
    help: {
        ...defaultSeo,
        ...{
            title: `${envoriment.appName} | Ajuda B3`,
            path: '/help'
        }
    },
    earnings: {
        ...defaultSeo,
        ...{
            title: `${envoriment.appName} | Proventos`,
            path: '/earnings'
        }
    },
    profitability: {
        ...defaultSeo,
        ...{
            title: `${envoriment.appName} | Rentabilidade`,
            path: '/profitability'
        }
    },
    patrimony: {
        ...defaultSeo,
        ...{
            title: `${envoriment.appName} | Patrimônio`,
            path: '/patrimony'
        }
    },
    goals: {
        ...defaultSeo,
        ...{
            title: `${envoriment.appName} | Metas`,
            path: '/goals'
        }
    },
    analysis: {
        ...defaultSeo,
        ...{
            title: `${envoriment.appName} | Análise`,
            path: '/analysis'
        }
    },
    entries: {
        ...defaultSeo,
        ...{
            title: `${envoriment.appName} | Lançamentos`,
            path: '/entries'
        }
    },
    irpf: {
        ...defaultSeo,
        ...{
            title: `${envoriment.appName} | Imposto de Renda`,
            path: '/irpf'
        }
    },
    signout: {
        ...defaultSeo,
        ...{
            title: `${envoriment.appName} | Sair`,
            path: '/auth/signout'
        }
    },
    signin: {
        ...defaultSeo,
        ...{
            title: `${envoriment.appName} | Entrar`,
            path: '/auth/signin'
        }
    }
};
