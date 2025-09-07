import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DocumentPreview = ({ document }) => {
  const [selectedField, setSelectedField] = useState(null);

  const highlightedFields = [
    { id: 1, field: 'Student Name', value: 'Sarah Johnson', x: 15, y: 25, width: 30, height: 8, status: 'matched' },
    { id: 2, field: 'Degree Title', value: 'Bachelor of Science in Computer Science', x: 15, y: 35, width: 45, height: 6, status: 'matched' },
    { id: 3, field: 'Institution', value: 'Stanford University', x: 15, y: 45, width: 35, height: 6, status: 'matched' },
    { id: 4, field: 'Graduation Date', value: 'June 15, 2023', x: 15, y: 55, width: 25, height: 6, status: 'discrepancy' },
    { id: 5, field: 'GPA', value: '3.85', x: 15, y: 65, width: 15, height: 6, status: 'matched' }
  ];

  const getFieldStatusColor = (status) => {
    switch (status) {
      case 'matched':
        return 'border-success bg-success/20';
      case 'discrepancy':
        return 'border-warning bg-warning/20';
      case 'missing':
        return 'border-error bg-error/20';
      default:
        return 'border-border bg-muted/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'matched':
        return 'Check';
      case 'discrepancy':
        return 'AlertTriangle';
      case 'missing':
        return 'X';
      default:
        return 'Help';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Document Preview</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-muted-foreground hover:text-foreground transition-smooth">
            <Icon name="ZoomIn" size={16} />
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground transition-smooth">
            <Icon name="Download" size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Image with Highlights */}
        <div className="relative">
          <div className="relative bg-muted rounded-lg overflow-hidden" style={{ aspectRatio: '8.5/11' }}>
            <Image
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=800&fit=crop"
              alt="Academic Certificate"
              className="w-full h-full object-cover"
            />
            
            {/* Highlighted Fields Overlay */}
            {highlightedFields?.map((field) => (
              <div
                key={field?.id}
                className={`absolute border-2 cursor-pointer transition-all ${
                  selectedField === field?.id ? 'border-primary bg-primary/30' : getFieldStatusColor(field?.status)
                }`}
                style={{
                  left: `${field?.x}%`,
                  top: `${field?.y}%`,
                  width: `${field?.width}%`,
                  height: `${field?.height}%`
                }}
                onClick={() => setSelectedField(field?.id === selectedField ? null : field?.id)}
              />
            ))}
          </div>
        </div>

        {/* Field Analysis */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground">OCR Extracted Fields</h4>
          <div className="space-y-3">
            {highlightedFields?.map((field) => (
              <div
                key={field?.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedField === field?.id 
                    ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground/30'
                }`}
                onClick={() => setSelectedField(field?.id === selectedField ? null : field?.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{field?.field}</span>
                      <Icon 
                        name={getStatusIcon(field?.status)} 
                        size={14} 
                        className={
                          field?.status === 'matched' ? 'text-success' :
                          field?.status === 'discrepancy'? 'text-warning' : 'text-error'
                        }
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{field?.value}</p>
                    {field?.status === 'discrepancy' && (
                      <p className="text-xs text-warning mt-1">Database shows: June 14, 2023</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cross-Reference Summary */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h5 className="text-sm font-medium text-foreground mb-2">Cross-Reference Results</h5>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-success">4</p>
                <p className="text-xs text-muted-foreground">Matched</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-warning">1</p>
                <p className="text-xs text-muted-foreground">Discrepancy</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-error">0</p>
                <p className="text-xs text-muted-foreground">Missing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;