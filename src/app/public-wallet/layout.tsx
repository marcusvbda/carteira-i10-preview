import DefaultLayout from '@/layouts/default';
import './_styles.scss';
import FooterComments from './footerComments';

export default async function RootLayout({ children }: any) {
	return (
		<DefaultLayout>
			<section className="public-wallet">
				{children}
				<FooterComments />
			</section>
		</DefaultLayout>
	);
}
