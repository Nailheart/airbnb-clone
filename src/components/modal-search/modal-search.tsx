'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import qs, { ParsedQuery } from 'query-string';
import { Range } from 'react-date-range'; // TODO: move to type
import { formatISO } from 'date-fns';

import { ModalSearchSteps } from '@/common/enums/enums';
import { CountrySelectValue } from '@/common/types/types';
import { useSearchModal } from '@/hooks/hooks';
import { Calendar } from '@/components/calendar/calendar';
import { Counter } from '@/components/counter/counter';
import { CountrySelect } from '@/components/country-select/country-select';
import { Modal } from '@/components/modal/modal';
import { Heading } from '@/components/heading/heading';
import { Map } from '@/components/map/map';

const ModalSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(ModalSearchSteps.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const actionLabel = step === ModalSearchSteps.INFO ? 'Search' : 'Next';
  const secondaryActionLabel = step === ModalSearchSteps.LOCATION ? undefined : 'Back';

  const handleStepPrev = () => setStep((value) => value - 1);
  const handleStepNext = () => setStep((value) => value + 1);

  const onSubmit = async () => {
    if (step !== ModalSearchSteps.INFO) {
      return handleStepNext();
    }

    let currentQuery: ParsedQuery<string> = {};

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    currentQuery.locationValue = location?.value ?? '';
    currentQuery.guestCount = guestCount.toString();
    currentQuery.roomCount = roomCount.toString();
    currentQuery.bathroomCount = bathroomCount.toString();
    currentQuery.startDate = formatISO(dateRange.startDate as Date);
    currentQuery.endDate = formatISO(dateRange.endDate as Date);

    const url = qs.stringifyUrl({
      url: '/',
      query: currentQuery,
    }, { skipNull: true });

    setStep(ModalSearchSteps.LOCATION);
    searchModal.onClose();
    router.push(url);
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        description="Find the perfect location!"
      />
      <CountrySelect 
        value={location} 
        onChange={(value) => setLocation(value as CountrySelectValue)} 
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === ModalSearchSteps.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          description="Make sure everyone is free!"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  };

  if (step === ModalSearchSteps.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="More information"
          description="Find your perfect place!"
        />
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />        
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bahtrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  };

  return (
    <Modal
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      isOpen={searchModal.isOpen}
      secondaryAction={handleStepPrev}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
    />
  );
}

export { ModalSearch };
