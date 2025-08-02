import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HealthCriteria } from '../types';
import { HealthAnalyzer } from '../services/healthAnalysis';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [healthCriteria, setHealthCriteria] = useState<HealthCriteria>({
    maxCalories: 400,
    maxSodium: 500,
    maxSugars: 25,
    maxSaturatedFat: 5,
    minFiber: 3,
    minProtein: 10,
  });

  const handleResetCriteria = () => {
    Alert.alert(
      'Reset Health Criteria',
      'Are you sure you want to reset to default health criteria?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setHealthCriteria({
              maxCalories: 400,
              maxSodium: 500,
              maxSugars: 25,
              maxSaturatedFat: 5,
              minFiber: 3,
              minProtein: 10,
            });
          },
        },
      ]
    );
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle?: string,
    rightComponent?: React.ReactNode
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon as any} size={24} color="#4CAF50" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent}
    </View>
  );

  const renderCriteriaItem = (label: string, value: number, unit: string) => (
    <View style={styles.criteriaItem}>
      <Text style={styles.criteriaLabel}>{label}</Text>
      <Text style={styles.criteriaValue}>{value} {unit}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="white" />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileName}>Health Scanner User</Text>
            <Text style={styles.profileSubtitle}>Making healthier choices</Text>
          </View>
        </View>
      </View>

      {/* Health Criteria Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Health Criteria</Text>
          <TouchableOpacity onPress={handleResetCriteria}>
            <Ionicons name="refresh" size={20} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        <View style={styles.criteriaContainer}>
          {renderCriteriaItem('Max Calories', healthCriteria.maxCalories, 'cal')}
          {renderCriteriaItem('Max Sodium', healthCriteria.maxSodium, 'mg')}
          {renderCriteriaItem('Max Sugars', healthCriteria.maxSugars, 'g')}
          {renderCriteriaItem('Max Saturated Fat', healthCriteria.maxSaturatedFat, 'g')}
          {renderCriteriaItem('Min Fiber', healthCriteria.minFiber, 'g')}
          {renderCriteriaItem('Min Protein', healthCriteria.minProtein, 'g')}
        </View>
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        {renderSettingItem(
          'notifications',
          'Push Notifications',
          'Get alerts about healthy alternatives',
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#ddd', true: '#4CAF50' }}
            thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
          />
        )}
        {renderSettingItem(
          'moon',
          'Dark Mode',
          'Switch to dark theme',
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: '#ddd', true: '#4CAF50' }}
            thumbColor={darkModeEnabled ? '#fff' : '#f4f3f4'}
          />
        )}
      </View>

      {/* Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Information</Text>
        {renderSettingItem(
          'information-circle',
          'About Health Scanner',
          'Version 1.0.0'
        )}
        {renderSettingItem(
          'shield-checkmark',
          'Privacy Policy',
          'How we protect your data'
        )}
        {renderSettingItem(
          'document-text',
          'Terms of Service',
          'App usage terms'
        )}
        {renderSettingItem(
          'help-circle',
          'Help & Support',
          'Get help with the app'
        )}
      </View>

      {/* Data Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        {renderSettingItem(
          'download',
          'Export Scan History',
          'Save your data to file'
        )}
        {renderSettingItem(
          'cloud-upload',
          'Backup to Cloud',
          'Sync data across devices'
        )}
        {renderSettingItem(
          'trash',
          'Clear All Data',
          'Delete all scan history',
          <TouchableOpacity>
            <Ionicons name="trash" size={20} color="#F44336" />
          </TouchableOpacity>
        )}
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.appInfoText}>
          Health Scanner helps you make informed decisions about the products you buy.
        </Text>
        <Text style={styles.appInfoText}>
          Scan barcodes to get instant health analysis and recommendations.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  section: {
    backgroundColor: 'white',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  criteriaContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
  },
  criteriaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  criteriaLabel: {
    fontSize: 14,
    color: '#666',
  },
  criteriaValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  appInfo: {
    backgroundColor: 'white',
    marginTop: 16,
    marginBottom: 20,
    padding: 20,
  },
  appInfoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
});