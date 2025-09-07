import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const InstitutionProfile = ({ profile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const institutionTypeOptions = [
    { value: 'university', label: 'University' },
    { value: 'college', label: 'College' },
    { value: 'community-college', label: 'Community College' },
    { value: 'technical-school', label: 'Technical School' },
    { value: 'vocational-school', label: 'Vocational School' }
  ];

  const accreditationOptions = [
    { value: 'regional', label: 'Regional Accreditation' },
    { value: 'national', label: 'National Accreditation' },
    { value: 'specialized', label: 'Specialized Accreditation' },
    { value: 'international', label: 'International Accreditation' }
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Institution Profile</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your institution's information and verification settings
            </p>
          </div>
          
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  iconName="Save"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                iconName="Edit"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Basic Information */}
      <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Basic Information</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden border border-border">
                <Image
                  src={formData?.logo}
                  alt={`${formData?.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <Button variant="outline" size="sm" iconName="Upload">
                  Change Logo
                </Button>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Institution Name"
                type="text"
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                disabled={!isEditing}
                required
              />
              <Select
                label="Institution Type"
                options={institutionTypeOptions}
                value={formData?.type}
                onChange={(value) => handleInputChange('type', value)}
                disabled={!isEditing}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Established Year"
                type="number"
                value={formData?.establishedYear}
                onChange={(e) => handleInputChange('establishedYear', e?.target?.value)}
                disabled={!isEditing}
              />
              <Select
                label="Accreditation Type"
                options={accreditationOptions}
                value={formData?.accreditation}
                onChange={(value) => handleInputChange('accreditation', value)}
                disabled={!isEditing}
              />
            </div>
            
            <Input
              label="Website"
              type="url"
              value={formData?.website}
              onChange={(e) => handleInputChange('website', e?.target?.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Primary Email"
              type="email"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              disabled={!isEditing}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              disabled={!isEditing}
            />
            <Input
              label="Registrar Email"
              type="email"
              value={formData?.registrarEmail}
              onChange={(e) => handleInputChange('registrarEmail', e?.target?.value)}
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-4">
            <Input
              label="Street Address"
              type="text"
              value={formData?.address?.street}
              onChange={(e) => handleInputChange('address', { ...formData?.address, street: e?.target?.value })}
              disabled={!isEditing}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                type="text"
                value={formData?.address?.city}
                onChange={(e) => handleInputChange('address', { ...formData?.address, city: e?.target?.value })}
                disabled={!isEditing}
              />
              <Input
                label="State"
                type="text"
                value={formData?.address?.state}
                onChange={(e) => handleInputChange('address', { ...formData?.address, state: e?.target?.value })}
                disabled={!isEditing}
              />
            </div>
            <Input
              label="ZIP Code"
              type="text"
              value={formData?.address?.zipCode}
              onChange={(e) => handleInputChange('address', { ...formData?.address, zipCode: e?.target?.value })}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
      {/* Verification Settings */}
      <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Verification Settings</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">Auto-approve verified documents</h4>
                  <p className="text-sm text-muted-foreground">Automatically approve documents that pass initial verification</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData?.settings?.autoApprove}
                  onChange={(e) => handleInputChange('settings', { ...formData?.settings, autoApprove: e?.target?.checked })}
                  disabled={!isEditing}
                  className="rounded border-border"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-medium text-foreground">Email notifications</h4>
                  <p className="text-sm text-muted-foreground">Send email updates for verification status changes</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData?.settings?.emailNotifications}
                  onChange={(e) => handleInputChange('settings', { ...formData?.settings, emailNotifications: e?.target?.checked })}
                  disabled={!isEditing}
                  className="rounded border-border"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Processing SLA (days)"
                type="number"
                value={formData?.settings?.processingDays}
                onChange={(e) => handleInputChange('settings', { ...formData?.settings, processingDays: e?.target?.value })}
                disabled={!isEditing}
                description="Maximum days to process verification requests"
              />
              
              <Input
                label="API Key"
                type="password"
                value={formData?.settings?.apiKey}
                onChange={(e) => handleInputChange('settings', { ...formData?.settings, apiKey: e?.target?.value })}
                disabled={!isEditing}
                description="For external verification service integration"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Statistics */}
      <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Institution Statistics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Icon name="Users" size={32} className="text-primary mx-auto mb-2" />
            <div className="text-2xl font-semibold text-foreground">{formData?.stats?.totalStudents?.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Students</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Icon name="FileText" size={32} className="text-success mx-auto mb-2" />
            <div className="text-2xl font-semibold text-foreground">{formData?.stats?.documentsIssued?.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Documents Issued</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Icon name="CheckCircle" size={32} className="text-warning mx-auto mb-2" />
            <div className="text-2xl font-semibold text-foreground">{formData?.stats?.verificationsCompleted?.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Verifications</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Icon name="Award" size={32} className="text-error mx-auto mb-2" />
            <div className="text-2xl font-semibold text-foreground">{formData?.stats?.successRate}%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionProfile;