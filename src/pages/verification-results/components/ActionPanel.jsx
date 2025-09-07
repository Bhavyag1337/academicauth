import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ActionPanel = ({ verification }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [disputeReason, setDisputeReason] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [isSubmittingDispute, setIsSubmittingDispute] = useState(false);

  const handleShareResults = async () => {
    if (!shareEmail) return;
    
    setIsSharing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSharing(false);
    setShowShareModal(false);
    setShareEmail('');
    // Show success toast in real app
  };

  const handleSubmitDispute = async () => {
    if (!disputeReason) return;
    
    setIsSubmittingDispute(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmittingDispute(false);
    setShowDisputeModal(false);
    setDisputeReason('');
    // Show success toast in real app
  };

  const handleUploadMore = () => {
    window.location.href = '/document-upload';
  };

  const handleBackToDashboard = () => {
    window.location.href = '/student-dashboard';
  };

  const copyVerificationLink = () => {
    const link = `https://academicauth.com/verify/${verification?.verificationId}`;
    navigator.clipboard?.writeText(link);
    // Show toast notification in real app
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Actions</h3>

        <div className="space-y-4">
          {/* Primary Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              variant="default"
              iconName="Share"
              iconPosition="left"
              onClick={() => setShowShareModal(true)}
              fullWidth
            >
              Share Results
            </Button>
            
            <Button
              variant="outline"
              iconName="Copy"
              iconPosition="left"
              onClick={copyVerificationLink}
              fullWidth
            >
              Copy Link
            </Button>
          </div>

          {/* Secondary Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              variant="ghost"
              iconName="Upload"
              iconPosition="left"
              onClick={handleUploadMore}
              fullWidth
            >
              Upload More Documents
            </Button>
            
            <Button
              variant="ghost"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={handleBackToDashboard}
              fullWidth
            >
              Back to Dashboard
            </Button>
          </div>

          {/* Dispute Action (only show if verification failed) */}
          {verification?.status === 'rejected' && (
            <div className="pt-4 border-t border-border">
              <Button
                variant="destructive"
                iconName="AlertTriangle"
                iconPosition="left"
                onClick={() => setShowDisputeModal(true)}
                fullWidth
              >
                Dispute Verification
              </Button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Quick Stats</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-lg font-semibold text-foreground">{verification?.confidenceScore}%</p>
              <p className="text-xs text-muted-foreground">Confidence</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-lg font-semibold text-foreground">2.5h</p>
              <p className="text-xs text-muted-foreground">Process Time</p>
            </div>
          </div>
        </div>
      </div>
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-foreground">Share Verification Results</h4>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <Input
                label="Recipient Email"
                type="email"
                placeholder="employer@company.com"
                value={shareEmail}
                onChange={(e) => setShareEmail(e?.target?.value)}
                description="The verification results will be sent securely"
              />

              <div className="bg-muted rounded-lg p-3">
                <h5 className="text-sm font-medium text-foreground mb-2">What will be shared:</h5>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Verification status and confidence score</li>
                  <li>• Document type and institution</li>
                  <li>• Verification timestamp</li>
                  <li>• Secure verification link</li>
                </ul>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowShareModal(false)}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  loading={isSharing}
                  onClick={handleShareResults}
                  disabled={!shareEmail}
                  fullWidth
                >
                  {isSharing ? 'Sending...' : 'Send'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-foreground">Dispute Verification</h4>
              <button
                onClick={() => setShowDisputeModal(false)}
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Important Notice</p>
                    <p className="text-xs text-muted-foreground">Disputes are reviewed manually and may take 3-5 business days.</p>
                  </div>
                </div>
              </div>

              <Input
                label="Reason for Dispute"
                type="text"
                placeholder="Please explain why you believe this verification is incorrect"
                value={disputeReason}
                onChange={(e) => setDisputeReason(e?.target?.value)}
                description="Provide specific details about the discrepancy"
              />

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDisputeModal(false)}
                  fullWidth
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  loading={isSubmittingDispute}
                  onClick={handleSubmitDispute}
                  disabled={!disputeReason}
                  fullWidth
                >
                  {isSubmittingDispute ? 'Submitting...' : 'Submit Dispute'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionPanel;