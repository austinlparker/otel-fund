import AddBountyForm from "@/components/AddBountyForm";
import Modal from "@/components/Modal";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function AddBountyModal() {
  return (
    <ErrorBoundary
      fallback={<div>Error loading the add bounty form. Please try again.</div>}
    >
      <Modal title="Add New Bounty">
        <AddBountyForm />
      </Modal>
    </ErrorBoundary>
  );
}
