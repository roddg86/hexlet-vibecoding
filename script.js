// BMI Calculator
class BMICalculator {
    calculate(heightCm, weightKg) {
        const heightM = heightCm / 100;
        return (weightKg / (heightM * heightM)).toFixed(1);
    }

    getCategory(bmi) {
        if (bmi < 18.5) return 'underweight';
        if (bmi < 25) return 'normal';
        if (bmi < 30) return 'overweight';
        return 'obese';
    }

    getCategoryText(category) {
        const translations = {
            underweight: 'Недостаточный вес',
            normal: 'Нормальный вес',
            overweight: 'Избыточный вес',
            obese: 'Ожирение'
        };
        return translations[category];
    }

    getDescription(category) {
        const descriptions = {
            underweight: 'Рекомендуется проконсультироваться с врачом для увеличения массы тела. Полноценное питание и физические упражнения помогут улучшить здоровье.',
            normal: 'Ваш вес находится в нормальном диапазоне. Продолжайте поддерживать здоровый образ жизни!',
            overweight: 'Рекомендуется снизить вес через правильное питание и физическую активность. Проконсультируйтесь с врачом для разработки плана.',
            obese: 'Важно снизить вес под руководством специалистов. Увеличьте физическую активность и измените пищевые привычки.'
        };
        return descriptions[category];
    }
}

// Daily Calorie Calculator (Harris-Benedict formula)
class CalorieCalculator {
    calculateBMR(age, gender, heightCm, weightKg) {
        if (gender === 'male') {
            return 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
        } else {
            return 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
        }
    }

    calculateDailyCalories(bmr, activityLevel) {
        return Math.round(bmr * parseFloat(activityLevel));
    }

    getMacroNutrients(calories) {
        return {
            protein: Math.round(calories * 0.25 / 4),
            fats: Math.round(calories * 0.30 / 9),
            carbs: Math.round(calories * 0.45 / 4)
        };
    }
}

// UI Controller
class UIController {
    constructor() {
        this.bmiCalculator = new BMICalculator();
        this.calorieCalculator = new CalorieCalculator();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // BMI Form
        document.getElementById('bmi-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateBMI();
        });

        // Calories Form
        document.getElementById('calories-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateCalories();
        });

        // Real-time input validation
        document.getElementById('bmi-height').addEventListener('input', (e) => {
            if (e.target.value && document.getElementById('bmi-weight').value) {
                this.calculateBMI();
            }
        });

        document.getElementById('bmi-weight').addEventListener('input', (e) => {
            if (e.target.value && document.getElementById('bmi-height').value) {
                this.calculateBMI();
            }
        });
    }

    switchTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        // Remove active class from all buttons
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });

        // Show selected tab
        document.getElementById(tabName).classList.add('active');

        // Add active class to clicked button
        event.target.classList.add('active');
    }

    calculateBMI() {
        const height = parseFloat(document.getElementById('bmi-height').value);
        const weight = parseFloat(document.getElementById('bmi-weight').value);

        if (!height || !weight) return;

        const bmi = this.bmiCalculator.calculate(height, weight);
        const category = this.bmiCalculator.getCategory(bmi);

        this.displayBMIResult(bmi, category);
    }

    displayBMIResult(bmi, category) {
        const resultDiv = document.getElementById('bmi-result');
        const bmiNumber = document.getElementById('bmi-number');
        const categoryDiv = document.getElementById('bmi-category');
        const description = document.getElementById('bmi-description');

        bmiNumber.textContent = bmi;
        categoryDiv.textContent = this.bmiCalculator.getCategoryText(category);
        categoryDiv.className = `result-category bmi-${category}`;
        description.textContent = this.bmiCalculator.getDescription(category);

        resultDiv.classList.remove('hidden');
    }

    calculateCalories() {
        const age = parseInt(document.getElementById('calories-age').value);
        const gender = document.getElementById('calories-gender').value;
        const height = parseFloat(document.getElementById('calories-height').value);
        const weight = parseFloat(document.getElementById('calories-weight').value);
        const activity = document.getElementById('calories-activity').value;

        if (!age || !gender || !height || !weight || !activity) return;

        const bmr = this.calorieCalculator.calculateBMR(age, gender, height, weight);
        const dailyCalories = this.calorieCalculator.calculateDailyCalories(bmr, activity);
        const macros = this.calorieCalculator.getMacroNutrients(dailyCalories);

        this.displayCaloriesResult(dailyCalories, macros);
    }

    displayCaloriesResult(calories, macros) {
        const resultDiv = document.getElementById('calories-result');
        document.getElementById('calories-number').textContent = calories;
        document.getElementById('macros-protein').textContent = `${macros.protein} г`;
        document.getElementById('macros-fats').textContent = `${macros.fats} г`;
        document.getElementById('macros-carbs').textContent = `${macros.carbs} г`;

        resultDiv.classList.remove('hidden');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new UIController();
});
