import React, { useState } from 'react';
import { useInventory } from '../hooks/useInventory';
import { Plus, Edit, Trash2, Package, Search, X } from 'lucide-react';
import { Item } from '../types';

export const InventoryPage: React.FC = () => {
  const { items, addItem, updateItem, updateStock, deleteItem } = useInventory();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [newItemForm, setNewItemForm] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
  });
  const [editItemForm, setEditItemForm] = useState({
    name: '',
    price: '',
    category: '',
  });
  const [restockQuantity, setRestockQuantity] = useState('');

  // Get unique categories
  const categories = Array.from(new Set(items.map(item => item.category)));

  // Filter items based on search
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    const price = parseFloat(newItemForm.price);
    const stock = parseInt(newItemForm.stock);
    
    if (isNaN(price) || isNaN(stock) || price <= 0 || stock < 0) {
      alert('Please enter valid values for price and stock.');
      return;
    }
    
    addItem({
      name: newItemForm.name,
      price,
      stock,
      category: newItemForm.category,
    });
    
    setNewItemForm({ name: '', price: '', stock: '', category: '' });
    setShowAddModal(false);
  };

  const handleEditItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedItem) return;
    
    const price = parseFloat(editItemForm.price);
    
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price.');
      return;
    }
    
    updateItem(selectedItem.id, {
      name: editItemForm.name,
      price,
      category: editItemForm.category,
    });
    
    setShowEditModal(false);
  };

  const handleRestock = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedItem) return;
    
    const quantity = parseInt(restockQuantity);
    
    if (isNaN(quantity) || quantity <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }
    
    updateStock(selectedItem.id, quantity);
    setShowRestockModal(false);
    setRestockQuantity('');
  };

  const openEditModal = (item: Item) => {
    setSelectedItem(item);
    setEditItemForm({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
    });
    setShowEditModal(true);
  };

  const openRestockModal = (item: Item) => {
    setSelectedItem(item);
    setRestockQuantity('');
    setShowRestockModal(true);
  };

  const confirmDelete = (item: Item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      deleteItem(item.id);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Add Item
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No items found
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.stock <= 5
                        ? 'bg-red-100 text-red-800'
                        : item.stock <= 20
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openRestockModal(item)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Restock"
                      >
                        <Package size={18} />
                      </button>
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-amber-600 hover:text-amber-900"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => confirmDelete(item)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Item</h3>
            <form onSubmit={handleAddItem}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Item Name</label>
                <input
                  type="text"
                  value={newItemForm.name}
                  onChange={(e) => setNewItemForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setNewItemForm(prev => ({ ...prev, category }))}
                      className={`px-3 py-1 rounded-full text-sm ${
                        newItemForm.category === category
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={newItemForm.category}
                  onChange={(e) => setNewItemForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Category name"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={newItemForm.price}
                    onChange={(e) => setNewItemForm(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full pl-8 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Initial Stock</label>
                <input
                  type="number"
                  min="0"
                  value={newItemForm.stock}
                  onChange={(e) => setNewItemForm(prev => ({ ...prev, stock: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-800 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white rounded"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Item</h3>
            <form onSubmit={handleEditItem}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Item Name</label>
                <input
                  type="text"
                  value={editItemForm.name}
                  onChange={(e) => setEditItemForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setEditItemForm(prev => ({ ...prev, category }))}
                      className={`px-3 py-1 rounded-full text-sm ${
                        editItemForm.category === category
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={editItemForm.category}
                  onChange={(e) => setEditItemForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Category name"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={editItemForm.price}
                    onChange={(e) => setEditItemForm(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full pl-8 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-800 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Restock Modal */}
      {showRestockModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Restock Item</h3>
            <p className="mb-4">
              Current stock for <span className="font-semibold">{selectedItem.name}</span>: {selectedItem.stock}
            </p>
            
            <form onSubmit={handleRestock}>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Quantity to Add</label>
                <input
                  type="number"
                  min="1"
                  value={restockQuantity}
                  onChange={(e) => setRestockQuantity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  autoFocus
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowRestockModal(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-800 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 text-white rounded"
                >
                  Add Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};