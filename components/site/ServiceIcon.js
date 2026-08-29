import { Code2, Globe, Smartphone, PenTool, Cloud, Sparkles } from 'lucide-react'

const icons = {
  code: Code2,
  globe: Globe,
  smartphone: Smartphone,
  pen: PenTool,
  cloud: Cloud,
  sparkles: Sparkles,
}

export default function ServiceIcon({ name, size = 22, className = '' }) {
  const Icon = icons[name] || Code2
  return <Icon size={size} className={className} />
}
