import { ReactNode } from 'react';
import SensitiveContent from '@/components/common/sensitiveContent';
import Trend from '@/components/common/trend';
import { useHelpers } from '@/hooks/helpers';
import PercentageInWallet from './_percentageInWallet';

interface IProps {
	qty: number;
	totalAmount: number;
	percent: number;
	profitability: number;
	percentageIdeal: number;
	infoData: any;
}

export default function DatatableFooter({
	qty,
	totalAmount,
	percent,
	profitability,
	percentageIdeal,
	infoData,
}: IProps): ReactNode {
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
			<div className="datatable-footer__item">
				<strong>Rentabilidade</strong>
				<div>
					<Trend
						type={
							profitability > 0
								? 'positive'
								: profitability == 0
									? ''
									: 'negative'
						}
						size="16px"
						value={`${parseInt(String(profitability))}%`}
						transparent
					/>
				</div>
			</div>
			<div className="datatable-footer__item">
				<PercentageInWallet
					infoData={infoData}
					percentage={percent}
					percentageIdeal={percentageIdeal}
				/>
			</div>
		</div>
	);
}
