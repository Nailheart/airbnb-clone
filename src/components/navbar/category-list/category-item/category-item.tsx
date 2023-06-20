'use client';

import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import qs, { ParsedQuery } from 'query-string';

import { IconName } from '@/common/types/types';
import { cn } from '@/helpers/helpers';
import { Icon } from '@/components/icon/icon';

type Props = {
  label: string;
  iconName: IconName;
  selected?: boolean;
  className?: string;
}

const CategoryItem: FC<Props> = ({ label, iconName, selected, className }) => {
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
      className={cn(
        'flex flex-col items-center justify-center gap-2 text-neutral-500 p-3 border-b-2 border-transparent cursor-pointer hover:text-neutral-800 transition',
        selected && 'text-neutral-800 border-b-neutral-800',
        className
      )}
      onClick={handleClick}
    >
      <Icon name={iconName} size={26} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export { CategoryItem };