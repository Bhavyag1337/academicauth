import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InstitutionalDetails = ({ institution }) => {
  const handleContactInstitution = () => {
    window.open(`mailto:${institution?.contactEmail}?subject=Verification Inquiry - ${institution?.verificationId}`);
  };

  const handleViewInstitutionProfile = () => {
    window.open(institution?.profileUrl, '_blank');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Institutional Details</h3>
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
            <Icon name="CheckCircle" size={12} className="inline mr-1" />
            Verified Institution
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Institution Information */}
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Building2" size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-foreground">{institution?.name}</h4>
              <p className="text-sm text-muted-foreground">{institution?.type}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Icon name="MapPin" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{institution?.location}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h5 className="text-sm font-medium text-foreground mb-2">Accreditation</h5>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-accent" />
                <span className="text-sm text-muted-foreground">{institution?.accreditation}</span>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-foreground mb-2">Established</h5>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{institution?.established}</span>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-foreground mb-2">Website</h5>
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={16} className="text-muted-foreground" />
                <a 
                  href={institution?.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary/80 transition-smooth"
                >
                  {institution?.website}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Verification Info */}
        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <h5 className="text-sm font-medium text-foreground mb-3">Registrar Contact</h5>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{institution?.registrarName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{institution?.contactEmail}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{institution?.contactPhone}</span>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h5 className="text-sm font-medium text-foreground mb-3">Verification Method</h5>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Database" size={14} className="text-primary" />
                <span className="text-sm text-muted-foreground">{institution?.verificationMethod}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Response Time: {institution?.avgResponseTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={14} className="text-success" />
                <span className="text-sm text-muted-foreground">Success Rate: {institution?.successRate}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              iconName="Mail"
              iconPosition="left"
              onClick={handleContactInstitution}
              fullWidth
            >
              Contact Institution
            </Button>
            
            <Button
              variant="ghost"
              iconName="ExternalLink"
              iconPosition="left"
              onClick={handleViewInstitutionProfile}
              fullWidth
            >
              View Institution Profile
            </Button>
          </div>
        </div>
      </div>
      {/* Trust Indicators */}
      <div className="mt-6 pt-6 border-t border-border">
        <h5 className="text-sm font-medium text-foreground mb-3">Trust Indicators</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm text-muted-foreground">Verified Partner</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">Secure API</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={16} className="text-accent" />
            <span className="text-sm text-muted-foreground">Accredited</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm text-muted-foreground">ISO Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalDetails;