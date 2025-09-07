import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DocumentManager = ({ documents, onUploadDocument, onDeleteDocument }) => {
  const [uploadMode, setUploadMode] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    documentType: '',
    batchName: '',
    description: ''
  });

  const documentTypeOptions = [
    { value: 'transcript', label: 'Official Transcripts' },
    { value: 'degree', label: 'Degree Certificates' },
    { value: 'diploma', label: 'Diploma Records' },
    { value: 'certificate', label: 'Course Certificates' },
    { value: 'seal', label: 'Institutional Seals' }
  ];

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleFiles = (files) => {
    Array.from(files)?.forEach(file => {
      const newDocument = {
        id: Date.now() + Math.random(),
        name: file?.name,
        type: uploadForm?.documentType,
        size: file?.size,
        uploadedAt: new Date()?.toISOString(),
        status: 'processing',
        batchName: uploadForm?.batchName
      };
      onUploadDocument(newDocument);
    });
    
    setUploadForm({ documentType: '', batchName: '', description: '' });
    setUploadMode(false);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      processing: 'bg-warning/10 text-warning border-warning/20',
      active: 'bg-success/10 text-success border-success/20',
      error: 'bg-error/10 text-error border-error/20'
    };
    return colors?.[status] || colors?.processing;
  };

  const getDocumentIcon = (type) => {
    const icons = {
      transcript: 'FileText',
      degree: 'Award',
      diploma: 'GraduationCap',
      certificate: 'Certificate',
      seal: 'Shield'
    };
    return icons?.[type] || 'File';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Document Management</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {documents?.length} official documents • Secure encrypted storage
            </p>
          </div>
          
          <Button
            variant="default"
            iconName="Upload"
            onClick={() => setUploadMode(!uploadMode)}
          >
            Upload Documents
          </Button>
        </div>

        {uploadMode && (
          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
            <h3 className="font-medium text-foreground mb-4">Bulk Document Upload</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Select
                label="Document Type"
                options={documentTypeOptions}
                value={uploadForm?.documentType}
                onChange={(value) => setUploadForm({ ...uploadForm, documentType: value })}
                required
              />
              <Input
                label="Batch Name"
                type="text"
                placeholder="e.g., Fall 2024 Transcripts"
                value={uploadForm?.batchName}
                onChange={(e) => setUploadForm({ ...uploadForm, batchName: e?.target?.value })}
                required
              />
            </div>

            <Input
              label="Description"
              type="text"
              placeholder="Optional description for this batch"
              value={uploadForm?.description}
              onChange={(e) => setUploadForm({ ...uploadForm, description: e?.target?.value })}
              className="mb-4"
            />

            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-medium text-foreground mb-2">
                Drop files here or click to browse
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Supports PDF, JPG, PNG files up to 10MB each
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFiles(e?.target?.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" size="sm">
                Choose Files
              </Button>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <Button
                variant="outline"
                onClick={() => setUploadMode(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {documents?.map((document) => (
            <div key={document?.id} className="border border-border rounded-lg p-4 hover:shadow-elevated transition-smooth">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={getDocumentIcon(document?.type)} size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{document?.name}</h4>
                    <p className="text-sm text-muted-foreground capitalize">{document?.type}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => onDeleteDocument(document?.id)}
                  className="text-error hover:text-error"
                />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Size:</span>
                  <span className="text-foreground">{formatFileSize(document?.size)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Uploaded:</span>
                  <span className="text-foreground">{formatDate(document?.uploadedAt)}</span>
                </div>
                {document?.batchName && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Batch:</span>
                    <span className="text-foreground">{document?.batchName}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(document?.status)}`}>
                  {document?.status?.charAt(0)?.toUpperCase() + document?.status?.slice(1)}
                </span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" iconName="Eye">
                    View
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Download">
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {documents?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FolderOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No documents uploaded</h3>
            <p className="text-muted-foreground mb-4">
              Start by uploading your institution's official documents
            </p>
            <Button
              variant="outline"
              iconName="Upload"
              onClick={() => setUploadMode(true)}
            >
              Upload First Document
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentManager;