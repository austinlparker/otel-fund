"use client";

import { useState } from "react";
import { CommentWithReplies } from "@/types";
import ReplyButton from "./ReplyButton";
import UserAvatar from "./UserAvatar";
import AddCommentForm from "./AddCommentForm";

interface CommentProps {
  comment: CommentWithReplies;
  bountyId: number;
  depth?: number;
}

export default function Comment({
  comment,
  bountyId,
  depth = 0,
}: CommentProps): JSX.Element {
  const [isReplying, setIsReplying] = useState(false);

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleCommentAdded = () => {
    setIsReplying(false);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
  };

  const authorName = comment.author?.name || "Anonymous";

  return (
    <div
      className={`
      relative
      p-4
      mb-4
      bg-white dark:bg-slate
      rounded-lg
      ${depth > 0 ? "ml-4 border-l-2 border-pacific" : ""}
    `}
    >
      <div className="flex items-start space-x-3">
        <UserAvatar user={comment.author} size="sm" />
        <div className="flex-grow">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-medium text-slate dark:text-fog">
              {authorName}
            </span>
            <span className="text-xs text-silver dark:text-fog">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-slate dark:text-fog mb-3">
            {comment.content}
          </p>
          <div className="flex items-center space-x-2">
            <ReplyButton onClick={handleReplyClick} />
          </div>
        </div>
      </div>

      {isReplying && (
        <div className="mt-4 ml-10">
          <AddCommentForm
            bountyId={bountyId}
            parentId={comment.id}
            onCommentAdded={handleCommentAdded}
            onCancel={handleCancelReply}
          />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              bountyId={bountyId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
