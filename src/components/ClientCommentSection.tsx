"use client";

import { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import { CommentWithReplies } from "@/types";
import Comment from "./Comment";

interface ClientCommentSectionProps {
  bountyId: number;
  initialComments: CommentWithReplies[];
}

export default function ClientCommentSection({
  bountyId,
  initialComments,
}: ClientCommentSectionProps): JSX.Element {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const handleCommentAdded = () => {
    setIsAddingComment(false);
  };

  return (
    <div className="space-y-6">
      {!isAddingComment ? (
        <button
          onClick={() => setIsAddingComment(true)}
          className="px-4 py-2 bg-pacific hover:bg-tango text-white rounded-md transition-colors duration-200"
        >
          Add Comment
        </button>
      ) : (
        <AddCommentForm
          bountyId={bountyId}
          onCommentAdded={handleCommentAdded}
          onCancel={() => setIsAddingComment(false)}
        />
      )}
      <div className="space-y-4">
        {initialComments.map((comment) => (
          <Comment key={comment.id} comment={comment} bountyId={bountyId} />
        ))}
      </div>
    </div>
  );
}
