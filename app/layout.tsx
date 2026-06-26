import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'NeuralFlow — AI-Driven Data Automation Platform',
  description:
    "Automate your data pipelines with NeuralFlow's intelligent AI platform. Real-time analytics, smart routing, and enterprise-grade automation.",
  keywords:
    'AI automation, data pipeline, machine learning platform, workflow automation',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://neuralflow.ai',
  },
  openGraph: {
    title: 'NeuralFlow — AI-Driven Data Automation Platform',
    description:
      "Automate your data pipelines with NeuralFlow's intelligent AI platform. Real-time analytics, smart routing, and enterprise-grade automation.",
    url: 'https://neuralflow.ai',
    type: 'website',
    images: [
      {
        url: 'https://neuralflow.ai/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NeuralFlow — AI Data Automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuralFlow — AI-Driven Data Automation Platform',
    description:
      "Automate your data pipelines with NeuralFlow's intelligent AI platform.",
    images: ['https://neuralflow.ai/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
