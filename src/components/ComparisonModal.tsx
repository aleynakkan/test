import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types';
import { HealthScoreCard } from './HealthScoreCard';

interface ComparisonModalProps {
  visible: boolean;
  products: Product[];
  onClose: () => void;
}

const { width } = Dimensions.get('window');

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  visible,
  products,
  onClose,
}) => {
  const getAverageScore = () => {
    if (products.length === 0) return 0;
    const totalScore = products.reduce((sum, product) => sum + product.healthScore, 0);
    return Math.round(totalScore / products.length);
  };

  const getBestProduct = () => {
    if (products.length === 0) return null;
    return products.reduce((best, current) => 
      current.healthScore > best.healthScore ? current : best
    );
  };

  const getWorstProduct = () => {
    if (products.length === 0) return null;
    return products.reduce((worst, current) => 
      current.healthScore < worst.healthScore ? current : worst
    );
  };

  const renderProductComparison = (product: Product, index: number) => (
    <View key={product.id} style={styles.productComparison}>
      <View style={styles.productHeader}>
        <Text style={styles.productNumber}>#{index + 1}</Text>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.productBrand}>{product.brand}</Text>
      </View>
      
      <HealthScoreCard analysis={product.healthAnalysis} showDetails={false} />
      
      <View style={styles.nutritionSummary}>
        <Text style={styles.summaryTitle}>Key Nutrition Facts</Text>
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>Calories:</Text>
          <Text style={styles.nutritionValue}>{product.nutritionFacts.calories} cal</Text>
        </View>
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>Sugars:</Text>
          <Text style={styles.nutritionValue}>{product.nutritionFacts.sugars}g</Text>
        </View>
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>Sodium:</Text>
          <Text style={styles.nutritionValue}>{product.nutritionFacts.sodium}mg</Text>
        </View>
        <View style={styles.nutritionRow}>
          <Text style={styles.nutritionLabel}>Fiber:</Text>
          <Text style={styles.nutritionValue}>{product.nutritionFacts.dietaryFiber}g</Text>
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Product Comparison</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {products.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="git-compare" size={64} color="#999" />
              <Text style={styles.emptyText}>No products to compare</Text>
              <Text style={styles.emptySubtext}>
                Select products from your scan history to compare them
              </Text>
            </View>
          ) : (
            <>
              {/* Summary Section */}
              <View style={styles.summarySection}>
                <Text style={styles.summaryTitle}>Comparison Summary</Text>
                <View style={styles.summaryStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Products</Text>
                    <Text style={styles.statValue}>{products.length}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Average Score</Text>
                    <Text style={styles.statValue}>{getAverageScore()}/100</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Best Score</Text>
                    <Text style={styles.statValue}>
                      {getBestProduct()?.healthScore || 0}/100
                    </Text>
                  </View>
                </View>
              </View>

              {/* Products Comparison */}
              <View style={styles.productsContainer}>
                {products.map((product, index) => 
                  renderProductComparison(product, index)
                )}
              </View>

              {/* Recommendations */}
              <View style={styles.recommendationsSection}>
                <Text style={styles.recommendationsTitle}>Recommendations</Text>
                {getBestProduct() && (
                  <View style={styles.recommendation}>
                    <Ionicons name="star" size={20} color="#4CAF50" />
                    <Text style={styles.recommendationText}>
                      <Text style={styles.bold}>Best choice:</Text> {getBestProduct()?.name}
                    </Text>
                  </View>
                )}
                {getWorstProduct() && getWorstProduct() !== getBestProduct() && (
                  <View style={styles.recommendation}>
                    <Ionicons name="warning" size={20} color="#FF9800" />
                    <Text style={styles.recommendationText}>
                      <Text style={styles.bold}>Avoid:</Text> {getWorstProduct()?.name}
                    </Text>
                  </View>
                )}
                <View style={styles.recommendation}>
                  <Ionicons name="information-circle" size={20} color="#2196F3" />
                  <Text style={styles.recommendationText}>
                    Consider factors like ingredients, nutrition balance, and your dietary needs
                  </Text>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
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
  summarySection: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  productsContainer: {
    paddingHorizontal: 16,
  },
  productComparison: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productHeader: {
    marginBottom: 12,
  },
  productNumber: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: '#666',
  },
  nutritionSummary: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#666',
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  recommendationsSection: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  recommendation: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recommendationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
});