

import Navbar from '@/components/Navbar';
import CursorScript from '@/components/CursorScript';

import { Barlow_Semi_Condensed, Montserrat, Borel } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

const borel = Borel({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-borel',
});

const barlow = Barlow_Semi_Condensed({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
    variable: '--font-barlow',
});

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
});


export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const metadata = {
    title: 'Vibe Check',
    description: 'A modern web application',
    icons: {
        icon: '/favicon.ico',
    },
};





export default function RootLayout({ children }) {



    return (
        <html lang="en" data-bs-theme="dark" className={`${barlow.variable} ${montserrat.variable} ${borel.variable}`}>
            <body>
                <div id='cursor'></div>
                <Navbar />
                {children}
                <CursorScript />

            </body>
        </html>
    );
}


