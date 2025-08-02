import React, { useState } from 'react';
import { Utensils, Plus, Calendar, Target, BarChart3, Clock } from 'lucide-react';

interface Meal {
  id: string;
  name: string;
  calories: number;
  time: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

const NutritionTracker: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([
    { id: '1', name: 'Premium Dog Food', calories: 300, time: '08:00', type: 'breakfast' },
    { id: '2', name: 'Chicken & Rice', calories: 400, time: '12:00', type: 'lunch' },
    { id: '3', name: 'Treats', calories: 50, time: '15:00', type: 'snack' },
  ]);

  const [showAddMeal, setShowAddMeal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
    time: '',
    type: 'breakfast' as Meal['type']
  });

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const targetCalories = 1000;
  const calorieProgress = (totalCalories / targetCalories) * 100;

  const mealTypes = [
    { type: 'breakfast', label: 'Breakfast', icon: '🌅' },
    { type: 'lunch', label: 'Lunch', icon: '☀️' },
    { type: 'dinner', label: 'Dinner', icon: '🌙' },
    { type: 'snack', label: 'Snacks', icon: '🍖' },
  ];

  const nutritionalBreakdown = [
    { nutrient: 'Protein', value: '25g', percentage: 85, color: '#FF6B6B' },
    { nutrient: 'Fat', value: '15g', percentage: 60, color: '#4ECDC4' },
    { nutrient: 'Carbs', value: '45g', percentage: 75, color: '#FFE66D' },
    { nutrient: 'Fiber', value: '8g', percentage: 90, color: '#95E1D3' },
  ];

  const handleAddMeal = () => {
    if (newMeal.name && newMeal.calories && newMeal.time) {
      const meal: Meal = {
        id: Date.now().toString(),
        name: newMeal.name,
        calories: parseInt(newMeal.calories),
        time: newMeal.time,
        type: newMeal.type
      };
      setMeals([...meals, meal]);
      setNewMeal({ name: '', calories: '', time: '', type: 'breakfast' });
      setShowAddMeal(false);
    }
  };

  return (
    <div className="nutrition-tracker">
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <Utensils />
          <h1 className="card-title">Nutrition Tracker</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Keep track of your dog's daily nutrition and health
        </p>
      </div>

      {/* Calorie Overview */}
      <div className="card">
        <div className="card-header">
          <Target />
          <h2 className="card-title">Daily Calories</h2>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '48px', fontWeight: '700', color: 'var(--primary-color)' }}>
            {totalCalories}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>of {targetCalories} calories</div>
        </div>
        <div style={{ 
          width: '100%', 
          height: '12px', 
          background: 'var(--background-secondary)', 
          borderRadius: '6px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${Math.min(calorieProgress, 100)}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Add Meal Button */}
      <div className="card">
        <button 
          className="btn btn-primary bone-btn" 
          style={{ width: '100%' }}
          onClick={() => setShowAddMeal(true)}
        >
          <Plus size={16} />
          Add Meal
        </button>
      </div>

      {/* Add Meal Form */}
      {showAddMeal && (
        <div className="card">
          <div className="card-header">
            <Plus />
            <h2 className="card-title">Add New Meal</h2>
          </div>
          <div className="form-group">
            <label className="form-label">Meal Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Premium Dog Food"
              value={newMeal.name}
              onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Calories</label>
            <input
              type="number"
              className="form-input"
              placeholder="e.g., 300"
              value={newMeal.calories}
              onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Time</label>
            <input
              type="time"
              className="form-input"
              value={newMeal.time}
              onChange={(e) => setNewMeal({...newMeal, time: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Meal Type</label>
            <select
              className="form-input"
              value={newMeal.type}
              onChange={(e) => setNewMeal({...newMeal, type: e.target.value as Meal['type']})}
            >
              {mealTypes.map(type => (
                <option key={type.type} value={type.type}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-primary" onClick={handleAddMeal}>
              Add Meal
            </button>
            <button className="btn btn-secondary" onClick={() => setShowAddMeal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Today's Meals */}
      <div className="card">
        <div className="card-header">
          <Calendar />
          <h2 className="card-title">Today's Meals</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {meals.map(meal => (
            <div key={meal.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              background: 'var(--background-secondary)',
              borderRadius: 'var(--border-radius)',
              border: '2px solid transparent',
              transition: 'all 0.3s ease'
            }}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{meal.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <Clock size={12} />
                  {meal.time}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '700', color: 'var(--primary-color)' }}>{meal.calories} cal</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {mealTypes.find(t => t.type === meal.type)?.icon} {meal.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nutritional Breakdown */}
      <div className="card">
        <div className="card-header">
          <BarChart3 />
          <h2 className="card-title">Nutritional Breakdown</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {nutritionalBreakdown.map((nutrient, index) => (
            <div key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: '600' }}>{nutrient.nutrient}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{nutrient.value}</span>
              </div>
              <div style={{ 
                width: '100%', 
                height: '8px', 
                background: 'var(--background-secondary)', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${nutrient.percentage}%`,
                  height: '100%',
                  background: nutrient.color,
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diet Tips */}
      <div className="card">
        <div className="card-header">
          <Utensils />
          <h2 className="card-title">Diet Tips</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{
            padding: '12px',
            background: 'var(--background-secondary)',
            borderRadius: 'var(--border-radius)',
            borderLeft: '4px solid var(--success-color)'
          }}>
            🥩 Ensure adequate protein for muscle health
          </div>
          <div style={{
            padding: '12px',
            background: 'var(--background-secondary)',
            borderRadius: 'var(--border-radius)',
            borderLeft: '4px solid var(--warning-color)'
          }}>
            💧 Keep fresh water available at all times
          </div>
          <div style={{
            padding: '12px',
            background: 'var(--background-secondary)',
            borderRadius: 'var(--border-radius)',
            borderLeft: '4px solid var(--primary-color)'
          }}>
            🍎 Include healthy treats in moderation
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionTracker;