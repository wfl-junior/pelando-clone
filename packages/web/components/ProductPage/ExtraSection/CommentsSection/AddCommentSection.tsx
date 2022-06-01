import { UserImagePlaceholder } from "@/components/UserImagePlaceholder";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import React from "react";

export const AddCommentSection: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-1">
      {user?.image ? (
        <div className="border-default-border aspect-square w-10 overflow-hidden rounded-full border">
          <Image
            src={user.image}
            width={40}
            height={40}
            className="max-w-full object-contain"
          />
        </div>
      ) : (
        <UserImagePlaceholder className="w-10" />
      )}

      <textarea
        className="bg-input-background h-[40px] w-full resize-none rounded-lg p-2 md:rounded-xl"
        placeholder="Deixe o seu comentário"
      />
    </div>
  );
};
