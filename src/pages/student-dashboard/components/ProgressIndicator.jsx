import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Verification Progress</h3>
      <div className="space-y-4">
        {steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isPending = stepNumber > currentStep;

          return (
            <div key={step?.id} className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-success text-success-foreground' :
                isCurrent ? 'bg-primary text-primary-foreground': 'bg-muted text-muted-foreground'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {step?.description}
                </div>
                {isCurrent && step?.estimatedTime && (
                  <div className="text-xs text-primary mt-1">
                    Est. {step?.estimatedTime}
                  </div>
                )}
              </div>
              {isCurrent && (
                <div className="animate-spin">
                  <Icon name="Loader" size={16} className="text-primary" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;