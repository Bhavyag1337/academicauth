import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

import VerificationQueue from './components/VerificationQueue';
import DocumentManager from './components/DocumentManager';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import InstitutionProfile from './components/InstitutionProfile';
import APIIntegration from './components/APIIntegration';

const InstitutionPortal = () => {
  const [activeTab, setActiveTab] = useState('queue');

  // Mock data for verification requests
  const [verificationRequests, setVerificationRequests] = useState([
    {
      id: 'VR001',
      studentName: 'Sarah Johnson',
      studentId: 'SJ2024001',
      documentName: 'Bachelor of Science Transcript',
      documentType: 'transcript',
      submittedAt: '2024-09-06T10:30:00Z',
      priority: 'high',
      status: 'pending'
    },
    {
      id: 'VR002',
      studentName: 'Michael Chen',
      studentId: 'MC2024002',
      documentName: 'Master of Engineering Degree',
      documentType: 'degree',
      submittedAt: '2024-09-06T09:15:00Z',
      priority: 'medium',
      status: 'in-review'
    },
    {
      id: 'VR003',
      studentName: 'Emily Rodriguez',
      studentId: 'ER2024003',
      documentName: 'Computer Science Certificate',
      documentType: 'certificate',
      submittedAt: '2024-09-05T16:45:00Z',
      priority: 'low',
      status: 'approved'
    },
    {
      id: 'VR004',
      studentName: 'David Thompson',
      studentId: 'DT2024004',
      documentName: 'MBA Diploma',
      documentType: 'diploma',
      submittedAt: '2024-09-05T14:20:00Z',
      priority: 'high',
      status: 'rejected'
    },
    {
      id: 'VR005',
      studentName: 'Lisa Wang',
      studentId: 'LW2024005',
      documentName: 'Physics PhD Transcript',
      documentType: 'transcript',
      submittedAt: '2024-09-05T11:30:00Z',
      priority: 'medium',
      status: 'pending'
    }
  ]);

  // Mock data for documents
  const [documents, setDocuments] = useState([
    {
      id: 'DOC001',
      name: 'Fall_2024_Transcripts_Batch.pdf',
      type: 'transcript',
      size: 15728640,
      uploadedAt: '2024-09-01T08:00:00Z',
      status: 'active',
      batchName: 'Fall 2024 Transcripts'
    },
    {
      id: 'DOC002',
      name: 'Degree_Certificates_2024.pdf',
      type: 'degree',
      size: 8912345,
      uploadedAt: '2024-08-28T14:30:00Z',
      status: 'active',
      batchName: 'Spring 2024 Degrees'
    },
    {
      id: 'DOC003',
      name: 'Official_Seal_Template.png',
      type: 'seal',
      size: 2048576,
      uploadedAt: '2024-08-25T10:15:00Z',
      status: 'active',
      batchName: 'Institution Assets'
    }
  ]);

  // Mock data for institution profile
  const [institutionProfile, setInstitutionProfile] = useState({
    name: 'Stanford University',
    type: 'university',
    establishedYear: 1885,
    accreditation: 'regional',
    website: 'https://stanford.edu',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=400&fit=crop&crop=center',
    email: 'registrar@stanford.edu',
    phone: '+1 (650) 723-2300',
    registrarEmail: 'records@stanford.edu',
    address: {
      street: '450 Serra Mall',
      city: 'Stanford',
      state: 'CA',
      zipCode: '94305'
    },
    settings: {
      autoApprove: true,
      emailNotifications: true,
      processingDays: 3,
      apiKey: '••••••••••••••••'
    },
    stats: {
      totalStudents: 17249,
      documentsIssued: 45678,
      verificationsCompleted: 12456,
      successRate: 94.2
    }
  });

  // Mock analytics data
  const analyticsData = {
    totalVerifications: 1247,
    avgProcessingTime: 1.9,
    successRate: 94.2,
    pendingRequests: 23
  };

  // Mock integrations data
  const [integrations, setIntegrations] = useState([
    {
      id: 'clearinghouse',
      name: 'National Student Clearinghouse',
      status: 'connected',
      lastSync: '2024-09-07T06:00:00Z'
    },
    {
      id: 'parchment',
      name: 'Parchment Exchange',
      status: 'available',
      lastSync: null
    }
  ]);

  const tabs = [
    { id: 'queue', label: 'Verification Queue', icon: 'List', count: verificationRequests?.filter(r => r?.status === 'pending')?.length },
    { id: 'documents', label: 'Document Manager', icon: 'FolderOpen', count: documents?.length },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3', count: null },
    { id: 'profile', label: 'Institution Profile', icon: 'Building2', count: null },
    { id: 'integrations', label: 'API Integration', icon: 'Zap', count: integrations?.filter(i => i?.status === 'connected')?.length }
  ];

  const handleUpdateRequest = (requestId, updates) => {
    setVerificationRequests(prev =>
      prev?.map(request =>
        request?.id === requestId
          ? { ...request, ...updates }
          : request
      )
    );
  };

  const handleUploadDocument = (document) => {
    setDocuments(prev => [...prev, document]);
  };

  const handleDeleteDocument = (documentId) => {
    setDocuments(prev => prev?.filter(doc => doc?.id !== documentId));
  };

  const handleUpdateProfile = (updatedProfile) => {
    setInstitutionProfile(updatedProfile);
  };

  const handleUpdateIntegration = (integrationId, config) => {
    setIntegrations(prev =>
      prev?.map(integration =>
        integration?.id === integrationId
          ? { ...integration, ...config, status: 'connected' }
          : integration
      )
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'queue':
        return (
          <VerificationQueue
            requests={verificationRequests}
            onUpdateRequest={handleUpdateRequest}
          />
        );
      case 'documents':
        return (
          <DocumentManager
            documents={documents}
            onUploadDocument={handleUploadDocument}
            onDeleteDocument={handleDeleteDocument}
          />
        );
      case 'analytics':
        return (
          <AnalyticsDashboard
            analytics={analyticsData}
          />
        );
      case 'profile':
        return (
          <InstitutionProfile
            profile={institutionProfile}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'integrations':
        return (
          <APIIntegration
            integrations={integrations}
            onUpdateIntegration={handleUpdateIntegration}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Building2" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Institution Portal</h1>
                <p className="text-muted-foreground">Manage verification requests and institutional records</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={16} className="text-warning" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-foreground">
                      {verificationRequests?.filter(r => r?.status === 'pending')?.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Eye" size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-foreground">
                      {verificationRequests?.filter(r => r?.status === 'in-review')?.length}
                    </div>
                    <div className="text-sm text-muted-foreground">In Review</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-foreground">
                      {verificationRequests?.filter(r => r?.status === 'approved')?.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Approved</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-error/10 rounded-lg flex items-center justify-center">
                    <Icon name="XCircle" size={16} className="text-error" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-foreground">
                      {verificationRequests?.filter(r => r?.status === 'rejected')?.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Rejected</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-card rounded-lg border border-border shadow-subtle mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                    {tab?.count !== null && tab?.count > 0 && (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {tab?.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionPortal;