import { FC } from 'react';
import Link from 'next/link';

import { AppRoute } from '@/common/enums/enums';
import { Heading } from '../heading/heading';

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: FC<Props> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset
}) => {
  return ( 
    <div className="flex flex-col items-center justify-center gap-2 h-full">
      <Heading
        className="text-center mb-4"
        title={title}
        description={subtitle}
      />
      {showReset && (
        <Link
          className="
            block
            text-black
            text-md
            font-semibold
            text-center
            w-full
            max-w-xs
            p-3
            bg-white
            border-black
            border-2
            rounded-lg
            relative
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            hover:opacity-80
          "
          href={AppRoute.ROOT}
        >
          Remove all filters
        </Link>
      )}
    </div>
   );
};
 
export { EmptyState };