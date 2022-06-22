import React, { ReactElement, useEffect, useState } from 'react';
import TabTitle from './TabTitle';

interface TabsProps {
  children: ReactElement[]
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  useEffect(() => {
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    chrome.storage.sync.get('tabIndex',
      (items) => {
          if (items) {
            console.log(`tabIndex found : ${items.tabIndex}`);
            setSelectedTab(Number(items.tabIndex));
          } else {
            setSelectedTab(0);
          }
      }
    );
  }, []);

  const setSelectedTabHandler = (index: number) => {
    setSelectedTab(index);
    chrome.storage.sync.set({tabIndex: index}, function() {
      console.log(`setting tabIndex to ${index}`);
    });
  }

  return (
    <>
      <div className="w-full my-2">
        <div className="sm:block">
          <div className="border-y border-gray-200">
            <nav className="-mb-px flex justify-between" aria-label="Tabs" data-testid="tab-buttons">
            {children.map((item, index) => (
              <TabTitle index={index} key={index} title={item.props.title} setSelectedTab={(index) => setSelectedTabHandler(index)} isActive={selectedTab === index}/>
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
