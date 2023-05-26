import { FC } from 'react';
import { IconType } from 'react-icons';

type Props = {
  label: string;
  description: string;
  icon: IconType;
}

const ListingCategory: FC<Props> = ({ label, description, icon: Icon }) => {
  return ( 
    <div className="flex items-center gap-4">
      <Icon className="text-neutral-600" size={40} />
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{label}</span>
        <span className="text-neutral-500 font-light">{description}</span>
      </div>
    </div>
  );
};

export { ListingCategory };