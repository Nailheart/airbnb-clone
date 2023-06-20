import { FC } from 'react';

import { IconName } from '@/common/types/types';
import { Icon } from '@/components/icon/icon';

type Props = {
  label: string;
  iconName: IconName;
  description: string;
}

const ListingCategory: FC<Props> = ({ label, iconName, description }) => {
  return ( 
    <div className="flex items-center gap-4">
      <Icon 
        className="text-neutral-600"
        name={iconName}
        size={40}
      />
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{label}</span>
        <span className="text-neutral-500 font-light">{description}</span>
      </div>
    </div>
  );
};

export { ListingCategory };