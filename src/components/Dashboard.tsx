import React from 'react';
import { Heart, Utensils, Activity, Users, TrendingUp, Bell } from 'lucide-react';

const Dashboard: React.FC = () => {
  const dailyStats = [
    { label: 'Calories', value: '850', icon: Utensils, color: '#FF6B6B' },
    { label: 'Activity', value: '45min', icon: Activity, color: '#4ECDC4' },
    { label: 'Social', value: '12', icon: Users, color: '#FFE66D' },
    { label: 'Health', value: '95%', icon: Heart, color: '#95E1D3' },
  ];

  const recentActivities = [
    { title: 'Morning walk completed', time: '2 hours ago', icon: Activity },
    { title: 'Breakfast logged', time: '4 hours ago', icon: Utensils },
    { title: 'New friend request', time: '6 hours ago', icon: Users },
    { title: 'Health check reminder', time: '1 day ago', icon: Bell },
  ];

  const notifications = [
    { message: 'Time for your dog\'s evening walk!', type: 'activity' },
    { message: 'New photo from Max\'s owner', type: 'social' },
    { message: 'Don\'t forget to log dinner', type: 'nutrition' },
  ];

  return (
    <div className="dashboard">
      <div className="card">
        <div className="card-header">
          <Heart className="paw-animation" />
          <h1 className="card-title">Welcome back, Buddy! 🐾</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Here's how your furry friend is doing today
        </p>
      </div>

      {/* Daily Stats */}
      <div className="card">
        <div className="card-header">
          <TrendingUp />
          <h2 className="card-title">Today's Overview</h2>
        </div>
        <div className="stats-grid">
          {dailyStats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)` }}>
              <stat.icon size={24} style={{ marginBottom: '8px' }} />
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <Activity />
          <h2 className="card-title">Quick Actions</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
          <button className="btn btn-primary bone-btn">
            <Utensils size={16} />
            Log Meal
          </button>
          <button className="btn btn-secondary bone-btn">
            <Activity size={16} />
            Start Walk
          </button>
          <button className="btn btn-accent bone-btn">
            <Users size={16} />
            Share Photo
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="card-header">
          <Activity />
          <h2 className="card-title">Recent Activity</h2>
        </div>
        <div className="activity-feed">
          {recentActivities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">
                <activity.icon size={20} />
              </div>
              <div className="activity-content">
                <div className="activity-title">{activity.title}</div>
                <div className="activity-time">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="card">
        <div className="card-header">
          <Bell />
          <h2 className="card-title">Notifications</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map((notification, index) => (
            <div
              key={index}
              style={{
                padding: '12px',
                borderRadius: 'var(--border-radius)',
                background: 'var(--background-secondary)',
                borderLeft: `4px solid var(--${notification.type === 'activity' ? 'secondary' : notification.type === 'social' ? 'accent' : 'primary'}-color)`,
              }}
            >
              {notification.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;