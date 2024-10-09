"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AddCommentForm from "./AddCommentForm";
import CommentList from "./CommentList";
import { getComments } from "@/app/actions";

interface CommentSectionProps {
  bountyId: number;
}

export default function CommentSection({ bountyId }: CommentSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const fetchedComments = await getComments(bountyId);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [bountyId]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Comments</h3>
      {session?.user && (
        <AddCommentForm bountyId={bountyId} onCommentAdded={fetchComments} />
      )}
      {isLoading ? (
        <div>Loading comments...</div>
      ) : (
        <CommentList comments={comments} onCommentAdded={fetchComments} />
      )}
    </div>
  );
}
