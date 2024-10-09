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
      className="px-4 py-2 bg-pacific hover:bg-opacity-90 text-white rounded-md disabled:opacity-50 transition-colors duration-200"
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
    <form action={handleSubmit} className="space-y-4 text-slate dark:text-fog">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="mt-1 block w-full rounded-md border-silver dark:border-slate bg-white dark:bg-slate text-slate dark:text-fog shadow-sm"
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
          className="mt-1 block w-full rounded-md border-silver dark:border-slate bg-white dark:bg-slate text-slate dark:text-fog shadow-sm"
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
          className="mt-1 block w-full rounded-md border-silver dark:border-slate bg-white dark:bg-slate text-slate dark:text-fog shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium">
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          className="mt-1 block w-full rounded-md border-silver dark:border-slate bg-white dark:bg-slate text-slate dark:text-fog shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Tags</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-pacific text-white rounded-full text-sm"
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
            className="flex-grow rounded-md border-silver dark:border-slate bg-white dark:bg-slate text-slate dark:text-fog shadow-sm"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-lime hover:bg-opacity-90 text-white rounded-md transition-colors duration-200"
          >
            Add Tag
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="w-full sm:w-auto px-4 py-2 bg-silver dark:bg-slate text-slate dark:text-fog rounded-md hover:bg-opacity-90 transition-colors duration-200"
        >
          Cancel
        </button>
        <SubmitButton />
      </div>
    </form>
  );
}
