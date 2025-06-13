import { Inter, Cinzel } from 'next/font/google'
import './globals.css'
import { forceIncludeClasses } from '@/lib/css-test'
import { HeroUIProvider } from '@heroui/system'

const inter = Inter({ subsets: ['latin'] })
const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap'
})

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
      <body className={`${inter.className} ${cinzel.variable} bg-background text-foreground min-h-screen`}>
        <HeroUIProvider>
          <div className="w-full max-w-md mx-auto lg:max-w-4xl xl:max-w-6xl">
            {children}
          </div>
        </HeroUIProvider>
      </body>
    </html>
  )
}