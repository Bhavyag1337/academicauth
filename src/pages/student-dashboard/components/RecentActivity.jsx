import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'upload':
        return { icon: 'Upload', color: 'text-primary' };
      case 'verification':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'rejection':
        return { icon: 'XCircle', color: 'text-error' };
      case 'download':
        return { icon: 'Download', color: 'text-secondary' };
      default:
        return { icon: 'Bell', color: 'text-muted-foreground' };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Button variant="ghost" size="sm" iconName="MoreHorizontal" iconSize={16} />
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => {
          const { icon, color } = getActivityIcon(activity?.type);
          
          return (
            <div key={activity?.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${color}`}>
                <Icon name={icon} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity?.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTimeAgo(activity?.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Activity" size={24} className="text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;