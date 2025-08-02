import React, { useState } from 'react';
import { Activity, Play, MapPin, TrendingUp, Clock, Target, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface ActivitySession {
  id: string;
  type: 'walk' | 'play' | 'rest';
  duration: number;
  distance?: number;
  time: string;
  date: string;
}

const ActivityTracker: React.FC = () => {
  const [activities, setActivities] = useState<ActivitySession[]>([
    { id: '1', type: 'walk', duration: 30, distance: 2.5, time: '08:00', date: '2024-01-15' },
    { id: '2', type: 'play', duration: 20, time: '12:00', date: '2024-01-15' },
    { id: '3', type: 'walk', duration: 45, distance: 3.2, time: '18:00', date: '2024-01-15' },
    { id: '4', type: 'rest', duration: 120, time: '14:00', date: '2024-01-15' },
  ]);

  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'walk' as ActivitySession['type'],
    duration: '',
    distance: '',
    time: '',
  });

  const totalActivityTime = activities.reduce((sum, activity) => sum + activity.duration, 0);
  const totalDistance = activities
    .filter(activity => activity.distance)
    .reduce((sum, activity) => sum + (activity.distance || 0), 0);

  // Chart data
  const weeklyData = [
    { day: 'Mon', walks: 2, play: 1, rest: 3 },
    { day: 'Tue', walks: 3, play: 2, rest: 2 },
    { day: 'Wed', walks: 2, play: 1, rest: 4 },
    { day: 'Thu', walks: 3, play: 3, rest: 2 },
    { day: 'Fri', walks: 2, play: 2, rest: 3 },
    { day: 'Sat', walks: 4, play: 3, rest: 1 },
    { day: 'Sun', walks: 3, play: 2, rest: 2 },
  ];

  const activityBreakdown = [
    { name: 'Walks', value: activities.filter(a => a.type === 'walk').length, color: '#FF6B6B' },
    { name: 'Play', value: activities.filter(a => a.type === 'play').length, color: '#4ECDC4' },
    { name: 'Rest', value: activities.filter(a => a.type === 'rest').length, color: '#FFE66D' },
  ];

  const handleAddActivity = () => {
    if (newActivity.duration && newActivity.time) {
      const activity: ActivitySession = {
        id: Date.now().toString(),
        type: newActivity.type,
        duration: parseInt(newActivity.duration),
        distance: newActivity.distance ? parseFloat(newActivity.distance) : undefined,
        time: newActivity.time,
        date: new Date().toISOString().split('T')[0],
      };
      setActivities([...activities, activity]);
      setNewActivity({ type: 'walk', duration: '', distance: '', time: '' });
      setShowAddActivity(false);
    }
  };

  const getActivityIcon = (type: ActivitySession['type']) => {
    switch (type) {
      case 'walk': return <MapPin size={20} />;
      case 'play': return <Play size={20} />;
      case 'rest': return <Clock size={20} />;
    }
  };

  const getActivityColor = (type: ActivitySession['type']) => {
    switch (type) {
      case 'walk': return '#FF6B6B';
      case 'play': return '#4ECDC4';
      case 'rest': return '#FFE66D';
    }
  };

  return (
    <div className="activity-tracker">
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <Activity />
          <h1 className="card-title">Activity Tracker</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Track your dog's daily activities and exercise
        </p>
      </div>

      {/* Today's Stats */}
      <div className="card">
        <div className="card-header">
          <Target />
          <h2 className="card-title">Today's Activity</h2>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <Activity size={24} style={{ marginBottom: '8px' }} />
            <div className="stat-value">{totalActivityTime}min</div>
            <div className="stat-label">Total Time</div>
          </div>
          <div className="stat-card">
            <MapPin size={24} style={{ marginBottom: '8px' }} />
            <div className="stat-value">{totalDistance.toFixed(1)}km</div>
            <div className="stat-label">Distance</div>
          </div>
          <div className="stat-card">
            <Play size={24} style={{ marginBottom: '8px' }} />
            <div className="stat-value">{activities.length}</div>
            <div className="stat-label">Sessions</div>
          </div>
          <div className="stat-card">
            <TrendingUp size={24} style={{ marginBottom: '8px' }} />
            <div className="stat-value">85%</div>
            <div className="stat-label">Goal Progress</div>
          </div>
        </div>
      </div>

      {/* Add Activity Button */}
      <div className="card">
        <button 
          className="btn btn-primary bone-btn" 
          style={{ width: '100%' }}
          onClick={() => setShowAddActivity(true)}
        >
          <Plus size={16} />
          Log Activity
        </button>
      </div>

      {/* Add Activity Form */}
      {showAddActivity && (
        <div className="card">
          <div className="card-header">
            <Plus />
            <h2 className="card-title">Log New Activity</h2>
          </div>
          <div className="form-group">
            <label className="form-label">Activity Type</label>
            <select
              className="form-input"
              value={newActivity.type}
              onChange={(e) => setNewActivity({...newActivity, type: e.target.value as ActivitySession['type']})}
            >
              <option value="walk">🚶 Walk</option>
              <option value="play">🎾 Play</option>
              <option value="rest">😴 Rest</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Duration (minutes)</label>
            <input
              type="number"
              className="form-input"
              placeholder="e.g., 30"
              value={newActivity.duration}
              onChange={(e) => setNewActivity({...newActivity, duration: e.target.value})}
            />
          </div>
          {newActivity.type === 'walk' && (
            <div className="form-group">
              <label className="form-label">Distance (km)</label>
              <input
                type="number"
                step="0.1"
                className="form-input"
                placeholder="e.g., 2.5"
                value={newActivity.distance}
                onChange={(e) => setNewActivity({...newActivity, distance: e.target.value})}
              />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-input"
              value={newActivity.time}
              onChange={(e) => setNewActivity({...newActivity, time: e.target.value})}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-primary" onClick={handleAddActivity}>
              Log Activity
            </button>
            <button className="btn btn-secondary" onClick={() => setShowAddActivity(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Activity Chart */}
      <div className="card">
        <div className="card-header">
          <TrendingUp />
          <h2 className="card-title">Weekly Activity</h2>
        </div>
        <div style={{ height: '300px', marginTop: '20px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="walks" fill="#FF6B6B" name="Walks" />
              <Bar dataKey="play" fill="#4ECDC4" name="Play" />
              <Bar dataKey="rest" fill="#FFE66D" name="Rest" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Breakdown */}
      <div className="card">
        <div className="card-header">
          <Activity />
          <h2 className="card-title">Activity Breakdown</h2>
        </div>
        <div style={{ height: '200px', marginTop: '20px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={activityBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {activityBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's Activities */}
      <div className="card">
        <div className="card-header">
          <Clock />
          <h2 className="card-title">Today's Activities</h2>
        </div>
        <div className="activity-feed">
          {activities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div 
                className="activity-icon"
                style={{ background: getActivityColor(activity.type) }}
              >
                {getActivityIcon(activity.type)}
              </div>
              <div className="activity-content">
                <div className="activity-title">
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} - {activity.duration}min
                  {activity.distance && ` (${activity.distance}km)`}
                </div>
                <div className="activity-time">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Tips */}
      <div className="card">
        <div className="card-header">
          <Activity />
          <h2 className="card-title">Activity Tips</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{
            padding: '12px',
            background: 'var(--background-secondary)',
            borderRadius: 'var(--border-radius)',
            borderLeft: '4px solid var(--primary-color)'
          }}>
            🚶 Aim for 30-60 minutes of walking daily
          </div>
          <div style={{
            padding: '12px',
            background: 'var(--background-secondary)',
            borderRadius: 'var(--border-radius)',
            borderLeft: '4px solid var(--secondary-color)'
          }}>
            🎾 Include playtime for mental stimulation
          </div>
          <div style={{
            padding: '12px',
            background: 'var(--background-secondary)',
            borderRadius: 'var(--border-radius)',
            borderLeft: '4px solid var(--accent-color)'
          }}>
            😴 Ensure adequate rest periods between activities
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTracker;