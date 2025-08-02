import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HealthAnalysis } from '../types';

interface HealthScoreCardProps {
  analysis: HealthAnalysis;
  showDetails?: boolean;
}

export const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ 
  analysis, 
  showDetails = false 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4CAF50'; // Green
    if (score >= 60) return '#FF9800'; // Orange
    if (score >= 40) return '#FF5722'; // Red-Orange
    return '#F44336'; // Red
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return 'happy';
    if (score >= 60) return 'checkmark-circle';
    if (score >= 40) return 'warning';
    return 'close-circle';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoreSection}>
        <View style={[styles.scoreCircle, { borderColor: getScoreColor(analysis.score) }]}>
          <Text style={[styles.scoreText, { color: getScoreColor(analysis.score) }]}>
            {analysis.score}
          </Text>
        </View>
        <View style={styles.scoreInfo}>
          <Text style={[styles.scoreLabel, { color: getScoreColor(analysis.score) }]}>
            {getScoreText(analysis.score)}
          </Text>
          <Text style={styles.categoryText}>{analysis.category}</Text>
        </View>
        <Ionicons 
          name={getScoreIcon(analysis.score) as any} 
          size={32} 
          color={getScoreColor(analysis.score)} 
        />
      </View>

      {showDetails && (
        <View style={styles.detailsSection}>
          {analysis.positiveFactors.length > 0 && (
            <View style={styles.factorsSection}>
              <Text style={styles.factorsTitle}>✅ Positive Factors:</Text>
              {analysis.positiveFactors.map((factor, index) => (
                <Text key={index} style={styles.factorText}>• {factor}</Text>
              ))}
            </View>
          )}

          {analysis.negativeFactors.length > 0 && (
            <View style={styles.factorsSection}>
              <Text style={styles.factorsTitle}>❌ Concerns:</Text>
              {analysis.negativeFactors.map((factor, index) => (
                <Text key={index} style={styles.factorText}>• {factor}</Text>
              ))}
            </View>
          )}

          {analysis.warnings.length > 0 && (
            <View style={styles.warningsSection}>
              <Text style={styles.warningsTitle}>⚠️ Warnings:</Text>
              {analysis.warnings.map((warning, index) => (
                <Text key={index} style={styles.warningText}>• {warning}</Text>
              ))}
            </View>
          )}

          {analysis.recommendations.length > 0 && (
            <View style={styles.recommendationsSection}>
              <Text style={styles.recommendationsTitle}>💡 Recommendations:</Text>
              {analysis.recommendations.map((recommendation, index) => (
                <Text key={index} style={styles.recommendationText}>• {recommendation}</Text>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreInfo: {
    flex: 1,
    marginLeft: 16,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  detailsSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  factorsSection: {
    marginBottom: 12,
  },
  factorsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  factorText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    marginBottom: 4,
  },
  warningsSection: {
    marginBottom: 12,
  },
  warningsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#F44336',
  },
  warningText: {
    fontSize: 14,
    color: '#F44336',
    marginLeft: 8,
    marginBottom: 4,
  },
  recommendationsSection: {
    marginBottom: 12,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4CAF50',
  },
  recommendationText: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 8,
    marginBottom: 4,
  },
});