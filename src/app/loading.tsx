import Skeleton from '@/components/common/skeleton';

export default function Loading() {
    return (
        <div className="page-container">
            <div className="flex-row gap-10">
                <Skeleton width="33%" height="122px" />
                <Skeleton width="33%" height="122px" />
                <Skeleton width="33%" height="122px" />
                <Skeleton width="33%" height="122px" />
            </div>
            <div className="flex-row gap-10">
                <Skeleton width="100%" height="50px" />
            </div>
            <div className="flex-row gap-10">
                <Skeleton width="70%" height="100px" />
                <Skeleton width="30%" height="100px" />
            </div>
            <div className="flex-row gap-10">
                <Skeleton width="33%" height="110px" />
                <Skeleton width="33%" height="110px" />
                <Skeleton width="33%" height="110px" />
            </div>
            <div className="flex-row gap-10">
                <Skeleton width="100%" height="90px" />
            </div>
        </div>
    );
}
