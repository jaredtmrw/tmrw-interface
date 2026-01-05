import {
  Flame,
  Wind,
  Thermometer,
  Leaf,
  Droplet,
  House,
  LayoutGrid, 
  Clock,
  Shield,
  Scissors,
  TriangleAlert,
  Search,
  Crosshair,
  CircleUser,
  Plus,
  Minus,
  Layers,
  Compass,
  ArrowUpRight,
  Users,
  MessageSquare,
  ChevronDown
} from "lucide-react"

export const IconMap = {
  fire: Flame,
  wind: Wind,
  heat: Thermometer,
  plants: Leaf,
  water: Droplet,
  house: House,
  home: House,
  neighbors: Users,
  cluster: LayoutGrid,
  clock: Clock,
  shield: Shield,
  scissors: Scissors,
  pruning_shears: Scissors,
  warning: TriangleAlert,
  triangle_alert: TriangleAlert,
  search: Search,
  crosshair: Crosshair,
  circle_user: CircleUser,
  plus: Plus,
  minus: Minus,
  layers: Layers,
  compass: Compass,
  arrow_up_right: ArrowUpRight,
  message_square: MessageSquare,
  chevron_down: ChevronDown,
}

export type IconName = keyof typeof IconMap

export const Icon = ({ name, className }: { name: string; className?: string }) => {
  const LucideIcon = IconMap[name as IconName] || House 
  return <LucideIcon className={className} />
}
