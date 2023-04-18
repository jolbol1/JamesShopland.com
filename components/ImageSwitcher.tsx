'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { ImageProps, StaticImageData } from 'next/image'

interface Props extends Omit<ImageProps, 'src'> {
  light: StaticImageData
  dark: StaticImageData
}

const ImageSwitcher = ({ light, dark, alt, ...rest }: Props) => {
  const { theme, resolvedTheme } = useTheme()
  const [clientLoaded, setClientLoaded] = useState(false)
  const [aiImage, setAiImage] = useState(null)

  useEffect(() => {
    setClientLoaded(true)
  }, [])

  useEffect(() => {
    if (clientLoaded) {
      if (theme === 'light') {
        setAiImage('light')
      }
      if (theme === 'dark') {
        setAiImage('dark')
      }
      if (resolvedTheme === 'system') {
        if (theme === 'light') {
          setAiImage('light')
        }
        if (theme === 'dark') {
          setAiImage('dark')
        }
      }
    }
  }, [clientLoaded, theme, resolvedTheme, aiImage])

  return <Image alt={alt} src={aiImage === 'light' ? light : dark} {...rest} />
}

export default ImageSwitcher