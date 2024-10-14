"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { addBounty } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="primary" type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}

export default function AddBountyForm() {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await addBounty(formData);
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  return (
    <form
      action={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto p-6 bg-white dark:bg-sapphire_blue-800 rounded-lg shadow-md"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-sapphire_blue-700 dark:text-sapphire_blue-200 mb-1"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="mt-1 block w-full rounded-md border-sapphire_blue-300 dark:border-sapphire_blue-600 bg-sapphire_blue-50 dark:bg-sapphire_blue-700 text-sapphire_blue-900 dark:text-sapphire_blue-50 shadow-sm focus:ring-2 focus:ring-amber-500"
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-sapphire_blue-700 dark:text-sapphire_blue-200 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-sapphire_blue-300 dark:border-sapphire_blue-600 bg-sapphire_blue-50 dark:bg-sapphire_blue-700 text-sapphire_blue-900 dark:text-sapphire_blue-50 shadow-sm focus:ring-2 focus:ring-amber-500"
        />
      </div>
      <div>
        <label
          htmlFor="repoLink"
          className="block text-sm font-medium text-sapphire_blue-700 dark:text-sapphire_blue-200 mb-1"
        >
          Repository Link
        </label>
        <input
          type="url"
          id="repoLink"
          name="repoLink"
          required
          className="mt-1 block w-full rounded-md border-sapphire_blue-300 dark:border-sapphire_blue-600 bg-sapphire_blue-50 dark:bg-sapphire_blue-700 text-sapphire_blue-900 dark:text-sapphire_blue-50 shadow-sm focus:ring-2 focus:ring-amber-500"
        />
      </div>
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-sapphire_blue-700 dark:text-sapphire_blue-200 mb-1"
        >
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="mt-1 block w-full rounded-md border-sapphire_blue-300 dark:border-sapphire_blue-600 bg-sapphire_blue-50 dark:bg-sapphire_blue-700 text-sapphire_blue-900 dark:text-sapphire_blue-50 shadow-sm focus:ring-2 focus:ring-amber-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-sapphire_blue-700 dark:text-sapphire_blue-200 mb-1">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-amber-500 text-white rounded-full text-sm"
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
            className="flex-grow rounded-md border-sapphire_blue-300 dark:border-sapphire_blue-600 bg-sapphire_blue-50 dark:bg-sapphire_blue-700 text-sapphire_blue-900 dark:text-sapphire_blue-50 shadow-sm focus:ring-2 focus:ring-amber-500"
          />
          <Button variant="secondary" onClick={handleAddTag}>
            Add Tag
          </Button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
        <Button variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}
