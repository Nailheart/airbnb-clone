'use client';

import { FC } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { AlignJustifyIcon } from 'lucide-react';

import { AppRoute } from '@/common/enums/enums';
import { UserResponseDto } from '@/common/types/types';
import { useLoginModal, useRegisterModal, useRentModal } from '@/hooks/hooks';
import { Avatar } from '@/components/avatar/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/dropdown-menu';

type Props = {
  user?: UserResponseDto | null;
}

const UserMenu: FC<Props> = ({ user }) => {
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const handleSignOut = () => signOut();

  const showRentModal = () => {
    if (!user) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <button className="hidden text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer hover:bg-neutral-100 md:block"
          type="button"
          onClick={showRentModal}
        >
          Airbnb your home
        </button>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center p-[15px] border border-neutral-200 rounded-full cursor-pointer transition hover:shadow-md md:p-[5px_5px_5px_12px]"
              type="button"
            >
              <AlignJustifyIcon size={20} />
              <div className="hidden md:block ml-3">
                <Avatar src={user?.image} />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" sideOffset={8}>
            {user ?
              (
                <>
                  {[
                    ['Home', AppRoute.ROOT],
                    ['Trips', AppRoute.TRIPS],
                    ['Wishlists', AppRoute.FAVORITES],
                    ['Reservations', AppRoute.RESERVATIONS],
                    ['Properties', AppRoute.PROPERTIES],
                  ].map(([title, url]) => (
                    <DropdownMenuItem 
                      key={url}
                      className={title === 'Home' ? 'md:hidden' : ''}
                    >
                      <Link
                        className={`
                          font-semibold
                          w-full
                          px-4
                          py-3
                          transition
                          hover:bg-neutral-100
                        `}
                        href={url}
                      >
                        {title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem>
                    <button
                      className="font-semibold text-left w-full px-4 py-3 transition hover:bg-neutral-100"
                      type="button"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <button
                      className="font-semibold text-left w-full px-4 py-3 transition hover:bg-neutral-100"
                      type="button"
                      onClick={loginModal.onOpen}
                    >
                      Sing in
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button
                      className="font-semibold text-left w-full px-4 py-3 transition hover:bg-neutral-100"
                      type="button"
                      onClick={registerModal.onOpen}
                    >
                      Sign up
                    </button>
                  </DropdownMenuItem>
                </>
              )
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export { UserMenu };