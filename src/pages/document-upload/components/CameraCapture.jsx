import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CameraCapture = ({ onCapture, isProcessing }) => {
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices?.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      streamRef.current = stream;
      if (videoRef?.current) {
        videoRef.current.srcObject = stream;
        setIsStreamActive(true);
        setHasPermission(true);
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setHasPermission(false);
      if (err?.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera permissions and try again.');
      } else if (err?.name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else {
        setError('Unable to access camera. Please check your device settings.');
      }
    }
  };

  const stopCamera = () => {
    if (streamRef?.current) {
      streamRef?.current?.getTracks()?.forEach(track => track?.stop());
      streamRef.current = null;
    }
    setIsStreamActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef?.current || !canvasRef?.current) return;

    const video = videoRef?.current;
    const canvas = canvasRef?.current;
    const context = canvas?.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video?.videoWidth;
    canvas.height = video?.videoHeight;

    // Draw video frame to canvas
    context?.drawImage(video, 0, 0, canvas?.width, canvas?.height);

    // Convert to blob
    canvas?.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `document-${Date.now()}.jpg`, {
          type: 'image/jpeg'
        });
        
        // Create preview URL
        const imageUrl = URL.createObjectURL(blob);
        setCapturedImage(imageUrl);
        
        // Pass to parent component
        onCapture([file]);
        
        // Stop camera after capture
        stopCamera();
      }
    }, 'image/jpeg', 0.9);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const usePhoto = () => {
    // Photo is already passed to parent via onCapture
    // This just confirms the selection
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Check if camera is supported
  const isCameraSupported = navigator.mediaDevices && navigator.mediaDevices?.getUserMedia;

  if (!isCameraSupported) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="CameraOff" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Camera Not Supported</h3>
        <p className="text-muted-foreground">
          Your browser or device doesn't support camera functionality.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Camera Instructions */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Camera Capture Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ensure good lighting and avoid shadows</li>
              <li>• Keep the document flat and fully visible</li>
              <li>• Align document within the capture frame</li>
              <li>• Hold steady for clear, readable text</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Camera Interface */}
      <div className="relative">
        {!isStreamActive && !capturedImage && (
          <div className="text-center py-12 bg-muted rounded-lg">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Icon name="Camera" size={32} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Ready to Capture Document
            </h3>
            <p className="text-muted-foreground mb-6">
              Position your document clearly within the camera frame
            </p>
            <Button onClick={startCamera} disabled={isProcessing}>
              <Icon name="Camera" size={16} className="mr-2" />
              Start Camera
            </Button>
          </div>
        )}

        {/* Live Camera Feed */}
        {isStreamActive && (
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-auto max-h-96 object-cover"
            />
            
            {/* Capture Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Alignment Grid */}
              <div className="absolute inset-4 border-2 border-white/50 rounded-lg">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                  {Array.from({ length: 9 })?.map((_, i) => (
                    <div key={i} className="border border-white/20"></div>
                  ))}
                </div>
              </div>
              
              {/* Corner Guides */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-4 border-t-4 border-white"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-r-4 border-t-4 border-white"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-4 border-b-4 border-white"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-4 border-b-4 border-white"></div>
            </div>

            {/* Capture Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={stopCamera}
                className="bg-black/50 border-white/50 text-white hover:bg-black/70"
              >
                <Icon name="X" size={16} />
              </Button>
              
              <button
                onClick={capturePhoto}
                disabled={isProcessing}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Camera" size={24} color="white" />
                </div>
              </button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {/* Switch camera if available */}}
                className="bg-black/50 border-white/50 text-white hover:bg-black/70"
              >
                <Icon name="RotateCcw" size={16} />
              </Button>
            </div>
          </div>
        )}

        {/* Captured Image Preview */}
        {capturedImage && (
          <div className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <img
                src={capturedImage}
                alt="Captured document"
                className="w-full h-auto max-h-96 object-contain"
              />
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={retakePhoto}>
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Retake
              </Button>
              <Button onClick={usePhoto}>
                <Icon name="Check" size={16} className="mr-2" />
                Use Photo
              </Button>
            </div>
          </div>
        )}

        {/* Hidden Canvas for Capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
      {/* Error Message */}
      {error && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error mt-0.5" />
            <div>
              <h4 className="font-medium text-error mb-1">Camera Error</h4>
              <p className="text-sm text-error/80">{error}</p>
              {hasPermission === false && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={startCamera}
                  className="mt-2"
                >
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;