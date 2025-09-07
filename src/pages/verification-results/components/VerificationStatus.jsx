import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationStatus = ({ verification }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'verified':
        return {
          icon: 'CheckCircle',
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          label: 'Verified'
        };
      case 'pending':
        return {
          icon: 'Clock',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          label: 'Pending Review'
        };
      case 'rejected':
        return {
          icon: 'XCircle',
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          label: 'Rejected'
        };
      default:
        return {
          icon: 'AlertCircle',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          borderColor: 'border-border',
          label: 'Unknown'
        };
    }
  };

  const statusConfig = getStatusConfig(verification?.status);

  return (
    <div className={`p-6 rounded-lg border ${statusConfig?.borderColor} ${statusConfig?.bgColor}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${statusConfig?.bgColor}`}>
            <Icon name={statusConfig?.icon} size={24} className={statusConfig?.color} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{statusConfig?.label}</h3>
            <p className="text-sm text-muted-foreground">Document ID: {verification?.documentId}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{verification?.confidenceScore}% Match</p>
          <p className="text-xs text-muted-foreground">Confidence Score</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Document Details</h4>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Type: {verification?.documentType}</p>
            <p className="text-sm text-muted-foreground">Institution: {verification?.institution}</p>
            <p className="text-sm text-muted-foreground">Issue Date: {verification?.issueDate}</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Verification Details</h4>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Verified: {verification?.verificationDate}</p>
            <p className="text-sm text-muted-foreground">Method: {verification?.verificationMethod}</p>
            <p className="text-sm text-muted-foreground">Verifier: {verification?.verifierName}</p>
          </div>
        </div>
      </div>
      {verification?.institutionalResponse && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">Institutional Response</h4>
          <p className="text-sm text-muted-foreground">{verification?.institutionalResponse}</p>
        </div>
      )}
    </div>
  );
};

export default VerificationStatus;