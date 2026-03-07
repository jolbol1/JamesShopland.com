"use client"

import Image, { ImageProps, StaticImageData } from "next/image"

import { useTheme } from "next-themes"

import { useMounted } from "@/hooks/use-mounted"

interface Props extends Omit<ImageProps, "src"> {
  light: StaticImageData
  dark: StaticImageData
}

const ImageSwitcher = ({ light, dark, alt, ...rest }: Props) => {
  const { theme, resolvedTheme } = useTheme()
  const mounted = useMounted()
  const activeTheme = theme === "system" ? resolvedTheme : theme
  const imageSrc = mounted && activeTheme === "light" ? light : dark

  return <Image alt={alt} src={imageSrc} {...rest} />
}

export default ImageSwitcher
