'use client';

import { FC } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

import { cn } from '@/helpers/helpers';

type Props = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}

const Input: FC<Props> = ({
  id,
  label,
  type = "text", 
  disabled, 
  formatPrice,
  required,
  errors,
  register,
}) => {
  return (
    <div className="relative">
      {formatPrice && (
        <BiDollar className="text-neutral-700 absolute top-5 left-2" size={24} />
      )}
      <input
        id={id}
        className={cn(
          'peer w-full p-4 bg-white border-2 border-neutral-300 rounded-md outline-none transition focus:border-black disabled:opacity-70 disabled:cursor-not-allowed',
          formatPrice && 'pl-9',
          errors[id] && 'border-rose-500 focus:border-rose-500',
        )}
        type={type}
        disabled={disabled}
        placeholder=" "
        {...register(id, { required })}
      />
      <label 
        className={cn(
          'absolute left-4 text-zinc-400 text-md px-2 -ml-2 bg-white rounded-sm duration-150 origin-[0] -translate-y-[50%] z-10 peer-focus:top-0 peer-focus:text-black peer-placeholder-shown:top-1/2',
          formatPrice && 'left-9',
          errors[id] && '!text-rose-500',
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export { Input };
