import { IconName } from '@/common/types/types';

type ListingCategory = {
  label: string;
  iconName: IconName;
  description: string;
}

const listingCategories: ListingCategory[] = [
  {
    label: 'Beach',
    iconName: 'beach',
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    iconName: 'windmill',
    description: 'This property is has windmills!',
  },
  {
    label: 'Modern',
    iconName: 'villa',
    description: 'This property is modern!'
  },
  {
    label: 'Countryside',
    iconName: 'mountain',
    description: 'This property is in the countryside!'
  },
  {
    label: 'Pools',
    iconName: 'pool',
    description: 'This is property has a beautiful pool!'
  },
  {
    label: 'Islands',
    iconName: 'island',
    description: 'This property is on an island!'
  },
  {
    label: 'Lake',
    iconName: 'boatFishing',
    description: 'This property is near a lake!'
  },
  {
    label: 'Skiing',
    iconName: 'skiing',
    description: 'This property has skiing activies!'
  },
  {
    label: 'Castles',
    iconName: 'castle',
    description: 'This property is an ancient castle!'
  },
  {
    label: 'Caves',
    iconName: 'cave',
    description: 'This property is in a spooky cave!'
  },
  {
    label: 'Camping',
    iconName: 'camp',
    description: 'This property offers camping activities!'
  },
  {
    label: 'Arctic',
    iconName: 'snow',
    description: 'This property is in arctic environment!'
  },
  {
    label: 'Desert',
    iconName: 'cactus',
    description: 'This property is in the desert!'
  },
  {
    label: 'Barns',
    iconName: 'barn',
    description: 'This property is in a barn!'
  },
  {
    label: 'Lux',
    iconName: 'diamond',
    description: 'This property is brand new and luxurious!'
  }
];

export { listingCategories };