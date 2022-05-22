import { UserImagePlaceholder } from "@/components/UserImagePlaceholder";
import { useMeQuery } from "@/hooks/apollo/useMeQuery";
import Image from "next/image";
import React from "react";
import { RegisterOrLoginButton } from "./RegisterOrLoginButton";

export const UserSection = () => {
  const { data } = useMeQuery();

  return (
    <div className="flex items-center gap-2.5">
      {data?.me.user && data.me.user.image ? (
        <div className="bg-inactive-background/50 flex aspect-square w-12 items-center justify-center overflow-hidden rounded-full">
          <Image src={data.me.user.image} width={48} height={48} />
        </div>
      ) : (
        <UserImagePlaceholder className="w-12" />
      )}

      {data?.me.user ? (
        <p className="my-auto text-sm leading-4">
          <span>Olá,</span>
          <br />
          <span className="font-bold">{data.me.user.username}</span>
        </p>
      ) : (
        <p className="self-end">
          <RegisterOrLoginButton type="login">Entrar</RegisterOrLoginButton>
          &nbsp;ou&nbsp;
          <RegisterOrLoginButton type="register">
            Cadastrar
          </RegisterOrLoginButton>
        </p>
      )}
    </div>
  );
};
