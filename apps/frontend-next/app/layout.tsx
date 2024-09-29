import type { Metadata } from 'next';
import './globals.css';
import NavBottom from '@/components/NavBottom';
import NavTop from '@/components/NavTop';
import { AlephiumWalletProvider } from '@alephium/web3-react';
import { Provider as StoreProvider } from 'jotai';
import '@fontsource/poppins';
import { ThemeProvider } from '@mui/material';
import themeConfig from './theme';
import Loading from '@/components/loading/Loading';
import ModalConnectWallet from '@/components/modalConnectWallet/ModalConnectWallet';

export const metadata: Metadata = {
  title: 'Alephium Profit',
  description: 'Alephium Profit dApp Follow up your profits in Alephium.',
  keywords: ['Alephium', 'Alph', 'web3', 'PNL', 'Profit', 'dApp', 'Blockchain', 'Investments'],
  authors: [{ name: 'Alephium Profit', url: 'https://alephium-profit.com' }],
  metadataBase: new URL('https://alephium-profit.com'),
  alternates: {
    canonical: 'https://alephium-profit.com',
  },
  openGraph: {
    title: 'Alephium Profit',
    description: 'Alephium Profit dApp Follow up your profits in Alephium.',
    url: 'https://alephium-profit.com',
    siteName: 'Alephium Profit',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/open-graph.jpg',
        width: 1200,
        height: 630,
        alt: 'Alephium Profit - Follow up your profits in Alephium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alephium Profit',
    description: 'Alephium Profit DAPP to follow up on your profits on the Alephium network.',
    images: ['/open-graph.jpg'],
    creator: '@AlephiumProFitBot', // Opcional
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/profit-logo.svg',
    apple: '/profit-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container">
        <AlephiumWalletProvider network="mainnet">
          <ThemeProvider theme={themeConfig}>
            <StoreProvider>
              <ModalConnectWallet />
              <Loading />
              <NavTop />
              {children}
              <NavBottom />
            </StoreProvider>
          </ThemeProvider>
        </AlephiumWalletProvider>
      </body>
    </html>
  );
}
