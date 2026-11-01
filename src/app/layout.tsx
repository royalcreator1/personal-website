import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
const manrope = Manrope({ subsets: ['latin'], display: 'swap' });
export const metadata: Metadata = {
    title: 'CH V N S JASWANTH - Software Engineer',
    description: 'Software Engineer Portfolio - Full Stack Developer',
};
export default function RootLayout({ children, }: {
    children: React.ReactNode;
}) {
    return (<html lang="en" suppressHydrationWarning>
      <body className={manrope.className}>

          {children}

      </body>
    </html>);
}
