import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import PersonalInfoTab from './components/PersonalInfoTab';
import SecurityTab from './components/SecurityTab';
import NotificationTab from './components/NotificationTab';
import PrivacyTab from './components/PrivacyTab';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: 'User',
      component: PersonalInfoTab
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      component: SecurityTab
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      component: NotificationTab
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: 'Lock',
      component: PrivacyTab
    }
  ];

  const ActiveComponent = tabs?.find(tab => tab?.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="User" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">User Profile</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
                <nav className="space-y-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-smooth ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon 
                        name={tab?.icon} 
                        size={18} 
                        color={activeTab === tab?.id ? 'white' : 'currentColor'} 
                      />
                      <span className="font-medium">{tab?.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-3">Account Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Verification Level</span>
                      <span className="text-success font-medium">Verified</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">2FA Status</span>
                      <span className="text-success font-medium">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Member Since</span>
                      <span className="text-foreground">Jan 2024</span>
                    </div>
                  </div>
                </div>

                {/* Help Section */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-3">Need Help?</h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth">
                      <Icon name="HelpCircle" size={16} />
                      <span>Support Center</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth">
                      <Icon name="MessageCircle" size={16} />
                      <span>Contact Support</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth">
                      <Icon name="FileText" size={16} />
                      <span>Documentation</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-lg p-6">
                {ActiveComponent && <ActiveComponent />}
              </div>
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
            <div className="flex justify-around">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-smooth ${
                    activeTab === tab?.id
                      ? 'text-primary' :'text-muted-foreground'
                  }`}
                >
                  <Icon 
                    name={tab?.icon} 
                    size={20} 
                    color={activeTab === tab?.id ? 'var(--color-primary)' : 'currentColor'} 
                  />
                  <span className="text-xs font-medium">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;