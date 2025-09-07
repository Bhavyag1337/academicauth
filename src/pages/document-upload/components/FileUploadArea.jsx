import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadArea = ({ onFileSelect, uploadProgress, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const supportedFormats = ['PDF', 'JPG', 'PNG', 'JPEG'];
  const maxFileSize = 10; // MB

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files?.filter(file => {
      const fileExtension = file?.name?.split('.')?.pop()?.toUpperCase();
      const fileSizeMB = file?.size / (1024 * 1024);
      
      if (!supportedFormats?.includes(fileExtension)) {
        alert(`Unsupported file format: ${fileExtension}. Please use ${supportedFormats?.join(', ')}`);
        return false;
      }
      
      if (fileSizeMB > maxFileSize) {
        alert(`File size too large: ${fileSizeMB?.toFixed(1)}MB. Maximum size is ${maxFileSize}MB`);
        return false;
      }
      
      return true;
    });

    if (validFiles?.length > 0) {
      setSelectedFiles(validFiles);
      onFileSelect(validFiles);
    }
  };

  const removeFile = (index) => {
    const updatedFiles = selectedFiles?.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onFileSelect(updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Icon name="Upload" size={32} className="text-muted-foreground" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Upload Academic Documents
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your files here, or click to browse
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => fileInputRef?.current?.click()}
            disabled={isUploading}
          >
            <Icon name="FolderOpen" size={16} className="mr-2" />
            Choose Files
          </Button>

          {/* Supported Formats */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {supportedFormats?.map((format) => (
              <span
                key={format}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
              >
                {format}
              </span>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            Maximum file size: {maxFileSize}MB per file
          </p>
        </div>

        {/* Upload Progress */}
        {isUploading && uploadProgress > 0 && (
          <div className="absolute inset-0 bg-card/90 flex items-center justify-center rounded-lg">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-medium">Uploading... {uploadProgress}%</p>
            </div>
          </div>
        )}
      </div>
      {/* Selected Files Preview */}
      {selectedFiles?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Selected Files ({selectedFiles?.length})</h4>
          <div className="space-y-2">
            {selectedFiles?.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon
                      name={file?.type?.includes('pdf') ? 'FileText' : 'Image'}
                      size={20}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{file?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file?.size)} • {file?.type?.split('/')?.[1]?.toUpperCase()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  disabled={isUploading}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;