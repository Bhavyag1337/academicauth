import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    studentId: "STU2024001",
    institution: "Stanford University",
    program: "Computer Science",
    graduationYear: "2024"
  });
  const [errors, setErrors] = useState({});

  const institutionOptions = [
    { value: "stanford", label: "Stanford University" },
    { value: "mit", label: "Massachusetts Institute of Technology" },
    { value: "harvard", label: "Harvard University" },
    { value: "berkeley", label: "UC Berkeley" },
    { value: "caltech", label: "California Institute of Technology" }
  ];

  const programOptions = [
    { value: "computer-science", label: "Computer Science" },
    { value: "electrical-engineering", label: "Electrical Engineering" },
    { value: "mechanical-engineering", label: "Mechanical Engineering" },
    { value: "business-administration", label: "Business Administration" },
    { value: "biology", label: "Biology" }
  ];

  const yearOptions = [
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setIsEditing(false);
      // Mock save success
      console.log('Profile updated successfully');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Reset form data to original values
    setFormData({
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@university.edu",
      phone: "+1 (555) 123-4567",
      studentId: "STU2024001",
      institution: "Stanford University",
      program: "Computer Science",
      graduationYear: "2024"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
          <p className="text-sm text-muted-foreground">Manage your account details and preferences</p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>
      {/* Profile Picture Section */}
      <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
        <div className="relative">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={32} color="white" />
          </div>
          {isEditing && (
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-elevated">
              <Icon name="Camera" size={16} color="white" />
            </button>
          )}
        </div>
        <div>
          <h4 className="font-medium text-foreground">{formData?.firstName} {formData?.lastName}</h4>
          <p className="text-sm text-muted-foreground">Student at {formData?.institution}</p>
          {isEditing && (
            <button className="text-xs text-primary hover:underline mt-1">
              Change profile picture
            </button>
          )}
        </div>
      </div>
      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          type="text"
          value={formData?.firstName}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          error={errors?.firstName}
          disabled={!isEditing}
          required
        />

        <Input
          label="Last Name"
          type="text"
          value={formData?.lastName}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          error={errors?.lastName}
          disabled={!isEditing}
          required
        />

        <Input
          label="Email Address"
          type="email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          disabled={!isEditing}
          required
          className="md:col-span-2"
        />

        <Input
          label="Phone Number"
          type="tel"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          disabled={!isEditing}
          required
        />

        <Input
          label="Student ID"
          type="text"
          value={formData?.studentId}
          onChange={(e) => handleInputChange('studentId', e?.target?.value)}
          disabled
          description="Contact your institution to update this field"
        />

        <Select
          label="Institution"
          options={institutionOptions}
          value={formData?.institution}
          onChange={(value) => handleInputChange('institution', value)}
          disabled={!isEditing}
          className="md:col-span-2"
        />

        <Select
          label="Program/Major"
          options={programOptions}
          value={formData?.program}
          onChange={(value) => handleInputChange('program', value)}
          disabled={!isEditing}
        />

        <Select
          label="Expected Graduation Year"
          options={yearOptions}
          value={formData?.graduationYear}
          onChange={(value) => handleInputChange('graduationYear', value)}
          disabled={!isEditing}
        />
      </div>
      {/* Action Buttons */}
      {isEditing && (
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            iconName="Save"
            iconPosition="left"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      )}
      {/* Account Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
        <div className="text-center p-4 bg-card rounded-lg border border-border">
          <div className="text-2xl font-bold text-primary">12</div>
          <div className="text-sm text-muted-foreground">Documents Verified</div>
        </div>
        <div className="text-center p-4 bg-card rounded-lg border border-border">
          <div className="text-2xl font-bold text-success">98%</div>
          <div className="text-sm text-muted-foreground">Success Rate</div>
        </div>
        <div className="text-center p-4 bg-card rounded-lg border border-border">
          <div className="text-2xl font-bold text-accent">3</div>
          <div className="text-sm text-muted-foreground">Active Verifications</div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoTab;