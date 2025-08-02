import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types';
import { BarcodeAPIService } from '../services/barcodeAPI';
import { HealthAnalyzer } from '../services/healthAnalysis';
import { DatabaseService } from '../database/database';
import { ProductCard } from '../components/ProductCard';

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const barcodeAPI = new BarcodeAPIService();
  const healthAnalyzer = new HealthAnalyzer();
  const database = new DatabaseService();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
    if (scanned || scanning) return;
    
    setScanned(true);
    setScanning(true);
    setLoading(true);

    try {
      console.log('Scanned barcode:', data);
      
      // Fetch product data from API
      let product = await barcodeAPI.getProductByBarcode(data);
      
      if (!product) {
        // Create mock product if API doesn't have data
        product = barcodeAPI.createMockProduct(data);
      }

      // Analyze health score
      const healthAnalysis = healthAnalyzer.analyzeProduct(product);
      product.healthAnalysis = healthAnalysis;
      product.healthScore = healthAnalysis.score;

      // Save to database
      await database.saveProduct(product);
      await database.saveScanHistory({
        id: `${product.id}_${Date.now()}`,
        product,
        timestamp: new Date(),
      });

      setCurrentProduct(product);
      Alert.alert(
        'Product Scanned!',
        `${product.name} - Health Score: ${healthAnalysis.score}/100`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error processing scan:', error);
      Alert.alert('Error', 'Failed to process barcode. Please try again.');
    } finally {
      setLoading(false);
      setScanning(false);
    }
  };

  const resetScanner = () => {
    setScanned(false);
    setCurrentProduct(null);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Ionicons name="camera-outline" size={64} color="#999" />
        <Text style={styles.errorText}>No access to camera</Text>
        <Text style={styles.errorSubtext}>
          Camera permission is required to scan barcodes
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <View style={styles.scannerContainer}>
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13, BarCodeScanner.Constants.BarCodeType.ean8],
            }}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
            <View style={styles.overlay}>
              <View style={styles.scanFrame}>
                <View style={styles.corner} />
                <View style={styles.corner} />
                <View style={styles.corner} />
                <View style={styles.corner} />
              </View>
              <Text style={styles.scanText}>
                Position barcode within the frame
              </Text>
            </View>
          </Camera>
        </View>
      ) : (
        <ScrollView style={styles.resultContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.loadingText}>Analyzing product...</Text>
            </View>
          ) : currentProduct ? (
            <View>
              <ProductCard product={currentProduct} showFullDetails={true} />
              <TouchableOpacity style={styles.scanAgainButton} onPress={resetScanner}>
                <Ionicons name="scan" size={24} color="white" />
                <Text style={styles.scanAgainText}>Scan Another Product</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={64} color="#F44336" />
              <Text style={styles.errorText}>Failed to process barcode</Text>
              <TouchableOpacity style={styles.scanAgainButton} onPress={resetScanner}>
                <Text style={styles.scanAgainText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scannerContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#4CAF50',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#4CAF50',
    borderWidth: 3,
  },
  scanText: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  scanAgainButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  scanAgainText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});