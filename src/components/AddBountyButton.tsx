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
        className="bg-tango text-white px-4 py-2 rounded-md hover:bg-opacity-90 font-semibold"
        onClick={openModal}
        aria-label="Add new bounty request"
      >
        + Add Bounty
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddBountyForm onClose={closeModal} />
      </Modal>
    </>
  );
}
