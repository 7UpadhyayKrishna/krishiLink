import React, { useState } from 'react';
import { Transaction } from '../../types';
import { MOCK_TRANSACTIONS } from '../../utils/constants';
import { ArrowUp, ArrowDown, Filter } from 'lucide-react';

const RecentTransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [filter, setFilter] = useState<'All' | 'Cash' | 'Online'>('All');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const handleSort = (key: keyof Transaction) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  const getFilteredAndSortedTransactions = () => {
    let filteredTransactions = [...transactions];
    
    if (filter !== 'All') {
      filteredTransactions = filteredTransactions.filter(transaction => 
        transaction.type === filter
      );
    }
    
    if (sortConfig) {
      filteredTransactions.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredTransactions;
  };

  const SortIcon = ({ column }: { column: keyof Transaction }) => {
    if (!sortConfig || sortConfig.key !== column) {
      return null;
    }
    
    return sortConfig.direction === 'ascending' ? (
      <ArrowUp size={14} className="ml-1" />
    ) : (
      <ArrowDown size={14} className="ml-1" />
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Transactions</h3>
        
        <div className="flex items-center">
          <Filter size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'All' | 'Cash' | 'Online')}
            className="bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm py-1 px-2 focus:ring-2 focus:ring-teal-500"
          >
            <option value="All">All</option>
            <option value="Cash">Cash Only</option>
            <option value="Online">Online Only</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th 
                className="py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('item')}
              >
                <div className="flex items-center">
                  Item
                  <SortIcon column="item" />
                </div>
              </th>
              <th 
                className="py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center">
                  Amount
                  <SortIcon column="amount" />
                </div>
              </th>
              <th 
                className="py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('type')}
              >
                <div className="flex items-center">
                  Type
                  <SortIcon column="type" />
                </div>
              </th>
              <th 
                className="py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('time')}
              >
                <div className="flex items-center">
                  Time
                  <SortIcon column="time" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {getFilteredAndSortedTransactions().map((transaction) => (
              <tr 
                key={transaction.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                  {transaction.item}
                </td>
                <td className="py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  ₹{transaction.amount}
                </td>
                <td className="py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.type === 'Cash' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
                  }`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {transaction.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactionsTable;