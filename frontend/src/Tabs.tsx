import React, { ReactElement, useState } from "react";
import "./App.css";

type Props = {
  children: ReactElement[];
};

const Tabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <div className="tabs-button-group">
        {children.map((item, index) => (
          <button key={index} className="tab-button" onClick={() => setSelectedTab(index)}>
            {item.props.title}
          </button>
        ))}
      </div>
      <div className="tooltip-content">{children[selectedTab]}</div>
    </div>
  );
};

export default Tabs;
