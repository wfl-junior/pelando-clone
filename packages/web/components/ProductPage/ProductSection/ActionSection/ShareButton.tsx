import { WhatsappIcon } from "@/components/icons/product-page/WhatsappIcon";
import React from "react";

export const ShareButton: React.FC = () => (
  <button
    title="Compartilhar"
    type="button"
    className="hover:bg-secondary-background rounded-full p-1.5 transition-colors"
  >
    <WhatsappIcon className="w-5" />
  </button>
);
