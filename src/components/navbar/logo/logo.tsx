import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/helpers/helpers';

type Props = {
  className?: string;
}

const Logo: FC<Props> = ({ className }) => {
  return (
    <Link className={cn(className)} href="/">
      <Image
        className="hidden max-w-full h-auto md:block"
        src="/images/logo.png"
        width="102"
        height="32"
        alt="Airbnb logo"
      />
    </Link>
  );
};

export { Logo };