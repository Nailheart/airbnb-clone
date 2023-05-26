import { FC } from 'react';

import { UserResponseDto } from '@/common/types/types';
import { Container } from '../container/container';
import { Logo } from './logo/logo';
import { Search } from './search/search';
import { UserMenu } from './user-menu/user-menu';
import { CategoryList } from './category-list/category-list';

type Props = {
  user?: UserResponseDto | null;
}

const Navbar: FC<Props> = ({ user }) => {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 left-0 z-40">
      <Container className="py-4 border-b-[1px]">
        <div className="flex items-center justify-between gap-3">
          <Logo />
          <Search />
          <UserMenu user={user} />
        </div>
      </Container>
      <CategoryList />
    </header>
  );
};

export { Navbar };