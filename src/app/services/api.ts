import { getToken } from 'next-auth/jwt';
export const apiCall = async (req: any, url: string) => {
    const cx = await getToken({ req });
    const { user } = cx as any;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/${url}`, {
        headers: {
            Authorization: `Bearer ${user.jwt}`
        }
    });
    return res.json();
};
