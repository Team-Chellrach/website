import type { IconComponent } from './icons'

// The hexagon from the Chellrach logo, used as the marker for capabilities and principles.
export default function Hexagon({ icon: Icon, size = 'md' }: { icon: IconComponent; size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'h-[34px] w-[30px]' : 'h-[50px] w-[44px]'
  const glyph = size === 'sm' ? 'h-[15px] w-[15px]' : 'h-5 w-5'
  return (
    <span className={`hexagon bg-gradient-brand inline-grid shrink-0 place-items-center text-white ${box}`}>
      <Icon className={glyph} strokeWidth={2} />
    </span>
  )
}
