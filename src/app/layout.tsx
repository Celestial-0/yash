import type { Metadata } from "next";
import localFont from "next/font/local";
import { Container, Theme } from '@radix-ui/themes';
import { NavigationBar } from '@/components/core/navigation/navigation-bar';
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { GridBackground } from '@/components/core/grid-background';
import { ThemeProvider } from 'next-themes';


const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Celestial",
    description: "My Portfolio",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider attribute='class' enableSystem={true} defaultTheme='dark'>
                    <Theme accentColor={ 'gray' }>
                        <GridBackground />
                        <NavigationBar />
                        <Container size={ '2' } className={ 'p-3 sm:p-15 ' }>
                            { children }
                            <Analytics />
                        </Container>
                    </Theme>
                </ThemeProvider>
                
            </body>
        </html>
    );
}