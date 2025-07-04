import './globals.css'
import { Inter } from 'next/font/google'
import ClientProviders from '@/components/ClientProviders'
import Navbar from '@/components/Navbar';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PixelStore',
  description: 'E-commerce product listing assignment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          <Navbar />
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
