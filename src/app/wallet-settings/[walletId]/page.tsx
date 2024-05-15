import { seo } from '@/constants/seo';
import { Metadata } from 'next';
import './_styles.scss';
import Fragments from './_fragments';

export const metadata: Metadata = seo.settings;

export default function WalletSettings(): JSX.Element {
    return <Fragments />;
}
