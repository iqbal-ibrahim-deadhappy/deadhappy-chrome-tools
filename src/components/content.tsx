import React, { useEffect, useState } from "react";
import { User } from "../types";
import { Actions } from "./actions";
import { Navigation } from "./navigation";
import { Registrations } from "./Registrations";
import Tab from "./Tabs/Tab";
import Tabs from "./Tabs/Tabs";
import { Zoom } from "./zoom";
import { Resources } from "./resources";

interface ContentProps {
  user: User;
}

export const Content = (props: ContentProps) => {
  const { user } = props;

  return (
      <>
        <Tabs tabsetName="tabIndex">
          <Tab title="Navigation">
            <Navigation user={user} />
          </Tab>
          <Tab title="Actions">
            <Actions user={user} />
          </Tab>
          <Tab title="Zoom">
            <Zoom />
          </Tab>
          <Tab title="Registrations">
            <Registrations user={user} />
          </Tab>
          <Tab title="Resources">
            <Resources />
          </Tab>
        </Tabs>
      </>
  );
};