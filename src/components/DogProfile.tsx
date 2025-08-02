import React, { useState } from 'react';
import { User, Camera, Edit, Heart, Calendar, MapPin, Weight, Activity, Plus } from 'lucide-react';

interface DogProfile {
  name: string;
  breed: string;
  age: number;
  weight: number;
  photo: string;
  owner: string;
  microchip: string;
  vet: string;
  emergencyContact: string;
  healthNotes: string;
  preferences: string[];
}

const DogProfile: React.FC = () => {
  const [profile, setProfile] = useState<DogProfile>({
    name: 'Buddy',
    breed: 'Golden Retriever',
    age: 3,
    weight: 28.5,
    photo: '🐕',
    owner: 'Sarah Johnson',
    microchip: '123456789012345',
    vet: 'Dr. Smith - Central Vet Clinic',
    emergencyContact: '+1 (555) 123-4567',
    healthNotes: 'Allergic to chicken. Loves swimming and fetch games.',
    preferences: ['Walks in the morning', 'Playtime with other dogs', 'Car rides', 'Treats after training'],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState(profile);

  const healthMetrics = [
    { label: 'Weight', value: `${profile.weight} kg`, icon: Weight, color: '#FF6B6B' },
    { label: 'Age', value: `${profile.age} years`, icon: Calendar, color: '#4ECDC4' },
    { label: 'Activity Level', value: 'High', icon: Activity, color: '#FFE66D' },
    { label: 'Health Score', value: '95%', icon: Heart, color: '#95E1D3' },
  ];

  const healthHistory = [
    { date: '2024-01-15', type: 'Vaccination', description: 'Annual vaccines updated', status: 'completed' },
    { date: '2024-01-10', type: 'Checkup', description: 'Regular health check', status: 'completed' },
    { date: '2024-01-05', type: 'Dental', description: 'Teeth cleaning', status: 'completed' },
    { date: '2024-02-01', type: 'Checkup', description: 'Next scheduled checkup', status: 'scheduled' },
  ];

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="dog-profile">
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <User />
          <h1 className="card-title">Dog Profile</h1>
          <button 
            className="btn btn-accent"
            style={{ marginLeft: 'auto' }}
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit size={16} />
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Manage your dog's profile and health information
        </p>
      </div>

      {/* Profile Photo and Basic Info */}
      <div className="card">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'var(--accent-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            margin: '0 auto 16px',
            border: '4px solid var(--primary-color)',
            boxShadow: 'var(--shadow)'
          }}>
            {profile.photo}
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
            {profile.name}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            {profile.breed}
          </p>
        </div>

        {isEditing ? (
          <div className="form-group">
            <label className="form-label">Profile Photo</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter emoji or description"
              value={editProfile.photo}
              onChange={(e) => setEditProfile({...editProfile, photo: e.target.value})}
            />
          </div>
        ) : null}
      </div>

      {/* Health Metrics */}
      <div className="card">
        <div className="card-header">
          <Heart />
          <h2 className="card-title">Health Metrics</h2>
        </div>
        <div className="stats-grid">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="stat-card" style={{ background: `linear-gradient(135deg, ${metric.color}, ${metric.color}dd)` }}>
              <metric.icon size={24} style={{ marginBottom: '8px' }} />
              <div className="stat-value">{metric.value}</div>
              <div className="stat-label">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Basic Information */}
      <div className="card">
        <div className="card-header">
          <User />
          <h2 className="card-title">Basic Information</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>Name:</span>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                style={{ width: '60%' }}
                value={editProfile.name}
                onChange={(e) => setEditProfile({...editProfile, name: e.target.value})}
              />
            ) : (
              <span>{profile.name}</span>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>Breed:</span>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                style={{ width: '60%' }}
                value={editProfile.breed}
                onChange={(e) => setEditProfile({...editProfile, breed: e.target.value})}
              />
            ) : (
              <span>{profile.breed}</span>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>Age:</span>
            {isEditing ? (
              <input
                type="number"
                className="form-input"
                style={{ width: '60%' }}
                value={editProfile.age}
                onChange={(e) => setEditProfile({...editProfile, age: parseInt(e.target.value)})}
              />
            ) : (
              <span>{profile.age} years</span>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>Weight:</span>
            {isEditing ? (
              <input
                type="number"
                step="0.1"
                className="form-input"
                style={{ width: '60%' }}
                value={editProfile.weight}
                onChange={(e) => setEditProfile({...editProfile, weight: parseFloat(e.target.value)})}
              />
            ) : (
              <span>{profile.weight} kg</span>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>Owner:</span>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                style={{ width: '60%' }}
                value={editProfile.owner}
                onChange={(e) => setEditProfile({...editProfile, owner: e.target.value})}
              />
            ) : (
              <span>{profile.owner}</span>
            )}
          </div>
        </div>
      </div>

      {/* Medical Information */}
      <div className="card">
        <div className="card-header">
          <Heart />
          <h2 className="card-title">Medical Information</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="form-label">Microchip ID:</label>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                value={editProfile.microchip}
                onChange={(e) => setEditProfile({...editProfile, microchip: e.target.value})}
              />
            ) : (
              <div style={{ padding: '8px', background: 'var(--background-secondary)', borderRadius: 'var(--border-radius)' }}>
                {profile.microchip}
              </div>
            )}
          </div>
          <div>
            <label className="form-label">Veterinarian:</label>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                value={editProfile.vet}
                onChange={(e) => setEditProfile({...editProfile, vet: e.target.value})}
              />
            ) : (
              <div style={{ padding: '8px', background: 'var(--background-secondary)', borderRadius: 'var(--border-radius)' }}>
                {profile.vet}
              </div>
            )}
          </div>
          <div>
            <label className="form-label">Emergency Contact:</label>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                value={editProfile.emergencyContact}
                onChange={(e) => setEditProfile({...editProfile, emergencyContact: e.target.value})}
              />
            ) : (
              <div style={{ padding: '8px', background: 'var(--background-secondary)', borderRadius: 'var(--border-radius)' }}>
                {profile.emergencyContact}
              </div>
            )}
          </div>
          <div>
            <label className="form-label">Health Notes:</label>
            {isEditing ? (
              <textarea
                className="form-input"
                rows={3}
                value={editProfile.healthNotes}
                onChange={(e) => setEditProfile({...editProfile, healthNotes: e.target.value})}
              />
            ) : (
              <div style={{ padding: '8px', background: 'var(--background-secondary)', borderRadius: 'var(--border-radius)' }}>
                {profile.healthNotes}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Health History */}
      <div className="card">
        <div className="card-header">
          <Calendar />
          <h2 className="card-title">Health History</h2>
        </div>
        <div className="activity-feed">
          {healthHistory.map((record, index) => (
            <div key={index} className="activity-item">
              <div 
                className="activity-icon"
                style={{ 
                  background: record.status === 'completed' ? 'var(--success-color)' : 'var(--warning-color)'
                }}
              >
                <Heart size={20} />
              </div>
              <div className="activity-content">
                <div className="activity-title">{record.type}</div>
                <div className="activity-time">{record.date} - {record.description}</div>
              </div>
              <div style={{
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                background: record.status === 'completed' ? 'var(--success-color)' : 'var(--warning-color)',
                color: 'white'
              }}>
                {record.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="card">
        <div className="card-header">
          <Activity />
          <h2 className="card-title">Preferences & Habits</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {profile.preferences.map((preference, index) => (
            <div key={index} style={{
              padding: '12px',
              background: 'var(--background-secondary)',
              borderRadius: 'var(--border-radius)',
              borderLeft: '4px solid var(--primary-color)'
            }}>
              {preference}
            </div>
          ))}
        </div>
      </div>

      {/* Save/Cancel Buttons */}
      {isEditing && (
        <div className="card">
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DogProfile;