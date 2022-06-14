import { CheckIcon } from "@/components/icons/CheckIcon";
import { match } from "@/utils/match";
import classNames from "classnames";
import { createRoot, Root } from "react-dom/client";

type Type = "success" | "error";

interface ToastOptions {
  /**
   * @description Duration in milliseconds
   * @default 3000
   */
  duration?: number;

  /**
   * @description Notification message
   */
  message: string;

  /**
   * @description Notification type for icon
   */
  type?: Type;
}

let toastContainerRoot: Root | undefined;
let timeout: NodeJS.Timeout | undefined;

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
    const id = "toast-container";
    const existingToastContainer = document.querySelector<HTMLDivElement>(
      `#${id}`,
    );

    const toastContainer =
      existingToastContainer || document.createElement("div");

    if (!existingToastContainer) {
      toastContainer.className =
        "fixed inset-x-0 bottom-12 flex justify-center z-50";
      toastContainer.id = id;
    }

    if (!toastContainerRoot) {
      toastContainerRoot = createRoot(toastContainer);
    }

    const Icon = match(
      this.type,
      {
        success: <CheckIcon className="w-4" />,
        error: <span className="w-4 rounded-full text-sm">&times;</span>,
      } as Record<Type, JSX.Element>,
      null,
    );

    toastContainerRoot.render(
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

    return toastContainer;
  }

  public fire(options?: ToastOptions): Promise<void> {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (options) {
      this.applyOptions(options);
    }

    const toastContainer = this.createToast();
    document.body.appendChild(toastContainer);

    return new Promise(resolve => {
      timeout = setTimeout(() => {
        toastContainerRoot = undefined;
        toastContainer.remove();
        timeout = undefined;
        resolve();
      }, this.duration);
    });
  }
}
