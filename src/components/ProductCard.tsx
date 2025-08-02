import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Product } from '../types';
import { HealthScoreCard } from './HealthScoreCard';

interface ProductCardProps {
  product: Product;
  showFullDetails?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showFullDetails = false 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {product.imageUrl && (
          <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
        )}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.brandName}>{product.brand}</Text>
          <Text style={styles.barcodeText}>Barcode: {product.barcode}</Text>
        </View>
      </View>

      <HealthScoreCard analysis={product.healthAnalysis} showDetails={showFullDetails} />

      {showFullDetails && (
        <View style={styles.detailsContainer}>
          <View style={styles.nutritionSection}>
            <Text style={styles.sectionTitle}>Nutrition Facts (per 100g)</Text>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Calories</Text>
                <Text style={styles.nutritionValue}>{product.nutritionFacts.calories} cal</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Fat</Text>
                <Text style={styles.nutritionValue}>{product.nutritionFacts.totalFat}g</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Saturated Fat</Text>
                <Text style={styles.nutritionValue}>{product.nutritionFacts.saturatedFat}g</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Sodium</Text>
                <Text style={styles.nutritionValue}>{product.nutritionFacts.sodium}mg</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Carbs</Text>
                <Text style={styles.nutritionValue}>{product.nutritionFacts.totalCarbohydrates}g</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Fiber</Text>
                <Text style={styles.nutritionValue}>{product.nutritionFacts.dietaryFiber}g</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Sugars</Text>
                <Text style={styles.nutritionValue}>{product.nutritionFacts.sugars}g</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Protein</Text>
                <Text style={styles.nutritionValue}>{product.nutritionFacts.protein}g</Text>
              </View>
            </View>
          </View>

          {product.ingredients.length > 0 && (
            <View style={styles.ingredientsSection}>
              <Text style={styles.sectionTitle}>Ingredients</Text>
              <Text style={styles.ingredientsText}>
                {product.ingredients.join(', ')}
              </Text>
            </View>
          )}

          <View style={styles.scanInfo}>
            <Text style={styles.scanDate}>
              Scanned: {product.scannedAt.toLocaleDateString()} at {product.scannedAt.toLocaleTimeString()}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  brandName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  barcodeText: {
    fontSize: 12,
    color: '#999',
  },
  detailsContainer: {
    padding: 16,
  },
  nutritionSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  ingredientsSection: {
    marginBottom: 16,
  },
  ingredientsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  scanInfo: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  scanDate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});