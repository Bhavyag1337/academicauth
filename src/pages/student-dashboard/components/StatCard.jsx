import React from 'react';
import Icon from '../../../components/AppIcon';

const StatCard = ({ title, value, change, changeType, icon, color = "primary" }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error'
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <Icon 
                name={changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className={changeType === 'increase' ? 'text-success' : 'text-error'}
              />
              <span className={`text-sm ml-1 ${
                changeType === 'increase' ? 'text-success' : 'text-error'
              }`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses?.[color]}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;