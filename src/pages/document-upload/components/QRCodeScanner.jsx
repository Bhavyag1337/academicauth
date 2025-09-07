import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRCodeScanner = ({ onQRDetected, isProcessing }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);

  // Mock QR code detection (in real app, use a QR code library like qr-scanner)
  const mockQRDetection = () => {
    // Simulate QR code detection after 3 seconds
    setTimeout(() => {
      if (isScanning) {
        const mockQRData = {
          type: 'academic_credential',
          institution: 'Stanford University',
          studentId: 'STU123456789',
          documentId: 'DOC-2024-001',
          issueDate: '2024-06-15',
          degree: 'Bachelor of Science in Computer Science',
          verificationUrl: 'https://verify.stanford.edu/credential/DOC-2024-001'
        };
        
        setScannedData(mockQRData);
        onQRDetected(mockQRData);
        stopScanning();
      }
    }, 3000);
  };

  const startScanning = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices?.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      streamRef.current = stream;
      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
        setHasPermission(true);
        
        // Start mock QR detection
        mockQRDetection();
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setHasPermission(false);
      if (err?.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera permissions to scan QR codes.');
      } else if (err?.name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else {
        setError('Unable to access camera. Please check your device settings.');
      }
    }
  };

  const stopScanning = () => {
    if (streamRef?.current) {
      streamRef?.current?.getTracks()?.forEach(track => track?.stop());
      streamRef.current = null;
    }
    if (scanIntervalRef?.current) {
      clearInterval(scanIntervalRef?.current);
    }
    setIsScanning(false);
  };

  const resetScanner = () => {
    setScannedData(null);
    setError('');
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  // Check if camera is supported
  const isCameraSupported = navigator.mediaDevices && navigator.mediaDevices?.getUserMedia;

  if (!isCameraSupported) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="QrCode" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">QR Scanner Not Supported</h3>
        <p className="text-muted-foreground">
          Your browser or device doesn't support camera functionality for QR scanning.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* QR Scanner Instructions */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="QrCode" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">QR Code Scanning</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Point camera at the QR code on your document</li>
              <li>• Ensure the QR code is clearly visible and well-lit</li>
              <li>• Hold steady until the code is detected</li>
              <li>• QR codes contain verification information</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Scanner Interface */}
      <div className="relative">
        {!isScanning && !scannedData && (
          <div className="text-center py-12 bg-muted rounded-lg">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Icon name="QrCode" size={32} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Ready to Scan QR Code
            </h3>
            <p className="text-muted-foreground mb-6">
              Position the QR code within the camera viewfinder
            </p>
            <Button onClick={startScanning} disabled={isProcessing}>
              <Icon name="Scan" size={16} className="mr-2" />
              Start Scanning
            </Button>
          </div>
        )}

        {/* Live Scanner Feed */}
        {isScanning && (
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-auto max-h-96 object-cover"
            />
            
            {/* Scanner Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Scanning Frame */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 border-4 border-white rounded-lg">
                  {/* Corner Indicators */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-primary rounded-tl-lg"></div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 border-r-4 border-t-4 border-primary rounded-tr-lg"></div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-4 border-b-4 border-primary rounded-bl-lg"></div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-primary rounded-br-lg"></div>
                  
                  {/* Scanning Line Animation */}
                  <div className="absolute inset-0 overflow-hidden rounded-lg">
                    <div className="absolute w-full h-1 bg-primary animate-pulse" 
                         style={{ 
                           animation: 'scan 2s linear infinite',
                           top: '50%',
                           transform: 'translateY(-50%)'
                         }}>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Instruction Text */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-white text-sm bg-black/50 px-4 py-2 rounded-lg">
                  Position QR code within the frame
                </p>
              </div>
            </div>

            {/* Scanner Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <Button
                variant="outline"
                onClick={stopScanning}
                className="bg-black/50 border-white/50 text-white hover:bg-black/70"
              >
                <Icon name="X" size={16} className="mr-2" />
                Stop Scanning
              </Button>
            </div>

            {/* Scanning Indicator */}
            <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/50 px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-white text-sm">Scanning...</span>
            </div>
          </div>
        )}

        {/* Scanned QR Data */}
        {scannedData && (
          <div className="space-y-4">
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-2">QR Code Detected Successfully</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">Institution:</span>
                      <p className="text-foreground">{scannedData?.institution}</p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Student ID:</span>
                      <p className="text-foreground">{scannedData?.studentId}</p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Document ID:</span>
                      <p className="text-foreground">{scannedData?.documentId}</p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Issue Date:</span>
                      <p className="text-foreground">{scannedData?.issueDate}</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium text-muted-foreground">Degree:</span>
                      <p className="text-foreground">{scannedData?.degree}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={resetScanner}>
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Scan Another
              </Button>
              <Button>
                <Icon name="ArrowRight" size={16} className="mr-2" />
                Proceed with Verification
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Error Message */}
      {error && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error mt-0.5" />
            <div>
              <h4 className="font-medium text-error mb-1">Scanner Error</h4>
              <p className="text-sm text-error/80">{error}</p>
              {hasPermission === false && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={startScanning}
                  className="mt-2"
                >
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Custom CSS for scanning animation */}
      <style jsx>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
      `}</style>
    </div>
  );
};

export default QRCodeScanner;