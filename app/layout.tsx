import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Declutter - 비움 기록',
  description: '덜어냄의 미학, 미니멀리스트 비움 기록 앱',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#F9F9F9',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="bg-[#E5E5EA]">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
