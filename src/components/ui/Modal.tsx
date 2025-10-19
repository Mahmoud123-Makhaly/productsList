import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { ReactNode } from "react";

interface IModalProps {
  isOpen: boolean;
  close: () => void;
  title?: string;
  children: ReactNode;
}
function Modal(props: IModalProps) {
  const { isOpen, close, title, children } = props;
  return (
    <>
      {/* <Button onClick={open} width="w-fit" className="bg-indigo-700">
        Open dialog
      </Button> */}

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none shadow-2xl"
        onClose={close}
        __demoMode
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full bg-white max-w-md rounded-lg  p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h2"
                className="text-base/7 font-medium text-black"
              >
                {title}
              </DialogTitle>

              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
export default Modal;
