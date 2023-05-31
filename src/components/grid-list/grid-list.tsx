import { FC, ReactNode } from 'react';
import { cn } from '@/helpers/helpers';

type Props = {
  children: ReactNode;
  className?: string;
}

const GridList: FC<Props> = ({ children, className }) => {
  return (
    <div 
      className={cn(
        'grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
        className
      )}>
      {children}
    </div>
  );
};

export { GridList };