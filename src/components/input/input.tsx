'use client';

import { FC, InputHTMLAttributes } from 'react';
import {
  FieldErrors,
  FieldValues,
  Control,
  Path,
  useController,
  RegisterOptions,
} from 'react-hook-form';

import { cn } from '@/helpers/helpers';
import { Icon } from '@/components/icon/icon';

type ControlPath<T = FieldValues> = Path<T>;

type Props = {
  label: string;
  name: ControlPath;
  control: Control;
  errors: FieldErrors;
  rules?: RegisterOptions;
  className?: string;
  placeholder?: string;
  formatPrice?: boolean;
}

type InputProps = Props & Omit<InputHTMLAttributes<HTMLInputElement>, keyof Props>;

const Input: FC<InputProps> = ({
  label,
  name,
  control,
  errors,
  rules,
  className,
  placeholder=' ',
  formatPrice,
  type='text',
  ...rest
}) => {
  const { field, fieldState } = useController({ name, control, rules });

  return (
    <div className="relative">
      {formatPrice && (
        <Icon
          name="dollarSign"
          className="text-neutral-700 absolute top-1/2 left-2 -translate-y-1/2"
        />
      )}
      <input
        className={cn(
          'peer w-full p-4 bg-white border-2 border-neutral-300 rounded-md outline-none transition focus:border-black disabled:opacity-70 disabled:cursor-not-allowed',
          formatPrice && 'pl-9',
          errors[name] && 'border-rose-500 focus:border-rose-500',
        )}
        type={type}
        placeholder={placeholder}
        required
        {...field}
        {...rest}
      />
      <label
        className={cn(
          'absolute left-4 text-zinc-400 text-md px-2 -ml-2 bg-white rounded-sm duration-150 origin-[0] -translate-y-[50%] z-10 peer-focus:top-0 peer-focus:text-black peer-placeholder-shown:top-1/2',
          formatPrice && 'left-9',
          errors[name] && '!text-rose-500',
        )}
      >
        {label}
      </label>
      {fieldState.error && (
        <span className="text-[red] text-sm leading-none absolute top-full left-0">
          {fieldState.error.message}
        </span>
      )}
    </div>
  );
};

export { Input };
