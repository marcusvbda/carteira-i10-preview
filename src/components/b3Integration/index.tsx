import Icon from '../common/icon';
import { seo } from '@/constants/seo';
import { useRouter } from 'next/navigation';

export default function B3Integration() {
    const router = useRouter();
    const { path } = seo.integrationB3;

    const goToPage = () => router.push(path);

    return (
        <button className="btn" onClick={goToPage}>
            <Icon icon="/images/theme/b3.svg" width="20px" height="16px" />
            Integração B3
        </button>
    );
}
