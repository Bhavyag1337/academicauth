import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FileUploadArea from './components/FileUploadArea';
import CameraCapture from './components/CameraCapture';
import QRCodeScanner from './components/QRCodeScanner';
import OCRTextExtraction from './components/OCRTextExtraction';
import UploadProgress from './components/UploadProgress';

const DocumentUpload = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [validationProgress, setValidationProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [extractedData, setExtractedData] = useState(null);
  const [qrData, setQrData] = useState(null);

  const tabs = [
    { id: 'upload', label: 'File Upload', icon: 'Upload', description: 'Upload PDF, JPG, or PNG files' },
    { id: 'camera', label: 'Camera', icon: 'Camera', description: 'Take photo of document' },
    { id: 'qr', label: 'QR Scanner', icon: 'QrCode', description: 'Scan QR code for instant verification' }
  ];

  const processingSteps = ['upload', 'ocr', 'validate'];

  // Handle file selection from upload or camera
  const handleFileSelect = (files) => {
    if (files && files?.length > 0) {
      setUploadedFiles(files);
      startProcessing();
    }
  };

  // Handle QR code detection
  const handleQRDetected = (data) => {
    setQrData(data);
    // For QR codes, we can skip file processing and go directly to verification
    setIsComplete(true);
  };

  // Handle OCR text extraction completion
  const handleTextExtracted = (data) => {
    setExtractedData(data);
    continueValidation();
  };

  // Start the processing workflow
  const startProcessing = async () => {
    setIsProcessing(true);
    setHasError(false);
    setCurrentStep('upload');

    try {
      // Simulate file upload
      await simulateUpload();
      
      // Move to OCR step
      setCurrentStep('ocr');
      await simulateOCR();
      
      // OCR component will handle the actual extraction
      // Validation will be triggered after OCR completion
    } catch (error) {
      setHasError(true);
      setErrorMessage(error?.message);
      setIsProcessing(false);
    }
  };

  // Continue with validation after OCR
  const continueValidation = async () => {
    setCurrentStep('validate');
    
    try {
      await simulateValidation();
      setIsComplete(true);
      setIsProcessing(false);
    } catch (error) {
      setHasError(true);
      setErrorMessage(error?.message);
      setIsProcessing(false);
    }
  };

  // Simulate upload progress
  const simulateUpload = () => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 200);
    });
  };

  // Simulate OCR progress
  const simulateOCR = () => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 15;
        setOcrProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 300);
    });
  };

  // Simulate validation progress
  const simulateValidation = () => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setValidationProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 250);
    });
  };

  // Handle retry
  const handleRetry = () => {
    setUploadedFiles([]);
    setUploadProgress(0);
    setOcrProgress(0);
    setValidationProgress(0);
    setCurrentStep('upload');
    setIsProcessing(false);
    setIsComplete(false);
    setHasError(false);
    setErrorMessage('');
    setExtractedData(null);
    setQrData(null);
    setActiveTab('upload');
  };

  // Handle proceed to verification
  const handleProceedToVerification = () => {
    navigate('/verification-results');
  };

  // Check if mobile device for camera optimization
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i?.test(navigator.userAgent);

  useEffect(() => {
    // Set camera as default tab on mobile devices
    if (isMobile && activeTab === 'upload') {
      setActiveTab('camera');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Upload Academic Document
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Submit your academic credentials for verification. Choose from file upload, camera capture, 
              or QR code scanning for quick processing.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Upload Methods Tabs */}
            {!isProcessing && !isComplete && (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Tab Navigation */}
                <div className="border-b border-border">
                  <nav className="flex">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                          activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Icon name={tab?.icon} size={18} />
                          <span className="hidden sm:inline">{tab?.label}</span>
                        </div>
                        <div className="text-xs mt-1 hidden md:block">
                          {tab?.description}
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'upload' && (
                    <FileUploadArea
                      onFileSelect={handleFileSelect}
                      uploadProgress={uploadProgress}
                      isUploading={isProcessing && currentStep === 'upload'}
                    />
                  )}

                  {activeTab === 'camera' && (
                    <CameraCapture
                      onCapture={handleFileSelect}
                      isProcessing={isProcessing}
                    />
                  )}

                  {activeTab === 'qr' && (
                    <QRCodeScanner
                      onQRDetected={handleQRDetected}
                      isProcessing={isProcessing}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Processing Progress */}
            {isProcessing && (
              <div className="bg-card border border-border rounded-lg p-6">
                <UploadProgress
                  currentStep={currentStep}
                  steps={processingSteps}
                  uploadProgress={uploadProgress}
                  ocrProgress={ocrProgress}
                  validationProgress={validationProgress}
                  isComplete={isComplete}
                  hasError={hasError}
                  errorMessage={errorMessage}
                />
              </div>
            )}

            {/* OCR Text Extraction */}
            {currentStep === 'ocr' && uploadedFiles?.length > 0 && !hasError && (
              <div className="bg-card border border-border rounded-lg p-6">
                <OCRTextExtraction
                  uploadedFiles={uploadedFiles}
                  onTextExtracted={handleTextExtracted}
                  isProcessing={isProcessing}
                />
              </div>
            )}

            {/* Completion Actions */}
            {(isComplete || hasError) && (
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-center space-y-4">
                  {isComplete && (
                    <>
                      <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
                        <Icon name="CheckCircle" size={32} className="text-success" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Document Processed Successfully
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Your document has been uploaded and processed. You can now proceed to verification.
                        </p>
                      </div>
                    </>
                  )}

                  {hasError && (
                    <>
                      <div className="w-16 h-16 mx-auto bg-error/10 rounded-full flex items-center justify-center">
                        <Icon name="AlertCircle" size={32} className="text-error" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Processing Failed
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          There was an error processing your document. Please try again.
                        </p>
                      </div>
                    </>
                  )}

                  <div className="flex justify-center space-x-4">
                    {hasError && (
                      <Button variant="outline" onClick={handleRetry}>
                        <Icon name="RotateCcw" size={16} className="mr-2" />
                        Try Again
                      </Button>
                    )}
                    
                    {isComplete && (
                      <>
                        <Button variant="outline" onClick={handleRetry}>
                          <Icon name="Plus" size={16} className="mr-2" />
                          Upload Another
                        </Button>
                        <Button onClick={handleProceedToVerification}>
                          <Icon name="ArrowRight" size={16} className="mr-2" />
                          Proceed to Verification
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Help Section */}
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start space-x-3">
                  <Icon name="FileText" size={16} className="text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Supported Formats</h4>
                    <p className="text-muted-foreground">PDF, JPG, PNG files up to 10MB</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Shield" size={16} className="text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Secure Processing</h4>
                    <p className="text-muted-foreground">All documents are encrypted and secure</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="Clock" size={16} className="text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Processing Time</h4>
                    <p className="text-muted-foreground">Typically 2-5 minutes per document</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentUpload;