"use client";

import { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import { CommentWithReplies } from "@/types";
import Comment from "./Comment";
import { Button } from "./Button";

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
    <div className="space-y-8 bg-white dark:bg-sapphire_blue-900 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-sapphire_blue-800 dark:text-sapphire_blue-100">
        Comments
      </h2>
      {!isAddingComment ? (
        <Button variant="primary" onClick={() => setIsAddingComment(true)}>
          Add Comment
        </Button>
      ) : (
        <AddCommentForm
          bountyId={bountyId}
          onCommentAdded={handleCommentAdded}
          onCancel={() => setIsAddingComment(false)}
        />
      )}
      {initialComments.length > 0 ? (
        <div className="space-y-6">
          {initialComments.map((comment) => (
            <Comment key={comment.id} comment={comment} bountyId={bountyId} />
          ))}
        </div>
      ) : (
        <p className="text-sapphire_blue-600 dark:text-sapphire_blue-300 italic">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
}
