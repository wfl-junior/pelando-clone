import { Toast } from "@/alerts/Toast";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import React from "react";

export const CouponButton: React.FC = () => {
  const { couponCode } = useProductForProductPage();

  if (!couponCode) {
    return null;
  }

  return (
    <button
      type="button"
      className="bg-inactive-background hover:text-tertiary-foreground group relative flex items-center justify-center rounded-full py-1.5 px-4 font-bold transition-colors"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(couponCode);
          new Toast({ message: "Copiado", type: "success" }).fire();
        } catch {
          new Toast({
            message: "Não foi possível copiar",
            type: "error",
          }).fire();
        }
      }}
    >
      {couponCode}

      <span className="bg-primary group-hover:bg-primary-hover absolute top-1/2 right-1.5 -translate-y-1/2 rounded-full py-1 px-2.5 text-sm text-white transition-colors">
        copiar
      </span>
    </button>
  );
};
