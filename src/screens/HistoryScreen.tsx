import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScanHistory } from '../types';
import { DatabaseService } from '../database/database';
import { ProductCard } from '../components/ProductCard';

export default function HistoryScreen() {
  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [comparisonMode, setComparisonMode] = useState(false);

  const database = new DatabaseService();

  useEffect(() => {
    loadScanHistory();
  }, []);

  const loadScanHistory = async () => {
    try {
      setLoading(true);
      const history = await database.getScanHistory();
      setScanHistory(history);
    } catch (error) {
      console.error('Error loading scan history:', error);
      Alert.alert('Error', 'Failed to load scan history');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this scan?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await database.deleteScanHistory(id);
              await loadScanHistory();
            } catch (error) {
              console.error('Error deleting item:', error);
              Alert.alert('Error', 'Failed to delete item');
            }
          },
        },
      ]
    );
  };

  const clearAllHistory = () => {
    Alert.alert(
      'Clear All History',
      'Are you sure you want to delete all scan history? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await database.clearAllHistory();
              setScanHistory([]);
            } catch (error) {
              console.error('Error clearing history:', error);
              Alert.alert('Error', 'Failed to clear history');
            }
          },
        },
      ]
    );
  };

  const toggleComparisonMode = () => {
    setComparisonMode(!comparisonMode);
    setSelectedItems([]);
  };

  const toggleItemSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const getAverageScore = () => {
    if (selectedItems.length === 0) return 0;
    const selectedProducts = scanHistory.filter(item => selectedItems.includes(item.id));
    const totalScore = selectedProducts.reduce((sum, item) => sum + item.product.healthScore, 0);
    return Math.round(totalScore / selectedProducts.length);
  };

  const renderHistoryItem = ({ item }: { item: ScanHistory }) => {
    const isSelected = selectedItems.includes(item.id);
    
    return (
      <View style={styles.historyItem}>
        {comparisonMode && (
          <TouchableOpacity
            style={[styles.checkbox, isSelected && styles.checkboxSelected]}
            onPress={() => toggleItemSelection(item.id)}
          >
            {isSelected && <Ionicons name="checkmark" size={16} color="white" />}
          </TouchableOpacity>
        )}
        
        <View style={styles.itemContent}>
          <ProductCard product={item.product} showFullDetails={false} />
          
          <View style={styles.itemActions}>
            <Text style={styles.timestamp}>
              {item.timestamp.toLocaleDateString()} at {item.timestamp.toLocaleTimeString()}
            </Text>
            
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteItem(item.id)}
            >
              <Ionicons name="trash" size={20} color="#F44336" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading scan history...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan History ({scanHistory.length})</Text>
        
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.actionButton, comparisonMode && styles.actionButtonActive]}
            onPress={toggleComparisonMode}
          >
            <Ionicons 
              name={comparisonMode ? "checkmark-circle" : "git-compare"} 
              size={20} 
              color={comparisonMode ? "white" : "#4CAF50"} 
            />
            <Text style={[styles.actionButtonText, comparisonMode && styles.actionButtonTextActive]}>
              {comparisonMode ? 'Exit' : 'Compare'}
            </Text>
          </TouchableOpacity>
          
          {scanHistory.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearAllHistory}
            >
              <Ionicons name="trash" size={20} color="#F44336" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {comparisonMode && selectedItems.length > 0 && (
        <View style={styles.comparisonBar}>
          <Text style={styles.comparisonText}>
            {selectedItems.length} items selected
          </Text>
          <Text style={styles.averageScore}>
            Average Score: {getAverageScore()}/100
          </Text>
        </View>
      )}

      {scanHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="scan-outline" size={64} color="#999" />
          <Text style={styles.emptyText}>No scan history yet</Text>
          <Text style={styles.emptySubtext}>
            Scan some products to see them here
          </Text>
        </View>
      ) : (
        <FlatList
          data={scanHistory}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4CAF50',
    marginRight: 8,
  },
  actionButtonActive: {
    backgroundColor: '#4CAF50',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 4,
  },
  actionButtonTextActive: {
    color: 'white',
  },
  clearButton: {
    padding: 8,
  },
  comparisonBar: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  comparisonText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  averageScore: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginVertical: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginRight: 12,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#4CAF50',
  },
  itemContent: {
    flex: 1,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 8,
  },
});