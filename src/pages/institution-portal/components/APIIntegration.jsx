import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const APIIntegration = ({ integrations, onUpdateIntegration }) => {
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [configForm, setConfigForm] = useState({});

  const integrationTypes = [
    {
      id: 'clearinghouse',
      name: 'National Student Clearinghouse',
      description: 'Connect with NSC for automated degree verification',
      status: 'connected',
      icon: 'Database',
      color: 'text-success'
    },
    {
      id: 'parchment',
      name: 'Parchment Exchange',
      description: 'Digital credential exchange platform',
      status: 'available',
      icon: 'Share2',
      color: 'text-muted-foreground'
    },
    {
      id: 'credly',
      name: 'Credly Badges',
      description: 'Digital badge and micro-credential platform',
      status: 'available',
      icon: 'Award',
      color: 'text-muted-foreground'
    },
    {
      id: 'blockchain',
      name: 'Blockchain Verification',
      description: 'Immutable credential verification on blockchain',
      status: 'beta',
      icon: 'Shield',
      color: 'text-warning'
    }
  ];

  const webhookEvents = [
    { value: 'verification.completed', label: 'Verification Completed' },
    { value: 'verification.failed', label: 'Verification Failed' },
    { value: 'document.uploaded', label: 'Document Uploaded' },
    { value: 'batch.processed', label: 'Batch Processed' }
  ];

  const handleConfigure = (integration) => {
    setSelectedIntegration(integration);
    setConfigForm({
      apiKey: '',
      secretKey: '',
      webhookUrl: '',
      events: [],
      enabled: false
    });
    setIsConfiguring(true);
  };

  const handleSaveConfiguration = () => {
    onUpdateIntegration(selectedIntegration?.id, configForm);
    setIsConfiguring(false);
    setSelectedIntegration(null);
  };

  const handleTestConnection = (integrationId) => {
    // Mock test connection
    console.log(`Testing connection for ${integrationId}...`);
  };

  const getStatusBadge = (status) => {
    const badges = {
      connected: { label: 'Connected', color: 'bg-success/10 text-success border-success/20' },
      available: { label: 'Available', color: 'bg-muted text-muted-foreground border-border' },
      beta: { label: 'Beta', color: 'bg-warning/10 text-warning border-warning/20' },
      error: { label: 'Error', color: 'bg-error/10 text-error border-error/20' }
    };
    
    const badge = badges?.[status] || badges?.available;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${badge?.color}`}>
        {badge?.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">API Integration</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Connect with external verification services and configure webhooks
            </p>
          </div>
          
          <Button
            variant="outline"
            iconName="RefreshCw"
            onClick={() => window.location?.reload()}
          >
            Refresh Status
          </Button>
        </div>
      </div>
      {/* Integration Services */}
      <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Available Integrations</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {integrationTypes?.map((integration) => (
            <div key={integration?.id} className="border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name={integration?.icon} size={24} className={integration?.color} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{integration?.name}</h4>
                    <p className="text-sm text-muted-foreground">{integration?.description}</p>
                  </div>
                </div>
                {getStatusBadge(integration?.status)}
              </div>
              
              <div className="flex space-x-3">
                {integration?.status === 'connected' ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Settings"
                      onClick={() => handleConfigure(integration)}
                    >
                      Configure
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Zap"
                      onClick={() => handleTestConnection(integration?.id)}
                    >
                      Test
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Plus"
                    onClick={() => handleConfigure(integration)}
                  >
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* API Documentation */}
      <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">API Documentation</h3>
        
        <div className="space-y-6">
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Base URL</h4>
            <code className="text-sm bg-background px-3 py-1 rounded border">
              https://api.academicauth.edu/v1
            </code>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Authentication</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-muted/30 rounded p-3">
                  <div className="font-medium text-foreground">API Key Header</div>
                  <code className="text-muted-foreground">X-API-Key: your_api_key</code>
                </div>
                <div className="bg-muted/30 rounded p-3">
                  <div className="font-medium text-foreground">Authorization</div>
                  <code className="text-muted-foreground">Bearer your_jwt_token</code>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-3">Common Endpoints</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                  <span className="font-mono">GET /verifications</span>
                  <span className="text-muted-foreground">List verifications</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                  <span className="font-mono">POST /verify</span>
                  <span className="text-muted-foreground">Submit verification</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                  <span className="font-mono">GET /status/:id</span>
                  <span className="text-muted-foreground">Check status</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Webhook Configuration */}
      <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Webhook Configuration</h3>
        
        <div className="space-y-4">
          <Input
            label="Webhook URL"
            type="url"
            placeholder="https://your-domain.com/webhooks/academicauth"
            description="URL where webhook events will be sent"
          />
          
          <Select
            label="Events to Subscribe"
            options={webhookEvents}
            multiple
            placeholder="Select events to receive"
            description="Choose which events should trigger webhook calls"
          />
          
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <h4 className="font-medium text-foreground">Enable Webhooks</h4>
              <p className="text-sm text-muted-foreground">Receive real-time notifications for verification events</p>
            </div>
            <input
              type="checkbox"
              className="rounded border-border"
            />
          </div>
          
          <div className="flex space-x-3">
            <Button variant="default" iconName="Save">
              Save Webhook Config
            </Button>
            <Button variant="outline" iconName="Send">
              Test Webhook
            </Button>
          </div>
        </div>
      </div>
      {/* Configuration Modal */}
      {isConfiguring && selectedIntegration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border shadow-elevated max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Configure {selectedIntegration?.name}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setIsConfiguring(false)}
                />
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <Input
                label="API Key"
                type="password"
                value={configForm?.apiKey}
                onChange={(e) => setConfigForm({ ...configForm, apiKey: e?.target?.value })}
                placeholder="Enter your API key"
                required
              />
              
              <Input
                label="Secret Key"
                type="password"
                value={configForm?.secretKey}
                onChange={(e) => setConfigForm({ ...configForm, secretKey: e?.target?.value })}
                placeholder="Enter your secret key"
                required
              />
              
              <Input
                label="Webhook URL"
                type="url"
                value={configForm?.webhookUrl}
                onChange={(e) => setConfigForm({ ...configForm, webhookUrl: e?.target?.value })}
                placeholder="https://your-domain.com/webhook"
              />
              
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm font-medium text-foreground">Enable Integration</span>
                <input
                  type="checkbox"
                  checked={configForm?.enabled}
                  onChange={(e) => setConfigForm({ ...configForm, enabled: e?.target?.checked })}
                  className="rounded border-border"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-border flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsConfiguring(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleSaveConfiguration}
                className="flex-1"
              >
                Save Configuration
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default APIIntegration;