'use client';

import { FC } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

type Props = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  errors: FieldErrors
  register: UseFormRegister<FieldValues>,
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
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id]
            ? 'border-rose-500 focus:border-rose-500'
            : 'border-neutral-300 focus:border-black'
          }
        `}
        type={type}
        disabled={disabled}
        placeholder=" "
        {...register(id, { required })}
      />
      <label 
        className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${formatPrice ? 'left-9' : 'left-4'}
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export { Input };