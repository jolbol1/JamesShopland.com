import Image, { ImageProps } from 'next/image'
import azure from './azure.webp'
import csharp from './csharp.webp'
import git from './git.webp'
import javascript from './javascript.webp'
import react from './react.webp'
import svelte from './svelte.webp'
import tailwind from './tailwind.webp'
import typescript from './typescript.webp'
import java from './java.webp'
import next from './next.webp'
import npm from './npm.webp'
import python from './python.webp'
import php from './php.webp'

const components = {
  azure,
  csharp,
  git,
  javascript,
  react,
  svelte,
  tailwind,
  typescript,
  java,
  next,
  npm,
  python,
  php,
}

export type DevIconTypes = keyof typeof components

interface DevIconProps extends Omit<ImageProps, 'src'> {
  kind: DevIconTypes
}

export function DevIcon({ kind, alt, ...rest }: DevIconProps) {
  const image = components[kind]

  return <Image src={image} alt={alt} {...rest} quality={100} />
}
