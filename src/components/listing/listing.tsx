'use client';

import axios from 'axios';
import { FC, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Range } from 'react-date-range';
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import {
  ListingAndUserResponseDto,
  ReservationAndListingResponseDto,
  UserResponseDto,
} from '@/common/types/types';
import { useLoginModal } from '@/hooks/hooks';
import { listingCategories } from '@/common/constants/constants';
import { Container } from '@/components/container/container';
import { ListingHead } from './listing-head/listing-head';
import { ListingInfo } from './listing-info/listing-info';
import { ListingReservation } from './listing-reservation/listing-reservation';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

type Props = {
  listing: ListingAndUserResponseDto;
  reservations?: ReservationAndListingResponseDto[];
  currentUser?: UserResponseDto | null;
}

const Listing: FC<Props> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: ReservationAndListingResponseDto) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return listingCategories.find((items) => items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = () => {
      if (!currentUser) {
        return loginModal.onOpen();
      }

      setIsLoading(true);

      axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate, 
        dateRange.startDate
      );
      
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return ( 
    <Container>
      <div className="max-w-screen-lg mx-auto mb-10">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 gap-5 mt-6 md:grid-cols-8 md:gap-10">
            <div className="md:col-span-4">
              <ListingInfo
                category={category}
                user={listing.user}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
              />
            </div>
            <div className="order-first md:order-last md:col-span-4">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                disabled={isLoading}
                disabledDates={disabledDates}
                onSubmit={onCreateReservation}
                onChangeDate={(value) => setDateRange(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export { Listing };
