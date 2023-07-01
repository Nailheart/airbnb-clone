import { ReactNode } from 'react';
import { Nunito } from 'next/font/google';

import { getCurrentUser } from '@/services/getCurrentUser';
import { ModalRent } from '@/components/modal-rent/modal-rent';
import { ModalLogin } from '@/components/modal-login/modal-login';
import { ModalRegister } from '@/components/modal-register/modal-register';
import { ModalSearch } from '@/components/modal-search/modal-search';
import { Toast } from '@/components/toast/toast';
import { Navbar } from '@/components/navbar/navbar';
import { ClientOnly } from '@/components/client-only/client-only';
import './globals.css';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb Clone - created as project for portfolio',
  icons: {
    icon: [
      {
        url: '/favicon/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/favicon/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    apple: {
      url: '/favicon/apple-touch-icon.png',
      sizes: '180x180'
    },
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#222222',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  themeColor: '#111111',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ModalLogin />
        <ModalRegister />

        <ClientOnly>
          <ModalSearch />
          <ModalRent />
        </ClientOnly>
      
        <Navbar user={currentUser} />
        <main className="min-h-full py-8">
          {children}
        </main>
        <Toast />
      </body>
    </html>
  );
};
