import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, onClick, variant = "default" }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          variant === 'primary' ? 'bg-primary text-primary-foreground' :
          variant === 'success' ? 'bg-success text-success-foreground' :
          variant === 'warning' ? 'bg-warning text-warning-foreground' :
          'bg-muted text-muted-foreground'
        }`}>
          <Icon name={icon} size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <Button 
            variant={variant === 'primary' ? 'default' : 'outline'} 
            onClick={onClick}
            className="w-full sm:w-auto"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;