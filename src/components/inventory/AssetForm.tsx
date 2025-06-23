import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Asset, AssetType, ImportanceLevel, LifecycleStatus } from '../../types';

interface AssetFormProps {
  asset?: Asset;
  onSave: (asset: Asset) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const AssetForm: React.FC<AssetFormProps> = ({ asset, onSave, onCancel, isOpen }) => {
  const [formData, setFormData] = useState<Partial<Asset>>({
    name: '',
    description: '',
    type: 'software',
    owner: '',
    vendor: '',
    importance: 'medium',
    lifecycleStatus: 'active',
  });

  useEffect(() => {
    if (asset) {
      setFormData(asset);
    } else {
      setFormData({
        name: '',
        description: '',
        type: 'software',
        owner: '',
        vendor: '',
        importance: 'medium',
        lifecycleStatus: 'active',
      });
    }
  }, [asset]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.owner || !formData.vendor) {
      alert('Please fill in all required fields.');
      return;
    }
    
    onSave({
      id: asset?.id || Math.random().toString(36).substr(2, 9),
      name: formData.name || '',
      description: formData.description || '',
      type: formData.type as AssetType,
      owner: formData.owner || '',
      vendor: formData.vendor || '',
      importance: formData.importance as ImportanceLevel,
      lifecycleStatus: formData.lifecycleStatus as LifecycleStatus,
      createdAt: asset?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {asset ? 'Edit Asset' : 'Add New Asset'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            
            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
                <option value="service">Service</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="data">Data</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="importance" className="block text-sm font-medium text-gray-700 mb-1">
                Importance Level *
              </label>
              <select
                id="importance"
                name="importance"
                value={formData.importance}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">
                Owner *
              </label>
              <input
                type="text"
                id="owner"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="vendor" className="block text-sm font-medium text-gray-700 mb-1">
                Vendor *
              </label>
              <input
                type="text"
                id="vendor"
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="lifecycleStatus" className="block text-sm font-medium text-gray-700 mb-1">
                Lifecycle Status *
              </label>
              <select
                id="lifecycleStatus"
                name="lifecycleStatus"
                value={formData.lifecycleStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="deprecated">Deprecated</option>
                <option value="retired">Retired</option>
              </select>
            </div>
          </div>
          
          {asset && (
            <div className="flex justify-between mb-4 text-xs text-gray-500">
              <div>Created: {new Date(asset.createdAt).toLocaleString()}</div>
              <div>Updated: {new Date(asset.updatedAt).toLocaleString()}</div>
            </div>
          )}
          
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
            >
              {asset ? 'Update Asset' : 'Add Asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetForm;