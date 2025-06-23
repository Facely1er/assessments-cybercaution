import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronUp, Filter, Plus, Upload } from 'lucide-react';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import { Asset, AssetType, ImportanceLevel, LifecycleStatus } from '../../types';
import * as XLSX from 'xlsx';

interface AssetListProps {
  assets: Asset[];
  onAddAsset: () => void;
  onEditAsset: (asset: Asset) => void;
  onAddMultipleAssets: (assets: Asset[]) => void;
}

const AssetList: React.FC<AssetListProps> = ({
  assets,
  onAddAsset,
  onEditAsset,
  onAddMultipleAssets,
}) => {
  const [sortField, setSortField] = useState<keyof Asset>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState({
    type: '' as AssetType | '',
    importance: '' as ImportanceLevel | '',
    lifecycleStatus: '' as LifecycleStatus | '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSort = (field: keyof Asset) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const newAssets: Asset[] = jsonData.map((row: any) => ({
          id: Math.random().toString(36).substr(2, 9),
          name: row.name || '',
          description: row.description || '',
          type: validateAssetType(row.type),
          owner: row.owner || '',
          vendor: row.vendor || '',
          importance: validateImportanceLevel(row.importance),
          lifecycleStatus: validateLifecycleStatus(row.lifecycleStatus),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));

        onAddMultipleAssets(newAssets);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error importing Excel file:', error);
        alert('Error importing Excel file. Please check the file format and try again.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const validateAssetType = (type: string): AssetType => {
    const validTypes: AssetType[] = ['hardware', 'software', 'service', 'infrastructure', 'data'];
    return validTypes.includes(type as AssetType) ? type as AssetType : 'software';
  };

  const validateImportanceLevel = (level: string): ImportanceLevel => {
    const validLevels: ImportanceLevel[] = ['critical', 'high', 'medium', 'low'];
    return validLevels.includes(level as ImportanceLevel) ? level as ImportanceLevel : 'medium';
  };

  const validateLifecycleStatus = (status: string): LifecycleStatus => {
    const validStatuses: LifecycleStatus[] = ['planning', 'active', 'deprecated', 'retired'];
    return validStatuses.includes(status as LifecycleStatus) ? status as LifecycleStatus : 'active';
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.vendor.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesType = filters.type ? asset.type === filters.type : true;
    const matchesImportance = filters.importance ? asset.importance === filters.importance : true;
    const matchesStatus = filters.lifecycleStatus ? asset.lifecycleStatus === filters.lifecycleStatus : true;
    
    return matchesSearch && matchesType && matchesImportance && matchesStatus;
  });

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getSortIcon = (field: keyof Asset) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <Card className="mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full md:w-64 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your technology assets
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm"
          >
            <Filter size={16} />
            Filters
          </button>
          <button
            onClick={handleImportClick}
            className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm"
          >
            <Upload size={16} />
            Import Excel
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={onAddAsset}
            className="flex items-center gap-1 px-3 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md text-sm transition-colors"
          >
            <Plus size={16} />
            Add Asset
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value as AssetType | '' })}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="">All Types</option>
              <option value="hardware">Hardware</option>
              <option value="software">Software</option>
              <option value="service">Service</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="data">Data</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Importance</label>
            <select
              value={filters.importance}
              onChange={(e) => setFilters({ ...filters, importance: e.target.value as ImportanceLevel | '' })}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="">All Importance</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              value={filters.lifecycleStatus}
              onChange={(e) => setFilters({ ...filters, lifecycleStatus: e.target.value as LifecycleStatus | '' })}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="">All Statuses</option>
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="deprecated">Deprecated</option>
              <option value="retired">Retired</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({ type: '', importance: '', lifecycleStatus: '' })}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Name {getSortIcon('name')}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('type')}
              >
                <div className="flex items-center gap-1">
                  Type {getSortIcon('type')}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('owner')}
              >
                <div className="flex items-center gap-1">
                  Owner {getSortIcon('owner')}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('vendor')}
              >
                <div className="flex items-center gap-1">
                  Vendor {getSortIcon('vendor')}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('importance')}
              >
                <div className="flex items-center gap-1">
                  Importance {getSortIcon('importance')}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('lifecycleStatus')}
              >
                <div className="flex items-center gap-1">
                  Status {getSortIcon('lifecycleStatus')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedAssets.map((asset) => (
              <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" onClick={() => onEditAsset(asset)}>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {asset.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {asset.type}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {asset.owner}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {asset.vendor}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <StatusBadge type="importance" status={asset.importance} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <StatusBadge type="lifecycle" status={asset.lifecycleStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sortedAssets.length === 0 && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No assets found matching your criteria.
          </div>
        )}
      </div>
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Showing {sortedAssets.length} of {assets.length} assets
      </div>
    </Card>
  );
};

export default AssetList;