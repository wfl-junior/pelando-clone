import { UserImagePlaceholder } from "@/components/UserImagePlaceholder";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import React from "react";
import { AddCommentFormik } from "./AddCommentFormik";

export const AddCommentSection: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="flex gap-1 px-4 md:px-8">
      <div className="border-image-border flex aspect-square w-10 items-center justify-center self-start overflow-hidden rounded-full border">
        {user?.image ? (
          <Image
            src={user.image}
            width={40}
            height={40}
            className="max-w-full object-contain"
          />
        ) : (
          <UserImagePlaceholder className="w-full" />
        )}
      </div>

      <AddCommentFormik />
    </div>
  );
};
