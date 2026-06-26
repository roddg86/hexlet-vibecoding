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

// Water Calculator
class WaterCalculator {
    calculateDailyWater(weightKg, activityLevel) {
        const baseWater = weightKg * 0.035;
        return (baseWater * parseFloat(activityLevel)).toFixed(2);
    }

    getCupsPerDay(liters) {
        return Math.round(liters / 0.25);
    }

    getSchedule(liters) {
        const cupsPerDay = this.getCupsPerDay(liters);
        const hoursAwake = 16;
        const interval = Math.round(hoursAwake / 8);
        const cupsPerInterval = Math.ceil(cupsPerDay / 8);
        return `Рекомендуется пить ${cupsPerInterval} стакана воды каждые ${interval} часа в течение дня`;
    }
}

// Vitamins and Minerals Calculator
class VitaminsCalculator {
    calculateVitaminsAndMinerals(weight, gender, age) {
        return {
            vitaminA: this.calculateVitaminA(gender, age),
            vitaminD: this.calculateVitaminD(age),
            vitaminC: this.calculateVitaminC(gender),
            vitaminB12: this.calculateVitaminB12(gender),
            calcium: this.calculateCalcium(age, gender),
            iron: this.calculateIron(gender, age),
            magnesium: this.calculateMagnesium(gender, age),
            zinc: this.calculateZinc(gender)
        };
    }

    calculateVitaminA(gender, age) {
        if (gender === 'male') {
            return age < 14 ? 600 : 900;
        } else {
            return age < 14 ? 600 : 700;
        }
    }

    calculateVitaminD(age) {
        if (age < 1) return 10;
        if (age < 71) return 15;
        return 20;
    }

    calculateVitaminC(gender) {
        return gender === 'male' ? 90 : 75;
    }

    calculateVitaminB12(gender) {
        return 2.4;
    }

    calculateCalcium(age, gender) {
        if (age < 9) return 700;
        if (age < 19) return 1300;
        if (gender === 'female' && age < 51) return 1000;
        if (gender === 'female') return 1200;
        if (age < 71) return 1000;
        return 1200;
    }

    calculateIron(gender, age) {
        if (gender === 'male') {
            return age < 19 ? 11 : 8;
        } else {
            return age < 19 ? 15 : (age < 51 ? 18 : 8);
        }
    }

    calculateMagnesium(gender, age) {
        if (gender === 'male') {
            return age < 14 ? (age < 9 ? 80 : 130) : (age < 31 ? 240 : 420);
        } else {
            return age < 14 ? (age < 9 ? 80 : 130) : (age < 31 ? 310 : 320);
        }
    }

    calculateZinc(gender) {
        return gender === 'male' ? 11 : 8;
    }

    getRecommendation(gender, age) {
        let recommendation = 'Рекомендуется получать витамины и минералы из разнообразных продуктов: ';

        if (age < 19) {
            recommendation += 'молочных продуктов для кальция и витамина D, мяса для железа и цинка, ';
        } else if (gender === 'female' && age < 51) {
            recommendation += 'обогащенных зерновых для железа, молочных продуктов для кальция, ';
        } else {
            recommendation += 'молочных продуктов для кальция и витамина D, ';
        }

        recommendation += 'цитрусовых для витамина C, орехов и семян для магния. ';
        recommendation += 'При необходимости проконсультируйтесь с врачом о приеме добавок.';

        return recommendation;
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
        this.waterCalculator = new WaterCalculator();
        this.vitaminsCalculator = new VitaminsCalculator();
        this.results = {
            bmi: null,
            calories: null,
            water: null,
            vitamins: null
        };
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

        // Water Form
        document.getElementById('water-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateWater();
        });

        // Vitamins Form
        document.getElementById('vitamins-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateVitamins();
        });

        // PDF Export Buttons
        this.setupPDFExportButtons();

        // Export All Results Button
        const exportAllBtn = document.getElementById('export-all-btn');
        if (exportAllBtn) {
            exportAllBtn.addEventListener('click', () => this.exportAllResults());
        }

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

    setupPDFExportButtons() {
        // Find all export buttons and attach event listeners
        const exportButtons = document.querySelectorAll('.btn-secondary');
        exportButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const resultId = button.parentElement.id;
                const filename = this.getFilenameForElement(resultId);
                exportPDF(resultId, filename);
            });
        });
    }

    getFilenameForElement(elementId) {
        const filenames = {
            'bmi-result': 'BMI_результаты.pdf',
            'calories-result': 'Калории_результаты.pdf',
            'water-result': 'Вода_результаты.pdf',
            'vitamins-result': 'Витамины_результаты.pdf'
        };
        return filenames[elementId] || 'результаты.pdf';
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

        // Store result
        this.results.bmi = {
            value: bmi,
            category: this.bmiCalculator.getCategoryText(category),
            description: description.textContent
        };

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

        // Store result
        this.results.calories = {
            value: calories,
            protein: macros.protein,
            fats: macros.fats,
            carbs: macros.carbs
        };

        resultDiv.classList.remove('hidden');
    }

    calculateWater() {
        const weight = parseFloat(document.getElementById('water-weight').value);
        const activity = document.getElementById('water-activity').value;

        if (!weight || !activity) return;

        const dailyWater = this.waterCalculator.calculateDailyWater(weight, activity);
        const schedule = this.waterCalculator.getSchedule(dailyWater);

        this.displayWaterResult(dailyWater, schedule);
    }

    displayWaterResult(liters, schedule) {
        const resultDiv = document.getElementById('water-result');
        document.getElementById('water-amount').textContent = liters;
        document.getElementById('water-cups-count').textContent = `Это примерно ${this.waterCalculator.getCupsPerDay(liters)} стаканов (250 мл) в день`;
        document.getElementById('water-schedule').textContent = schedule;

        // Store result
        this.results.water = {
            value: liters,
            cups: this.waterCalculator.getCupsPerDay(liters),
            schedule: schedule
        };

        resultDiv.classList.remove('hidden');
    }

    calculateVitamins() {
        const weight = parseFloat(document.getElementById('vitamins-weight').value);
        const gender = document.getElementById('vitamins-gender').value;
        const age = parseInt(document.getElementById('vitamins-age').value);

        if (!weight || !gender || !age) return;

        const vitamins = this.vitaminsCalculator.calculateVitaminsAndMinerals(weight, gender, age);
        const recommendation = this.vitaminsCalculator.getRecommendation(gender, age);

        this.displayVitaminsResult(vitamins, recommendation);
    }

    displayVitaminsResult(vitamins, recommendation) {
        const resultDiv = document.getElementById('vitamins-result');

        document.getElementById('vitamin-a').textContent = `${vitamins.vitaminA} мкг`;
        document.getElementById('vitamin-d').textContent = `${vitamins.vitaminD} мкг`;
        document.getElementById('vitamin-c').textContent = `${vitamins.vitaminC} мг`;
        document.getElementById('vitamin-b12').textContent = `${vitamins.vitaminB12} мкг`;
        document.getElementById('mineral-calcium').textContent = `${vitamins.calcium} мг`;
        document.getElementById('mineral-iron').textContent = `${vitamins.iron} мг`;
        document.getElementById('mineral-magnesium').textContent = `${vitamins.magnesium} мг`;
        document.getElementById('mineral-zinc').textContent = `${vitamins.zinc} мг`;

        document.getElementById('vitamins-note').textContent = recommendation;

        // Store result
        this.results.vitamins = vitamins;

        resultDiv.classList.remove('hidden');
    }

    exportAllResults() {
        const hasResults = this.results.bmi || this.results.calories || this.results.water || this.results.vitamins;

        if (!hasResults) {
            alert('Пожалуйста, выполните хотя бы один расчет перед экспортом.');
            return;
        }

        const userName = document.getElementById('user-name').value || 'Пользователь';

        try {
            // Create a temporary container for all results
            const tempContainer = document.createElement('div');
            tempContainer.style.display = 'none';
            tempContainer.id = 'all-results-container';
            tempContainer.innerHTML = this.createFullReportHTML(userName);
            document.body.appendChild(tempContainer);

            // Export the container
            exportPDF('all-results-container', `Отчет_${userName}_${new Date().toLocaleDateString('ru-RU')}.pdf`);

            // Remove temporary container after a delay
            setTimeout(() => {
                document.body.removeChild(tempContainer);
            }, 1000);
        } catch (error) {
            console.error('Error exporting all results:', error);
            alert('Ошибка при экспорте результатов');
        }
    }

    createFullReportHTML(userName) {
        let html = `<div style="padding: 20px; background: white; font-family: Arial, sans-serif;">`;
        html += `<h1 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 15px; margin-bottom: 20px;">Отчет калькулятора здоровья</h1>`;

        html += `<div style="margin-bottom: 15px; padding: 15px; background: #f5f5f5; border-radius: 8px;">`;
        html += `<p style="margin: 5px 0;"><strong>ФИО:</strong> ${userName}</p>`;
        html += `<p style="margin: 5px 0;"><strong>Дата:</strong> ${new Date().toLocaleDateString('ru-RU')}</p>`;
        html += `</div>`;

        // BMI Section
        if (this.results.bmi) {
            html += `<div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">`;
            html += `<h2 style="color: #667eea; font-size: 18px; margin-bottom: 10px;">Индекс массы тела (BMI)</h2>`;
            html += `<p><strong>Результат:</strong> ${this.results.bmi.value} кг/м²</p>`;
            html += `<p><strong>Категория:</strong> ${this.results.bmi.category}</p>`;
            html += `<p><strong>Рекомендации:</strong> ${this.results.bmi.description}</p>`;
            html += `</div>`;
        }

        // Calories Section
        if (this.results.calories) {
            html += `<div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">`;
            html += `<h2 style="color: #667eea; font-size: 18px; margin-bottom: 10px;">Дневная норма калорий</h2>`;
            html += `<p><strong>Калории:</strong> ${this.results.calories.value} ккал/день</p>`;
            html += `<p><strong>Белки:</strong> ${this.results.calories.protein} г</p>`;
            html += `<p><strong>Жиры:</strong> ${this.results.calories.fats} г</p>`;
            html += `<p><strong>Углеводы:</strong> ${this.results.calories.carbs} г</p>`;
            html += `</div>`;
        }

        // Water Section
        if (this.results.water) {
            html += `<div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">`;
            html += `<h2 style="color: #667eea; font-size: 18px; margin-bottom: 10px;">Дневная норма воды</h2>`;
            html += `<p><strong>Вода:</strong> ${this.results.water.value} л/день</p>`;
            html += `<p><strong>Стаканов (250мл):</strong> ${this.results.water.cups} в день</p>`;
            html += `<p><strong>Расписание:</strong> ${this.results.water.schedule}</p>`;
            html += `</div>`;
        }

        // Vitamins Section
        if (this.results.vitamins) {
            html += `<div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">`;
            html += `<h2 style="color: #667eea; font-size: 18px; margin-bottom: 10px;">Витамины и минералы</h2>`;
            html += `<p><strong>Витамин A:</strong> ${this.results.vitamins.vitaminA} мкг</p>`;
            html += `<p><strong>Витамин D:</strong> ${this.results.vitamins.vitaminD} мкг</p>`;
            html += `<p><strong>Витамин C:</strong> ${this.results.vitamins.vitaminC} мг</p>`;
            html += `<p><strong>Витамин B12:</strong> ${this.results.vitamins.vitaminB12} мкг</p>`;
            html += `<p><strong>Кальций:</strong> ${this.results.vitamins.calcium} мг</p>`;
            html += `<p><strong>Железо:</strong> ${this.results.vitamins.iron} мг</p>`;
            html += `<p><strong>Магний:</strong> ${this.results.vitamins.magnesium} мг</p>`;
            html += `<p><strong>Цинк:</strong> ${this.results.vitamins.zinc} мг</p>`;
            html += `</div>`;
        }

        html += `<div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; text-align: center; color: #999; font-size: 12px;">`;
        html += `<p>Этот отчет создан с помощью Калькулятора здоровья</p>`;
        html += `<p>Результаты предназначены только для справки и не являются медицинским советом</p>`;
        html += `</div>`;

        html += `</div>`;
        return html;
    }
}

// PDF Export Function - Primary method using browser print dialog
function exportPDF(elementId, filename) {
    const element = document.getElementById(elementId);

    if (!element) {
        console.error('Element not found:', elementId);
        alert('Ошибка: элемент не найден');
        return;
    }

    try {
        // Hide all other content for clean print
        hideOtherElements(elementId);

        // Show confirmation and start print
        setTimeout(() => {
            showExportInstructions(filename);
            window.print();

            // Show other content again after print dialog closes
            setTimeout(() => {
                showAllElements();
            }, 500);
        }, 100);
    } catch (error) {
        console.error('Error in exportPDF:', error);
        showAllElements();
        alert('Ошибка при экспорте. Пожалуйста, попробуйте ещё раз.');
    }
}

// Hide all elements except the target one for clean PDF
function hideOtherElements(elementId) {
    // Hide header
    const header = document.querySelector('header');
    if (header) header.style.display = 'none';

    // Hide tabs
    const tabs = document.querySelector('.tabs');
    if (tabs) tabs.style.display = 'none';

    // Hide all tab contents except the current one
    document.querySelectorAll('.tab-content').forEach(tab => {
        if (tab.id !== elementId.replace('-result', '')) {
            tab.style.display = 'none';
        }
    });

    // Hide footer
    const footer = document.querySelector('footer');
    if (footer) footer.style.display = 'none';

    // Hide buttons
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.style.display = 'none';
    });
}

// Show all elements again
function showAllElements() {
    document.querySelector('header').style.display = '';
    document.querySelector('.tabs').style.display = '';
    document.querySelector('footer').style.display = '';

    // Show active tab
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) activeTab.style.display = '';

    // Show buttons
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.style.display = '';
    });
}

// Show instructions to user
function showExportInstructions(filename) {
    const message = 'Откроется окно печати браузера.\n\n' +
                   'Для сохранения в PDF:\n' +
                   '1. Выберите принтер: "Сохранить как PDF"\n' +
                   '2. Нажмите "Сохранить"\n' +
                   '3. Назовите файл: ' + filename.replace('.pdf', '');
    console.log(message);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new UIController();
});
