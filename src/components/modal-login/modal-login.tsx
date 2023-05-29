'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ChromeIcon, GithubIcon } from 'lucide-react';

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
        <span>First time using Airbnb?&nbsp;</span>
        <Button
          className="text-rose-500 text-base font-semibold h-auto p-0"
          variant="link"
          onClick={handleToggleModal}
        >
          Sign up
        </Button>
      </p>
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
