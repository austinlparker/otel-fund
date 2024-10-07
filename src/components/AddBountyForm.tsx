"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { addBounty } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

interface AddBountyFormProps {
  onClose: () => void;
}

export default function AddBountyForm({ onClose }: AddBountyFormProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleSubmit = async (formData: FormData) => {
    await addBounty(formData);
    onClose();
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="repoLink" className="block text-sm font-medium">
          Repository Link
        </label>
        <input
          type="url"
          id="repoLink"
          name="repoLink"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium">
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Tags</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <input type="hidden" name="tags" value={tags.join(",")} />
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            className="flex-grow rounded-md border-gray-300 shadow-sm"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Add Tag
          </button>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
        >
          Cancel
        </button>
        <SubmitButton />
      </div>
    </form>
  );
}
