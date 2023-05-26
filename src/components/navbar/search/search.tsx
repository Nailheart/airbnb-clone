'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';
import { useCountries, useSearchModal } from '@/hooks/hooks';

const Search = () => {
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue'); 
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return 'Anywhere';
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'Any Week';
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests';
  }, [guestCount]);

  return (
    <div
      className="w-full py-2 border-[1px] rounded-full shadow-sm cursor-pointer transition hover:shadow-md md:w-auto"
      onClick={searchModal.onOpen}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold px-6">{locationLabel}</span>
        <span className="hidden flex-1 text-sm font-semibold text-center px-6 border-x-[1px] sm:block">
          {durationLabel}
        </span>
        <div className="flex items-center gap-3 text-gray-600 text-sm pl-6 pr-2">
          <span className="hidden sm:block">{guestLabel}</span>
          <div className="text-white p-2 bg-rose-500 rounded-full">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Search };