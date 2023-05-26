'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

import { useLoginModal, useRegisterModal } from '@/hooks/hooks';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Modal } from '../modal/modal';
import { Heading } from '../heading/heading';

const ModalLogin = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', { 
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }
      
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  }

  const handleToggleModal = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        description="Login to your account!"
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
        <span>First time using Airbnb?&nbsp;</span>
        <button
          className="text-rose-500 font-semibold cursor-pointer hover:underline"
          type="button"
          onClick={handleToggleModal}
        >
          Sign up
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      title="Login"
      actionLabel="Continue"
      body={bodyContent}
      footer={footerContent}
      isOpen={loginModal.isOpen}
      disabled={isLoading}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export { ModalLogin };
