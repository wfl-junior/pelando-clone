import { Button } from "@/components/Button";
import { SendIcon } from "@/components/icons/product-page/SendIcon";
import { Spinner } from "@/components/Spinner";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import { Field, Form, useFormikContext } from "formik";
import React, { useRef } from "react";

const defaultTextareaHeight = "42px";

export const AddCommentForm: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { values, isValid, isSubmitting } = useFormikContext<{
    body: string;
  }>();

  // para ajustar height da textarea quando body mudar
  useUpdateEffect(() => {
    const el = textareaRef.current!;
    // reseta height, necessário sempre resetar primeiro para o ajuste funcionar corretamente
    el.style.height = defaultTextareaHeight;
    // ajusta height conforme texto
    el.style.height = `${el.scrollHeight}px`;
  }, [values.body]);

  return (
    <Form className="flex w-full gap-1.5">
      <Field
        innerRef={(el: HTMLTextAreaElement) => {
          if (!textareaRef.current) {
            (textareaRef as any).current = el;
          }
        }}
        as="textarea"
        name="body"
        className="bg-input-background w-full resize-none rounded-lg p-2 md:rounded-xl"
        placeholder="Deixe o seu comentário"
        style={{ height: defaultTextareaHeight }}
      />

      <Button
        type="submit"
        className="self-end rounded-full px-1.5"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? (
          <Spinner className="w-6 before:w-2/3" />
        ) : (
          <SendIcon className="w-6" />
        )}
      </Button>
    </Form>
  );
};
