import React, { ReactElement, useState } from 'react';
import TabTitle from './TabTitle';

interface TabsProps {
  children: ReactElement[]
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <>
      <div className="w-full my-2">
        <div className="sm:block">
          <div className="border-y border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs" data-testid="tab-buttons">
            {children.map((item, index) => (
              <TabTitle index={index} key={index} title={item.props.title} setSelectedTab={setSelectedTab} isActive={selectedTab === index}/>
            ))}
            </nav>
          </div>
        </div>
      </div>

      <div data-testid="tab-content" className="w-full border-gray-200 border-1">
        {children[selectedTab]}
      </div>
    </>
  );
};

export default Tabs;
