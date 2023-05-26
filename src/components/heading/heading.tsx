import { FC } from 'react';

type Props = {
  title: string;
  description: string;
  className?: string;
}

const Heading: FC<Props> = ({ title, description, className="" }) => {
  return (
    <div className={className}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="font-light text-neutral-500 mt-2">{description}</p>
    </div>
  );
};

export { Heading };