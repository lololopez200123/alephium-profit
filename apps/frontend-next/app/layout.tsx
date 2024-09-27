import type { Metadata } from "next";
import "./globals.css";
import NavBottom from "@/components/NavBottom";
import NavTop from "@/components/NavTop";
import { AlephiumWalletProvider } from "@alephium/web3-react";
import { Provider as StoreProvider } from "jotai";
import "@fontsource/poppins";
import { ThemeProvider } from "@mui/material";
import themeConfig from "./theme";

export const metadata: Metadata = {
  title: "Alephium Profit",
  description: "Alephium Profit dApp",
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
