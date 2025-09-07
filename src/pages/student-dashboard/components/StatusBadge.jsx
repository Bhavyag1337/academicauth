import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusBadge = ({ status, showIcon = true }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'verified':
        return {
          color: 'bg-success text-success-foreground',
          icon: 'CheckCircle',
          label: 'Verified'
        };
      case 'pending':
        return {
          color: 'bg-warning text-warning-foreground',
          icon: 'Clock',
          label: 'Pending'
        };
      case 'rejected':
        return {
          color: 'bg-error text-error-foreground',
          icon: 'XCircle',
          label: 'Rejected'
        };
      case 'processing':
        return {
          color: 'bg-primary text-primary-foreground',
          icon: 'Loader',
          label: 'Processing'
        };
      default:
        return {
          color: 'bg-muted text-muted-foreground',
          icon: 'Circle',
          label: 'Unknown'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.color}`}>
      {showIcon && <Icon name={config?.icon} size={12} className="mr-1" />}
      {config?.label}
    </span>
  );
};

export default StatusBadge;