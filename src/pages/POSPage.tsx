import React, { useState, useEffect } from 'react';
import { Search, Plus, Minus, Trash2, CreditCard, Banknote } from 'lucide-react';
import { useInventory } from '../hooks/useInventory';
import { useTransactions } from '../hooks/useTransactions';
import { Item, CartItem } from '../types';

export const POSPage: React.FC = () => {
  const { items, updateStock } = useInventory();
  const { addTransaction } = useTransactions();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [change, setChange] = useState<number>(0);

  // Get unique categories from inventory
  const categories = Array.from(new Set(items.map(item => item.category)));

  // Filter items based on search term and selected category
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory && item.stock > 0;
  });

  // Calculate cart total
  const cartTotal = cart.reduce((total, cartItem) => {
    return total + (cartItem.item.price * cartItem.quantity);
  }, 0);

  const addToCart = (item: Item) => {
    setCart(prevCart => {
      const existingCartItem = prevCart.find(cartItem => cartItem.item.id === item.id);
      
      if (existingCartItem) {
        // Only add if there's enough stock
        if (existingCartItem.quantity < item.stock) {
          return prevCart.map(cartItem => 
            cartItem.item.id === item.id 
              ? { ...cartItem, quantity: cartItem.quantity + 1 } 
              : cartItem
          );
        }
        return prevCart;
      } else {
        return [...prevCart, { item, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (itemId: string) => {
    setCart(prevCart => {
      const existingCartItem = prevCart.find(cartItem => cartItem.item.id === itemId);
      
      if (existingCartItem && existingCartItem.quantity > 1) {
        return prevCart.map(cartItem => 
          cartItem.item.id === itemId 
            ? { ...cartItem, quantity: cartItem.quantity - 1 } 
            : cartItem
        );
      } else {
        return prevCart.filter(cartItem => cartItem.item.id !== itemId);
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    setPaymentMethod('cash');
    setShowPaymentModal(false);
    setPaymentAmount('');
    setChange(0);
  };

  const initiatePayment = () => {
    if (cart.length === 0) return;
    
    if (paymentMethod === 'cash') {
      setShowPaymentModal(true);
    } else {
      // For online payment, just complete the transaction
      completeTransaction();
    }
  };

  const completeTransaction = () => {
    // Create transaction object
    const transaction = {
      items: cart.map(cartItem => ({
        id: cartItem.item.id,
        name: cartItem.item.name,
        price: cartItem.item.price,
        quantity: cartItem.quantity
      })),
      total: cartTotal,
      paymentMethod
    };
    
    // Add transaction to context
    addTransaction(transaction);
    
    // Update stock levels
    cart.forEach(cartItem => {
      updateStock(cartItem.item.id, -cartItem.quantity);
    });
    
    // Clear the cart
    clearCart();
    
    // Show success message
    alert('Transaction completed successfully!');
  };

  const handleCashPayment = () => {
    const amount = parseFloat(paymentAmount);
    
    if (isNaN(amount) || amount < cartTotal) {
      alert('Please enter a valid amount that covers the total.');
      return;
    }
    
    setChange(amount - cartTotal);
    completeTransaction();
  };

  return (
    <div className="h-full flex">
      {/* Product Selection */}
      <div className="w-2/3 h-full p-4 flex flex-col">
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <div className="flex mb-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === null
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-sm p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map(item => (
              <button
                key={item.id}
                onClick={() => addToCart(item)}
                className="bg-white border border-gray-200 p-4 rounded-lg transition transform hover:scale-105 hover:shadow-md flex flex-col h-36"
              >
                <span className="font-medium text-blue-600 mb-1 truncate">{item.name}</span>
                <span className="text-gray-500 text-sm mb-2">{item.category}</span>
                <span className="text-lg font-bold mt-auto">${item.price.toFixed(2)}</span>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    Stock: {item.stock}
                  </span>
                  <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded">
                    Add
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cart and Checkout */}
      <div className="w-1/3 h-full bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Current Sale</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              <p>Cart is empty</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cart.map(cartItem => (
                <li key={cartItem.item.id} className="py-3">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{cartItem.item.name}</p>
                      <p className="text-sm text-gray-500">
                        ${cartItem.item.price.toFixed(2)} x {cartItem.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                      </p>
                      <div className="flex items-center mt-1">
                        <button
                          onClick={() => decreaseQuantity(cartItem.item.id)}
                          className="text-gray-500 hover:text-blue-500"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2">{cartItem.quantity}</span>
                        <button
                          onClick={() => addToCart(cartItem.item)}
                          className="text-gray-500 hover:text-blue-500"
                          disabled={cartItem.quantity >= cartItem.item.stock}
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => removeFromCart(cartItem.item.id)}
                          className="ml-4 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total</span>
            <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
          </div>
          
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setPaymentMethod('cash')}
              className={`flex-1 flex items-center justify-center gap-2 p-2 rounded ${
                paymentMethod === 'cash'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              <Banknote size={18} />
              <span>Cash</span>
            </button>
            <button
              onClick={() => setPaymentMethod('online')}
              className={`flex-1 flex items-center justify-center gap-2 p-2 rounded ${
                paymentMethod === 'online'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              <CreditCard size={18} />
              <span>Online</span>
            </button>
          </div>
          
          <button
            onClick={initiatePayment}
            disabled={cart.length === 0}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Pay Now
          </button>
        </div>
      </div>

      {/* Cash Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Cash Payment</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Amount Due</label>
              <div className="text-2xl font-bold mb-4">${cartTotal.toFixed(2)}</div>
              
              <label className="block text-sm font-medium mb-1">Amount Received</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCashPayment}
                className="flex-1 py-2 bg-blue-600 text-white rounded"
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Modal */}
      {change > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 text-center">
            <h3 className="text-2xl font-bold mb-2">Change Due</h3>
            <div className="text-4xl font-bold text-green-600 mb-6">
              ${change.toFixed(2)}
            </div>
            <button
              onClick={() => setChange(0)}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};