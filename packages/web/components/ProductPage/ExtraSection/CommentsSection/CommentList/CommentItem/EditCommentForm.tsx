import { Button } from "@/components/Button";
import { SendIcon } from "@/components/icons/product-page/SendIcon";
import { Spinner } from "@/components/Spinner";
import { useCommentItemContext } from "@/contexts/CommentItemContext";
import { useEditCommentMutation } from "@/hooks/apollo/mutations/useEditCommentMutation";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";
import { authorizationHeaderWithToken } from "@/utils/accessToken";
import { commentValidationSchema } from "@/yup/commentValidationSchema";
import { Field, Form, Formik, useFormikContext } from "formik";
import React, { useRef } from "react";

const defaultTextareaHeight = "42px";

const _EditCommentForm: React.FC = () => {
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
        placeholder="Edite seu comentário"
        style={{ height: defaultTextareaHeight }}
        autoFocus
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

export const EditCommentForm: React.FC = () => {
  const { comment, setEditing } = useCommentItemContext();
  const [editComment] = useEditCommentMutation();

  return (
    <Formik
      validateOnBlur
      validateOnMount
      validateOnChange
      initialValues={{ body: comment.body }}
      validationSchema={commentValidationSchema}
      onSubmit={async values => {
        await editComment({
          variables: {
            input: {
              ...values,
              id: comment.id,
            },
          },
          context: {
            headers: {
              authorization: authorizationHeaderWithToken(),
            },
          },
        });

        setEditing(false);
      }}
    >
      <_EditCommentForm />
    </Formik>
  );
};
