import { Product, NutritionFacts, HealthAnalysis, HealthCriteria } from '../types';

// Default health criteria based on general dietary guidelines
const DEFAULT_CRITERIA: HealthCriteria = {
  maxCalories: 400,
  maxSodium: 500,
  maxSugars: 25,
  maxSaturatedFat: 5,
  minFiber: 3,
  minProtein: 10,
};

// Unhealthy ingredients to watch out for
const UNHEALTHY_INGREDIENTS = [
  'high fructose corn syrup',
  'partially hydrogenated',
  'trans fat',
  'artificial sweeteners',
  'artificial colors',
  'artificial flavors',
  'monosodium glutamate',
  'msg',
  'sodium nitrite',
  'sodium nitrate',
  'bha',
  'bht',
  'potassium bromate',
  'propylene glycol',
  'carrageenan',
  'sulfites',
];

// Healthy ingredients that boost score
const HEALTHY_INGREDIENTS = [
  'whole grain',
  'organic',
  'natural',
  'no artificial',
  'fiber',
  'protein',
  'vitamin',
  'mineral',
  'antioxidant',
  'omega-3',
  'probiotic',
];

export class HealthAnalyzer {
  private criteria: HealthCriteria;

  constructor(criteria: HealthCriteria = DEFAULT_CRITERIA) {
    this.criteria = criteria;
  }

  analyzeProduct(product: Product): HealthAnalysis {
    const nutrition = product.nutritionFacts;
    const ingredients = product.ingredients.map(ing => ing.toLowerCase());
    
    let score = 100; // Start with perfect score
    const positiveFactors: string[] = [];
    const negativeFactors: string[] = [];
    const recommendations: string[] = [];
    const warnings: string[] = [];

    // Analyze calories
    if (nutrition.calories > this.criteria.maxCalories) {
      const deduction = Math.min(20, (nutrition.calories - this.criteria.maxCalories) / 10);
      score -= deduction;
      negativeFactors.push(`High calorie content (${nutrition.calories} cal)`);
    } else if (nutrition.calories < this.criteria.maxCalories * 0.5) {
      positiveFactors.push('Low calorie content');
    }

    // Analyze sodium
    if (nutrition.sodium > this.criteria.maxSodium) {
      const deduction = Math.min(15, (nutrition.sodium - this.criteria.maxSodium) / 50);
      score -= deduction;
      negativeFactors.push(`High sodium content (${nutrition.sodium}mg)`);
      warnings.push('High sodium can contribute to high blood pressure');
    } else if (nutrition.sodium < this.criteria.maxSodium * 0.5) {
      positiveFactors.push('Low sodium content');
    }

    // Analyze sugars
    if (nutrition.sugars > this.criteria.maxSugars) {
      const deduction = Math.min(20, (nutrition.sugars - this.criteria.maxSugars) / 5);
      score -= deduction;
      negativeFactors.push(`High sugar content (${nutrition.sugars}g)`);
      warnings.push('High sugar content can lead to weight gain and diabetes');
    } else if (nutrition.sugars < this.criteria.maxSugars * 0.5) {
      positiveFactors.push('Low sugar content');
    }

    // Analyze saturated fat
    if (nutrition.saturatedFat > this.criteria.maxSaturatedFat) {
      const deduction = Math.min(15, (nutrition.saturatedFat - this.criteria.maxSaturatedFat) / 2);
      score -= deduction;
      negativeFactors.push(`High saturated fat (${nutrition.saturatedFat}g)`);
      warnings.push('High saturated fat can increase cholesterol levels');
    } else if (nutrition.saturatedFat < this.criteria.maxSaturatedFat * 0.5) {
      positiveFactors.push('Low saturated fat content');
    }

    // Analyze fiber
    if (nutrition.dietaryFiber < this.criteria.minFiber) {
      score -= 10;
      negativeFactors.push(`Low fiber content (${nutrition.dietaryFiber}g)`);
      recommendations.push('Consider products with more fiber for better digestion');
    } else {
      positiveFactors.push('Good fiber content');
    }

    // Analyze protein
    if (nutrition.protein < this.criteria.minProtein) {
      score -= 5;
      negativeFactors.push(`Low protein content (${nutrition.protein}g)`);
    } else {
      positiveFactors.push('Good protein content');
    }

    // Analyze ingredients
    const unhealthyFound = UNHEALTHY_INGREDIENTS.filter(ingredient =>
      ingredients.some(ing => ing.includes(ingredient))
    );
    
    if (unhealthyFound.length > 0) {
      score -= unhealthyFound.length * 10;
      negativeFactors.push(`Contains unhealthy ingredients: ${unhealthyFound.join(', ')}`);
      warnings.push('Contains artificial or processed ingredients');
    }

    const healthyFound = HEALTHY_INGREDIENTS.filter(ingredient =>
      ingredients.some(ing => ing.includes(ingredient))
    );
    
    if (healthyFound.length > 0) {
      score += Math.min(10, healthyFound.length * 2);
      positiveFactors.push(`Contains healthy ingredients: ${healthyFound.join(', ')}`);
    }

    // Ensure score is within bounds
    score = Math.max(0, Math.min(100, score));

    // Determine category
    let category: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    if (score >= 80) {
      category = 'Excellent';
    } else if (score >= 60) {
      category = 'Good';
    } else if (score >= 40) {
      category = 'Fair';
    } else {
      category = 'Poor';
    }

    // Generate recommendations
    if (score < 70) {
      recommendations.push('Consider healthier alternatives');
      recommendations.push('Read ingredient labels carefully');
    }
    
    if (score >= 80) {
      recommendations.push('This is a healthy choice!');
    }

    return {
      score: Math.round(score),
      category,
      positiveFactors,
      negativeFactors,
      recommendations,
      warnings,
    };
  }

  updateCriteria(newCriteria: Partial<HealthCriteria>) {
    this.criteria = { ...this.criteria, ...newCriteria };
  }
}