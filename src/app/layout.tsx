import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const font = Montserrat({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ToDo List',
  description: 'Lista de tarefas simples',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${font.className} ${font.variable} antialiased text-sm`}
      >
        {children}
      </body>
    </html>
  )
}
