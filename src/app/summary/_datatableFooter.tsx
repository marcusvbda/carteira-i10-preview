import SensitiveContent from '@/components/common/sensitiveContent';
import Trend from '@/components/common/trend';
import { useHelpers } from '@/hooks/helpers';

interface IProps {
    qty: number;
    totalAmount: number;
    walletPercentage: number;
}

export default function DatatableFooter({
    qty,
    totalAmount,
    walletPercentage
}: IProps): JSX.Element {
    const helpers = useHelpers();

    return (
        <div className="datatable-footer">
            <div className="datatable-footer__item">
                <strong>Ativos</strong>
                <div>{qty}</div>
            </div>
            <div className="datatable-footer__item">
                <strong>Valor total</strong>
                <div>
                    <SensitiveContent>
                        {helpers.formatMoney(totalAmount)}
                    </SensitiveContent>
                </div>
            </div>
            {/* <div className="datatable-footer__item">
                <strong>Rentabilidade</strong>
                <div>
                    <Trend
                        type="positive"
                        size="16px"
                        value="16,34%"
                        transparent={true}
                    />
                </div>
            </div> */}
            <div className="datatable-footer__item">
                <strong>% na carteira</strong>
                <div>{walletPercentage}%</div>
            </div>
        </div>
    );
}
