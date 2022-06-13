import { CheckIcon } from "@/components/icons/CheckIcon";
import classNames from "classnames";
import { createRoot } from "react-dom/client";
import { match } from "./match";

type Type = "success" | "error";

interface ToastOptions {
  duration?: number;
  message: string;
  type?: Type;
}

/**
 * @property {duration} duration in milliseconds, default: 3000
 * @property {message} notification message
 * @property {type} notification type for icon
 */
export class Toast {
  private duration: number = 3000;
  private message!: string;
  private type?: Type;

  constructor(options: ToastOptions) {
    this.applyOptions(options);
  }

  private applyOptions(options: ToastOptions) {
    Object.assign(this, options);
  }

  private createToast(): HTMLDivElement {
    const toast = document.createElement("div");
    toast.className = "fixed inset-x-0 bottom-12 flex justify-center z-50";

    const Icon = match(
      this.type,
      {
        success: <CheckIcon className="w-4" />,
        error: <span className="w-4 rounded-full text-sm">&times;</span>,
      } as Record<Type, JSX.Element>,
      null,
    );

    createRoot(toast).render(
      <div
        className={classNames(
          "bg-tertiary-foreground/75 animate-fade-in flex max-w-[calc(100vw-1rem)] items-center gap-2 rounded-3xl py-3 font-bold",
          Icon ? "pr-5 pl-3" : "px-5",
        )}
        style={{
          animationDuration: `${Math.min(
            Math.round(this.duration * 0.1),
            300,
          )}ms`,
        }}
      >
        {Icon}
        <span className="text-center text-sm">{this.message}</span>
      </div>,
    );

    return toast;
  }

  public fire(options?: ToastOptions): Promise<void> {
    if (options) {
      this.applyOptions(options);
    }

    const toast = this.createToast();
    document.body.appendChild(toast);

    return new Promise(resolve => {
      setTimeout(() => resolve(toast.remove()), this.duration);
    });
  }
}
