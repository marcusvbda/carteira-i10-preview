import Icon from '../common/icon';
import Modal from '../common/modal';
import './_styles.scss';

const B3Content = () => {
    return (
        <div className="b3-dialog">
            <div className="b3-dialog--title">
                <h4>Bem-vindo ao novo lar dos seus investimentos</h4>
                <div className="b3-dialog--description">
                    Acompanhe o crescimento do seu patrimônio, rentabilidade e
                    dividendos. Estabeleça metas financeiras, receba insights
                    valiosos e explore diversas funcionalidades.
                </div>
            </div>
            <div className="b3-dialog--content">
                <div className="b3-dialog--content--card">
                    <div
                        className="button-add"
                        style={{ border: 'none', width: 60, height: 48 }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="61"
                            height="48"
                            viewBox="0 0 61 48"
                            fill="none"
                        >
                            <g clip-path="url(#clip0_1133_255)">
                                <path
                                    d="M26.432 34.4921H18.572V28.3766H26.432C28.226 28.3766 29.672 29.7263 29.672 31.4008C29.672 33.0753 28.226 34.4921 26.432 34.4921ZM18.566 17.3105H25.736C27.53 17.3105 28.976 18.6601 28.976 20.3346C28.976 22.0091 27.53 23.3588 25.736 23.3588H18.566V17.3105ZM34.016 25.2237C35.12 23.874 35.81 22.1995 35.81 20.3346C35.81 15.8936 31.946 12.2926 27.188 12.2926H11.396V39.4428H28.568C33.326 39.4428 37.19 35.8418 37.19 31.4008C37.19 28.8918 35.948 26.7021 34.016 25.2237ZM60.5 7.39797C60.5 8.36122 60.086 9.20126 59.258 9.84529C58.43 10.4893 57.398 10.8085 56.156 10.8085C54.986 10.8085 53.948 10.4893 53.12 9.90689C52.292 9.33007 51.812 8.55723 51.674 7.52678H54.914C55.19 8.1036 55.604 8.42842 56.222 8.42842C56.636 8.42842 56.912 8.36682 57.188 8.17081C57.464 7.9804 57.53 7.72279 57.53 7.39797C57.53 7.07875 57.392 6.88274 57.188 6.69233C56.912 6.50192 56.636 6.43472 56.156 6.43472H55.052V4.31222H56.084C56.498 4.31222 56.84 4.25061 57.05 4.0546C57.254 3.86419 57.392 3.66818 57.392 3.41057C57.392 3.09135 57.254 2.83374 57.05 2.63773C56.846 2.44732 56.498 2.38012 56.156 2.38012C55.742 2.38012 55.466 2.50893 55.19 2.76654C55.052 2.89534 54.914 3.08575 54.848 3.34337H51.812C52.016 2.31292 52.43 1.47847 53.258 0.896045C54.02 0.319216 54.98 0 56.156 0C57.398 0 58.364 0.319216 59.192 0.901645C59.948 1.54568 60.362 2.31852 60.362 3.28176C60.362 4.18341 59.948 4.82744 59.192 5.27546C60.086 5.72909 60.5 6.49633 60.5 7.39797Z"
                                    fill="#002C63"
                                />
                                <path
                                    d="M11.468 7.07876V3.7298H0.5V48H11.468V44.7182H4.088V7.07876H11.468ZM36.98 44.7182V48H47.948V3.7298H36.98V7.07316H44.426V44.7182H36.98Z"
                                    fill="#002C63"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1133_255">
                                    <rect
                                        width="60"
                                        height="48"
                                        fill="white"
                                        transform="translate(0.5)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <strong>Inetgrar com a B3</strong>
                    <div className="description">
                        Conecte sua conta da B3 e importe automaticamente suas
                        operações na Bolsa direto para sua carteira do
                        Investidor10.
                    </div>
                </div>
                <div className="b3-dialog--content--card">
                    <div className="button-add">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                        >
                            <path
                                d="M21.5 12C21.5 12.1989 21.421 12.3897 21.2803 12.5303C21.1397 12.671 20.9489 12.75 20.75 12.75H13.25V20.25C13.25 20.4489 13.171 20.6397 13.0303 20.7803C12.8897 20.921 12.6989 21 12.5 21C12.3011 21 12.1103 20.921 11.9697 20.7803C11.829 20.6397 11.75 20.4489 11.75 20.25V12.75H4.25C4.05109 12.75 3.86032 12.671 3.71967 12.5303C3.57902 12.3897 3.5 12.1989 3.5 12C3.5 11.8011 3.57902 11.6103 3.71967 11.4697C3.86032 11.329 4.05109 11.25 4.25 11.25H11.75V3.75C11.75 3.55109 11.829 3.36032 11.9697 3.21967C12.1103 3.07902 12.3011 3 12.5 3C12.6989 3 12.8897 3.07902 13.0303 3.21967C13.171 3.36032 13.25 3.55109 13.25 3.75V11.25H20.75C20.9489 11.25 21.1397 11.329 21.2803 11.4697C21.421 11.6103 21.5 11.8011 21.5 12Z"
                                fill="#424C57"
                            />
                        </svg>
                    </div>
                    <strong>Adicionar ativos manualmente</strong>
                    <div className="description">
                        Faça você mesmo o controle de todas as suas operações na
                        Bolsa.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function B3Integration() {
    return (
        <Modal
            size="840px"
            tabletSize="85%"
            mobileSize="90%"
            hideHeader={true}
            source={
                <button className="btn">
                    <Icon
                        icon="/images/theme/b3.svg"
                        width="20px"
                        height="16px"
                    />
                    Integração B3
                </button>
            }
            content={<B3Content />}
        />
    );
}
