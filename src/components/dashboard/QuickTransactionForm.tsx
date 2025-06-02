import React, { useState } from 'react';
import { Plus, CreditCard, Banknote } from 'lucide-react';
import { QuickItemProps } from '../../types';
import { QUICK_ITEMS } from '../../utils/constants';

const QuickItem: React.FC<QuickItemProps> = ({ name, price, onClick }) => {
  return (
    <button
      onClick={() => onClick(name, price)}
      className="bg-white dark:bg-gray-800 text-left rounded-lg p-3 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex justify-between items-center"
    >
      <span className="font-medium text-gray-800 dark:text-gray-200">{name}</span>
      <span className="text-teal-600 dark:text-teal-400 font-bold">₹{price}</span>
    </button>
  );
};

const QuickTransactionForm: React.FC = () => {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [paymentType, setPaymentType] = useState<'Cash' | 'Online'>('Cash');
  const [successMessage, setSuccessMessage] = useState('');

  const handleQuickItemClick = (name: string, itemPrice: number) => {
    setItem(name);
    setPrice(itemPrice);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (item && price) {
      // Here you would typically save this transaction
      setSuccessMessage(`Added ${item} for ₹${price} via ${paymentType}`);
      
      // Reset form
      setTimeout(() => {
        setItem('');
        setPrice('');
        setSuccessMessage('');
      }, 3000);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 mb-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Quick Transaction</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {QUICK_ITEMS.slice(0, 8).map((quickItem, index) => (
          <QuickItem 
            key={index}
            name={quickItem.name}
            price={quickItem.price}
            onClick={handleQuickItemClick}
          />
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="item" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Item
            </label>
            <input
              type="text"
              id="item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter item name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter price"
              min="1"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Payment Type
          </label>
          <div className="flex space-x-4">
            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
              paymentType === 'Cash' 
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400' 
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}>
              <input
                type="radio"
                name="paymentType"
                value="Cash"
                checked={paymentType === 'Cash'}
                onChange={() => setPaymentType('Cash')}
                className="sr-only"
              />
              <Banknote size={20} className="mr-2" />
              <span>Cash</span>
            </label>
            
            <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
              paymentType === 'Online' 
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400' 
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}>
              <input
                type="radio"
                name="paymentType"
                value="Online"
                checked={paymentType === 'Online'}
                onChange={() => setPaymentType('Online')}
                className="sr-only"
              />
              <CreditCard size={20} className="mr-2" />
              <span>Online</span>
            </label>
          </div>
        </div>
        
        {successMessage && (
          <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-3 rounded-lg">
            {successMessage}
          </div>
        )}
        
        <button
          type="submit"
          className="w-full flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default QuickTransactionForm;