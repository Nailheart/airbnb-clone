import { FC } from 'react';
import Link from 'next/link';

import { cn } from '@/helpers/helpers';
import { Icon } from '@/components/icon/icon';

type Props = {
  className?: string;
}

const Logo: FC<Props> = ({ className }) => {
  return (
    <Link 
      className={cn('hidden md:block', className)}
      href="/"
    >
      <Icon
        name="airbnb"
        width="102"
        height="32"
        aria-label="Airbnb logo"
      />
    </Link>
  );
};

export { Logo };