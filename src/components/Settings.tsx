import React, { useState } from 'react';
import { Settings, Bell, Shield, User, Palette, Globe, HelpCircle, LogOut, Moon, Sun, Volume2, VolumeX } from 'lucide-react';

interface AppSettings {
  notifications: {
    meals: boolean;
    walks: boolean;
    social: boolean;
    health: boolean;
  };
  appearance: {
    theme: 'light' | 'dark';
    fontSize: 'small' | 'medium' | 'large';
  };
  privacy: {
    shareLocation: boolean;
    shareProfile: boolean;
    allowMessages: boolean;
  };
  sound: {
    enabled: boolean;
    volume: number;
  };
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>({
    notifications: {
      meals: true,
      walks: true,
      social: true,
      health: true,
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
    },
    privacy: {
      shareLocation: true,
      shareProfile: true,
      allowMessages: true,
    },
    sound: {
      enabled: true,
      volume: 75,
    },
  });

  const handleNotificationToggle = (key: keyof AppSettings['notifications']) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
  };

  const handlePrivacyToggle = (key: keyof AppSettings['privacy']) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key],
      },
    });
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        theme,
      },
    });
  };

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        fontSize: size,
      },
    });
  };

  const handleSoundToggle = () => {
    setSettings({
      ...settings,
      sound: {
        ...settings.sound,
        enabled: !settings.sound.enabled,
      },
    });
  };

  const handleVolumeChange = (volume: number) => {
    setSettings({
      ...settings,
      sound: {
        ...settings.sound,
        volume,
      },
    });
  };

  const accountInfo = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    memberSince: 'January 2024',
    subscription: 'Premium',
  };

  const appInfo = {
    version: '1.0.0',
    build: '2024.01.15',
    lastUpdated: '2 days ago',
  };

  return (
    <div className="settings">
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <Settings />
          <h1 className="card-title">Settings</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Customize your PawJoy experience
        </p>
      </div>

      {/* Account Information */}
      <div className="card">
        <div className="card-header">
          <User />
          <h2 className="card-title">Account</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>Name:</span>
            <span>{accountInfo.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>Email:</span>
            <span>{accountInfo.email}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>Member Since:</span>
            <span>{accountInfo.memberSince}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>Subscription:</span>
            <span style={{ 
              padding: '4px 12px', 
              background: 'var(--accent-color)', 
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {accountInfo.subscription}
            </span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card">
        <div className="card-header">
          <Bell />
          <h2 className="card-title">Notifications</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '600' }}>Meal Reminders</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Get notified about feeding times
              </div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
              <input
                type="checkbox"
                checked={settings.notifications.meals}
                onChange={() => handleNotificationToggle('meals')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: settings.notifications.meals ? 'var(--primary-color)' : '#ccc',
                borderRadius: '24px',
                transition: '0.3s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '18px',
                  width: '18px',
                  left: '3px',
                  bottom: '3px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: '0.3s',
                  transform: settings.notifications.meals ? 'translateX(26px)' : 'translateX(0)'
                }} />
              </span>
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '600' }}>Walk Reminders</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Get notified about scheduled walks
              </div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
              <input
                type="checkbox"
                checked={settings.notifications.walks}
                onChange={() => handleNotificationToggle('walks')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: settings.notifications.walks ? 'var(--primary-color)' : '#ccc',
                borderRadius: '24px',
                transition: '0.3s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '18px',
                  width: '18px',
                  left: '3px',
                  bottom: '3px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: '0.3s',
                  transform: settings.notifications.walks ? 'translateX(26px)' : 'translateX(0)'
                }} />
              </span>
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '600' }}>Social Updates</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Get notified about community activity
              </div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
              <input
                type="checkbox"
                checked={settings.notifications.social}
                onChange={() => handleNotificationToggle('social')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: settings.notifications.social ? 'var(--primary-color)' : '#ccc',
                borderRadius: '24px',
                transition: '0.3s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '18px',
                  width: '18px',
                  left: '3px',
                  bottom: '3px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: '0.3s',
                  transform: settings.notifications.social ? 'translateX(26px)' : 'translateX(0)'
                }} />
              </span>
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '600' }}>Health Alerts</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Get notified about health checkups
              </div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
              <input
                type="checkbox"
                checked={settings.notifications.health}
                onChange={() => handleNotificationToggle('health')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: settings.notifications.health ? 'var(--primary-color)' : '#ccc',
                borderRadius: '24px',
                transition: '0.3s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '18px',
                  width: '18px',
                  left: '3px',
                  bottom: '3px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: '0.3s',
                  transform: settings.notifications.health ? 'translateX(26px)' : 'translateX(0)'
                }} />
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="card">
        <div className="card-header">
          <Palette />
          <h2 className="card-title">Appearance</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="form-label">Theme</label>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                className={`btn ${settings.appearance.theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleThemeChange('light')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Sun size={16} />
                Light
              </button>
              <button
                className={`btn ${settings.appearance.theme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleThemeChange('dark')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Moon size={16} />
                Dark
              </button>
            </div>
          </div>
          <div>
            <label className="form-label">Font Size</label>
            <select
              className="form-input"
              value={settings.appearance.fontSize}
              onChange={(e) => handleFontSizeChange(e.target.value as 'small' | 'medium' | 'large')}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="card">
        <div className="card-header">
          <Shield />
          <h2 className="card-title">Privacy</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '600' }}>Share Location</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Allow nearby dog owners to see your location
              </div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
              <input
                type="checkbox"
                checked={settings.privacy.shareLocation}
                onChange={() => handlePrivacyToggle('shareLocation')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: settings.privacy.shareLocation ? 'var(--primary-color)' : '#ccc',
                borderRadius: '24px',
                transition: '0.3s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '18px',
                  width: '18px',
                  left: '3px',
                  bottom: '3px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: '0.3s',
                  transform: settings.privacy.shareLocation ? 'translateX(26px)' : 'translateX(0)'
                }} />
              </span>
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '600' }}>Public Profile</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Allow others to view your dog's profile
              </div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
              <input
                type="checkbox"
                checked={settings.privacy.shareProfile}
                onChange={() => handlePrivacyToggle('shareProfile')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: settings.privacy.shareProfile ? 'var(--primary-color)' : '#ccc',
                borderRadius: '24px',
                transition: '0.3s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '18px',
                  width: '18px',
                  left: '3px',
                  bottom: '3px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: '0.3s',
                  transform: settings.privacy.shareProfile ? 'translateX(26px)' : 'translateX(0)'
                }} />
              </span>
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '600' }}>Allow Messages</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Allow other users to send you messages
              </div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
              <input
                type="checkbox"
                checked={settings.privacy.allowMessages}
                onChange={() => handlePrivacyToggle('allowMessages')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: settings.privacy.allowMessages ? 'var(--primary-color)' : '#ccc',
                borderRadius: '24px',
                transition: '0.3s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '18px',
                  width: '18px',
                  left: '3px',
                  bottom: '3px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: '0.3s',
                  transform: settings.privacy.allowMessages ? 'translateX(26px)' : 'translateX(0)'
                }} />
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Sound Settings */}
      <div className="card">
        <div className="card-header">
          {settings.sound.enabled ? <Volume2 /> : <VolumeX />}
          <h2 className="card-title">Sound</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>Enable Sounds</span>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
              <input
                type="checkbox"
                checked={settings.sound.enabled}
                onChange={handleSoundToggle}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: settings.sound.enabled ? 'var(--primary-color)' : '#ccc',
                borderRadius: '24px',
                transition: '0.3s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '18px',
                  width: '18px',
                  left: '3px',
                  bottom: '3px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: '0.3s',
                  transform: settings.sound.enabled ? 'translateX(26px)' : 'translateX(0)'
                }} />
              </span>
            </label>
          </div>
          {settings.sound.enabled && (
            <div>
              <label className="form-label">Volume</label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.sound.volume}
                onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  background: 'var(--background-secondary)',
                  outline: 'none',
                  WebkitAppearance: 'none',
                }}
              />
              <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '14px' }}>
                {settings.sound.volume}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* App Information */}
      <div className="card">
        <div className="card-header">
          <HelpCircle />
          <h2 className="card-title">About</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>Version:</span>
            <span>{appInfo.version}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>Build:</span>
            <span>{appInfo.build}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>Last Updated:</span>
            <span>{appInfo.lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="card">
        <button className="btn btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Settings;