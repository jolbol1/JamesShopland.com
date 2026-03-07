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
  const clientLoaded = useMounted()

  const activeTheme = theme === "system" ? resolvedTheme : theme
  const imageSource = clientLoaded && activeTheme === "light" ? light : dark

  return <Image alt={alt} src={imageSource} {...rest} />
}

export default ImageSwitcher
