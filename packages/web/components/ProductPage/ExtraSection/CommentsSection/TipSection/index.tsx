import { LightbulbIcon } from "@/components/icons/product-page/LighbulbIcon";
import Image from "next/image";
import React from "react";
import { useTip } from "./tips";

export const TipSection: React.FC = () => {
  const tip = useTip();

  return (
    <div className="grid-template-areas-product-page-tip grid grid-cols-[auto_1fr] gap-y-2 gap-x-1 px-4 pt-4 md:px-8">
      <div
        className="border-default-border my-auto aspect-square w-9 overflow-hidden rounded-full border"
        style={{ gridArea: "image" }}
      >
        <Image
          src="https://api.pelando.com.br/media/url?url=https%3A%2F%2Fstatic.pelando.com.br%2Fassets%2Ffoguinho.png&t=eyJoZWlnaHQiOjM2fQ%3D%3D"
          width={36}
          height={36}
          className="max-w-full object-contain"
        />
      </div>

      <div
        className="bg-primary flex w-max items-center gap-0.5 rounded px-1 py-0.5 text-xs font-bold uppercase text-white"
        style={{ gridArea: "badge" }}
      >
        <LightbulbIcon className="w-4.5" />
        <span>Dica Pelando</span>
      </div>

      <div
        className="bg-secondary-background break-words rounded-xl p-2 text-sm"
        style={{ gridArea: "tip" }}
      >
        <h3 className="font-bold">{tip.heading}</h3>
        <p>{tip.body}</p>
      </div>
    </div>
  );
};
