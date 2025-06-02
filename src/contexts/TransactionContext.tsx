import React, { createContext, useState, useEffect } from 'react';
import { Transaction, DailySummary } from '../types';
import { useAuth } from '../hooks/useAuth';

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp' | 'staffId' | 'staffName'>) => void;
  getDailyTransactions: (date?: Date) => Transaction[];
  getDailySummary: (date?: Date) => DailySummary;
}

export const TransactionContext = createContext<TransactionContextType>({
  transactions: [],
  addTransaction: () => {},
  getDailyTransactions: () => [],
  getDailySummary: () => ({
    date: '',
    totalTransactions: 0,
    totalSales: 0,
    cashSales: 0,
    onlineSales: 0,
    itemsSold: 0,
  }),
});

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load transactions from localStorage
    const savedTransactions = localStorage.getItem('pos_transactions');
    if (savedTransactions) {
      try {
        const parsedTransactions = JSON.parse(savedTransactions);
        // Convert string dates back to Date objects
        const transactionsWithDates = parsedTransactions.map((transaction: any) => ({
          ...transaction,
          timestamp: new Date(transaction.timestamp),
        }));
        setTransactions(transactionsWithDates);
      } catch (e) {
        console.error('Error parsing transactions:', e);
        setTransactions([]);
      }
    }
  }, []);

  // Save to localStorage whenever transactions change
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('pos_transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  const addTransaction = (
    transaction: Omit<Transaction, 'id' | 'timestamp' | 'staffId' | 'staffName'>
  ) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      timestamp: new Date(),
      staffId: user?.id || 'unknown',
      staffName: user?.name || 'Staff',
    };
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const getDailyTransactions = (date = new Date()) => {
    return transactions.filter((transaction) =>
      isSameDay(transaction.timestamp, date)
    );
  };

  const getDailySummary = (date = new Date()): DailySummary => {
    const dailyTransactions = getDailyTransactions(date);
    
    const totalSales = dailyTransactions.reduce(
      (sum, transaction) => sum + transaction.total,
      0
    );
    
    const cashSales = dailyTransactions
      .filter((transaction) => transaction.paymentMethod === 'cash')
      .reduce((sum, transaction) => sum + transaction.total, 0);
    
    const onlineSales = dailyTransactions
      .filter((transaction) => transaction.paymentMethod === 'online')
      .reduce((sum, transaction) => sum + transaction.total, 0);
    
    const itemsSold = dailyTransactions.reduce(
      (sum, transaction) =>
        sum + transaction.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
      0
    );
    
    const formattedDate = date.toLocaleDateString();
    
    return {
      date: formattedDate,
      totalTransactions: dailyTransactions.length,
      totalSales,
      cashSales,
      onlineSales,
      itemsSold,
    };
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        getDailyTransactions,
        getDailySummary,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};