import { FC }from 'react';
import Image from 'next/image';

type Props = {
  src?: string | null;
}

const Avatar: FC<Props> = ({ src }) => {
  return ( 
    <Image
      className="rounded-full"
      width="30"
      height="30"
      alt="Avatar"
      src={src || '/images/placeholder.jpg'}
    />
  );
};
 
export { Avatar };