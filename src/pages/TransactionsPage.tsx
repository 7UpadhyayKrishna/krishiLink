import React, { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { ChevronDown, ChevronUp, FileText, DollarSign, CreditCard, Calendar } from 'lucide-react';

export const TransactionsPage: React.FC = () => {
  const { transactions, getDailyTransactions, getDailySummary } = useTransactions();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null);
  
  const dailyTransactions = getDailyTransactions(selectedDate);
  const dailySummary = getDailySummary(selectedDate);
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setSelectedDate(date);
  };
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD for input
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const toggleTransaction = (transactionId: string) => {
    if (expandedTransaction === transactionId) {
      setExpandedTransaction(null);
    } else {
      setExpandedTransaction(transactionId);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex items-center">
        <div className="mr-4 flex items-center">
          <Calendar size={20} className="mr-2 text-gray-500" />
          <span className="text-sm font-medium mr-2">Select Date:</span>
          <input
            type="date"
            value={formatDate(selectedDate)}
            onChange={handleDateChange}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <FileText size={18} className="mr-2 text-blue-500" />
            <h3 className="text-lg font-semibold">Total Transactions</h3>
          </div>
          <p className="text-3xl font-bold">{dailySummary.totalTransactions}</p>
          <p className="text-gray-500 text-sm">{dailySummary.itemsSold} items sold</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <DollarSign size={18} className="mr-2 text-green-500" />
            <h3 className="text-lg font-semibold">Cash Sales</h3>
          </div>
          <p className="text-3xl font-bold">${dailySummary.cashSales.toFixed(2)}</p>
          <p className="text-gray-500 text-sm">
            {Math.round((dailySummary.cashSales / dailySummary.totalSales || 0) * 100)}% of total sales
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <CreditCard size={18} className="mr-2 text-purple-500" />
            <h3 className="text-lg font-semibold">Online Sales</h3>
          </div>
          <p className="text-3xl font-bold">${dailySummary.onlineSales.toFixed(2)}</p>
          <p className="text-gray-500 text-sm">
            {Math.round((dailySummary.onlineSales / dailySummary.totalSales || 0) * 100)}% of total sales
          </p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Transaction Log</h2>
          <p className="text-gray-500">
            {dailyTransactions.length === 0
              ? 'No transactions for this day'
              : `Showing ${dailyTransactions.length} transactions for ${dailySummary.date}`}
          </p>
        </div>
        
        {dailyTransactions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FileText size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No transactions found for this date</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {dailyTransactions.map((transaction) => (
              <li key={transaction.id} className="p-4 hover:bg-gray-50">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleTransaction(transaction.id)}
                >
                  <div>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                        transaction.paymentMethod === 'cash'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {transaction.paymentMethod === 'cash' ? <DollarSign size={16} /> : <CreditCard size={16} />}
                      </span>
                      <div>
                        <p className="font-medium">
                          {transaction.paymentMethod === 'cash' ? 'Cash Payment' : 'Online Payment'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatTime(transaction.timestamp)} • Staff: {transaction.staffName}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-right mr-4">
                      <p className="font-bold">${transaction.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{transaction.items.length} items</p>
                    </div>
                    {expandedTransaction === transaction.id ? (
                      <ChevronUp size={20} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </div>
                </div>
                
                {expandedTransaction === transaction.id && (
                  <div className="mt-3 ml-11 border-t pt-3">
                    <table className="min-w-full">
                      <thead>
                        <tr className="text-left text-xs text-gray-500">
                          <th className="pb-2">Item</th>
                          <th className="pb-2">Qty</th>
                          <th className="pb-2">Price</th>
                          <th className="pb-2 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transaction.items.map((item, index) => (
                          <tr key={index} className="text-sm">
                            <td className="pb-1 pr-4">{item.name}</td>
                            <td className="pb-1 pr-4">{item.quantity}</td>
                            <td className="pb-1 pr-4">${item.price.toFixed(2)}</td>
                            <td className="pb-1 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="text-sm font-bold border-t">
                          <td className="pt-2" colSpan={3}>Total</td>
                          <td className="pt-2 text-right">${transaction.total.toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};