import { Icon } from "@/@types/app";
import { TrashCanIcon } from "@/components/icons/TrashCanIcon";
import { match } from "@/utils/match";
import { createRoot } from "react-dom/client";

type Type = "delete";

interface ConfirmOptions {
  /**
   * @description Notification title
   */
  title?: string;

  /**
   * @description Notification message
   */
  message?: string;

  /**
   * @description Confim button text
   */
  buttonText?: string;

  /**
   * @description Notification type for icon
   */
  type?: Type;
}

export class Confirm {
  private message?: string;
  private title?: string;
  private buttonText?: string;
  private type: Type = "delete";

  private resolve!: (value: boolean) => void;
  private modal!: HTMLDivElement;

  constructor(options?: ConfirmOptions) {
    this.applyOptions(options);
  }

  private applyOptions(options?: ConfirmOptions) {
    if (options) {
      Object.assign(this, options);
    }
  }

  private handleKeydown(e: KeyboardEvent) {
    // para fechar e retornar false se clicar ESC
    if (e.key.toLowerCase() === "escape") {
      this.closeModal(false);
    }
  }

  private closeModal(value: boolean) {
    this.modal.remove();
    this.resolve(value);
  }

  private createModal() {
    this.modal = document.createElement("div");
    this.modal.className =
      "fixed inset-0 flex justify-center items-center z-50 bg-black/75";

    window.addEventListener("keydown", this.handleKeydown.bind(this), {
      once: true,
    });

    this.modal.addEventListener("click", e => {
      // para fechar e retornar false se clicar na overlay
      if (e.target === this.modal) {
        this.closeModal(false);
      }
    });

    const Icon = match(
      this.type,
      {
        delete: TrashCanIcon,
      } as Record<Type, Icon>,
      null,
    );

    createRoot(this.modal).render(
      <div className="bg-default-background text-default-foreground relative flex max-w-[260px] flex-col rounded-lg">
        <button
          className="absolute top-3 right-3 aspect-square w-4 cursor-pointer text-sm"
          onClick={() => this.closeModal(false)}
        >
          &times;
        </button>

        <div className="flex flex-col items-center gap-2 px-4 pb-4 pt-12 text-center">
          {Icon && <Icon className="w-14" />}
          <h2 className="text-xl font-bold">{this.title}</h2>
          <p className="leading-tight">{this.message}</p>
        </div>

        <button
          className="border-default-border cursor-pointer border-t py-2 px-4 font-bold"
          onClick={() => this.closeModal(true)}
        >
          {this.buttonText}
        </button>
      </div>,
    );
  }

  public fire(options?: ConfirmOptions): Promise<boolean> {
    this.applyOptions(options);

    return new Promise(resolve => {
      this.resolve = resolve;
      this.createModal();
      document.body.appendChild(this.modal);
    });
  }
}
