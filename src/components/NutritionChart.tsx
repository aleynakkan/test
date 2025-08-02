import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { NutritionFacts } from '../types';

interface NutritionChartProps {
  nutritionFacts: NutritionFacts;
}

const { width } = Dimensions.get('window');

export const NutritionChart: React.FC<NutritionChartProps> = ({ nutritionFacts }) => {
  const maxValues = {
    calories: 500,
    totalFat: 50,
    saturatedFat: 20,
    sodium: 2000,
    totalCarbohydrates: 100,
    dietaryFiber: 25,
    sugars: 50,
    protein: 50,
  };

  const getBarColor = (nutrient: string, value: number, maxValue: number) => {
    const percentage = (value / maxValue) * 100;
    if (percentage > 80) return '#F44336'; // Red for high
    if (percentage > 60) return '#FF9800'; // Orange for moderate
    return '#4CAF50'; // Green for good
  };

  const renderBar = (label: string, value: number, maxValue: number, unit: string) => {
    const percentage = Math.min((value / maxValue) * 100, 100);
    const color = getBarColor(label, value, maxValue);

    return (
      <View style={styles.barContainer}>
        <View style={styles.barLabel}>
          <Text style={styles.barText}>{label}</Text>
          <Text style={styles.barValue}>{value} {unit}</Text>
        </View>
        <View style={styles.barBackground}>
          <View 
            style={[
              styles.barFill, 
              { 
                width: `${percentage}%`,
                backgroundColor: color,
              }
            ]} 
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutrition Breakdown</Text>
      <View style={styles.chartContainer}>
        {renderBar('Calories', nutritionFacts.calories, maxValues.calories, 'cal')}
        {renderBar('Total Fat', nutritionFacts.totalFat, maxValues.totalFat, 'g')}
        {renderBar('Saturated Fat', nutritionFacts.saturatedFat, maxValues.saturatedFat, 'g')}
        {renderBar('Sodium', nutritionFacts.sodium, maxValues.sodium, 'mg')}
        {renderBar('Carbohydrates', nutritionFacts.totalCarbohydrates, maxValues.totalCarbohydrates, 'g')}
        {renderBar('Fiber', nutritionFacts.dietaryFiber, maxValues.dietaryFiber, 'g')}
        {renderBar('Sugars', nutritionFacts.sugars, maxValues.sugars, 'g')}
        {renderBar('Protein', nutritionFacts.protein, maxValues.protein, 'g')}
      </View>
      
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#4CAF50' }]} />
          <Text style={styles.legendText}>Good</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#FF9800' }]} />
          <Text style={styles.legendText}>Moderate</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#F44336' }]} />
          <Text style={styles.legendText}>High</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  chartContainer: {
    marginBottom: 16,
  },
  barContainer: {
    marginBottom: 12,
  },
  barLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  barText: {
    fontSize: 14,
    color: '#666',
  },
  barValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  barBackground: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
});