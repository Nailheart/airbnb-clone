import { FC } from 'react';
import { IconType } from 'react-icons';

import { UserResponseDto } from '@/common/types/types';
import { useCountries } from '@/hooks/hooks';
import { Avatar } from '@/components/avatar/avatar';
import { ListingCategory } from '@/components/listing-category/listing-category';
import Map from '@/components/map/map';

type Props = {
  user: UserResponseDto;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  locationValue: string;
  category: {
    icon: IconType;
    label: string;
    description: string;
  } | undefined;
}

const ListingInfo: FC<Props> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  locationValue,
  category,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return ( 
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <h3>Hosted by {user?.name}</h3>
          <Avatar src={user?.image} />
        </div>
        <div className="flex gap-4 font-light text-neutral-500">
          <span>{guestCount} guests</span>
          <span>{roomCount} rooms</span>
          <span>{bathroomCount} bathrooms</span>
        </div>
      </div>
      <hr />
      {category && (
        <>
          <ListingCategory
            icon={category.icon} 
            label={category?.label}
            description={category?.description} 
          />
          <hr />
        </>
      )}
      <p className="text-lg font-light text-neutral-500">{description}</p>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export { ListingInfo };