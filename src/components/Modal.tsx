"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white dark:bg-slate rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
      >
        <div className="p-4 border-b border-silver dark:border-indigo flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate dark:text-fog truncate">
            {title || "Modal"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate dark:text-fog hover:text-tango dark:hover:text-tango transition-colors"
            aria-label="Close modal"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">{children}</div>
        <div className="p-4 border-t border-silver dark:border-indigo flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-silver dark:bg-indigo text-slate dark:text-fog rounded hover:bg-opacity-80 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
