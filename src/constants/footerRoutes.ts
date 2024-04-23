interface IFooterRoute {
    name: string;
    url: string;
    icon?: string;
}

interface IFooterRoutes {
    [index: string]: IFooterRoute[];
}

export const footerRoutes: IFooterRoutes = {
    social: [
        {
            name: 'facebook',
            url: process.env.NEXT_PUBLIC_FOOTER_FACEBOOK_URL || '#'
        },
        {
            name: 'instagram',
            url: process.env.NEXT_PUBLIC_FOOTER_INSTAGRAM_URL || '#'
        },
        {
            name: 'youtube',
            url: process.env.NEXT_PUBLIC_FOOTER_YOUTUBE_URL || '#'
        }
    ],
    nacional: [
        {
            name: 'Ações',
            url: process.env.NEXT_PUBLIC_FOOTER_ACTIONS_URL || '#'
        },
        {
            name: 'Fundos Imobiliários',
            url: process.env.NEXT_PUBLIC_FOOTER_FII_URL || '#'
        },
        { name: 'BDRs', url: process.env.NEXT_PUBLIC_FOOTER_BDRS_URL || '#' },
        {
            name: 'Tesouro Direto',
            url: process.env.NEXT_PUBLIC_FOOTER_TESOURO_URL || '#'
        },
        {
            name: 'Índices',
            url: process.env.NEXT_PUBLIC_FOOTER_INDICES_URL || '#'
        },
        {
            name: 'ETFs Nacional',
            url: process.env.NEXT_PUBLIC_FOOTER_ETFS_URL || '#'
        },
        {
            name: 'ETFs Internacionais',
            url: process.env.NEXT_PUBLIC_FOOTER_ETFS_INTERNACIONAL_URL || '#'
        },
        {
            name: 'Fundos de Investimentos',
            url: process.env.NEXT_PUBLIC_FOOTER_FUNDOS_URL || '#'
        },
        {
            name: 'Assessoria de Investimentos',
            url: process.env.NEXT_PUBLIC_FOOTER_ASSESSORIA_URL || '#'
        }
    ],
    international: [
        {
            name: 'STOCKS',
            url: process.env.NEXT_PUBLIC_FOOTER_STOCKS_URL || '#'
        },
        {
            name: 'MOEDAS',
            url: process.env.NEXT_PUBLIC_FOOTER_MOEDAS_URL || '#'
        },
        {
            name: 'REITS',
            url: process.env.NEXT_PUBLIC_FOOTER_REITS_URL || '#'
        }
    ],
    startups: [
        {
            name: 'Startups e Alternativos',
            url: process.env.NEXT_PUBLIC_FOOTER_STARTUPS_URL || '#'
        }
    ],
    blog: [
        {
            name: 'Blog',
            url: process.env.NEXT_PUBLIC_FOOTER_BLOG_URL || '#'
        }
    ],
    tools: [
        {
            name: 'Carteiras Recomentadas',
            url: process.env.NEXT_PUBLIC_FOOTER_CARTEIRAS_URL || '#'
        },
        {
            name: 'Gerenciar Carteira',
            url: process.env.NEXT_PUBLIC_FOOTER_GERENCIAR_CARTEIRA_URL || '#'
        },
        {
            name: 'Ranking de FIIs',
            url: process.env.NEXT_PUBLIC_FOOTER_RANKING_FIIS_URL || '#'
        },
        {
            name: 'Rankings de ações',
            url: process.env.NEXT_PUBLIC_FOOTER_RANKING_ACOES_URL || '#'
        },
        {
            name: 'Busca avançada de ações',
            url: process.env.NEXT_PUBLIC_FOOTER_BUSCA_ACOES_URL || '#'
        },
        {
            name: 'Agenda de dividendos - FIIs',
            url:
                process.env.NEXT_PUBLIC_FOOTER_AGENDA_DIVIDENDOS_FIIS_URL || '#'
        },
        {
            name: 'Comparador de ações',
            url: process.env.NEXT_PUBLIC_FOOTER_COMPARADOR_ACOES_URL || '#'
        },
        {
            name: 'Agenda de dividendos - Stocks',
            url:
                process.env.NEXT_PUBLIC_FOOTER_AGENDA_DIVIDENDOS_STOCKS_URL ||
                '#'
        },
        {
            name: 'Agenda de dividendos - Reits',
            url:
                process.env.NEXT_PUBLIC_FOOTER_AGENDA_DIVIDENDOS_REITS_URL ||
                '#'
        },
        {
            name: 'Agenda de dividendos - BDRs',
            url:
                process.env.NEXT_PUBLIC_FOOTER_AGENDA_DIVIDENDOS_BDRS_URL || '#'
        }
    ],
    courses: [
        {
            name: 'Investimento em Ações',
            url: process.env.NEXT_PUBLIC_FOOTER_INVESTIMENTO_ACOES_URL || '#'
        },
        {
            name: 'Investimento em FIIs',
            url: process.env.NEXT_PUBLIC_FOOTER_INVESTIMENTO_FIIS_URL || '#'
        },
        {
            name: 'Investimento em Criptos',
            url: process.env.NEXT_PUBLIC_FOOTER_INVESTIMENTO_CRIPTOS_URL || '#'
        },
        {
            name: 'Curso de Renda Fixa',
            url: process.env.NEXT_PUBLIC_FOOTER_CURSO_RENDA_FIXA_URL || '#'
        },
        {
            name: 'Curso de Tesouro Direto',
            url: process.env.NEXT_PUBLIC_FOOTER_CURSO_TESOURO_DIRETO_URL || '#'
        },
        {
            name: 'Introdução ao mercado financeiro',
            url:
                process.env
                    .NEXT_PUBLIC_FOOTER_INTRODUCAO_MERCADO_FINANCEIRO_URL || '#'
        },
        {
            name: 'Curso de Finanças Pessoais',
            url:
                process.env.NEXT_PUBLIC_FOOTER_CURSO_FINANCAS_PESSOAIS_URL ||
                '#'
        },
        {
            name: 'Ver Todos',
            url: process.env.NEXT_PUBLIC_FOOTER_VER_TODOS_URL || '#',
            icon: '/images/theme/see-more.svg'
        }
    ],
    terms: [
        {
            name: 'Política de Privacidade',
            url: process.env.NEXT_PUBLIC_FOOTER_PRIVACIDADE_URL || '#'
        },
        {
            name: 'Termos de Uso',
            url: process.env.NEXT_PUBLIC_FOOTER_TERMOS_URL || '#'
        },
        {
            name: 'Contato',
            url: process.env.NEXT_PUBLIC_FOOTER_CONTATO_URL || '#'
        },
        {
            name: 'Suporte',
            url: process.env.NEXT_PUBLIC_FOOTER_SUPORTE_URL || '#'
        }
    ]
};
