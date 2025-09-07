import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerificationCertificate = ({ verification }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const handleDownloadCertificate = async () => {
    setIsGenerating(true);
    // Simulate certificate generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    
    // In a real app, this would trigger a PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `verification-certificate-${verification?.documentId}.pdf`;
    link?.click();
  };

  const handleShareVerification = () => {
    const shareUrl = `https://academicauth.com/verify/${verification?.verificationId}`;
    navigator.clipboard?.writeText(shareUrl);
    // Show toast notification in real app
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Verification Certificate</h3>
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
            <Icon name="Shield" size={12} className="inline mr-1" />
            Blockchain Secured
          </div>
        </div>
      </div>
      {/* Certificate Preview */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 mb-6 border border-primary/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Award" size={32} color="white" />
          </div>
          <h4 className="text-xl font-bold text-foreground mb-2">Certificate of Verification</h4>
          <p className="text-muted-foreground mb-4">This document certifies the authenticity of the academic credential</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left bg-card rounded-lg p-4 border border-border">
            <div>
              <p className="text-sm font-medium text-foreground">Student Name</p>
              <p className="text-sm text-muted-foreground mb-2">Sarah Johnson</p>
              
              <p className="text-sm font-medium text-foreground">Document Type</p>
              <p className="text-sm text-muted-foreground mb-2">{verification?.documentType}</p>
              
              <p className="text-sm font-medium text-foreground">Institution</p>
              <p className="text-sm text-muted-foreground">{verification?.institution}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Verification ID</p>
              <p className="text-sm text-muted-foreground mb-2">{verification?.verificationId}</p>
              
              <p className="text-sm font-medium text-foreground">Verified Date</p>
              <p className="text-sm text-muted-foreground mb-2">{verification?.verificationDate}</p>
              
              <p className="text-sm font-medium text-foreground">Confidence Score</p>
              <p className="text-sm text-muted-foreground">{verification?.confidenceScore}%</p>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setShowQRCode(!showQRCode)}
              className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth"
            >
              <Icon name="QrCode" size={16} />
              <span className="text-sm">{showQRCode ? 'Hide' : 'Show'} QR Code</span>
            </button>
          </div>

          {showQRCode && (
            <div className="mt-4 flex justify-center">
              <div className="w-32 h-32 bg-white border border-border rounded-lg flex items-center justify-center">
                <div className="w-24 h-24 bg-foreground rounded-sm flex items-center justify-center">
                  <Icon name="QrCode" size={48} color="white" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          variant="default"
          loading={isGenerating}
          iconName="Download"
          iconPosition="left"
          onClick={handleDownloadCertificate}
          fullWidth
        >
          {isGenerating ? 'Generating...' : 'Download Certificate'}
        </Button>
        
        <Button
          variant="outline"
          iconName="Share"
          iconPosition="left"
          onClick={handleShareVerification}
          fullWidth
        >
          Share Verification
        </Button>
      </div>
      {/* Certificate Details */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h5 className="text-sm font-medium text-foreground mb-3">Certificate Features</h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm text-muted-foreground">Blockchain secured</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="QrCode" size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">QR code verification</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={16} className="text-accent" />
            <span className="text-sm text-muted-foreground">PDF format</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="text-sm text-muted-foreground">Timestamped</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCertificate;