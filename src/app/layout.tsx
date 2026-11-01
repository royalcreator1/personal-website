import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
const manrope = Manrope({ subsets: ['latin'], display: 'swap' });
export const metadata: Metadata = {
    title: 'Jaswanth Chengalapttu — Software Engineer',
    description: 'Thoughtful interfaces. Robust systems. Explore Jaswanth’s work across full stack development, healthcare, connected mobility, and cloud integrations.',
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
