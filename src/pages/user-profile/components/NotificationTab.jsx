import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationTab = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    verificationComplete: true,
    verificationFailed: true,
    documentExpiring: true,
    securityAlerts: true,
    weeklyDigest: false,
    promotionalEmails: false
  });

  const [pushNotifications, setPushNotifications] = useState({
    verificationUpdates: true,
    securityAlerts: true,
    documentReminders: true,
    systemMaintenance: false
  });

  const [smsNotifications, setSmsNotifications] = useState({
    criticalAlerts: true,
    verificationComplete: false,
    securityAlerts: true
  });

  const [frequency, setFrequency] = useState('immediate');

  const handleEmailChange = (key, checked) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handlePushChange = (key, checked) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleSmsChange = (key, checked) => {
    setSmsNotifications(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleSavePreferences = () => {
    console.log('Notification preferences saved');
  };

  const notificationHistory = [
    {
      id: 1,
      type: 'success',
      title: 'Document Verification Complete',
      message: 'Your Stanford University transcript has been successfully verified.',
      timestamp: '2 hours ago',
      read: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'Document Expiring Soon',
      message: 'Your student ID verification will expire in 30 days.',
      timestamp: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Security Alert',
      message: 'New login detected from Windows PC in Los Angeles, CA.',
      timestamp: '3 days ago',
      read: true
    },
    {
      id: 4,
      type: 'error',
      title: 'Verification Failed',
      message: 'Unable to verify diploma due to image quality issues.',
      timestamp: '1 week ago',
      read: true
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'warning':
        return { name: 'AlertTriangle', color: 'text-warning' };
      case 'error':
        return { name: 'XCircle', color: 'text-error' };
      default:
        return { name: 'Info', color: 'text-primary' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Email Notifications */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Email Notifications</h3>
          <p className="text-sm text-muted-foreground">Choose what email notifications you'd like to receive</p>
        </div>

        <div className="space-y-3">
          <Checkbox
            label="Verification Complete"
            description="Get notified when document verification is completed"
            checked={emailNotifications?.verificationComplete}
            onChange={(e) => handleEmailChange('verificationComplete', e?.target?.checked)}
          />
          <Checkbox
            label="Verification Failed"
            description="Receive alerts when document verification fails"
            checked={emailNotifications?.verificationFailed}
            onChange={(e) => handleEmailChange('verificationFailed', e?.target?.checked)}
          />
          <Checkbox
            label="Document Expiring"
            description="Reminders when your verified documents are about to expire"
            checked={emailNotifications?.documentExpiring}
            onChange={(e) => handleEmailChange('documentExpiring', e?.target?.checked)}
          />
          <Checkbox
            label="Security Alerts"
            description="Important security notifications and login alerts"
            checked={emailNotifications?.securityAlerts}
            onChange={(e) => handleEmailChange('securityAlerts', e?.target?.checked)}
          />
          <Checkbox
            label="Weekly Digest"
            description="Summary of your account activity and verification status"
            checked={emailNotifications?.weeklyDigest}
            onChange={(e) => handleEmailChange('weeklyDigest', e?.target?.checked)}
          />
          <Checkbox
            label="Promotional Emails"
            description="Updates about new features and special offers"
            checked={emailNotifications?.promotionalEmails}
            onChange={(e) => handleEmailChange('promotionalEmails', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Push Notifications */}
      <div className="space-y-4 border-t border-border pt-8">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Push Notifications</h3>
          <p className="text-sm text-muted-foreground">Manage browser and mobile app notifications</p>
        </div>

        <div className="space-y-3">
          <Checkbox
            label="Verification Updates"
            description="Real-time updates on verification progress"
            checked={pushNotifications?.verificationUpdates}
            onChange={(e) => handlePushChange('verificationUpdates', e?.target?.checked)}
          />
          <Checkbox
            label="Security Alerts"
            description="Immediate alerts for security-related events"
            checked={pushNotifications?.securityAlerts}
            onChange={(e) => handlePushChange('securityAlerts', e?.target?.checked)}
          />
          <Checkbox
            label="Document Reminders"
            description="Reminders to upload or update documents"
            checked={pushNotifications?.documentReminders}
            onChange={(e) => handlePushChange('documentReminders', e?.target?.checked)}
          />
          <Checkbox
            label="System Maintenance"
            description="Notifications about scheduled maintenance and updates"
            checked={pushNotifications?.systemMaintenance}
            onChange={(e) => handlePushChange('systemMaintenance', e?.target?.checked)}
          />
        </div>
      </div>
      {/* SMS Notifications */}
      <div className="space-y-4 border-t border-border pt-8">
        <div>
          <h3 className="text-lg font-semibold text-foreground">SMS Notifications</h3>
          <p className="text-sm text-muted-foreground">Text message alerts for critical updates</p>
        </div>

        <div className="space-y-3">
          <Checkbox
            label="Critical Alerts"
            description="Emergency security alerts and account issues"
            checked={smsNotifications?.criticalAlerts}
            onChange={(e) => handleSmsChange('criticalAlerts', e?.target?.checked)}
          />
          <Checkbox
            label="Verification Complete"
            description="SMS confirmation when verification is completed"
            checked={smsNotifications?.verificationComplete}
            onChange={(e) => handleSmsChange('verificationComplete', e?.target?.checked)}
          />
          <Checkbox
            label="Security Alerts"
            description="Text alerts for suspicious account activity"
            checked={smsNotifications?.securityAlerts}
            onChange={(e) => handleSmsChange('securityAlerts', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Notification Frequency */}
      <div className="space-y-4 border-t border-border pt-8">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Notification Frequency</h3>
          <p className="text-sm text-muted-foreground">Control how often you receive non-critical notifications</p>
        </div>

        <div className="space-y-2">
          {[
            { value: 'immediate', label: 'Immediate', description: 'Receive notifications as they happen' },
            { value: 'daily', label: 'Daily Digest', description: 'Once per day summary' },
            { value: 'weekly', label: 'Weekly Summary', description: 'Weekly compilation of updates' }
          ]?.map((option) => (
            <label key={option?.value} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 cursor-pointer">
              <input
                type="radio"
                name="frequency"
                value={option?.value}
                checked={frequency === option?.value}
                onChange={(e) => setFrequency(e?.target?.value)}
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
      {/* Recent Notifications */}
      <div className="space-y-4 border-t border-border pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Notifications</h3>
            <p className="text-sm text-muted-foreground">Your latest notification history</p>
          </div>
          <Button variant="outline" size="sm">
            Mark All as Read
          </Button>
        </div>

        <div className="space-y-3">
          {notificationHistory?.map((notification) => {
            const iconConfig = getNotificationIcon(notification?.type);
            return (
              <div
                key={notification?.id}
                className={`flex items-start space-x-3 p-4 rounded-lg border ${
                  notification?.read ? 'bg-card border-border' : 'bg-primary/5 border-primary/20'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  notification?.read ? 'bg-muted' : 'bg-primary/10'
                }`}>
                  <Icon name={iconConfig?.name} size={16} className={iconConfig?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium ${notification?.read ? 'text-foreground' : 'text-primary'}`}>
                      {notification?.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">{notification?.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification?.message}</p>
                </div>
                {!notification?.read && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-border">
        <Button
          variant="default"
          onClick={handleSavePreferences}
          iconName="Save"
          iconPosition="left"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default NotificationTab;