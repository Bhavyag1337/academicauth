import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import VerificationStatus from './components/VerificationStatus';
import DocumentPreview from './components/DocumentPreview';
import VerificationCertificate from './components/VerificationCertificate';
import AuditTrail from './components/AuditTrail';
import InstitutionalDetails from './components/InstitutionalDetails';
import ActionPanel from './components/ActionPanel';

const VerificationResults = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock verification data
  const verificationData = {
    documentId: "DOC-2024-001234",
    verificationId: "VER-2024-567890",
    status: "verified",
    confidenceScore: 96,
    documentType: "Bachelor's Degree Certificate",
    institution: "Stanford University",
    issueDate: "June 15, 2023",
    verificationDate: "January 7, 2025 at 10:30 AM",
    verificationMethod: "Automated Database Cross-Reference",
    verifierName: "AcademicAuth System",
    institutionalResponse: `The submitted document has been successfully verified against our official records. All details match our database entries for the specified graduate. The document authenticity is confirmed with high confidence.`
  };

  // Mock document data
  const documentData = {
    id: "DOC-2024-001234",
    type: "Bachelor's Degree Certificate",
    uploadDate: "2025-01-07T08:15:00Z",
    fileSize: "2.4 MB",
    format: "PDF"
  };

  // Mock audit trail data
  const auditTrailData = [
    {
      id: 1,
      type: "submission",
      title: "Document Submitted",
      description: "Bachelor's degree certificate uploaded for verification",
      timestamp: "2025-01-07T08:15:00Z",
      performer: "Sarah Johnson (Student)",
      details: {
        file_size: "2.4 MB",
        file_type: "PDF",
        upload_method: "Web Portal"
      }
    },
    {
      id: 2,
      type: "processing",
      title: "OCR Processing Started",
      description: "Optical Character Recognition initiated to extract text data",
      timestamp: "2025-01-07T08:16:30Z",
      performer: "AcademicAuth System",
      details: {
        ocr_engine: "Google Vision API",
        confidence_threshold: "85%",
        fields_extracted: "12"
      }
    },
    {
      id: 3,
      type: "processing",
      title: "Database Cross-Reference",
      description: "Extracted data cross-referenced with institutional database",
      timestamp: "2025-01-07T08:18:45Z",
      performer: "AcademicAuth System",
      details: {
        institution_api: "Stanford University Registrar",
        fields_matched: "11/12",
        match_confidence: "96%"
      }
    },
    {
      id: 4,
      type: "institutional_response",
      title: "Institution Confirmation",
      description: "Stanford University confirmed document authenticity",
      timestamp: "2025-01-07T10:22:15Z",
      performer: "Dr. Michael Chen (Registrar)",
      details: {
        response_time: "2h 3m",
        verification_method: "Digital Records Match",
        registrar_signature: "Verified"
      }
    },
    {
      id: 5,
      type: "verification_complete",
      title: "Verification Complete",
      description: "Document successfully verified with high confidence score",
      timestamp: "2025-01-07T10:30:00Z",
      performer: "AcademicAuth System",
      details: {
        final_score: "96%",
        status: "Verified",
        certificate_generated: "Yes"
      }
    }
  ];

  // Mock institutional details
  const institutionalData = {
    name: "Stanford University",
    type: "Private Research University",
    location: "Stanford, California, USA",
    accreditation: "WASC Senior College and University Commission",
    established: "1885",
    website: "https://www.stanford.edu",
    registrarName: "Dr. Michael Chen",
    contactEmail: "registrar@stanford.edu",
    contactPhone: "+1 (650) 723-2091",
    verificationMethod: "Real-time Database API",
    avgResponseTime: "2.5 hours",
    successRate: "98.7",
    profileUrl: "https://academicauth.com/institutions/stanford-university",
    verificationId: "VER-2024-567890"
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <span>Dashboard</span>
              <span>/</span>
              <span>Verification Results</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Verification Results</h1>
            <p className="text-muted-foreground mt-2">
              Detailed verification status and outcomes for your submitted academic credentials
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="xl:col-span-2 space-y-8">
              {/* Verification Status */}
              <VerificationStatus verification={verificationData} />

              {/* Document Preview */}
              <DocumentPreview document={documentData} />

              {/* Verification Certificate */}
              <VerificationCertificate verification={verificationData} />

              {/* Audit Trail */}
              <AuditTrail auditEvents={auditTrailData} />

              {/* Institutional Details */}
              <InstitutionalDetails institution={institutionalData} />
            </div>

            {/* Right Column - Action Panel */}
            <div className="xl:col-span-1">
              <div className="sticky top-24">
                <ActionPanel verification={verificationData} />
              </div>
            </div>
          </div>

          {/* Mobile Action Panel */}
          <div className="xl:hidden mt-8">
            <ActionPanel verification={verificationData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerificationResults;