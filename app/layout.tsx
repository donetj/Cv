import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Donet Joseph — Senior IT Support Specialist',
  description: 'Portfolio of Donet Joseph, Senior IT Support Specialist with 8+ years experience in Qatar and Kerala. Expert in POS, SAP, CRM, hardware support.',
  keywords: ['IT Support', 'Senior IT Specialist', 'Qatar', 'Kerala', 'POS', 'SAP', 'CRM', 'Donet Joseph'],
  authors: [{ name: 'Donet Joseph' }],
  openGraph: {
    title: 'Donet Joseph — Senior IT Support Specialist',
    description: 'A cinematic journey through 8+ years of IT excellence, set in the misty hills of Kerala.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Donet Joseph — Senior IT Support Specialist',
    description: 'A cinematic journey through 8+ years of IT excellence, set in the misty hills of Kerala.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a1208',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
