# Health Scanner App

A React Native mobile application that helps users make healthier choices while shopping by scanning product barcodes and providing instant health analysis.

## 🎯 Overview

Health Scanner uses your smartphone's camera to scan product barcodes in supermarkets. The app then analyzes the product based on comprehensive health criteria and assigns a score from 0 to 100, helping you make informed decisions about the products you buy.

## ✨ Features

### 🔍 Barcode Scanning
- **Real-time scanning**: Use your phone's camera to scan product barcodes
- **Multiple formats**: Supports EAN-13 and EAN-8 barcode formats
- **Instant results**: Get product information and health analysis immediately

### 🏥 Health Analysis & Scoring
- **Comprehensive evaluation**: Analyzes ingredients, macronutrients, and nutritional content
- **Smart scoring system**: Assigns scores from 0 (least healthy) to 100 (most healthy)
- **Detailed feedback**: Provides positive factors, concerns, warnings, and recommendations
- **Visual indicators**: Color-coded scores and health categories

### 📊 Scan History & Comparison
- **Local storage**: All scanned products are saved locally on your device
- **History management**: View, delete, and manage your scan history
- **Product comparison**: Compare multiple products side by side
- **Trend analysis**: Track your shopping patterns and health choices

### 🎨 Modern UI/UX
- **Clean design**: Intuitive and user-friendly interface
- **Responsive layout**: Works seamlessly on different screen sizes
- **Visual feedback**: Charts, progress bars, and color-coded information
- **Smooth navigation**: Tab-based navigation with clear sections

## 🛠 Technical Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Database**: SQLite (local storage)
- **API**: Open Food Facts (product database)
- **UI Components**: Custom components with React Native
- **Navigation**: React Navigation
- **Icons**: Expo Vector Icons

## 📱 Screenshots

### Main Features
- **Scanner Screen**: Camera interface with barcode scanning
- **History Screen**: List of all scanned products with comparison tools
- **Profile Screen**: User settings and health criteria customization

### Key Components
- **Health Score Cards**: Visual representation of product health scores
- **Nutrition Charts**: Graphical breakdown of nutritional content
- **Product Cards**: Detailed product information display
- **Comparison Modal**: Side-by-side product comparison

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd health-scanner-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/simulator**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For web (development)
   npm run web
   ```

## 📋 Usage Guide

### Scanning Products
1. Open the app and navigate to the Scanner tab
2. Point your camera at a product barcode
3. Hold steady until the barcode is detected
4. View the health analysis and score
5. Save the scan to your history

### Viewing History
1. Go to the History tab
2. Browse your previously scanned products
3. Tap on any product for detailed information
4. Use the comparison mode to select multiple products

### Customizing Health Criteria
1. Navigate to the Profile tab
2. Adjust health criteria based on your dietary needs
3. Set maximum/minimum values for various nutrients
4. Reset to defaults if needed

## 🔧 Configuration

### Health Analysis Criteria
The app uses the following default health criteria:
- **Max Calories**: 400 cal
- **Max Sodium**: 500 mg
- **Max Sugars**: 25 g
- **Max Saturated Fat**: 5 g
- **Min Fiber**: 3 g
- **Min Protein**: 10 g

### API Configuration
- **Product Database**: Open Food Facts API
- **Fallback**: Mock data for products not in database
- **Rate Limiting**: Respects API rate limits

## 📊 Health Scoring Algorithm

The health scoring system evaluates products based on:

### Positive Factors
- Low calorie content
- Low sodium levels
- Low sugar content
- High fiber content
- Natural ingredients
- Organic certification

### Negative Factors
- High calorie content
- High sodium levels
- High sugar content
- Artificial ingredients
- Processed foods
- Unhealthy additives

### Score Categories
- **80-100**: Excellent (Green)
- **60-79**: Good (Orange)
- **40-59**: Fair (Red-Orange)
- **0-39**: Poor (Red)

## 🗄 Database Schema

### Products Table
```sql
CREATE TABLE products (
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
);
```

### Scan History Table
```sql
CREATE TABLE scan_history (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products (id)
);
```

## 🔒 Privacy & Security

- **Local Storage**: All data is stored locally on your device
- **No Cloud Sync**: Your scan history remains private
- **Camera Permissions**: Only used for barcode scanning
- **No Personal Data**: No personal information is collected or stored

## 🐛 Troubleshooting

### Common Issues

**Camera not working**
- Ensure camera permissions are granted
- Check if camera is being used by another app
- Restart the app if needed

**Barcode not scanning**
- Ensure good lighting conditions
- Hold the camera steady
- Try different angles
- Check if barcode is damaged or obscured

**App crashes**
- Clear app cache and restart
- Update to latest version
- Check device compatibility

### Development Issues

**Build errors**
```bash
# Clear cache
expo r -c

# Reset Metro bundler
npm start -- --reset-cache
```

**Dependency issues**
```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Open Food Facts**: For providing the product database API
- **Expo**: For the excellent development platform
- **React Native Community**: For the amazing ecosystem

## 📞 Support

If you encounter any issues or have questions:
- Check the troubleshooting section above
- Open an issue on GitHub
- Contact the development team

---

**Made with ❤️ for healthier choices**