'use client';

import { useContext, useMemo, useState } from 'react';
import Modal from '../common/modal';
import { WalletContext } from '@/context/walletContext';
import Trend from '../common/trend';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import { seo } from '@/constants/seo';
import { useRouter } from 'next/navigation';

const WalletItem = ({ wallet, selected, onClick, closeModal }: any) => {
    const router = useRouter();

    const goToSettings = (e: any) => {
        e.stopPropagation();
        router.push(seo.walletSettings.path.replace('{walletId}', wallet.id));
        closeModal && closeModal();
    };

    return (
        <div className={`wallet-item ${selected && 'selected'}`}>
            <h4>
                <strong onClick={onClick && onClick}>
                    {wallet && wallet.name}
                </strong>
                <a
                    href="#"
                    onClick={(e) => goToSettings(e)}
                    className="settings-icon"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path
                            d="M9.99979 6.25C9.25811 6.25 8.53309 6.46993 7.9164 6.88199C7.29972 7.29404 6.81907 7.87971 6.53524 8.56493C6.25141 9.25016 6.17715 10.0042 6.32185 10.7316C6.46654 11.459 6.82369 12.1272 7.34814 12.6516C7.87259 13.1761 8.54077 13.5332 9.2682 13.6779C9.99563 13.8226 10.7496 13.7484 11.4349 13.4645C12.1201 13.1807 12.7057 12.7001 13.1178 12.0834C13.5299 11.4667 13.7498 10.7417 13.7498 10C13.7488 9.00575 13.3533 8.05253 12.6503 7.34949C11.9473 6.64645 10.994 6.25103 9.99979 6.25ZM9.99979 12.5C9.50534 12.5 9.02199 12.3534 8.61087 12.0787C8.19974 11.804 7.87931 11.4135 7.69009 10.9567C7.50087 10.4999 7.45136 9.99722 7.54783 9.51227C7.64429 9.02732 7.88239 8.58186 8.23202 8.23223C8.58166 7.8826 9.02711 7.6445 9.51207 7.54803C9.99702 7.45157 10.4997 7.50108 10.9565 7.6903C11.4133 7.87952 11.8038 8.19995 12.0785 8.61107C12.3532 9.0222 12.4998 9.50554 12.4998 10C12.4998 10.663 12.2364 11.2989 11.7676 11.7678C11.2987 12.2366 10.6628 12.5 9.99979 12.5ZM16.8748 10.1687C16.8779 10.0562 16.8779 9.94375 16.8748 9.83125L18.0404 8.375C18.1015 8.29854 18.1438 8.20879 18.1639 8.11299C18.184 8.01718 18.1813 7.918 18.156 7.82343C17.965 7.10515 17.6791 6.41551 17.306 5.77265C17.2572 5.68853 17.1894 5.61696 17.108 5.56366C17.0266 5.51036 16.9339 5.47679 16.8373 5.46562L14.9842 5.25937C14.9071 5.17812 14.829 5.1 14.7498 5.025L14.531 3.16719C14.5198 3.07048 14.4861 2.97773 14.4327 2.89635C14.3792 2.81497 14.3075 2.74719 14.2232 2.69844C13.5801 2.32605 12.8905 2.04049 12.1724 1.84922C12.0778 1.82406 11.9786 1.82148 11.8828 1.8417C11.787 1.86192 11.6973 1.90437 11.6209 1.96562L10.1685 3.125H9.83104L8.37479 1.96172C8.29833 1.9006 8.20859 1.85829 8.11278 1.83821C8.01698 1.81813 7.9178 1.82083 7.82323 1.84609C7.10506 2.03752 6.41546 2.32334 5.77245 2.69609C5.68832 2.74494 5.61676 2.81275 5.56346 2.89413C5.51015 2.97551 5.47658 3.0682 5.46542 3.16484L5.25917 5.02109C5.17792 5.0987 5.09979 5.17682 5.02479 5.25547L3.16698 5.46875C3.07027 5.48 2.97753 5.51369 2.89614 5.56713C2.81476 5.62057 2.74699 5.69229 2.69823 5.77656C2.32584 6.41966 2.04029 7.10925 1.84901 7.82734C1.82385 7.92197 1.82128 8.02119 1.8415 8.11699C1.86172 8.2128 1.90416 8.30251 1.96542 8.3789L3.12479 9.83125V10.1687L1.96151 11.625C1.90039 11.7015 1.85809 11.7912 1.838 11.887C1.81792 11.9828 1.82062 12.082 1.84589 12.1766C2.03697 12.8948 2.32281 13.5845 2.69589 14.2273C2.74473 14.3115 2.81255 14.383 2.89392 14.4363C2.9753 14.4896 3.068 14.5232 3.16464 14.5344L5.01776 14.7406C5.09536 14.8219 5.17349 14.9 5.25214 14.975L5.46854 16.8328C5.47979 16.9295 5.51348 17.0223 5.56692 17.1036C5.62037 17.185 5.69208 17.2528 5.77635 17.3016C6.41945 17.6739 7.10904 17.9595 7.82714 18.1508C7.92176 18.1759 8.02098 18.1785 8.11679 18.1583C8.21259 18.1381 8.30231 18.0956 8.3787 18.0344L9.83104 16.875C9.94354 16.8781 10.056 16.8781 10.1685 16.875L11.6248 18.0406C11.7013 18.1017 11.791 18.144 11.8868 18.1641C11.9826 18.1842 12.0818 18.1815 12.1764 18.1562C12.8946 17.9652 13.5843 17.6793 14.2271 17.3062C14.3113 17.2574 14.3828 17.1896 14.4361 17.1082C14.4894 17.0268 14.523 16.9341 14.5342 16.8375L14.7404 14.9844C14.8217 14.9073 14.8998 14.8292 14.9748 14.75L16.8326 14.5312C16.9293 14.52 17.0221 14.4863 17.1034 14.4329C17.1848 14.3794 17.2526 14.3077 17.3014 14.2234C17.6737 13.5803 17.9593 12.8907 18.1506 12.1727C18.1757 12.078 18.1783 11.9788 18.1581 11.883C18.1379 11.7872 18.0954 11.6975 18.0342 11.6211L16.8748 10.1687ZM15.617 9.66094C15.6303 9.88678 15.6303 10.1132 15.617 10.3391C15.6077 10.4937 15.6561 10.6463 15.7529 10.7672L16.8615 12.1523C16.7343 12.5566 16.5714 12.9488 16.3748 13.3242L14.6092 13.5242C14.4554 13.5413 14.3134 13.6148 14.2107 13.7305C14.0603 13.8996 13.9002 14.0598 13.731 14.2102C13.6153 14.3129 13.5419 14.4548 13.5248 14.6086L13.3287 16.3727C12.9533 16.5694 12.5611 16.7323 12.1568 16.8594L10.7709 15.7508C10.66 15.6622 10.5222 15.6139 10.3803 15.6141H10.3428C10.1169 15.6273 9.89048 15.6273 9.66464 15.6141C9.51001 15.6048 9.35744 15.6532 9.23651 15.75L7.84745 16.8594C7.44318 16.7322 7.05101 16.5693 6.67557 16.3727L6.47557 14.6094C6.4585 14.4556 6.38502 14.3136 6.26932 14.2109C6.10019 14.0606 5.94002 13.9004 5.78964 13.7312C5.68693 13.6156 5.54496 13.5421 5.3912 13.525L3.62714 13.3281C3.43041 12.9527 3.26753 12.5606 3.14042 12.1562L4.24901 10.7703C4.34581 10.6494 4.39426 10.4968 4.38495 10.3422C4.37167 10.1163 4.37167 9.88991 4.38495 9.66406C4.39426 9.50944 4.34581 9.35687 4.24901 9.23594L3.14042 7.84765C3.26762 7.44338 3.4305 7.05122 3.62714 6.67578L5.39042 6.47578C5.54418 6.45871 5.68615 6.38522 5.78885 6.26953C5.93924 6.1004 6.09941 5.94022 6.26854 5.78984C6.3847 5.68707 6.45849 5.54477 6.47557 5.39062L6.67167 3.62734C7.04706 3.43062 7.43924 3.26773 7.84354 3.14062L9.22948 4.24922C9.35041 4.34602 9.50298 4.39446 9.6576 4.38515C9.88345 4.37187 10.1099 4.37187 10.3357 4.38515C10.4904 4.39446 10.6429 4.34602 10.7639 4.24922L12.1521 3.14062C12.5564 3.26783 12.9486 3.43071 13.324 3.62734L13.524 5.39062C13.5411 5.54438 13.6146 5.68635 13.7303 5.78906C13.8994 5.93944 14.0596 6.09961 14.2099 6.26875C14.3127 6.38444 14.4546 6.45793 14.6084 6.475L16.3724 6.67109C16.5692 7.04648 16.7321 7.43866 16.8592 7.84297L15.7506 9.2289C15.6528 9.35085 15.6043 9.50499 15.6146 9.66094H15.617Z"
                            fill="#778698"
                        />
                    </svg>
                </a>
            </h4>
            <div className="description">
                <span className="qty-actives">32 ativos</span>
                <span className="divisor" />
                <span className="amount">R$ 3.450.869.00</span>
                <Trend size="16px" type="positive" transparent />
            </div>
        </div>
    );
};

const ContentSlot = ({
    selectedWallet,
    wallets,
    setWalletId,
    closeModal
}: any) => {
    const [visible, setVisible] = useState('public');
    const [delay, setDelay] = useState(7);

    const otherWallets = useMemo(() => {
        return wallets.filter((w: any) => w.id !== selectedWallet.id);
    }, [wallets, selectedWallet]);

    const selectWallet = (item: any) => {
        setWalletId(item.id);
        closeModal();
    };

    return (
        <div className="select-wallet-content">
            <WalletItem
                wallet={selectedWallet}
                selected
                closeModal={closeModal}
            />
            <div className="settings-card">
                <div className="row-item">
                    <div className="label">URL</div>
                    <div className="value">
                        https://investidor10.com.br/carteira/705939
                        <a href="#">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                            >
                                <path
                                    d="M11.5 4H2.5C2.36739 4 2.24021 4.05268 2.14645 4.14645C2.05268 4.24021 2 4.36739 2 4.5V13.5C2 13.6326 2.05268 13.7598 2.14645 13.8536C2.24021 13.9473 2.36739 14 2.5 14H11.5C11.6326 14 11.7598 13.9473 11.8536 13.8536C11.9473 13.7598 12 13.6326 12 13.5V4.5C12 4.36739 11.9473 4.24021 11.8536 4.14645C11.7598 4.05268 11.6326 4 11.5 4ZM11 13H3V5H11V13ZM14 2.5V11.5C14 11.6326 13.9473 11.7598 13.8536 11.8536C13.7598 11.9473 13.6326 12 13.5 12C13.3674 12 13.2402 11.9473 13.1464 11.8536C13.0527 11.7598 13 11.6326 13 11.5V3H4.5C4.36739 3 4.24021 2.94732 4.14645 2.85355C4.05268 2.75979 4 2.63261 4 2.5C4 2.36739 4.05268 2.24021 4.14645 2.14645C4.24021 2.05268 4.36739 2 4.5 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5Z"
                                    fill="#778698"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="row-item">
                    <div className="label">Visibilidade</div>
                    <div className="value">
                        <Select2
                            value={visible}
                            onSelect={(e: any) => setVisible(e.target.value)}
                            data={[
                                { id: 'public', text: 'Pública' },
                                { id: 'restrict', text: 'Restrita' },
                                { id: 'private', text: 'Privada' }
                            ]}
                        />
                    </div>
                </div>
                <div className="row-item">
                    <div className="label">
                        Demora na atualização da carteira
                    </div>
                    <div className="value">
                        <Select2
                            value={delay}
                            onSelect={(e: any) => setDelay(e.target.value)}
                            data={[
                                { id: 0, text: 'Tempo real' },
                                { id: 7, text: '7 Dias' },
                                { id: 14, text: '14 Dias' },
                                { id: 30, text: '30 Dias' }
                            ]}
                        />
                    </div>
                </div>
            </div>
            <div className="divisor" />
            {(otherWallets || []).map((wallet: any, index: number) => (
                <WalletItem
                    wallet={wallet}
                    key={index}
                    onClick={() => selectWallet(wallet)}
                />
            ))}
            <a href="#" className="add-new-wallet">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <path
                        d="M14 8C14 8.13261 13.9473 8.25979 13.8536 8.35355C13.7598 8.44732 13.6326 8.5 13.5 8.5H8.5V13.5C8.5 13.6326 8.44732 13.7598 8.35355 13.8536C8.25979 13.9473 8.13261 14 8 14C7.86739 14 7.74021 13.9473 7.64645 13.8536C7.55268 13.7598 7.5 13.6326 7.5 13.5V8.5H2.5C2.36739 8.5 2.24021 8.44732 2.14645 8.35355C2.05268 8.25979 2 8.13261 2 8C2 7.86739 2.05268 7.74021 2.14645 7.64645C2.24021 7.55268 2.36739 7.5 2.5 7.5H7.5V2.5C7.5 2.36739 7.55268 2.24021 7.64645 2.14645C7.74021 2.05268 7.86739 2 8 2C8.13261 2 8.25979 2.05268 8.35355 2.14645C8.44732 2.24021 8.5 2.36739 8.5 2.5V7.5H13.5C13.6326 7.5 13.7598 7.55268 13.8536 7.64645C13.9473 7.74021 14 7.86739 14 8Z"
                        fill="#2C3A53"
                    />
                </svg>
                Adicionar nova carteira
            </a>
        </div>
    );
};

export default function SelectWallet(): JSX.Element {
    const { setWalletId, selectedWallet, wallets } = useContext(WalletContext);
    const [visible, setVisible] = useState(false);

    return (
        <Modal
            size="600px"
            modalVisible={visible}
            setModalVisible={setVisible}
            tabletSize="50%"
            mobileSize="90%"
            type="wallet-dropdown-modal"
            source={
                <div className="wallet-dropdown">
                    {selectedWallet?.name || ''}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="10"
                        viewBox="0 0 13 10"
                        fill="none"
                    >
                        <path
                            d="M2.15019 2.08341H11.1502C11.2413 2.08365 11.3306 2.10459 11.4085 2.14399C11.4864 2.18338 11.55 2.23973 11.5923 2.30698C11.6346 2.37422 11.6541 2.44981 11.6487 2.52561C11.6433 2.60141 11.6133 2.67455 11.5617 2.73716L7.06169 8.15383C6.87519 8.37841 6.42619 8.37841 6.23919 8.15383L1.73919 2.73716C1.6871 2.67469 1.65656 2.60151 1.65087 2.52558C1.64519 2.44965 1.66458 2.37388 1.70695 2.30649C1.74931 2.2391 1.81303 2.18268 1.89117 2.14335C1.96932 2.10402 2.0589 2.08329 2.15019 2.08341Z"
                            fill="#F6F7F9"
                        />
                    </svg>
                </div>
            }
            hideHeader
            content={
                <ContentSlot
                    closeModal={() => setVisible(false)}
                    selectedWallet={selectedWallet}
                    setWalletId={setWalletId}
                    wallets={wallets}
                />
            }
        />
    );
}
