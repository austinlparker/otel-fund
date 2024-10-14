"use client";

import { useState } from "react";
import { CommentWithReplies } from "@/types";
import ReplyButton from "./ReplyButton";
import UserAvatar from "@/components/UserAvatar";
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

  const authorName = comment.author.name || "Anonymous";

  const getBgClass = (depth: number) => {
    const lightClasses = [
      "bg-sapphire_blue-50",
      "bg-sapphire_blue-100",
      "bg-sapphire_blue-200",
    ];
    const darkClasses = [
      "dark:bg-sapphire_blue-800",
      "dark:bg-sapphire_blue-700",
      "dark:bg-sapphire_blue-600",
    ];
    const index = Math.min(depth, 2);
    return `${lightClasses[index]} ${darkClasses[index]}`;
  };

  return (
    <div
      className={`
      relative
      p-4
      mb-4
      ${getBgClass(depth)}
      rounded-lg
      ${depth > 0 ? `ml-${Math.min(depth * 4, 16)} border-l-2 border-amber-500` : ""}
      transition-colors duration-200
    `}
    >
      <div className="flex items-start space-x-3">
        <UserAvatar user={comment.author} size="sm" />
        <div className="flex-grow">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-medium text-sapphire_blue-800 dark:text-sapphire_blue-100">
              {authorName}
            </span>
            <span className="text-xs text-sapphire_blue-500 dark:text-sapphire_blue-300">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-sapphire_blue-700 dark:text-sapphire_blue-200 mb-3 leading-relaxed">
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
