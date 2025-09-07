import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/student-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/document-upload', label: 'Upload', icon: 'Upload' },
    { path: '/verification-results', label: 'Results', icon: 'CheckCircle' },
    { path: '/institution-portal', label: 'Portal', icon: 'Building2' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMobileMenuOpen(false);
  };

  const handleProfileNavigation = (path) => {
    window.location.href = path;
    setIsProfileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-subtle">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">AcademicAuth</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-smooth">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </span>
          </button>

          {/* Security Status */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-success/10 text-success rounded-full text-xs font-medium">
            <Icon name="Shield" size={12} />
            <span>Secure</span>
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-smooth"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </button>

            {/* Profile Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated z-50">
                <div className="p-2">
                  <div className="px-3 py-2 text-sm">
                    <div className="font-medium text-foreground">Student User</div>
                    <div className="text-xs text-muted-foreground">student@university.edu</div>
                  </div>
                  <div className="border-t border-border my-1"></div>
                  <button
                    onClick={() => handleProfileNavigation('/user-profile')}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth"
                  >
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help</span>
                  </button>
                  <div className="border-t border-border my-1"></div>
                  <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-error hover:bg-error/10 rounded-md transition-smooth">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="p-4 space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
            <div className="border-t border-border my-2"></div>
            <button
              onClick={() => handleNavigation('/user-profile')}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            >
              <Icon name="User" size={18} />
              <span>Profile</span>
            </button>
          </nav>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      {/* Overlay for profile menu */}
      {isProfileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;