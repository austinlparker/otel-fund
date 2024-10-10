import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

interface ReplyButtonProps {
  onClick: () => void;
}

export default function ReplyButton({ onClick }: ReplyButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-xs text-pacific hover:text-tango transition-colors duration-200 flex items-center"
    >
      <FontAwesomeIcon icon={faReply} className="mr-1" />
      Reply
    </button>
  );
}
