'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { listingCategories } from '@/common/constants/constants';
import { Container } from '@/components/container/container';
import { CategoryItem } from './category-item/category-item';

const CategoryList = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const category = params?.get('category');
  const isMainPage = pathname === '/';

  if (!isMainPage) return null;

  return (
    <Container>
      <div className="flex items-center justify-between pt-4 overflow-x-auto">
        {listingCategories.map(item => (
          <CategoryItem
            key={item.label}
            iconName={item.iconName}
            label={item.label}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export { CategoryList };