export interface Product {
  id: string;
  barcode: string;
  name: string;
  brand: string;
  ingredients: string[];
  nutritionFacts: NutritionFacts;
  healthScore: number;
  healthAnalysis: HealthAnalysis;
  imageUrl?: string;
  scannedAt: Date;
}

export interface NutritionFacts {
  calories: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbohydrates: number;
  dietaryFiber: number;
  sugars: number;
  protein: number;
  servingSize: string;
}

export interface HealthAnalysis {
  score: number;
  category: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  positiveFactors: string[];
  negativeFactors: string[];
  recommendations: string[];
  warnings: string[];
}

export interface ScanHistory {
  id: string;
  product: Product;
  timestamp: Date;
}

export interface HealthCriteria {
  maxCalories: number;
  maxSodium: number;
  maxSugars: number;
  maxSaturatedFat: number;
  minFiber: number;
  minProtein: number;
}

export interface BarcodeAPIResponse {
  product: {
    product_name: string;
    brands: string;
    ingredients_text: string;
    nutriments: {
      energy_100g: number;
      fat_100g: number;
      saturated_fat_100g: number;
      carbohydrates_100g: number;
      sugars_100g: number;
      fiber_100g: number;
      proteins_100g: number;
      salt_100g: number;
    };
    image_url?: string;
  };
}