'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { AiOutlineMenu } from 'react-icons/ai';

import { AppRoute } from '@/common/enums/enums';
import { UserResponseDto } from '@/common/types/types';
import { useLoginModal, useRegisterModal, useRentModal } from '@/hooks/hooks';
import { Avatar } from '../../avatar/avatar';

type Props = {
  user?: UserResponseDto | null;
}

const UserMenu: FC<Props> = ({ user }) => {
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleProfileMenu = () => setIsOpen(!isOpen);

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
        <button
          className="flex items-center gap-3 p-4 border-[1px] border-neutral-200 rounded-full cursor-pointer transition hover:shadow-md md:py-1 md:px-2"
          type="button"
          onClick={toggleProfileMenu}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={user?.image} />
          </div>
        </button>

        {isOpen && (
          <div className="text-sm min-w-[250px] mt-3 bg-white rounded-xl shadow-md overflow-hidden absolute right-0 top-full">
            {user ?
              (
                <>
                  <ul>
                    {[
                      ['Home', AppRoute.ROOT],
                      ['Trips', AppRoute.TRIPS],
                      ['Favorites', AppRoute.FAVORITES],
                      ['Reservations', AppRoute.RESERVATIONS],
                      ['Properties', AppRoute.PROPERTIES],
                    ].map(([title, url]) => (
                      <li key={url}>
                        <Link
                          className={`
                            block
                            font-semibold
                            px-4
                            py-3
                            transition
                            hover:bg-neutral-100
                            ${title === 'Home' && 'md:hidden'}
                          `}
                          href={url}
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="font-semibold text-left w-full px-4 py-3 transition hover:bg-neutral-100 md:hidden"
                    type="button"
                    onClick={rentModal.onOpen}
                  >
                    Airbnb my home
                  </button>
                  <hr />
                  <button
                    className="font-semibold w-full px-4 py-3 transition hover:bg-neutral-100"
                    type="button"
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="font-semibold w-full px-4 py-3 transition hover:bg-neutral-100"
                    type="button"
                    onClick={loginModal.onOpen}
                  >
                    Sing in
                  </button>
                  <button
                    className="font-semibold w-full px-4 py-3 transition hover:bg-neutral-100"
                    type="button"
                    onClick={registerModal.onOpen}
                  >
                    Sign up
                  </button>
                </>
              )
            }
          </div>
        )}
      </div>
    </div>
  );
};

export { UserMenu };