import { TabsProps } from "@/types/project";
import React, { useState } from "react";

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index: number) => {
    setActiveTab(index);
    tabs[index].onClick();
  };

  return (
    <div className="flex w-100 border border-gray-300 rounded-lg">
      {tabs.map((tab, index: number) => (
        <div
          key={index}
          className={` cursor-pointer p-4 mr-2 my-2 ${
            activeTab === index ? "#FFFFFF shadow-md" : "tranlate"
          }`}
          onClick={() => handleClick(index)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
