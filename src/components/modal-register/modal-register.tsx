'use client';

import axios from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { ChromeIcon, GithubIcon } from 'lucide-react';

import { useLoginModal, useRegisterModal } from '@/hooks/hooks';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Modal } from '../modal/modal';
import { Heading } from '../heading/heading';

const ModalRegister = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // TODO: sain in after success register
    axios.post('/api/register', data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error: Error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleToggleModal = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Airbnb"
        description="Create an account"
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-6 pt-6 border-t">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Button
          className="w-auto"
          variant="outline"
          onClick={() => signIn('google')}
        >
          <ChromeIcon size={18} color="currentColor" />
          <span className="ml-4">Continue with Google</span>
        </Button>
        <Button
          className="w-auto"
          variant="outline"
          onClick={() => signIn('github')}
        >
          <GithubIcon size={18} color="currentColor" />
          <span className="ml-4">Continue with Github</span>
        </Button>
      </div>
      <p className="font-light text-neutral-500 text-center">
        <span>Already have an account?&nbsp;</span>
        <Button
          className="text-rose-500 text-base font-semibold h-auto p-0"
          variant="link"
          onClick={handleToggleModal}
        >
          Log in
        </Button>
      </p>
    </div>
  );

  return (
    <Modal
      title="Register"
      actionLabel="Continue"
      body={bodyContent}
      footer={footerContent}
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export { ModalRegister };