// Item represents a product in the inventory
export interface Item {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  barcode?: string;
  createdAt: Date;
  updatedAt: Date;
}

// CartItem represents an item in the current shopping cart
export interface CartItem {
  item: Item;
  quantity: number;
}

// Transaction represents a completed sale
export interface Transaction {
  id: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  paymentMethod: 'cash' | 'online';
  timestamp: Date;
  staffId: string;
  staffName: string;
}

// DailySummary represents the summary of transactions for a day
export interface DailySummary {
  date: string;
  totalTransactions: number;
  totalSales: number;
  cashSales: number;
  onlineSales: number;
  itemsSold: number;
}