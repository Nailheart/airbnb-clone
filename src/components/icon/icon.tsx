import { FC, SVGProps } from 'react';
import {
  AlignJustify,
  Check,
  ChevronRight,
  Circle,
  Chrome,
  Github,
  User,
  X,
  Plus,
  Minus,
  ImagePlus,
  Search,
  DollarSign,
} from 'lucide-react';

import Airbnb from './svg/airbnb.svg';
import Barn from './svg/barn.svg';
import Beach from './svg/beach.svg';
import BoatFishing from './svg/boat-fishing.svg';
import Cactus from './svg/cactus.svg';
import Camp from './svg/camp.svg';
import Castle from './svg/castle.svg';
import Cave from './svg/cave.svg';
import Diamond from './svg/diamond.svg';
import Heart from './svg/heart.svg';
import Island from './svg/island.svg';
import Mountain from './svg/mountain.svg';
import Pool from './svg/pool.svg';
import Skiing from './svg/skiing.svg';
import Snow from './svg/snow.svg';
import Villa from './svg/villa.svg';
import Windmill from './svg/windmill.svg';

import { IconName } from '@/common/types/types';

const icons: Record<IconName, FC<SVGProps<SVGSVGElement>>> = {
  // lucide icons
  alignJustify: AlignJustify,
  check: Check,
  chevronRight: ChevronRight,
  circle: Circle,
  chrome: Chrome,
  github: Github,
  user: User,
  x: X,
  plus: Plus,
  minus: Minus,
  imagePlus: ImagePlus,
  search: Search,
  dollarSign: DollarSign,
  // custom icons
  boatFishing: BoatFishing,
  airbnb: Airbnb,
  barn: Barn,
  beach: Beach,
  cactus: Cactus,
  camp: Camp,
  castle: Castle,
  cave: Cave,
  diamond: Diamond,
  heart: Heart,
  island: Island,
  mountain: Mountain,
  pool: Pool,
  skiing: Skiing,
  snow: Snow,
  villa: Villa,
  windmill: Windmill,
}

type Props = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number | string;
}

const Icon: FC<Props> = ({ name, size=24, ...rest }) => {
  const SVG = icons[name];
  
  return (
    <SVG width={size} height={size} {...rest} />
  );
};

export { Icon };
