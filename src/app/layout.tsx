import { Inter } from 'next/font/google'
import './globals.css'
import { forceIncludeClasses } from '@/lib/css-test'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Styrkurheim - Norse Fitness Tracker',
  description: 'Strength through the ages - Norse-themed fitness tracking app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Force include all critical CSS classes in build
  const _ = forceIncludeClasses()
  
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <div className="w-full max-w-md mx-auto lg:max-w-4xl xl:max-w-6xl">
          {children}
        </div>
      </body>
    </html>
  )
}