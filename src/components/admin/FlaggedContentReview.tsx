import { useState, useEffect } from "react";
import { getFlaggedContent, reviewFlaggedContent } from "@/app/adminActions";
import { Button } from "../Button";

interface FlaggedItem {
  id: string;
  type: "BOUNTY" | "COMMENT" | "USER_PROFILE";
  content: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function FlaggedContentReview() {
  const [flaggedItems, setFlaggedItems] = useState<FlaggedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFlaggedContent();
  }, []);

  async function fetchFlaggedContent() {
    setIsLoading(true);
    try {
      const data = await getFlaggedContent();
      setFlaggedItems(data);
    } catch (error) {
      console.error("Error fetching flagged content:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleReview(
    id: string,
    type: string,
    decision: "approve" | "reject",
  ) {
    try {
      await reviewFlaggedContent(id, type, decision);
      await fetchFlaggedContent(); // Refresh the list after review
    } catch (error) {
      console.error("Error reviewing flagged content:", error);
    }
  }

  if (isLoading) return <div>Loading flagged content...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Flagged Content Review</h2>
      {flaggedItems.length === 0 ? (
        <p>No flagged content to review.</p>
      ) : (
        <ul className="space-y-4">
          {flaggedItems.map((item) => (
            <li
              key={item.id}
              className="bg-sapphire_blue-100 dark:bg-sapphire_blue-800 p-4 rounded-lg"
            >
              <p className="font-semibold">{item.type}</p>
              <p className="text-sm text-sapphire_blue-600 dark:text-sapphire_blue-300">
                By {item.user.name} ({item.user.email})
              </p>
              <p className="mt-2">{item.content}</p>
              <div className="mt-4 flex space-x-2">
                <Button
                  variant="primary"
                  onClick={() => handleReview(item.id, item.type, "approve")}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleReview(item.id, item.type, "reject")}
                >
                  Reject
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
