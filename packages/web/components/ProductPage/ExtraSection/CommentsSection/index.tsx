import React from "react";
import { AddCommentSection } from "./AddCommentSection";
import { FollowButton } from "./FollowButton";
import { LocationSection } from "./LocationSection";

export const CommentsSection: React.FC = () => (
  <section
    className="flex flex-col gap-4 md:container lg:px-0"
    style={{ gridArea: "comments" }}
  >
    <div className="bg-default-background p-4 shadow md:rounded-lg md:px-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold md:text-2xl">0 comentários</h2>

        <FollowButton />
      </div>

      <div className="divide-default-border flex flex-col gap-4 divide-y">
        <AddCommentSection />
      </div>
    </div>

    <LocationSection />
  </section>
);
