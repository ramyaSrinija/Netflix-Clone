import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/hooks/useAuth'
// import {RecoilRoot} from 'recoil';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Netflix',
  description: 'Netflix clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
      {/* <RecoilRoot>  */}
        <AuthProvider>
          {children}
        </AuthProvider>
      {/* </RecoilRoot>  */}
      </body>
    </html>
  )
}
