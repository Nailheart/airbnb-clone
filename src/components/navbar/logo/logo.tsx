import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  className?: string;
}

const Logo: FC<Props> = ({ className="" }) => {
  return (
    <Link className={className} href="/">
      <Image
        className="hidden max-w-full h-auto md:block"
        src="/images/logo.png"
        width="100"
        height="32"
        alt="Logo"
      />
    </Link>
  );
};

export { Logo };