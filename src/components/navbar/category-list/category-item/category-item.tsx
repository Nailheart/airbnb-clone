'use client';

import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import qs, { ParsedQuery } from 'query-string';
import { IconType } from 'react-icons';

type Props = {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryItem: FC<Props> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    let currentQuery: ParsedQuery<string> = {};
    
    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    currentQuery.category = label;

    if (searchParams?.get('category') === label) {
      delete currentQuery.category;
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: currentQuery,
    }, { skipNull: true });

    router.push(url);
  };

  return (
    <button
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        cursor-pointer
        hover:text-neutral-800
        transition
        ${selected
          ? 'text-neutral-800 border-b-neutral-800'
          : 'text-neutral-500 border-transparent'
        }
      `}
      onClick={handleClick}
    >
      <Icon size={26} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export { CategoryItem };