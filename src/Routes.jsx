import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import VerificationResults from './pages/verification-results';
import InstitutionPortal from './pages/institution-portal';
import StudentDashboard from './pages/student-dashboard';
import DocumentUpload from './pages/document-upload';
import UserProfile from './pages/user-profile';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DocumentUpload />} />
        <Route path="/verification-results" element={<VerificationResults />} />
        <Route path="/institution-portal" element={<InstitutionPortal />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/document-upload" element={<DocumentUpload />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
