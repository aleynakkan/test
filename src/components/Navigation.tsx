import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Utensils, Activity, Users, User, Settings } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/nutrition', label: 'Nutrition', icon: Utensils },
    { path: '/activity', label: 'Activity', icon: Activity },
    { path: '/social', label: 'Social', icon: Users },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="navigation">
      <ul className="nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <li
              key={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;