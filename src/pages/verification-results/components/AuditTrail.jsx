import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AuditTrail = ({ auditEvents }) => {
  const [expandedEvent, setExpandedEvent] = useState(null);

  const getEventIcon = (type) => {
    switch (type) {
      case 'submission':
        return 'Upload';
      case 'processing':
        return 'Cpu';
      case 'institutional_response':
        return 'Building2';
      case 'manual_review':
        return 'User';
      case 'verification_complete':
        return 'CheckCircle';
      case 'dispute':
        return 'AlertTriangle';
      default:
        return 'Circle';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'submission':
        return 'text-primary';
      case 'processing':
        return 'text-warning';
      case 'institutional_response':
        return 'text-accent';
      case 'manual_review':
        return 'text-secondary';
      case 'verification_complete':
        return 'text-success';
      case 'dispute':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Audit Trail</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Complete History</span>
        </div>
      </div>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

        <div className="space-y-6">
          {auditEvents?.map((event, index) => (
            <div key={event?.id} className="relative flex items-start space-x-4">
              {/* Timeline Dot */}
              <div className={`relative z-10 w-12 h-12 rounded-full bg-card border-2 border-border flex items-center justify-center ${getEventColor(event?.type)}`}>
                <Icon name={getEventIcon(event?.type)} size={20} />
              </div>

              {/* Event Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{event?.title}</h4>
                      <p className="text-xs text-muted-foreground">{formatTimestamp(event?.timestamp)}</p>
                    </div>
                    {event?.details && (
                      <button
                        onClick={() => setExpandedEvent(expandedEvent === event?.id ? null : event?.id)}
                        className="text-muted-foreground hover:text-foreground transition-smooth"
                      >
                        <Icon 
                          name={expandedEvent === event?.id ? "ChevronUp" : "ChevronDown"} 
                          size={16} 
                        />
                      </button>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">{event?.description}</p>

                  {event?.performer && (
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Icon name="User" size={12} />
                      <span>By: {event?.performer}</span>
                    </div>
                  )}

                  {/* Expanded Details */}
                  {expandedEvent === event?.id && event?.details && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="space-y-2">
                        {Object.entries(event?.details)?.map(([key, value]) => (
                          <div key={key} className="flex justify-between text-xs">
                            <span className="text-muted-foreground capitalize">{key?.replace('_', ' ')}:</span>
                            <span className="text-foreground font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">{auditEvents?.length}</p>
            <p className="text-xs text-muted-foreground">Total Events</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              {auditEvents?.filter(e => e?.type === 'manual_review')?.length}
            </p>
            <p className="text-xs text-muted-foreground">Manual Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              {Math.round((Date.now() - new Date(auditEvents[0]?.timestamp)?.getTime()) / (1000 * 60 * 60))}h
            </p>
            <p className="text-xs text-muted-foreground">Processing Time</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-success">100%</p>
            <p className="text-xs text-muted-foreground">Transparency</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;