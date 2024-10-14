"use client";

import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ErrorBoundary from "./ErrorBoundary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
}

function ModalContent({ children, title }: ModalProps) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-50 bg-sapphire_blue-900 bg-opacity-75 flex items-center justify-center p-4"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="bg-white dark:bg-sapphire_blue-800 rounded-lg shadow-lg w-full max-w-[95%] md:max-w-[80%] max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-sapphire_blue-800 p-4 border-b border-sapphire_blue-200 dark:border-sapphire_blue-700 flex justify-between items-center">
          {title && (
            <h2 className="text-2xl font-bold text-sapphire_blue-900 dark:text-sapphire_blue-50">
              {title}
            </h2>
          )}
          <button
            onClick={onDismiss}
            className="text-sapphire_blue-500 hover:text-sapphire_blue-700 dark:text-sapphire_blue-300 dark:hover:text-sapphire_blue-100 transition-colors duration-200"
            aria-label="Close modal"
          >
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function Modal(props: ModalProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className="text-fuschia-500 dark:text-fuschia-300 p-4">
          There was an error loading the modal. Please try again.
        </div>
      }
    >
      <ModalContent {...props} />
    </ErrorBoundary>
  );
}
