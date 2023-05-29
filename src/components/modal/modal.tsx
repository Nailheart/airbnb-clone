import { FC, ReactElement } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Button } from '../button/button';

type Props = {
  title?: string;
  actionLabel: string;
  secondaryActionLabel?: string;
  body?: ReactElement;
  footer?: ReactElement;
  isOpen?: boolean;
  disabled?: boolean;
  secondaryAction?: () => void;
  onClose: () => void;
  onSubmit: () => void;
}

// TODO: animation
const Modal: FC<Props> = ({
  title,
  actionLabel,
  secondaryActionLabel,
  body,
  footer,
  isOpen,
  disabled,
  secondaryAction,
  onClose,
  onSubmit,
}) => {
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  const handleSecondaryAction = () => {
    secondaryAction?.();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex fixed inset-0 z-50 bg-neutral-800/70">
      <div
        className={`
          flex
          flex-col
          w-full
          h-full
          max-w-3xl
          m-auto
          overflow-y-auto
          rounded-lg
          shadow-lg
          duration-300
          bg-white
          md:w-4/5
          md:h-auto
          ${isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-full'
          }
        `}>
        <header className="text-center p-6 border-b relative">
          <button
            className="-mt-[18px] p-2 border-0 absolute top-1/2 left-9 transition hover:opacity-70"
            onClick={handleClose}
          >
            <IoMdClose size={20} />
          </button>
          <span className="text-lg font-semibold">{title}</span>
        </header>
        
        <div className="flex-auto p-6">{body}</div>
      
        <footer className="flex flex-col p-6">
          <div className="flex items-center gap-4">
            {secondaryActionLabel && secondaryAction && (
              <Button
                className="text-base font-semibold"
                variant="outline"
                size="lg"
                disabled={disabled}
                onClick={handleSecondaryAction}
              >
                {secondaryActionLabel}
              </Button>
            )}
            <Button
              className="text-base font-semibold"
              size="lg"
              disabled={disabled}
              onClick={handleSubmit}
            >
              {actionLabel}
            </Button>
          </div>
          {footer}
        </footer>
      </div>
    </div>
  );
};

export { Modal };