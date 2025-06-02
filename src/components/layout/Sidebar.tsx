import React from 'react';
import { ShoppingCart, Package, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  activePage: 'pos' | 'inventory' | 'transactions';
  setActivePage: (page: 'pos' | 'inventory' | 'transactions') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const { logout } = useAuth();

  const navItems = [
    { id: 'pos', label: 'Point of Sale', icon: <ShoppingCart size={20} /> },
    { id: 'inventory', label: 'Inventory', icon: <Package size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <FileText size={20} /> },
  ];

  return (
    <aside className="bg-blue-800 text-white w-64 flex flex-col">
      <div className="p-4 border-b border-blue-700">
        <h1 className="text-xl font-bold">RetailPOS</h1>
        <p className="text-sm text-blue-300 mt-1">Local Store Edition</p>
      </div>
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActivePage(item.id as any)}
                className={`w-full flex items-center p-3 rounded-lg transition ${
                  activePage === item.id
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-200 hover:bg-blue-700/50'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={logout}
          className="w-full flex items-center p-2 text-blue-200 hover:text-white rounded-lg transition hover:bg-blue-700/50"
        >
          <LogOut size={20} className="mr-3" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};