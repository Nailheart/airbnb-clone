import { FC } from 'react';
import Image from 'next/image';

import { UserResponseDto } from '@/common/types/types';
import { cn } from '@/helpers/helpers';
import { useCountries } from '@/hooks/hooks';
import { ButtonHeart } from '@/components/button-heart/button-heart';
import { Heading } from '@/components/heading/heading';

type Props = {
  id: string;
  title: string;
  locationValue: string;
  imageSrc: string;
  currentUser?: UserResponseDto | null;
}

const ListingHead: FC<Props> = ({
  id,
  title,
  locationValue,
  imageSrc,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return ( 
    <>
      <Heading 
        title={title}
        description={`${location?.region}, ${location?.label}`}
      />
      <div className="h-[60vh] relative bg-[#efefef] rounded-xl">
        <Image
          className={cn(
            'w-full object-contain rounded-xl',
            imageSrc && 'object-cover'
          )}
          src={imageSrc || '/images/property_placeholder.jpg'}
          fill
          alt="Picture of the house"
        />
        <div className="absolute top-5 right-5">
          <ButtonHeart
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  );
};

export { ListingHead };