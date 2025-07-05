import './globals.css';
import type { Metadata } from 'next';
import { Crimson_Text } from 'next/font/google';

const crimsonText = Crimson_Text({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-crimson',
});

export const metadata: Metadata = {
  title: 'Dr. Serena Blake, PsyD - Clinical Psychologist in Los Angeles',
  description: 'Licensed clinical psychologist offering individual therapy, couples counseling, and trauma recovery in Los Angeles. Specializing in anxiety, relationships, and evidence-based care.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${crimsonText.variable} font-crimson`}>{children}</body>
    </html>
  );
}