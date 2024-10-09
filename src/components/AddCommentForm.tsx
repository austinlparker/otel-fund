"use client";

import { useState } from "react";
import { addComment } from "@/app/actions";

interface AddCommentFormProps {
  bountyId: number;
  parentId?: number;
  onCommentAdded: () => void;
}

export default function AddCommentForm({
  bountyId,
  parentId,
  onCommentAdded,
}: AddCommentFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      try {
        await addComment(bountyId, content, parentId);
        setContent("");
        onCommentAdded();
      } catch (error) {
        console.error("Failed to add comment:", error);
        // Optionally, show an error message to the user
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded-md bg-white dark:bg-slate text-slate dark:text-fog placeholder-silver dark:placeholder-indigo"
        placeholder="Add a comment..."
      />
      <button
        type="submit"
        className="mt-2 bg-pacific text-white px-4 py-2 rounded-md text-sm hover:bg-opacity-90"
      >
        Post Comment
      </button>
    </form>
  );
}
