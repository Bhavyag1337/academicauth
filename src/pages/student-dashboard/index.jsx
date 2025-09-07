import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import QuickActionCard from './components/QuickActionCard';
import StatCard from './components/StatCard';
import VerificationTable from './components/VerificationTable';
import RecentActivity from './components/RecentActivity';
import ProgressIndicator from './components/ProgressIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for documents
  const mockDocuments = [
    {
      id: 1,
      documentName: "Bachelor's Degree Certificate",
      documentType: "Degree Certificate",
      institution: "Stanford University",
      submissionDate: "2025-01-05T10:30:00Z",
      status: "verified"
    },
    {
      id: 2,
      documentName: "Official Transcript",
      documentType: "Academic Transcript",
      institution: "Stanford University", 
      submissionDate: "2025-01-03T14:20:00Z",
      status: "processing"
    },
    {
      id: 3,
      documentName: "Master's Degree Certificate",
      documentType: "Degree Certificate",
      institution: "MIT",
      submissionDate: "2024-12-28T09:15:00Z",
      status: "pending"
    },
    {
      id: 4,
      documentName: "High School Diploma",
      documentType: "Diploma",
      institution: "Lincoln High School",
      submissionDate: "2024-12-20T16:45:00Z",
      status: "rejected"
    }
  ];

  // Mock data for recent activities
  const mockActivities = [
    {
      id: 1,
      type: "verification",
      message: "Bachelor's Degree Certificate has been successfully verified",
      timestamp: "2025-01-05T11:30:00Z"
    },
    {
      id: 2,
      type: "upload",
      message: "Official Transcript uploaded for verification",
      timestamp: "2025-01-03T14:20:00Z"
    },
    {
      id: 3,
      type: "rejection",
      message: "High School Diploma verification was rejected - missing signature",
      timestamp: "2024-12-21T10:15:00Z"
    },
    {
      id: 4,
      type: "download",
      message: "Downloaded verified certificate for Bachelor's Degree",
      timestamp: "2024-12-18T13:45:00Z"
    }
  ];

  // Mock data for verification progress
  const mockProgressSteps = [
    {
      id: 1,
      title: "Document Upload",
      description: "Upload your academic document",
      estimatedTime: null
    },
    {
      id: 2,
      title: "OCR Processing",
      description: "Extracting text from document",
      estimatedTime: "2-3 minutes"
    },
    {
      id: 3,
      title: "Institution Verification",
      description: "Validating with official records",
      estimatedTime: "5-10 minutes"
    },
    {
      id: 4,
      title: "Final Review",
      description: "Quality assurance check",
      estimatedTime: "1-2 minutes"
    },
    {
      id: 5,
      title: "Completed",
      description: "Verification certificate ready",
      estimatedTime: null
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Mock WebSocket connection for real-time updates
    const mockWebSocket = () => {
      const interval = setInterval(() => {
        const randomNotification = {
          id: Date.now(),
          message: "Document verification status updated",
          type: "info",
          timestamp: new Date()?.toISOString()
        };
        setNotifications(prev => [randomNotification, ...prev?.slice(0, 4)]);
      }, 30000); // Every 30 seconds

      return () => clearInterval(interval);
    };

    const cleanup = mockWebSocket();

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  const handleQuickAction = (action) => {
    switch (action) {
      case 'upload': navigate('/document-upload');
        break;
      case 'scan':
        // Mock QR code scanning
        alert('QR Code scanner will open camera for document verification');
        break;
      case 'camera':
        // Mock camera capture
        alert('Camera will open for document capture');
        break;
      default:
        break;
    }
  };

  const handleViewDetails = (documentId) => {
    navigate(`/verification-results?id=${documentId}`);
  };

  const handleDownload = (documentId) => {
    // Mock download functionality
    alert(`Downloading verification certificate for document ID: ${documentId}`);
  };

  const handleRetry = (documentId) => {
    // Mock retry functionality
    alert(`Retrying verification for document ID: ${documentId}`);
  };

  const getVerificationStats = () => {
    const total = mockDocuments?.length;
    const verified = mockDocuments?.filter(doc => doc?.status === 'verified')?.length;
    const pending = mockDocuments?.filter(doc => doc?.status === 'pending' || doc?.status === 'processing')?.length;
    const successRate = total > 0 ? Math.round((verified / total) * 100) : 0;

    return { total, verified, pending, successRate };
  };

  const stats = getVerificationStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Welcome back, Student!</h1>
                <p className="text-muted-foreground mt-2">
                  Manage your academic credential verifications and track their status.
                </p>
              </div>
              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/10 text-success rounded-full text-sm font-medium">
                  <Icon name="Shield" size={16} />
                  <span>Secure Platform</span>
                </div>
                {notifications?.length > 0 && (
                  <div className="relative">
                    <Button variant="ghost" size="sm" iconName="Bell" iconSize={20} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Documents"
              value={stats?.total}
              icon="FileText"
              color="primary"
              change=""
              changeType="neutral"
            />
            <StatCard
              title="Verified"
              value={stats?.verified}
              change="+2 this week"
              changeType="increase"
              icon="CheckCircle"
              color="success"
            />
            <StatCard
              title="Pending"
              value={stats?.pending}
              icon="Clock"
              color="warning"
              change=""
              changeType="neutral"
            />
            <StatCard
              title="Success Rate"
              value={`${stats?.successRate}%`}
              change="+5% from last month"
              changeType="increase"
              icon="TrendingUp"
              color="primary"
            />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <QuickActionCard
                title="Upload New Document"
                description="Upload academic certificates, transcripts, or diplomas for verification"
                icon="Upload"
                variant="primary"
                onClick={() => handleQuickAction('upload')}
              />
              <QuickActionCard
                title="Scan QR Code"
                description="Quickly verify documents by scanning their QR codes"
                icon="QrCode"
                variant="success"
                onClick={() => handleQuickAction('scan')}
              />
              <QuickActionCard
                title="Camera Capture"
                description="Take a photo of your document directly from your device"
                icon="Camera"
                variant="warning"
                onClick={() => handleQuickAction('camera')}
              />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Verification History Table */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Verification History</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/verification-results')}
                  iconName="ExternalLink"
                  iconSize={16}
                >
                  View All
                </Button>
              </div>
              <VerificationTable
                documents={mockDocuments}
                onViewDetails={handleViewDetails}
                onDownload={handleDownload}
                onRetry={handleRetry}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Current Verification Progress */}
              {stats?.pending > 0 && (
                <ProgressIndicator
                  currentStep={2}
                  totalSteps={5}
                  steps={mockProgressSteps}
                />
              )}

              {/* Recent Activity */}
              <RecentActivity activities={mockActivities} />
            </div>
          </div>

          {/* Mobile Floating Action Button */}
          <div className="fixed bottom-6 right-6 md:hidden">
            <Button
              variant="default"
              size="lg"
              onClick={() => handleQuickAction('upload')}
              iconName="Plus"
              iconSize={24}
              className="w-14 h-14 rounded-full shadow-elevated"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;