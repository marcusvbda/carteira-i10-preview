import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import './_global.scss';
import { seo } from '@/constants/seo';
import { DefinitionsProvider } from '@/context/definitionsContext';
import NextAuthSessionProvider from '@/providers/SessionProvider';
import { ThemeProvider } from '@/context/themeContext';
import AdminLayout from './_adminLayout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { AuthProvider } from '@/context/authContext';
import { WalletProvider } from '@/context/walletContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = seo.default;

export default async function RootLayout({ children }: any) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body suppressHydrationWarning className={inter.className}>
                <AuthProvider session={session}>
                    <WalletProvider>
                        <NextAuthSessionProvider>
                            <DefinitionsProvider>
                                <ThemeProvider>
                                    <AdminLayout>{children}</AdminLayout>
                                </ThemeProvider>
                            </DefinitionsProvider>
                        </NextAuthSessionProvider>
                    </WalletProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
