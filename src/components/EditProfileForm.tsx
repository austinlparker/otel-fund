"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { updateUserProfile } from "@/app/actions";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

interface EditProfileFormProps {
  user: Partial<User>;
}

interface SocialLink {
  platform: string;
  url: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="primary" disabled={pending}>
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const router = useRouter();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    user.socialLinks ? JSON.parse(user.socialLinks as string) : [],
  );

  const handleSubmit = async (formData: FormData) => {
    const result = await updateUserProfile(formData);
    if (result.success) {
      toast.success(result.message);
      router.push(`/profile/${user.id}`);
    } else {
      toast.error(result.message);
    }
  };

  const handleSocialLinkChange = (
    index: number,
    field: "platform" | "url",
    value: string,
  ) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "", url: "" }]);
  };

  const removeSocialLink = (index: number) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updatedLinks);
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <input type="hidden" name="userId" value={user.id} />
      <input
        type="hidden"
        name="socialLinks"
        value={JSON.stringify(socialLinks)}
      />

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={user.name || ""}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label
          htmlFor="githubUrl"
          className="block text-sm font-medium text-gray-700"
        >
          GitHub Profile URL
        </label>
        <input
          type="url"
          id="githubUrl"
          name="githubUrl"
          defaultValue={user.githubUrl || ""}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label
          htmlFor="paymentLink"
          className="block text-sm font-medium text-gray-700"
        >
          Payment Link
        </label>
        <input
          type="url"
          id="paymentLink"
          name="paymentLink"
          defaultValue={user.paymentLink || ""}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Social Media Links
        </label>
        {socialLinks.map((link, index) => (
          <div key={index} className="flex space-x-2 mt-2">
            <input
              type="text"
              placeholder="Platform"
              value={link.platform}
              onChange={(e) =>
                handleSocialLinkChange(index, "platform", e.target.value)
              }
              className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="url"
              placeholder="URL"
              value={link.url}
              onChange={(e) =>
                handleSocialLinkChange(index, "url", e.target.value)
              }
              className="block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={() => removeSocialLink(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSocialLink}
          className="mt-2 text-indigo-600"
        >
          + Add Social Link
        </button>
      </div>

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
