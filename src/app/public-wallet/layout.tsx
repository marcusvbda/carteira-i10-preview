import './_styles.scss';
import FooterComments from './footerComments';

export default async function RootLayout({ children }: any) {
	return (
		<section className="public-wallet">
			{children}
			<FooterComments />
		</section>
	);
}
