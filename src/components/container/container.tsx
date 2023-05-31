import { FC, ReactNode } from 'react';
import { cn } from '@/helpers/helpers';

type Props = {
  children: ReactNode;
  className?: string;
}

const Container: FC<Props> = ({ children, className }) => {
  return (
    <div className={cn(
      'max-w-[2520px] mx-auto px-4 xl:px-20 md:px-10',
      className
    )}>
      {children}
    </div>
  );
};

export { Container };