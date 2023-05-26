'use client';

import axios from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

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
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        label="Continue with Google"
        icon={FcGoogle}
        outline
        onClick={() => signIn('google')}
      />
      <Button
        label="Continue with Github"
        icon={AiFillGithub}
        outline
        onClick={() => signIn('github')}
      />
      <div className="font-light text-neutral-500 text-center mt-[10px]">
        <span>Already have an account?&nbsp;</span>
        <button
          className="text-rose-500 font-semibold cursor-pointer hover:underline"
          type="button"
          onClick={handleToggleModal}
        >
          Log in
        </button>
      </div>
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