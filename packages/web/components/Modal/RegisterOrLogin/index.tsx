import { Tab } from "@headlessui/react";
import React from "react";
import { Panel } from "./Panel";

export const RegisterOrLogin: React.FC = () => {
  return (
    <div className="bg-default-background relative flex h-screen w-screen flex-col md:h-auto md:min-h-[512px] md:w-full md:max-w-[360px] md:rounded-lg">
      <Tab.Group>
        <Tab.Panels className="contents">
          <Panel type="register" />
          <Panel type="login" />
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
