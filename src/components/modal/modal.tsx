'use client';

import { FC, ReactElement } from 'react';
import { Close, Content, Overlay, Portal, Root } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { Button } from '@/components/button/button';

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
  const handleClose = () => onClose();
  const handleSubmit = () => onSubmit();
  const handleSecondaryAction = () => secondaryAction?.();

  return (
    <Root open={isOpen} onOpenChange={handleClose}>
      <Portal>
        <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
          <Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in" />
          <Content className="max-h-[100vh] overflow-y-auto fixed z-50 grid w-full rounded-b-lg border bg-background shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:max-w-2xl sm:rounded-lg sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0">
            <header className="text-center px-6 py-4 border-b">
              <span className="text-xl font-semibold">{title}</span>
            </header>
            <div className="px-6 py-4">{body}</div>
            <footer className="px-6 pt-4 pb-6">
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
            <Close className="absolute left-6 top-[22px] rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Close>
          </Content>
        </div>
      </Portal>
    </Root>
  );
};

export { Modal };
