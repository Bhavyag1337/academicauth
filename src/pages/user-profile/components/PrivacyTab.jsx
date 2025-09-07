import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacyTab = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private',
    shareVerificationStatus: false,
    allowInstitutionContact: true,
    dataAnalytics: true,
    marketingCommunications: false,
    thirdPartySharing: false
  });

  const [dataRetention, setDataRetention] = useState('5-years');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const connectedApps = [
    {
      id: 1,
      name: 'LinkedIn Integration',
      description: 'Share verified credentials on your LinkedIn profile',
      connected: true,
      permissions: ['Read profile', 'Post updates'],
      lastUsed: '2 days ago'
    },
    {
      id: 2,
      name: 'JobBoard Connect',
      description: 'Automatically verify credentials for job applications',
      connected: false,
      permissions: ['Read credentials', 'Verify documents'],
      lastUsed: 'Never'
    },
    {
      id: 3,
      name: 'University Portal',
      description: 'Direct integration with your institution\'s systems',
      connected: true,
      permissions: ['Read academic records', 'Update status'],
      lastUsed: '1 week ago'
    }
  ];

  const handlePrivacyChange = (key, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAppDisconnect = (appId) => {
    console.log(`Disconnecting app: ${appId}`);
  };

  const handleDataExport = () => {
    console.log('Exporting user data...');
  };

  const handleAccountDeletion = () => {
    console.log('Account deletion requested');
    setShowDeleteConfirm(false);
  };

  return (
    <div className="space-y-8">
      {/* Profile Privacy */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Profile Privacy</h3>
          <p className="text-sm text-muted-foreground">Control who can see your profile and verification status</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Profile Visibility</label>
            <div className="mt-2 space-y-2">
              {[
                { value: 'public', label: 'Public', description: 'Anyone can view your basic profile information' },
                { value: 'institutions', label: 'Institutions Only', description: 'Only verified institutions can view your profile' },
                { value: 'private', label: 'Private', description: 'Only you can view your profile information' }
              ]?.map((option) => (
                <label key={option?.value} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 cursor-pointer">
                  <input
                    type="radio"
                    name="profileVisibility"
                    value={option?.value}
                    checked={privacySettings?.profileVisibility === option?.value}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e?.target?.value)}
                    className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <div>
                    <div className="font-medium text-foreground">{option?.label}</div>
                    <div className="text-sm text-muted-foreground">{option?.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <Checkbox
            label="Share Verification Status"
            description="Allow others to see the verification status of your documents"
            checked={privacySettings?.shareVerificationStatus}
            onChange={(e) => handlePrivacyChange('shareVerificationStatus', e?.target?.checked)}
          />

          <Checkbox
            label="Allow Institution Contact"
            description="Let your institution contact you about verification matters"
            checked={privacySettings?.allowInstitutionContact}
            onChange={(e) => handlePrivacyChange('allowInstitutionContact', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Data Usage */}
      <div className="space-y-4 border-t border-border pt-8">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Data Usage</h3>
          <p className="text-sm text-muted-foreground">Manage how your data is used to improve our services</p>
        </div>

        <div className="space-y-3">
          <Checkbox
            label="Analytics & Performance"
            description="Help us improve AcademicAuth by sharing anonymous usage data"
            checked={privacySettings?.dataAnalytics}
            onChange={(e) => handlePrivacyChange('dataAnalytics', e?.target?.checked)}
          />

          <Checkbox
            label="Marketing Communications"
            description="Receive personalized recommendations and feature updates"
            checked={privacySettings?.marketingCommunications}
            onChange={(e) => handlePrivacyChange('marketingCommunications', e?.target?.checked)}
          />

          <Checkbox
            label="Third-Party Data Sharing"
            description="Allow sharing anonymized data with research partners"
            checked={privacySettings?.thirdPartySharing}
            onChange={(e) => handlePrivacyChange('thirdPartySharing', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Connected Applications */}
      <div className="space-y-4 border-t border-border pt-8">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Connected Applications</h3>
          <p className="text-sm text-muted-foreground">Manage third-party applications that have access to your data</p>
        </div>

        <div className="space-y-4">
          {connectedApps?.map((app) => (
            <div key={app?.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{app?.name}</h4>
                    {app?.connected && (
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                        Connected
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{app?.description}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    Permissions: {app?.permissions?.join(', ')} • Last used: {app?.lastUsed}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {app?.connected ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Settings"
                    >
                      Manage
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleAppDisconnect(app?.id)}
                    >
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button variant="default" size="sm">
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Data Retention */}
      <div className="space-y-4 border-t border-border pt-8">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Data Retention</h3>
          <p className="text-sm text-muted-foreground">Choose how long we keep your data after account closure</p>
        </div>

        <div className="space-y-2">
          {[
            { value: '1-year', label: '1 Year', description: 'Data deleted after 1 year of inactivity' },
            { value: '3-years', label: '3 Years', description: 'Data retained for 3 years (recommended)' },
            { value: '5-years', label: '5 Years', description: 'Maximum retention period for verification history' },
            { value: 'indefinite', label: 'Indefinite', description: 'Keep data until manually deleted' }
          ]?.map((option) => (
            <label key={option?.value} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 cursor-pointer">
              <input
                type="radio"
                name="dataRetention"
                value={option?.value}
                checked={dataRetention === option?.value}
                onChange={(e) => setDataRetention(e?.target?.value)}
                className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
              />
              <div>
                <div className="font-medium text-foreground">{option?.label}</div>
                <div className="text-sm text-muted-foreground">{option?.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
      {/* Data Export & Deletion */}
      <div className="space-y-4 border-t border-border pt-8">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Data Rights</h3>
          <p className="text-sm text-muted-foreground">Export or delete your personal data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Download" size={20} className="text-primary" />
              <h4 className="font-medium text-foreground">Export Data</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Download a copy of all your personal data, including verification history and documents.
            </p>
            <Button
              variant="outline"
              onClick={handleDataExport}
              iconName="Download"
              iconPosition="left"
              fullWidth
            >
              Request Data Export
            </Button>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Trash2" size={20} className="text-error" />
              <h4 className="font-medium text-foreground">Delete Account</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
              iconName="Trash2"
              iconPosition="left"
              fullWidth
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Delete Account</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete your account? This will permanently remove all your data, 
              including verification history, documents, and profile information. This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleAccountDeletion}
                fullWidth
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-border">
        <Button
          variant="default"
          iconName="Save"
          iconPosition="left"
        >
          Save Privacy Settings
        </Button>
      </div>
    </div>
  );
};

export default PrivacyTab;