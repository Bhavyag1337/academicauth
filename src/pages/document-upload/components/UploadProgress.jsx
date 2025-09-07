import React from 'react';
import Icon from '../../../components/AppIcon';

const UploadProgress = ({ 
  currentStep, 
  steps, 
  uploadProgress, 
  ocrProgress, 
  validationProgress,
  isComplete,
  hasError,
  errorMessage 
}) => {
  const progressSteps = [
    {
      id: 'upload',
      label: 'Upload',
      description: 'Uploading documents',
      icon: 'Upload',
      progress: uploadProgress
    },
    {
      id: 'ocr',
      label: 'Extract',
      description: 'Extracting text content',
      icon: 'FileText',
      progress: ocrProgress
    },
    {
      id: 'validate',
      label: 'Validate',
      description: 'Initial validation',
      icon: 'CheckCircle',
      progress: validationProgress
    }
  ];

  const getStepStatus = (stepId, index) => {
    if (hasError && currentStep === stepId) return 'error';
    if (isComplete) return 'complete';
    if (currentStep === stepId) return 'active';
    if (steps?.indexOf(currentStep) > index) return 'complete';
    return 'pending';
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'complete': return 'text-success';
      case 'active': return 'text-primary';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStepBgColor = (status) => {
    switch (status) {
      case 'complete': return 'bg-success';
      case 'active': return 'bg-primary';
      case 'error': return 'bg-error';
      default: return 'bg-muted';
    }
  };

  const getConnectorColor = (index) => {
    const nextStepStatus = getStepStatus(progressSteps?.[index + 1]?.id, index + 1);
    if (nextStepStatus === 'complete' || nextStepStatus === 'active') {
      return 'bg-primary';
    }
    return 'bg-border';
  };

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {hasError ? 'Upload Failed' : isComplete ? 'Upload Complete' : 'Processing Document'}
        </h3>
        <p className="text-muted-foreground">
          {hasError 
            ? 'An error occurred during processing' 
            : isComplete 
            ? 'Your document has been processed successfully'
            : 'Please wait while we process your document'
          }
        </p>
      </div>
      {/* Progress Steps */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {progressSteps?.map((step, index) => {
            const status = getStepStatus(step?.id, index);
            const isLast = index === progressSteps?.length - 1;
            
            return (
              <div key={step?.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="relative flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${status === 'complete' 
                      ? 'bg-success border-success' 
                      : status === 'active' ?'bg-primary border-primary' 
                      : status === 'error' ?'bg-error border-error' :'bg-muted border-border'
                    }
                  `}>
                    {status === 'complete' ? (
                      <Icon name="Check" size={20} color="white" />
                    ) : status === 'error' ? (
                      <Icon name="X" size={20} color="white" />
                    ) : status === 'active' ? (
                      <Icon name={step?.icon} size={20} color="white" />
                    ) : (
                      <Icon name={step?.icon} size={20} className="text-muted-foreground" />
                    )}
                  </div>
                  
                  {/* Step Label */}
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${getStepColor(status)}`}>
                      {step?.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {step?.description}
                    </div>
                  </div>

                  {/* Progress Indicator for Active Step */}
                  {status === 'active' && step?.progress > 0 && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <div className="text-xs text-primary font-medium">
                        {step?.progress}%
                      </div>
                    </div>
                  )}
                </div>
                {/* Connector Line */}
                {!isLast && (
                  <div className="flex-1 mx-4">
                    <div className={`h-0.5 transition-all duration-300 ${getConnectorColor(index)}`}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Overall Progress Bar */}
      {!isComplete && !hasError && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="text-foreground font-medium">
              {Math.round((steps?.indexOf(currentStep) + 1) / steps?.length * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(steps?.indexOf(currentStep) + 1) / steps?.length * 100}%` 
              }}
            ></div>
          </div>
        </div>
      )}
      {/* Active Step Details */}
      {!isComplete && !hasError && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div>
              <h4 className="font-medium text-foreground">
                {progressSteps?.find(s => s?.id === currentStep)?.description}
              </h4>
              <p className="text-sm text-muted-foreground">
                This may take a few moments...
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Error Message */}
      {hasError && errorMessage && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error mt-0.5" />
            <div>
              <h4 className="font-medium text-error mb-1">Processing Error</h4>
              <p className="text-sm text-error/80">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}
      {/* Success Message */}
      {isComplete && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
            <div>
              <h4 className="font-medium text-success mb-1">Upload Successful</h4>
              <p className="text-sm text-success/80">
                Your document has been processed and is ready for verification.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Processing Time Estimate */}
      {!isComplete && !hasError && (
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Estimated processing time: 2-5 minutes
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadProgress;