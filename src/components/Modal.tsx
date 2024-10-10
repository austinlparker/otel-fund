"use client";

import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import ErrorBoundary from "./ErrorBoundary";

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
      className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="bg-white dark:bg-slate rounded-lg p-6 w-full max-w-[95%] md:max-w-[80%] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export default function Modal(props: ModalProps) {
  return (
    <ErrorBoundary
      fallback={
        <div>There was an error loading the modal. Please try again.</div>
      }
    >
      <ModalContent {...props} />
    </ErrorBoundary>
  );
}
