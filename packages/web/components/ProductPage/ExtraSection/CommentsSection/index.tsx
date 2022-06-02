import React from "react";
import { AddCommentSection } from "./AddCommentSection";
import { CommentList } from "./CommentList";
import { FollowButton } from "./FollowButton";
import { LocationSection } from "./LocationSection";
import { TipSection } from "./TipSection";

export const CommentsSection: React.FC = () => (
  <section className="flex flex-col gap-4 md:container lg:flex-grow lg:px-0">
    <div className="bg-default-background py-4 shadow md:rounded-lg lg:flex-grow">
      <div className="mb-4 flex items-center justify-between px-4 md:px-8">
        <h2 className="text-xl font-bold md:text-2xl">0 comentários</h2>

        <FollowButton />
      </div>

      <div className="divide-secondary-background flex flex-col gap-4 divide-y-2">
        <AddCommentSection />
        <TipSection />
        <CommentList />
      </div>
    </div>

    <LocationSection />
  </section>
);
