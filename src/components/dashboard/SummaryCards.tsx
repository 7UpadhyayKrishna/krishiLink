import React from 'react';
import { CreditCard, DollarSign, TrendingUp } from 'lucide-react';
import { SummaryCardProps } from '../../types';

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center justify-between mb-3">
        <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">{title}</p>
        <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
          {icon}
        </div>
      </div>
      <div className="flex items-end space-x-2">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{value}</h3>
        {trend && (
          <div className={`flex items-center text-sm ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
            <TrendingUp size={16} className={`${!trend.positive && 'rotate-180'} mr-1`} />
            <span>{trend.value}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const SummaryCards: React.FC = () => {
  const summaryData = [
    {
      title: "Cash Transactions Today",
      value: "₹1,245",
      icon: <DollarSign size={18} />,
      trend: { value: "15%", positive: true }
    },
    {
      title: "Online Payments",
      value: "₹845",
      icon: <CreditCard size={18} />,
      trend: { value: "5%", positive: true }
    },
    {
      title: "Total Sales",
      value: "₹2,090",
      icon: <TrendingUp size={18} />,
      trend: { value: "12%", positive: true }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {summaryData.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  );
};

export default SummaryCards;