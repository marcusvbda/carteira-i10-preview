import './_styles.scss';
import { seo } from '@/constants/seo';
import { Metadata } from 'next';
import Fragments from './_fragments';

export const metadata: Metadata = seo.goals;

export default function IntegrationB3Page(): JSX.Element {
    return <Fragments />;
}
