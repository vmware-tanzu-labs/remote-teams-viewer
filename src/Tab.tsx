import React, { ReactElement } from "react";

type TabProps = {
  title: string;
  children: ReactElement;
};

const Tab: React.FC<TabProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Tab;
