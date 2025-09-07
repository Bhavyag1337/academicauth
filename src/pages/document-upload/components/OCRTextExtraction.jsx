import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OCRTextExtraction = ({ uploadedFiles, onTextExtracted, isProcessing }) => {
  const [extractedText, setExtractedText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [editableText, setEditableText] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [graduationDate, setGraduationDate] = useState('');
  const [degreeInfo, setDegreeInfo] = useState('');
  const [confidence, setConfidence] = useState(0);

  const institutionOptions = [
    { value: 'stanford', label: 'Stanford University' },
    { value: 'mit', label: 'Massachusetts Institute of Technology' },
    { value: 'harvard', label: 'Harvard University' },
    { value: 'berkeley', label: 'UC Berkeley' },
    { value: 'caltech', label: 'California Institute of Technology' },
    { value: 'princeton', label: 'Princeton University' },
    { value: 'yale', label: 'Yale University' },
    { value: 'columbia', label: 'Columbia University' },
    { value: 'chicago', label: 'University of Chicago' },
    { value: 'upenn', label: 'University of Pennsylvania' }
  ];

  const documentTypeOptions = [
    { value: 'transcript', label: 'Official Transcript' },
    { value: 'diploma', label: 'Diploma/Degree Certificate' },
    { value: 'certificate', label: 'Certificate of Completion' },
    { value: 'enrollment', label: 'Enrollment Verification' },
    { value: 'grade_report', label: 'Grade Report' }
  ];

  // Mock OCR extraction
  const performOCR = async () => {
    if (!uploadedFiles || uploadedFiles?.length === 0) return;

    setIsExtracting(true);
    
    // Simulate OCR processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock extracted text based on document type
    const mockExtractedText = `STANFORD UNIVERSITY
OFFICE OF THE REGISTRAR

OFFICIAL TRANSCRIPT

Student Name: Sarah Johnson
Student ID: 20210456789
Date of Birth: March 15, 1999

Program: Bachelor of Science in Computer Science
College: School of Engineering
Graduation Date: June 15, 2024

ACADEMIC RECORD:
Fall 2020 - Spring 2024

CS106A Programming Methodology - A
CS106B Programming Abstractions - A-
CS107 Computer Organization & Systems - B+
CS109 Introduction to Probability - A
CS161 Design and Analysis of Algorithms - A-
CS229 Machine Learning - A
CS231N Convolutional Neural Networks - B+

Cumulative GPA: 3.78/4.00
Total Units: 180

Degree Conferred: Bachelor of Science
Major: Computer Science
Graduation Date: June 15, 2024

This is an official transcript issued by Stanford University.
Transcript Date: September 7, 2024`;

    setExtractedText(mockExtractedText);
    setEditableText(mockExtractedText);
    setConfidence(94);
    setIsExtracting(false);

    // Auto-populate fields based on extracted text
    setSelectedInstitution('stanford');
    setDocumentType('transcript');
    setGraduationDate('2024-06-15');
    setDegreeInfo('Bachelor of Science in Computer Science');
  };

  const handleTextChange = (e) => {
    setEditableText(e?.target?.value);
  };

  const handleSaveExtraction = () => {
    const extractionData = {
      originalText: extractedText,
      editedText: editableText,
      institution: selectedInstitution,
      documentType,
      graduationDate,
      degreeInfo,
      confidence,
      extractedFields: {
        studentName: 'Sarah Johnson',
        studentId: '20210456789',
        gpa: '3.78/4.00',
        totalUnits: '180'
      }
    };
    
    onTextExtracted(extractionData);
  };

  useEffect(() => {
    if (uploadedFiles && uploadedFiles?.length > 0 && !extractedText) {
      performOCR();
    }
  }, [uploadedFiles]);

  if (!uploadedFiles || uploadedFiles?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="FileText" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Documents to Process</h3>
        <p className="text-muted-foreground">
          Upload documents first to extract text content
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* OCR Processing Status */}
      {isExtracting && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div>
              <h4 className="font-medium text-foreground">Processing Document</h4>
              <p className="text-sm text-muted-foreground">
                Extracting text content using OCR technology...
              </p>
            </div>
          </div>
        </div>
      )}
      {/* OCR Results */}
      {extractedText && !isExtracting && (
        <div className="space-y-6">
          {/* Confidence Score */}
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <div>
                  <h4 className="font-medium text-foreground">Text Extraction Complete</h4>
                  <p className="text-sm text-muted-foreground">
                    OCR processing finished successfully
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-success">{confidence}%</div>
                <div className="text-xs text-muted-foreground">Confidence</div>
              </div>
            </div>
          </div>

          {/* Document Classification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Institution"
              placeholder="Select institution"
              options={institutionOptions}
              value={selectedInstitution}
              onChange={setSelectedInstitution}
              searchable
              required
            />
            
            <Select
              label="Document Type"
              placeholder="Select document type"
              options={documentTypeOptions}
              value={documentType}
              onChange={setDocumentType}
              required
            />
          </div>

          {/* Additional Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Graduation Date"
              type="date"
              value={graduationDate}
              onChange={(e) => setGraduationDate(e?.target?.value)}
              required
            />
            
            <Input
              label="Degree Information"
              type="text"
              placeholder="e.g., Bachelor of Science in Computer Science"
              value={degreeInfo}
              onChange={(e) => setDegreeInfo(e?.target?.value)}
              required
            />
          </div>

          {/* Extracted Text Editor */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Extracted Text
              <span className="text-muted-foreground ml-2">(Review and edit if needed)</span>
            </label>
            <div className="relative">
              <textarea
                value={editableText}
                onChange={handleTextChange}
                className="w-full h-64 p-4 border border-border rounded-lg bg-card text-foreground text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Extracted text will appear here..."
              />
              <div className="absolute top-2 right-2 flex items-center space-x-2">
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {editableText?.length} characters
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Review the extracted text for accuracy. You can make corrections before proceeding.
            </p>
          </div>

          {/* Key Information Summary */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Detected Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Student Name:</span>
                <p className="text-foreground">Sarah Johnson</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Student ID:</span>
                <p className="text-foreground">20210456789</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">GPA:</span>
                <p className="text-foreground">3.78/4.00</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Total Units:</span>
                <p className="text-foreground">180</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setExtractedText('');
                setEditableText('');
                setConfidence(0);
              }}
            >
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Re-extract Text
            </Button>
            
            <Button
              onClick={handleSaveExtraction}
              disabled={!selectedInstitution || !documentType || !graduationDate || !degreeInfo}
            >
              <Icon name="Save" size={16} className="mr-2" />
              Save & Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OCRTextExtraction;