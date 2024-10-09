"use client";

import { useState } from "react";
import { Comment, User } from "@prisma/client";
import AddCommentForm from "./AddCommentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReply,
  faChevronDown,
  faChevronRight,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import UserAvatar from "./UserAvatar";

interface ExtendedComment extends Comment {
  author: User;
  replies?: ExtendedComment[];
}

interface CommentListProps {
  comments: ExtendedComment[];
  onCommentAdded: () => void;
  depth?: number;
}

function countReplies(comment: ExtendedComment): number {
  let count = comment.replies?.length || 0;
  comment.replies?.forEach((reply) => {
    count += countReplies(reply);
  });
  return count;
}

function SingleComment({
  comment,
  onCommentAdded,
  depth = 0,
}: {
  comment: ExtendedComment;
  onCommentAdded: () => void;
  depth?: number;
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const replyCount = countReplies(comment);
  const hasReplies = replyCount > 0;

  return (
    <div
      className={`mb-2 ${depth > 0 ? "ml-4 border-l-2 border-silver pl-2" : ""}`}
    >
      <div className="p-3 bg-fog dark:bg-slate rounded-md">
        <div className="flex items-center">
          {hasReplies && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mr-2 text-pacific hover:text-opacity-80"
              aria-label={isExpanded ? "Collapse replies" : "Expand replies"}
            >
              <FontAwesomeIcon
                icon={isExpanded ? faChevronDown : faChevronRight}
              />
            </button>
          )}
          <div className="flex-grow">
            <p className="text-sm text-slate dark:text-fog mb-2">
              {comment.content}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <UserAvatar user={comment.author} size="sm" />
                <span className="text-xs text-slate dark:text-fog">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {hasReplies && (
                  <span className="text-xs text-slate dark:text-fog">
                    <FontAwesomeIcon icon={faComment} className="mr-1" />
                    {replyCount} {replyCount === 1 ? "reply" : "replies"}
                  </span>
                )}
                <button
                  onClick={() => setIsReplying(!isReplying)}
                  className="text-xs text-pacific hover:text-opacity-80 flex items-center"
                >
                  <FontAwesomeIcon icon={faReply} className="mr-1" />
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isReplying && (
        <div className="mt-2 ml-4">
          <AddCommentForm
            bountyId={comment.bountyId}
            parentId={comment.id}
            onCommentAdded={() => {
              onCommentAdded();
              setIsReplying(false);
            }}
          />
        </div>
      )}
      {isExpanded && comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          <CommentList
            comments={comment.replies}
            onCommentAdded={onCommentAdded}
            depth={depth + 1}
          />
        </div>
      )}
    </div>
  );
}

export default function CommentList({
  comments,
  onCommentAdded,
  depth = 0,
}: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <SingleComment
          key={comment.id}
          comment={comment}
          onCommentAdded={onCommentAdded}
          depth={depth}
        />
      ))}
    </div>
  );
}
