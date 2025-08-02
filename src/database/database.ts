import * as SQLite from 'expo-sqlite';
import { Product, ScanHistory } from '../types';

export class DatabaseService {
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabase('health_scanner.db');
    this.initDatabase();
  }

  private initDatabase() {
    this.db.transaction(tx => {
      // Create products table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY,
          barcode TEXT NOT NULL,
          name TEXT NOT NULL,
          brand TEXT NOT NULL,
          ingredients TEXT NOT NULL,
          nutrition_facts TEXT NOT NULL,
          health_score INTEGER NOT NULL,
          health_analysis TEXT NOT NULL,
          image_url TEXT,
          scanned_at TEXT NOT NULL
        );`
      );

      // Create scan_history table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS scan_history (
          id TEXT PRIMARY KEY,
          product_id TEXT NOT NULL,
          timestamp TEXT NOT NULL,
          FOREIGN KEY (product_id) REFERENCES products (id)
        );`
      );
    });
  }

  async saveProduct(product: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `INSERT OR REPLACE INTO products 
           (id, barcode, name, brand, ingredients, nutrition_facts, health_score, health_analysis, image_url, scanned_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            product.id,
            product.barcode,
            product.name,
            product.brand,
            JSON.stringify(product.ingredients),
            JSON.stringify(product.nutritionFacts),
            product.healthScore,
            JSON.stringify(product.healthAnalysis),
            product.imageUrl || null,
            product.scannedAt.toISOString(),
          ],
          () => resolve(),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  async saveScanHistory(scanHistory: ScanHistory): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO scan_history (id, product_id, timestamp)
           VALUES (?, ?, ?)`,
          [
            scanHistory.id,
            scanHistory.product.id,
            scanHistory.timestamp.toISOString(),
          ],
          () => resolve(),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  async getScanHistory(): Promise<ScanHistory[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT sh.*, p.* FROM scan_history sh
           JOIN products p ON sh.product_id = p.id
           ORDER BY sh.timestamp DESC`,
          [],
          (_, { rows }) => {
            const history: ScanHistory[] = [];
            for (let i = 0; i < rows.length; i++) {
              const row = rows.item(i);
              const product: Product = {
                id: row.id,
                barcode: row.barcode,
                name: row.name,
                brand: row.brand,
                ingredients: JSON.parse(row.ingredients),
                nutritionFacts: JSON.parse(row.nutrition_facts),
                healthScore: row.health_score,
                healthAnalysis: JSON.parse(row.health_analysis),
                imageUrl: row.image_url,
                scannedAt: new Date(row.scanned_at),
              };

              history.push({
                id: row.id,
                product,
                timestamp: new Date(row.timestamp),
              });
            }
            resolve(history);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  async getProductById(id: string): Promise<Product | null> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM products WHERE id = ?`,
          [id],
          (_, { rows }) => {
            if (rows.length > 0) {
              const row = rows.item(0);
              const product: Product = {
                id: row.id,
                barcode: row.barcode,
                name: row.name,
                brand: row.brand,
                ingredients: JSON.parse(row.ingredients),
                nutritionFacts: JSON.parse(row.nutrition_facts),
                healthScore: row.health_score,
                healthAnalysis: JSON.parse(row.health_analysis),
                imageUrl: row.image_url,
                scannedAt: new Date(row.scanned_at),
              };
              resolve(product);
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  async deleteScanHistory(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `DELETE FROM scan_history WHERE id = ?`,
          [id],
          () => resolve(),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }

  async clearAllHistory(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `DELETE FROM scan_history`,
          [],
          () => resolve(),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  }
}