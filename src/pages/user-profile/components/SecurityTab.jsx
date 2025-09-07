import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SecurityTab = () => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [showMfaSetup, setShowMfaSetup] = useState(false);

  const activeSessions = [
    {
      id: 1,
      device: "MacBook Pro",
      browser: "Chrome 119.0",
      location: "San Francisco, CA",
      lastActive: "2 minutes ago",
      current: true,
      ip: "192.168.1.100"
    },
    {
      id: 2,
      device: "iPhone 15",
      browser: "Safari Mobile",
      location: "San Francisco, CA",
      lastActive: "1 hour ago",
      current: false,
      ip: "192.168.1.101"
    },
    {
      id: 3,
      device: "Windows PC",
      browser: "Edge 119.0",
      location: "Los Angeles, CA",
      lastActive: "3 days ago",
      current: false,
      ip: "10.0.0.50"
    }
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
    if (passwordErrors?.[field]) {
      setPasswordErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev?.[field]
    }));
  };

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordForm?.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm?.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordForm?.newPassword?.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!passwordForm?.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handlePasswordUpdate = () => {
    if (validatePasswordForm()) {
      // Mock password update
      console.log('Password updated successfully');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  const handleSessionLogout = (sessionId) => {
    console.log(`Logging out session: ${sessionId}`);
  };

  const handleMfaToggle = () => {
    if (mfaEnabled) {
      setMfaEnabled(false);
    } else {
      setShowMfaSetup(true);
    }
  };

  const handleMfaSetup = () => {
    setMfaEnabled(true);
    setShowMfaSetup(false);
  };

  return (
    <div className="space-y-8">
      {/* Password Change Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
          <p className="text-sm text-muted-foreground">Update your password to keep your account secure</p>
        </div>

        <div className="space-y-4 max-w-md">
          <div className="relative">
            <Input
              label="Current Password"
              type={showPasswords?.current ? "text" : "password"}
              value={passwordForm?.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
              error={passwordErrors?.currentPassword}
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showPasswords?.current ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>

          <div className="relative">
            <Input
              label="New Password"
              type={showPasswords?.new ? "text" : "password"}
              value={passwordForm?.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
              error={passwordErrors?.newPassword}
              description="Must be at least 8 characters long"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showPasswords?.new ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>

          <div className="relative">
            <Input
              label="Confirm New Password"
              type={showPasswords?.confirm ? "text" : "password"}
              value={passwordForm?.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
              error={passwordErrors?.confirmPassword}
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showPasswords?.confirm ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>

          <Button
            variant="default"
            onClick={handlePasswordUpdate}
            iconName="Lock"
            iconPosition="left"
          >
            Update Password
          </Button>
        </div>
      </div>
      {/* Two-Factor Authentication */}
      <div className="space-y-4 border-t border-border pt-8">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
          <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${mfaEnabled ? 'bg-success' : 'bg-muted'}`}>
              <Icon name="Shield" size={20} color={mfaEnabled ? "white" : "currentColor"} />
            </div>
            <div>
              <div className="font-medium text-foreground">
                Two-Factor Authentication {mfaEnabled ? 'Enabled' : 'Disabled'}
              </div>
              <div className="text-sm text-muted-foreground">
                {mfaEnabled ? 'Your account is protected with 2FA' : 'Enable 2FA for better security'}
              </div>
            </div>
          </div>
          <Button
            variant={mfaEnabled ? "outline" : "default"}
            onClick={handleMfaToggle}
          >
            {mfaEnabled ? 'Disable' : 'Enable'}
          </Button>
        </div>

        {showMfaSetup && (
          <div className="p-4 bg-card border border-border rounded-lg space-y-4">
            <h4 className="font-medium text-foreground">Setup Two-Factor Authentication</h4>
            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-muted mx-auto rounded-lg flex items-center justify-center">
                <Icon name="QrCode" size={48} className="text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Scan this QR code with your authenticator app
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setShowMfaSetup(false)}>
                  Cancel
                </Button>
                <Button variant="default" onClick={handleMfaSetup}>
                  Complete Setup
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Active Sessions */}
      <div className="space-y-4 border-t border-border pt-8">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Active Sessions</h3>
          <p className="text-sm text-muted-foreground">Manage your active login sessions across devices</p>
        </div>

        <div className="space-y-3">
          {activeSessions?.map((session) => (
            <div key={session?.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Icon 
                    name={session?.device?.includes('iPhone') ? "Smartphone" : session?.device?.includes('MacBook') ? "Laptop" : "Monitor"} 
                    size={20} 
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{session?.device}</span>
                    {session?.current && (
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {session?.browser} • {session?.location}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last active: {session?.lastActive} • IP: {session?.ip}
                  </div>
                </div>
              </div>
              {!session?.current && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSessionLogout(session?.id)}
                  iconName="LogOut"
                >
                  Sign Out
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button variant="destructive" iconName="LogOut" iconPosition="left">
          Sign Out All Other Sessions
        </Button>
      </div>
    </div>
  );
};

export default SecurityTab;