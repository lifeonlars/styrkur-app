import './globals.css'
import { forceIncludeClasses } from '@/lib/css-test'
import { Toaster } from '@/ui/sonner'

export const metadata = {
  title: 'Syrkur Saga - Your Strength Journey',
  description: 'Your strength journey unfolds - Track your epic fitness saga',
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
      <body className="bg-neu-base text-white min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  )
}