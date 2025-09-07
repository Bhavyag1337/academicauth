import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';

const VerificationTable = ({ documents, onViewDetails, onDownload, onRetry }) => {
  const [sortField, setSortField] = useState('submissionDate');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedDocuments = [...documents]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];

    if (sortField === 'submissionDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('documentName')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Document</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('institution')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Institution</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('submissionDate')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Submitted</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Status</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedDocuments?.map((doc) => (
              <tr key={doc?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="FileText" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{doc?.documentName}</div>
                      <div className="text-xs text-muted-foreground">{doc?.documentType}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">{doc?.institution}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">{formatDate(doc?.submissionDate)}</div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={doc?.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(doc?.id)}
                      iconName="Eye"
                      iconSize={16}
                    >
                      View
                    </Button>
                    {doc?.status === 'verified' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDownload(doc?.id)}
                        iconName="Download"
                        iconSize={16}
                      >
                        Download
                      </Button>
                    )}
                    {doc?.status === 'rejected' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRetry(doc?.id)}
                        iconName="RefreshCw"
                        iconSize={16}
                      >
                        Retry
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border">
        {sortedDocuments?.map((doc) => (
          <div key={doc?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{doc?.documentName}</div>
                  <div className="text-xs text-muted-foreground">{doc?.documentType}</div>
                </div>
              </div>
              <StatusBadge status={doc?.status} />
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Institution:</span>
                <span className="text-foreground">{doc?.institution}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Submitted:</span>
                <span className="text-foreground">{formatDate(doc?.submissionDate)}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(doc?.id)}
                iconName="Eye"
                iconSize={16}
                className="flex-1"
              >
                View Details
              </Button>
              {doc?.status === 'verified' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDownload(doc?.id)}
                  iconName="Download"
                  iconSize={16}
                >
                  Download
                </Button>
              )}
              {doc?.status === 'rejected' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRetry(doc?.id)}
                  iconName="RefreshCw"
                  iconSize={16}
                >
                  Retry
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {documents?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="FileText" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No documents yet</h3>
          <p className="text-muted-foreground mb-4">Upload your first academic document to get started with verification.</p>
          <Button variant="default" iconName="Upload">
            Upload Document
          </Button>
        </div>
      )}
    </div>
  );
};

export default VerificationTable;