'use client';

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AppRoute, ModalRentSteps } from '@/common/enums/enums';
import { useRentModal } from '@/hooks/hooks';
import { listingCategories } from '@/common/constants/constants';
import { CategoryInput } from '@/components/category-input/category-input';
import { Counter } from '@/components/counter/counter';
import { CountrySelect } from '@/components/country-select/country-select';
import { ImageUpload } from '@/components/image-upload/image-upload';
import { Input } from '@/components/input/input';
import { Modal } from '@/components/modal/modal';
import { Heading } from '@/components/heading/heading';
import { Map } from '@/components/map/map';

const ModalRent = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(ModalRentSteps.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
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
      title: '',
      description: '',
      price: null,
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
      router.push(AppRoute.PROPERTIES);
      setStep(ModalRentSteps.CATEGORY);
      reset();
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
            iconName={item.iconName}
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
        <Controller
          name="location"
          control={control}
          rules={{ required: "Set the location" }}
          render={({ field, fieldState }) => (
            <div className="relative">
              <CountrySelect
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
              {fieldState.error && (
                <span className="text-[red] text-sm leading-none absolute top-full">{fieldState.error.message}</span>
              )}
            </div>
          )}
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
          name="title"
          label="Title"
          disabled={isLoading}
          control={control}
          errors={errors}
          rules={{ required: 'Title is required.' }}
        />
        <Input
          name="description"
          label="Description"
          disabled={isLoading}
          control={control}
          errors={errors}
          rules={{ required: 'Describe your place.' }}
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
          key="price"
          name="price"
          label="Price"
          type="number"
          disabled={isLoading}
          control={control}
          errors={errors}
          rules={{
              required: 'Price is required.',
              pattern: {
                value: /^(?!0+(\.0{1,2})?$)\d+(\.\d{1,2})?$/,
                message: 'Please enter a valid price format.',
              },
          }}
          formatPrice
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