import { UserImagePlaceholder } from "@/components/UserImagePlaceholder";
import { useAddCommentMutation } from "@/hooks/apollo/mutations/useAddCommentMutation";
import { useProductForProductPage } from "@/hooks/useProductForProductPage";
import { useUser } from "@/hooks/useUser";
import { commentValidationSchema } from "@/yup/commentValidationSchema";
import { Formik } from "formik";
import Image from "next/image";
import React from "react";
import { AddCommentForm } from "./AddCommentForm";

const initialValues = {
  body: "",
};

export const AddCommentSection: React.FC = () => {
  const { user } = useUser();
  const product = useProductForProductPage();
  const [addComment] = useAddCommentMutation();

  return (
    <div className="flex gap-1 px-4 md:px-8">
      <div className="border-image-border flex aspect-square w-10 items-center justify-center self-start overflow-hidden rounded-full border">
        {user?.image ? (
          <Image
            src={user.image}
            width={40}
            height={40}
            className="max-w-full object-contain"
          />
        ) : (
          <UserImagePlaceholder className="w-full" />
        )}
      </div>

      <Formik
        validateOnBlur
        validateOnMount
        validateOnChange
        initialValues={initialValues}
        validationSchema={commentValidationSchema}
        onSubmit={async (values, { resetForm, validateForm }) => {
          await addComment({
            variables: {
              input: {
                ...values,
                productId: product.id,
              },
            },
            update: (cache, { data }) => {
              if (data?.addComment.ok) {
                // atualizar commentCount do product
                cache.modify({
                  id: cache.identify(product as any),
                  fields: {
                    commentCount: () => product.commentCount + 1,
                  },
                });

                // TODO: adicionar novo comentário a ui
              }
            },
          });

          resetForm();
          validateForm(initialValues);
        }}
      >
        <AddCommentForm />
      </Formik>
    </div>
  );
};
