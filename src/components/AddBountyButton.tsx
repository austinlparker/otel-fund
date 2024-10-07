"use client";

import { useState } from "react";
import Modal from "./Modal";
import AddBountyForm from "./AddBountyForm";
import { useSession } from "next-auth/react";

export default function AddBountyButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!session) {
    return null;
  }

  return (
    <>
      <button
        className="bg-pacific text-white px-4 py-2 rounded-md hover:bg-opacity-90"
        onClick={openModal}
        aria-label="Add new bounty request"
      >
        Add Feature
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddBountyForm onClose={closeModal} />
      </Modal>
    </>
  );
}
