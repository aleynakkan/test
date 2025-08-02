import axios from 'axios';
import { Product, NutritionFacts, BarcodeAPIResponse } from '../types';

const OPEN_FOOD_FACTS_API = 'https://world.openfoodfacts.org/api/v0/product/';

export class BarcodeAPIService {
  async getProductByBarcode(barcode: string): Promise<Product | null> {
    try {
      const response = await axios.get<BarcodeAPIResponse>(`${OPEN_FOOD_FACTS_API}${barcode}.json`);
      
      if (!response.data.product || response.data.product.product_name === '') {
        return null;
      }

      const apiProduct = response.data.product;
      
      // Parse ingredients
      const ingredients = apiProduct.ingredients_text 
        ? apiProduct.ingredients_text.split(',').map(ing => ing.trim())
        : [];

      // Convert nutrition data
      const nutriments = apiProduct.nutriments || {};
      const nutritionFacts: NutritionFacts = {
        calories: nutriments.energy_100g || 0,
        totalFat: nutriments.fat_100g || 0,
        saturatedFat: nutriments.saturated_fat_100g || 0,
        transFat: 0, // Not always available in API
        cholesterol: 0, // Not always available in API
        sodium: (nutriments.salt_100g || 0) * 400, // Convert salt to sodium (mg)
        totalCarbohydrates: nutriments.carbohydrates_100g || 0,
        dietaryFiber: nutriments.fiber_100g || 0,
        sugars: nutriments.sugars_100g || 0,
        protein: nutriments.proteins_100g || 0,
        servingSize: '100g', // Default serving size
      };

      const product: Product = {
        id: barcode,
        barcode,
        name: apiProduct.product_name || 'Unknown Product',
        brand: apiProduct.brands || 'Unknown Brand',
        ingredients,
        nutritionFacts,
        healthScore: 0, // Will be calculated by HealthAnalyzer
        healthAnalysis: {
          score: 0,
          category: 'Fair',
          positiveFactors: [],
          negativeFactors: [],
          recommendations: [],
          warnings: [],
        },
        imageUrl: apiProduct.image_url,
        scannedAt: new Date(),
      };

      return product;
    } catch (error) {
      console.error('Error fetching product data:', error);
      return null;
    }
  }

  // Fallback method for when API doesn't have data
  createMockProduct(barcode: string): Product {
    return {
      id: barcode,
      barcode,
      name: 'Product Not Found',
      brand: 'Unknown',
      ingredients: ['Ingredients not available'],
      nutritionFacts: {
        calories: 0,
        totalFat: 0,
        saturatedFat: 0,
        transFat: 0,
        cholesterol: 0,
        sodium: 0,
        totalCarbohydrates: 0,
        dietaryFiber: 0,
        sugars: 0,
        protein: 0,
        servingSize: '100g',
      },
      healthScore: 0,
      healthAnalysis: {
        score: 0,
        category: 'Poor',
        positiveFactors: [],
        negativeFactors: ['Product information not available'],
        recommendations: ['Try scanning a different product or check the barcode'],
        warnings: ['Limited product data available'],
      },
      scannedAt: new Date(),
    };
  }
}