"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { addComment } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import toast from "react-hot-toast";

interface AddCommentFormProps {
  bountyId: number;
  parentId?: number;
  onCommentAdded: () => void;
  onCancel?: () => void;
}

function SubmitButton({ parentId }: { parentId?: number }) {
  const { pending } = useFormStatus();

  return (
    <Button variant="primary" type="submit" disabled={pending}>
      {pending ? "Posting..." : parentId ? "Post Reply" : "Post Comment"}
    </Button>
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
    try {
      await addComment(formData);
      toast.success("Comment posted successfully");
      formRef.current?.reset();
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "NOT_LOGGED_IN") {
          toast.error("You need to be logged in to post a comment");
        } else if (error.message === "ACCOUNT_DISABLED") {
          toast.error("Your account has been disabled.");
        } else if (error.message === "COMMENT_REJECTED") {
          toast.error("Your comment has been rejected by our content policy.");
        } else {
          toast.error("An unknown error occured.");
        }
      }
    }
    router.refresh();
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <input type="hidden" name="bountyId" value={bountyId} />
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      <textarea
        name="content"
        className="w-full p-3 border rounded-md bg-sapphire_blue-50 dark:bg-sapphire_blue-700 text-sapphire_blue-900 dark:text-sapphire_blue-50 placeholder-sapphire_blue-400 dark:placeholder-sapphire_blue-300 border-sapphire_blue-300 dark:border-sapphire_blue-600 focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50 resize-none transition-colors duration-200"
        placeholder={parentId ? "Write a reply..." : "Add a comment..."}
        rows={4}
        required
      />
      <div className="flex justify-end space-x-3">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <SubmitButton parentId={parentId} />
      </div>
    </form>
  );
}
