import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

interface ReplyButtonProps {
  onClick: () => void;
}

export default function ReplyButton({ onClick }: ReplyButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-sm text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200 transition-colors duration-200 flex items-center"
    >
      <FontAwesomeIcon icon={faReply} className="mr-2 text-xs" />
      <span className="font-medium">Reply</span>
    </button>
  );
}
