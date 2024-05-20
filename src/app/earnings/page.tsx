import './_styles.scss';
import { seo } from '@/constants/seo';
import { Metadata } from 'next';
import Summary from './_summary';
import Evolution from './_evolution';
import History from './_history';
import Details from './_details';

export const metadata: Metadata = seo.earnings;

export default function EarningsPage(): JSX.Element {
    return (
        <section className="earnings-page">
            <div className="page-container">
                <div className="container-row">
                    <Summary />
                    <Evolution />
                </div>
                <History />
                <Details />
            </div>
        </section>
    );
}
