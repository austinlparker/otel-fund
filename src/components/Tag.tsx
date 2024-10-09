import React from "react";
import Link from "next/link";

interface TagProps {
  name: string;
}

const Tag: React.FC<TagProps> = ({ name }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Link
      href={`/tag/${encodeURIComponent(name)}`}
      className="inline-block bg-pacific text-white text-xs px-2 py-1 rounded-full mr-2 mb-2 hover:bg-opacity-80 transition-colors duration-200"
      onClick={handleClick}
    >
      {name}
    </Link>
  );
};

export default Tag;
