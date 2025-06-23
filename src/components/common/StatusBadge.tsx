import React from 'react';
import { ImportanceLevel, LifecycleStatus, RiskLevel } from '../../types';

interface StatusBadgeProps {
  type: 'importance' | 'lifecycle' | 'risk';
  status: ImportanceLevel | LifecycleStatus | RiskLevel;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ type, status, className }) => {
  const getStatusColor = () => {
    if (type === 'importance' || type === 'risk') {
      switch (status) {
        case 'critical':
          return 'bg-red-100 text-red-800 border-red-200';
        case 'high':
          return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'medium':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'low':
          return 'bg-green-100 text-green-800 border-green-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    } else if (type === 'lifecycle') {
      switch (status) {
        case 'planning':
          return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'active':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'deprecated':
          return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'retired':
          return 'bg-gray-100 text-gray-800 border-gray-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor()} ${className || ''}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;