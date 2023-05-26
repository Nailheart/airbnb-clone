'use client';

import axios from 'axios';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { ModalRentSteps } from '@/common/enums/enums';
import { useRentModal } from '@/hooks/hooks';
import { listingCategories } from '@/common/constants/constants';
import { CategoryInput } from '../category-input/category-input';
import { Counter } from '../counter/counter';
import { CountrySelect } from '../country-select/country-select';
import { ImageUpload } from '../image-upload/image-upload';
import { Input } from '../input/input';
import { Modal } from '../modal/modal';
import { Heading } from '../heading/heading';

const ModalRent = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(ModalRentSteps.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const actionLabel = step === ModalRentSteps.PRICE ? 'Create' : 'Next';
  const secondaryActionLabel = step === ModalRentSteps.CATEGORY ? undefined : 'Back';

  const handleStepPrev = () => setStep((value) => value - 1);
  const handleStepNext = () => setStep((value) => value + 1);

  const Map = useMemo(() => dynamic(() => import('../map/map'), {
    ssr: false
  }), [location]); // eslint-disable-line

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== ModalRentSteps.PRICE) {
      return handleStepNext();
    }
    
    setIsLoading(true);

    axios.post('/api/listings', data)
    .then(() => {
      toast.success('Listing created!');
      router.refresh();
      reset();
      setStep(ModalRentSteps.CATEGORY)
      rentModal.onClose();
    })
    .catch((error: Error) => {
      toast.error(error.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        description="Pick a category"
      />
      <div className="grid gap-3 overflow-y-auto md:grid-cols-2 md:max-h-[50vh]">
        {listingCategories.map((item) => (
          <CategoryInput
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
            onClick={(category: string) => setCustomValue('category', category)}
          />
        ))}
      </div>
    </div>
  );

  if (step === ModalRentSteps.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          description="Help guests find you!"
        />
        <CountrySelect
          value={location} 
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  };

  if (step === ModalRentSteps.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          description="What amenitis do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </div>
    );
  };

  if (step === ModalRentSteps.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          description="Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    );
  };

  if (step === ModalRentSteps.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          description="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  };

  if (step === ModalRentSteps.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          description="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          formatPrice
          required
        />
      </div>
    );
  };

  return (
    <Modal
      title="Airbnb home"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      isOpen={rentModal.isOpen}
      disabled={isLoading}
      secondaryAction={handleStepPrev}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export { ModalRent };