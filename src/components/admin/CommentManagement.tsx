"use client";

import { useState, useEffect } from "react";
import { CommentWithReplies } from "@/types";
import { getComments, toggleCommentVisibility } from "@/app/adminActions";

export default function CommentManagement() {
  const [comments, setComments] = useState<CommentWithReplies[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    setIsLoading(true);
    try {
      const data = await getComments();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleToggleCommentVisibility(commentId: number) {
    try {
      await toggleCommentVisibility(commentId);
      await fetchComments(); // Refresh the comment list
    } catch (error) {
      console.error("Error toggling comment visibility:", error);
    }
  }

  if (isLoading) return <div>Loading comments...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Comment Management</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Content</th>
            <th>Author</th>
            <th>Created At</th>
            <th>Visibility</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.content.substring(0, 50)}...</td>
              <td>{comment.author.name || comment.author.email}</td>
              <td>{new Date(comment.createdAt).toLocaleString()}</td>
              <td>{comment.hidden ? "Hidden" : "Visible"}</td>
              <td>
                <button
                  onClick={() => handleToggleCommentVisibility(comment.id)}
                >
                  {comment.hidden ? "Show" : "Hide"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
