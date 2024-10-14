import { CommentWithReplies } from "@/types";
import ClientCommentSection from "./ClientCommentSection";

interface CommentSectionProps {
  bountyId: number;
  initialComments: CommentWithReplies[];
}

export default function CommentSection({
  bountyId,
  initialComments,
}: CommentSectionProps) {
  return (
    <div className="mt-8 bg-white dark:bg-sapphire_blue-900 rounded-lg shadow-md">
      <ClientCommentSection
        bountyId={bountyId}
        initialComments={initialComments}
      />
    </div>
  );
}
