import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Database, Clock, Filter, Plus, Upload, LayoutGrid } from 'lucide-react';
import AssetList from '../components/inventory/AssetList';
import AssetForm from '../components/inventory/AssetForm';
import { Asset } from '../types';

interface InventoryPageProps {
  assets?: Asset[];
  onAddAsset?: (asset: Asset) => void;
  onUpdateAsset?: (asset: Asset) => void;
}

const InventoryPage: React.FC<InventoryPageProps> = ({
  assets = [], // Default to empty array if not provided
  onAddAsset,
  onUpdateAsset,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>(undefined);

  // Mocked assets for demonstration if none provided
  const mockAssets: Asset[] = [
    {
      id: "asset-1",
      name: "Production Database Server",
      description: "Primary database server for production environment",
      type: "hardware",
      owner: "IT Department",
      vendor: "Dell",
      importance: "critical",
      lifecycleStatus: "active",
      createdAt: "2025-01-10T00:00:00Z",
      updatedAt: "2025-01-10T00:00:00Z"
    },
    {
      id: "asset-2",
      name: "Customer Relationship Management System",
      description: "CRM software for managing customer data and interactions",
      type: "software",
      owner: "Sales Department",
      vendor: "Salesforce",
      importance: "high",
      lifecycleStatus: "active",
      createdAt: "2025-01-15T00:00:00Z",
      updatedAt: "2025-01-15T00:00:00Z"
    },
    {
      id: "asset-3",
      name: "Corporate Website",
      description: "Public-facing website for company information",
      type: "service",
      owner: "Marketing Department",
      vendor: "Internal",
      importance: "medium",
      lifecycleStatus: "active",
      createdAt: "2025-01-20T00:00:00Z",
      updatedAt: "2025-01-20T00:00:00Z"
    }
  ];

  // Use provided assets or fallback to mock assets
  const displayAssets = assets.length > 0 ? assets : mockAssets;

  const handleAddAsset = () => {
    setSelectedAsset(undefined);
    setIsFormOpen(true);
  };

  const handleEditAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsFormOpen(true);
  };

  const handleSaveAsset = (asset: Asset) => {
    if (selectedAsset) {
      if (onUpdateAsset) {
        onUpdateAsset(asset);
      } else {
        // Mock update logic if no handler provided
        console.log('Asset updated:', asset);
      }
    } else {
      if (onAddAsset) {
        onAddAsset(asset);
      } else {
        // Mock add logic if no handler provided
        console.log('Asset added:', asset);
      }
    }
    setIsFormOpen(false);
  };

  const handleAddMultipleAssets = (newAssets: Asset[]) => {
    if (newAssets.length === 0) return;
    
    if (onAddAsset) {
      // Use the provided handler to add each asset individually
      newAssets.forEach(asset => onAddAsset(asset));
      console.log(`${newAssets.length} assets imported successfully`);
    } else {
      // Mock import logic if no handler provided
      console.log('Multiple assets added:', newAssets);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Asset Inventory</h1>
          <p className="text-muted-foreground">Track and manage your organization's technology assets</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button onClick={handleAddAsset}>
            <Plus className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
                <h3 className="text-3xl font-bold">{displayAssets.length}</h3>
              </div>
              <div className="rounded-full p-3 bg-electric-blue/10 text-electric-blue">
                <LayoutGrid className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Assets</p>
                <h3 className="text-3xl font-bold">
                  {displayAssets.filter(a => a.importance === "critical").length}
                </h3>
              </div>
              <div className="rounded-full p-3 bg-critical-red/10 text-critical-red">
                <Database className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Assets</p>
                <h3 className="text-3xl font-bold">
                  {displayAssets.filter(a => a.lifecycleStatus === "active").length}
                </h3>
              </div>
              <div className="rounded-full p-3 bg-secure-green/10 text-secure-green">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Asset Categories</p>
                <h3 className="text-3xl font-bold">
                  {new Set(displayAssets.map(a => a.type)).size}
                </h3>
              </div>
              <div className="rounded-full p-3 bg-electric-blue/10 text-electric-blue">
                <Filter className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AssetList
        assets={displayAssets}
        onAddAsset={handleAddAsset}
        onEditAsset={handleEditAsset}
        onAddMultipleAssets={handleAddMultipleAssets}
      />

      <AssetForm
        asset={selectedAsset}
        onSave={handleSaveAsset}
        onCancel={handleCancel}
        isOpen={isFormOpen}
      />
    </div>
  );
};

export default InventoryPage;