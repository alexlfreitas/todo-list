'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { MoonStar, Sun } from 'lucide-react'

export const ToggleTheme = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Enquanto não estiver montado, não renderize nada
  if (!mounted) {
    return null
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme

  const handleToggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      onClick={handleToggleTheme}
      variant="link"
      className="w-8 h-auto aspect-square absolute top-2 right-2 text-white"
    >
      <MoonStar className={currentTheme === 'dark' ? 'block' : 'hidden'} />
      <Sun className={currentTheme === 'dark' ? 'hidden' : 'block'} />
    </Button>
  )
}
