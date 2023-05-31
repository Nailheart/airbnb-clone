'use client';

import { FC, useMemo } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

import {
  ReservationAndListingResponseDto,
  UserResponseDto,
  ListingResponseDto,
} from '@/common/types/types';
import { useCountries } from '@/hooks/hooks';
import { Button } from '@/components/button/button';
import { ButtonHeart } from '@/components/button-heart/button-heart';
import Link from 'next/link';

type Props = {
  data: ListingResponseDto;
  reservation?: ReservationAndListingResponseDto;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: UserResponseDto | null;
  onClick?: (id: string) => void;
};

const ListingCard: FC<Props> = ({
  data,
  reservation,
  disabled,
  actionLabel,
  actionId,
  currentUser,
  onClick,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancel = () => {
    if (disabled) return;

    onClick?.(actionId as string);
  };

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
  
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div className="relative">
      <div className="absolute top-3 right-3 z-10">
        <ButtonHeart 
          listingId={data.id} 
          currentUser={currentUser}
        />
      </div>
      <Link className="group" href={`/listings/${data.id}`}>
        <div className="flex flex-col gap-2">
          <div className="aspect-square rounded-xl overflow-hidden relative">
            <Image
              className="w-full h-full object-cover group-hover:scale-110 transition"
              src={data.imageSrc || '/images/default_property.png'}
              fill
              alt={data.description}
            />
          </div>
          <h2 className="text-lg font-semibold">
            {location?.region}, {location?.label}
          </h2>
          <span className="font-light text-neutral-500">
            {reservationDate || data.category}
          </span>
          <div>
            <span className="font-semibold">$ {price}</span>&nbsp;
            <span className="font-light">{!reservation ? 'night' : 'total price'}</span>
          </div>
        </div>
      </Link>
      {onClick && actionLabel && (
        <Button
          className="mt-2"
          size="sm"
          disabled={disabled}
          onClick={handleCancel}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export { ListingCard };