import React from 'react';

export interface TabTitleProps {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
  isActive: boolean;
}

const TabTitle: React.FC<TabTitleProps> = ({ title, setSelectedTab, index, isActive }) => {
  return (
    <button
      type="button"
      data-testid="tab-button"
      id={`tab-button-${title}`}
      onClick={() => setSelectedTab(index)}
      className={`${
        isActive
          ? 'bg-pink-500 text-white'
          : 'text-gray-500 hover:text-gray-700'
      } w-full focus:outline-none cursor-pointer border-transparent py-2 px-3 border-b-2 font-medium text-sm`}
    >
      {title}
    </button>
  )
};

export default TabTitle;
