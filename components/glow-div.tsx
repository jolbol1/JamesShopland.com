export function GlowDiv({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`group relative ${className ? className : ""}`} {...rest}>
      <div className="absolute -inset-px z-[-1] rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0  blur-lg transition-all duration-1000 group-hover:-inset-1 group-hover:opacity-100 group-hover:duration-200"></div>
      {children}
    </div>
  )
}
