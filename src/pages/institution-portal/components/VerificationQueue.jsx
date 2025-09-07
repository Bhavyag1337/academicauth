import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const VerificationQueue = ({ requests, onUpdateRequest }) => {
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-review', label: 'In Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'transcript', label: 'Transcript' },
    { value: 'degree', label: 'Degree Certificate' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'certificate', label: 'Certificate' }
  ];

  const priorityColors = {
    high: 'bg-error/10 text-error border-error/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    low: 'bg-success/10 text-success border-success/20'
  };

  const statusColors = {
    pending: 'bg-warning/10 text-warning border-warning/20',
    'in-review': 'bg-primary/10 text-primary border-primary/20',
    approved: 'bg-success/10 text-success border-success/20',
    rejected: 'bg-error/10 text-error border-error/20'
  };

  const filteredRequests = requests?.filter(request => {
    const statusMatch = filterStatus === 'all' || request?.status === filterStatus;
    const typeMatch = filterType === 'all' || request?.documentType === filterType;
    return statusMatch && typeMatch;
  });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRequests(filteredRequests?.map(req => req?.id));
    } else {
      setSelectedRequests([]);
    }
  };

  const handleSelectRequest = (requestId, checked) => {
    if (checked) {
      setSelectedRequests([...selectedRequests, requestId]);
    } else {
      setSelectedRequests(selectedRequests?.filter(id => id !== requestId));
    }
  };

  const handleBulkAction = (action) => {
    selectedRequests?.forEach(requestId => {
      onUpdateRequest(requestId, { status: action });
    });
    setSelectedRequests([]);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Verification Queue</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredRequests?.length} requests • {selectedRequests?.length} selected
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              options={statusOptions}
              value={filterStatus}
              onChange={setFilterStatus}
              placeholder="Filter by status"
              className="w-full sm:w-40"
            />
            <Select
              options={typeOptions}
              value={filterType}
              onChange={setFilterType}
              placeholder="Filter by type"
              className="w-full sm:w-40"
            />
          </div>
        </div>

        {selectedRequests?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 p-3 bg-muted rounded-lg">
            <Button
              variant="outline"
              size="sm"
              iconName="Check"
              onClick={() => handleBulkAction('approved')}
            >
              Approve Selected
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              onClick={() => handleBulkAction('rejected')}
            >
              Reject Selected
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Clock"
              onClick={() => handleBulkAction('in-review')}
            >
              Mark In Review
            </Button>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={selectedRequests?.length === filteredRequests?.length && filteredRequests?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4 font-medium text-sm text-muted-foreground">Student</th>
              <th className="text-left p-4 font-medium text-sm text-muted-foreground">Document</th>
              <th className="text-left p-4 font-medium text-sm text-muted-foreground">Submitted</th>
              <th className="text-left p-4 font-medium text-sm text-muted-foreground">Priority</th>
              <th className="text-left p-4 font-medium text-sm text-muted-foreground">Status</th>
              <th className="text-left p-4 font-medium text-sm text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests?.map((request) => (
              <tr key={request?.id} className="border-t border-border hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedRequests?.includes(request?.id)}
                    onChange={(e) => handleSelectRequest(request?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} color="white" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{request?.studentName}</div>
                      <div className="text-sm text-muted-foreground">{request?.studentId}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-foreground">{request?.documentName}</div>
                    <div className="text-sm text-muted-foreground capitalize">{request?.documentType}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{formatDate(request?.submittedAt)}</div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${priorityColors?.[request?.priority]}`}>
                    {request?.priority?.charAt(0)?.toUpperCase() + request?.priority?.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors?.[request?.status]}`}>
                    {request?.status === 'in-review' ? 'In Review' : request?.status?.charAt(0)?.toUpperCase() + request?.status?.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onUpdateRequest(request?.id, { action: 'view' })}
                    >
                      View
                    </Button>
                    {request?.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Check"
                          onClick={() => onUpdateRequest(request?.id, { status: 'approved' })}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="X"
                          onClick={() => onUpdateRequest(request?.id, { status: 'rejected' })}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredRequests?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No verification requests</h3>
          <p className="text-muted-foreground">No requests match your current filters.</p>
        </div>
      )}
    </div>
  );
};

export default VerificationQueue;