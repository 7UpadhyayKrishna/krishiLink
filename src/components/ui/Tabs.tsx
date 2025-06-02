import React from 'react';

interface TabsProps {
  activeTab: string;
  onChange: (tabId: string) => void;
  children: React.ReactNode;
}

interface TabProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onChange, children }) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex overflow-x-auto hide-scrollbar">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<TabProps>, {
              active: activeTab === child.props.id,
              onClick: () => onChange(child.props.id),
            });
          }
          return child;
        })}
      </div>
    </div>
  );
};

interface TabComponentProps extends TabProps {
  active?: boolean;
  onClick?: () => void;
}

export const Tab: React.FC<TabComponentProps> = ({ id, label, icon, active, onClick }) => {
  return (
    <button
      className={`inline-flex items-center px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
        active
          ? 'border-green-600 text-green-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};