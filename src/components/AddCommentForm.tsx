"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { addComment } from "@/app/actions";
import { useRouter } from "next/navigation";

interface AddCommentFormProps {
  bountyId: number;
  parentId?: number;
  onCommentAdded: () => void;
  onCancel?: () => void;
}

function SubmitButton({ parentId }: { parentId?: number }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-pacific hover:bg-tango text-white rounded-md transition-colors duration-200 disabled:opacity-50"
    >
      {pending ? "Posting..." : parentId ? "Post Reply" : "Post Comment"}
    </button>
  );
}

export default function AddCommentForm({
  bountyId,
  parentId,
  onCommentAdded,
  onCancel,
}: AddCommentFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    await addComment(formData);
    formRef.current?.reset();
    onCommentAdded();
    router.refresh();
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <input type="hidden" name="bountyId" value={bountyId} />
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      <textarea
        name="content"
        className="w-full p-2 border rounded-md bg-fog dark:bg-slate text-slate dark:text-fog placeholder-silver dark:placeholder-indigo border-silver dark:border-indigo focus:border-pacific focus:ring focus:ring-pacific focus:ring-opacity-50 resize-none"
        placeholder={parentId ? "Write a reply..." : "Add a comment..."}
        rows={4}
        required
      />
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200"
          >
            Cancel
          </button>
        )}
        <SubmitButton parentId={parentId} />
      </div>
    </form>
  );
}
