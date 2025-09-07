import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AnalyticsDashboard = ({ analytics }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('verifications');

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ];

  const metricOptions = [
    { value: 'verifications', label: 'Verifications' },
    { value: 'processing-time', label: 'Processing Time' },
    { value: 'success-rate', label: 'Success Rate' }
  ];

  const verificationData = [
    { name: 'Jan', approved: 145, rejected: 23, pending: 12 },
    { name: 'Feb', approved: 167, rejected: 18, pending: 8 },
    { name: 'Mar', approved: 189, rejected: 31, pending: 15 },
    { name: 'Apr', approved: 203, rejected: 25, pending: 19 },
    { name: 'May', approved: 178, rejected: 29, pending: 22 },
    { name: 'Jun', approved: 221, rejected: 15, pending: 11 }
  ];

  const processingTimeData = [
    { name: 'Week 1', avgTime: 2.3 },
    { name: 'Week 2', avgTime: 1.8 },
    { name: 'Week 3', avgTime: 2.1 },
    { name: 'Week 4', avgTime: 1.9 }
  ];

  const documentTypeData = [
    { name: 'Transcripts', value: 45, color: '#1E3A8A' },
    { name: 'Degrees', value: 30, color: '#059669' },
    { name: 'Certificates', value: 15, color: '#F59E0B' },
    { name: 'Diplomas', value: 10, color: '#DC2626' }
  ];

  const statsCards = [
    {
      title: 'Total Verifications',
      value: '1,247',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'CheckCircle'
    },
    {
      title: 'Avg Processing Time',
      value: '1.9 days',
      change: '-0.3 days',
      changeType: 'positive',
      icon: 'Clock'
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'TrendingUp'
    },
    {
      title: 'Pending Requests',
      value: '23',
      change: '-5',
      changeType: 'positive',
      icon: 'AlertCircle'
    }
  ];

  const exportReport = () => {
    // Mock export functionality
    console.log('Exporting analytics report...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Analytics Dashboard</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Verification performance and institutional metrics
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
              className="w-full sm:w-40"
            />
            <Button
              variant="outline"
              iconName="Download"
              onClick={exportReport}
            >
              Export Report
            </Button>
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards?.map((stat, index) => (
          <div key={index} className="bg-card rounded-lg border border-border shadow-subtle p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat?.title}</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{stat?.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat?.changeType === 'positive' ? 'text-success' : 'text-error'
                  }`}>
                    {stat?.change}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs last period</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Trends */}
        <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Verification Trends</h3>
            <Select
              options={metricOptions}
              value={selectedMetric}
              onChange={setSelectedMetric}
              className="w-40"
            />
          </div>
          
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={verificationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="approved" fill="var(--color-success)" name="Approved" />
                <Bar dataKey="rejected" fill="var(--color-error)" name="Rejected" />
                <Bar dataKey="pending" fill="var(--color-warning)" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Processing Time */}
        <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Average Processing Time</h3>
          
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={processingTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="avgTime" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Document Types Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Document Types</h3>
            
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={documentTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {documentTypeData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 mt-4">
              {documentTypeData?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item?.color }}
                    ></div>
                    <span className="text-sm text-foreground">{item?.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{item?.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
              {[
                {
                  action: 'Bulk verification completed',
                  details: '45 transcripts processed successfully',
                  time: '2 hours ago',
                  icon: 'CheckCircle',
                  color: 'text-success'
                },
                {
                  action: 'New document batch uploaded',
                  details: 'Spring 2024 degree certificates added',
                  time: '4 hours ago',
                  icon: 'Upload',
                  color: 'text-primary'
                },
                {
                  action: 'Verification request rejected',
                  details: 'Invalid signature detected on diploma',
                  time: '6 hours ago',
                  icon: 'XCircle',
                  color: 'text-error'
                },
                {
                  action: 'API integration updated',
                  details: 'External verification service connected',
                  time: '1 day ago',
                  icon: 'Settings',
                  color: 'text-muted-foreground'
                }
              ]?.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-smooth">
                  <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${activity?.color}`}>
                    <Icon name={activity?.icon} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{activity?.action}</p>
                    <p className="text-sm text-muted-foreground">{activity?.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity?.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;