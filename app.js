function searchDisease() {
  const input = document.getElementById('searchBar');
  const filter = input.value.toUpperCase();
  const diseases = document.getElementsByClassName('disease');
  
  for (let i = 0; i < diseases.length; i++) {
    const title = diseases[i].getElementsByTagName('h3')[0];
    if (title) {
      const txtValue = title.textContent || title.innerText;
      diseases[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    }
  }
}

// Hamburger Menu Toggle Function
function toggleMenu() {
  const menuIcon = document.getElementById("menuIcon");
  const navLinks = document.getElementById("navLinks");
  if (menuIcon && navLinks) {
    menuIcon.classList.toggle("open");
    navLinks.classList.toggle("open");
  }
}

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-item');
  
    // Toggle menu open/close on hamburger icon click
    if (menuIcon) {
      menuIcon.addEventListener('click', function () {
        menuIcon.classList.toggle('open');
        navLinks.classList.toggle('open');
      });
    }
  
    // Close the menu when any navigation link is clicked (mobile view)
    navItems.forEach(item => {
      item.addEventListener('click', function () {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          if (menuIcon) menuIcon.classList.remove('open');
        }
      });
    });
  
    // Ensure that if the window is resized to a larger viewport, any open classes are removed
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('open');
        if (menuIcon) menuIcon.classList.remove('open');
      }
    });
  });

  const accordions = document.getElementsByClassName("accordion");
    for (let i = 0; i < accordions.length; i++) {
      accordions[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
    function addEntry() {
      let glucose = document.getElementById('glucose').value;
      let meal = document.getElementById('meal').value;
      let exercise = document.getElementById('exercise').value;
      
      if (glucose === '' || meal === '' || exercise === '') {
          alert('Please fill in all fields');
          return;
      }
      
      let table = document.getElementById('log');
      let row = table.insertRow();
      row.innerHTML = `
          <td>${glucose}</td>
          <td>${meal}</td>
          <td>${exercise}</td>
          <td><button onclick="removeEntry(this)">Delete</button></td>
      `;
      
      document.getElementById('glucose').value = '';
      document.getElementById('meal').value = '';
      document.getElementById('exercise').value = '';
  }

  function removeEntry(btn) {
      let row = btn.parentNode.parentNode;
      row.parentNode.removeChild(row);
  }
  function addEntry() {
    let symptoms = document.getElementById('symptoms').value;
    let medication = document.getElementById('medication').value;
    let activities = document.getElementById('activities').value;
    
    if (symptoms === '' || medication === '' || activities === '') {
        alert('Please fill in all fields');
        return;
    }
    
    let table = document.getElementById('log');
    let row = table.insertRow();
    row.innerHTML = `
        <td>${symptoms}</td>
        <td>${medication}</td>
        <td>${activities}</td>
        <td><button onclick="removeEntry(this)">Delete</button></td>
    `;
    
    document.getElementById('symptoms').value = '';
    document.getElementById('medication').value = '';
    document.getElementById('activities').value = '';
}

function removeEntry(btn) {
    let row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// BMI Calculator
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to meters
    const resultDiv = document.getElementById('bmi-result');
    
    if (!weight || !height || weight <= 0 || height <= 0) {
        resultDiv.innerHTML = 'Please enter valid weight and height values';
        resultDiv.className = 'result-box result-warning';
        return;
    }
    
    const bmi = (weight / (height * height)).toFixed(1);
    let category, className;
    
    if (bmi < 18.5) {
        category = 'Underweight';
        className = 'result-warning';
    } else if (bmi < 25) {
        category = 'Normal weight';
        className = 'result-normal';
    } else if (bmi < 30) {
        category = 'Overweight';
        className = 'result-warning';
    } else {
        category = 'Obese';
        className = 'result-danger';
    }
    
    resultDiv.innerHTML = `Your BMI: <strong>${bmi}</strong><br>Category: <strong>${category}</strong>`;
    resultDiv.className = `result-box ${className}`;
}

// Blood Pressure Tracker
function addBPEntry() {
    const systolic = parseInt(document.getElementById('systolic').value);
    const diastolic = parseInt(document.getElementById('diastolic').value);
    const date = document.getElementById('bp-date').value;
    const statusDiv = document.getElementById('bp-status');
    const tableBody = document.getElementById('bp-log');
    
    if (!systolic || !diastolic || !date) {
        statusDiv.innerHTML = 'Please fill in all fields';
        statusDiv.className = 'result-box result-warning';
        return;
    }
    
    let status, className;
    
    if (systolic < 120 && diastolic < 80) {
        status = 'Normal';
        className = 'result-normal';
    } else if (systolic < 130 && diastolic < 80) {
        status = 'Elevated';
        className = 'result-warning';
    } else if (systolic < 140 || diastolic < 90) {
        status = 'High BP Stage 1';
        className = 'result-warning';
    } else if (systolic >= 140 || diastolic >= 90) {
        status = 'High BP Stage 2';
        className = 'result-danger';
    }
    
    if (systolic > 180 || diastolic > 120) {
        status = 'Hypertensive Crisis - Seek immediate medical attention!';
        className = 'result-danger';
    }
    
    statusDiv.innerHTML = `Current Status: <strong>${status}</strong>`;
    statusDiv.className = `result-box ${className}`;
    
    const row = tableBody.insertRow();
    row.innerHTML = `
        <td>${date}</td>
        <td>${systolic}</td>
        <td>${diastolic}</td>
        <td>${status}</td>
        <td><button onclick="removeBPEntry(this)">Delete</button></td>
    `;
    
    // Clear inputs
    document.getElementById('systolic').value = '';
    document.getElementById('diastolic').value = '';
    document.getElementById('bp-date').value = '';
}

function removeBPEntry(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Symptom Checker
function checkSymptoms() {
    const checkboxes = document.querySelectorAll('.symptom-checkboxes input[type="checkbox"]:checked');
    const resultDiv = document.getElementById('symptom-result');
    
    if (checkboxes.length === 0) {
        resultDiv.innerHTML = 'Please select at least one symptom';
        resultDiv.className = 'result-box result-warning';
        return;
    }
    
    const symptoms = Array.from(checkboxes).map(cb => cb.value);
    let suggestions = [];
    let urgency = 'normal';
    
    // Check for common conditions based on symptoms
    if (symptoms.includes('fever') && symptoms.includes('cough')) {
        suggestions.push('Possible flu or respiratory infection');
    }
    if (symptoms.includes('fever') && symptoms.includes('body-aches')) {
        suggestions.push('Could indicate viral infection like flu or malaria');
    }
    if (symptoms.includes('headache') && symptoms.includes('fever')) {
        suggestions.push('Monitor for typhoid or other infections');
    }
    if (symptoms.includes('breathing-difficulty')) {
        suggestions.push('⚠️ Difficulty breathing requires immediate medical attention');
        urgency = 'danger';
    }
    if (symptoms.includes('cough') && symptoms.includes('sore-throat')) {
        suggestions.push('Possible upper respiratory infection');
    }
    if (symptoms.includes('nausea') && symptoms.includes('fatigue')) {
        suggestions.push('Could indicate various conditions - monitor hydration');
    }
    
    if (suggestions.length === 0) {
        suggestions.push('Monitor your symptoms and rest');
    }
    
    suggestions.push('<br><strong>Important:</strong> This is not a diagnosis. Please consult a healthcare professional for proper medical advice.');
    
    resultDiv.innerHTML = suggestions.join('<br>');
    resultDiv.className = `result-box ${urgency === 'danger' ? 'result-danger' : 'result-normal'}`;
}

// Water Intake Tracker
let waterGlasses = 0;
const maxWater = 8;

function updateWaterDisplay() {
    const level = document.getElementById('waterLevel');
    const count = document.getElementById('waterCount');
    const message = document.getElementById('water-message');
    
    const percentage = (waterGlasses / maxWater) * 100;
    level.style.height = percentage + '%';
    count.textContent = `${waterGlasses} / ${maxWater} glasses`;
    
    if (waterGlasses >= maxWater) {
        message.innerHTML = '🎉 Great job! You\'ve reached your daily goal!';
        message.className = 'result-box result-normal';
    } else if (waterGlasses >= maxWater / 2) {
        message.innerHTML = '👍 Halfway there! Keep drinking!';
        message.className = 'result-box result-warning';
    } else {
        message.innerHTML = '';
        message.className = 'result-box';
    }
}

function addWater() {
    if (waterGlasses < maxWater) {
        waterGlasses++;
        updateWaterDisplay();
    }
}

function removeWater() {
    if (waterGlasses > 0) {
        waterGlasses--;
        updateWaterDisplay();
    }
}

function resetWater() {
    waterGlasses = 0;
    updateWaterDisplay();
}

// Calorie Calculator
function calculateCalories() {
    const age = parseInt(document.getElementById('cal-age').value);
    const weight = parseFloat(document.getElementById('cal-weight').value);
    const height = parseFloat(document.getElementById('cal-height').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const resultDiv = document.getElementById('calorie-result');
    
    if (!age || !weight || !height) {
        resultDiv.innerHTML = 'Please fill in all fields';
        resultDiv.className = 'result-box result-warning';
        return;
    }
    
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    const tdee = Math.round(bmr * activity);
    const weightLoss = Math.round(tdee - 500);
    const weightGain = Math.round(tdee + 500);
    
    resultDiv.innerHTML = `
        <strong>Your Daily Calorie Needs:</strong><br><br>
        🔥 Maintenance: <strong>${tdee} calories</strong><br>
        📉 Weight Loss: <strong>${weightLoss} calories</strong><br>
        📈 Weight Gain: <strong>${weightGain} calories</strong><br>
        <small>BMR (Basal Metabolic Rate): ${Math.round(bmr)} cal</small>
    `;
    resultDiv.className = 'result-box result-normal';
}

// Sleep Tracker
function addSleepEntry() {
    const date = document.getElementById('sleep-date').value;
    const bedtime = document.getElementById('bedtime').value;
    const waketime = document.getElementById('waketime').value;
    const quality = document.getElementById('sleep-quality').value;
    const resultDiv = document.getElementById('sleep-result');
    const tableBody = document.getElementById('sleep-log');
    
    if (!date || !bedtime || !waketime) {
        resultDiv.innerHTML = 'Please fill in all fields';
        resultDiv.className = 'result-box result-warning';
        return;
    }
    
    // Calculate hours slept
    const bed = new Date(`2000-01-01 ${bedtime}`);
    let wake = new Date(`2000-01-01 ${waketime}`);
    if (wake < bed) wake.setDate(wake.getDate() + 1);
    const hours = ((wake - bed) / (1000 * 60 * 60)).toFixed(1);
    
    let status, className;
    if (hours >= 7 && hours <= 9) {
        status = 'Optimal sleep duration! 😊';
        className = 'result-normal';
    } else if (hours < 6) {
        status = 'You need more sleep! 😴';
        className = 'result-danger';
    } else {
        status = 'Acceptable, but aim for 7-9 hours';
        className = 'result-warning';
    }
    
    resultDiv.innerHTML = `You slept <strong>${hours} hours</strong>. ${status}`;
    resultDiv.className = `result-box ${className}`;
    
    const row = tableBody.insertRow();
    row.innerHTML = `
        <td>${date}</td>
        <td>${hours}h</td>
        <td>${quality}</td>
        <td><button onclick="this.parentNode.parentNode.remove()">Delete</button></td>
    `;
    
    // Clear inputs
    document.getElementById('sleep-date').value = '';
    document.getElementById('bedtime').value = '';
    document.getElementById('waketime').value = '';
}

// Ideal Weight Calculator
function calculateIdealWeight() {
    const height = parseFloat(document.getElementById('iw-height').value);
    const gender = document.querySelector('input[name="iw-gender"]:checked').value;
    const resultDiv = document.getElementById('ideal-weight-result');
    
    if (!height || height < 100 || height > 250) {
        resultDiv.innerHTML = 'Please enter a valid height (100-250 cm)';
        resultDiv.className = 'result-box result-warning';
        return;
    }
    
    const heightInches = height / 2.54;
    const heightOver5ft = heightInches - 60;
    
    let idealMin, idealMax;
    if (gender === 'male') {
        const base = 48 + (2.7 * heightOver5ft);
        idealMin = Math.round(base * 0.9);
        idealMax = Math.round(base * 1.1);
    } else {
        const base = 45.5 + (2.2 * heightOver5ft);
        idealMin = Math.round(base * 0.9);
        idealMax = Math.round(base * 1.1);
    }
    
    // Also calculate using BMI method
    const heightM = height / 100;
    const bmiMin = Math.round(18.5 * heightM * heightM);
    const bmiMax = Math.round(24.9 * heightM * heightM);
    
    resultDiv.innerHTML = `
        <strong>Your Ideal Weight Range:</strong><br><br>
        📏 Robinson Formula: <strong>${idealMin} - ${idealMax} kg</strong><br>
        📊 BMI Method (18.5-24.9): <strong>${bmiMin} - ${bmiMax} kg</strong>
    `;
    resultDiv.className = 'result-box result-normal';
}

// Heart Rate Zone Calculator
function calculateHeartRateZones() {
    const age = parseInt(document.getElementById('hr-age').value);
    const restingHR = parseInt(document.getElementById('resting-hr').value) || 70;
    const resultDiv = document.getElementById('hr-result');
    
    if (!age || age < 10 || age > 100) {
        resultDiv.innerHTML = '<p>Please enter a valid age (10-100)</p>';
        return;
    }
    
    const maxHR = 220 - age;
    const hrReserve = maxHR - restingHR;
    
    const zones = [
        { name: 'Resting Zone', min: 50, max: 60, class: 'rest', desc: 'Very light activity' },
        { name: 'Fat Burn Zone', min: 60, max: 70, class: 'fat-burn', desc: 'Light exercise, fat burning' },
        { name: 'Cardio Zone', min: 70, max: 85, class: 'cardio', desc: 'Aerobic endurance' },
        { name: 'Peak Zone', min: 85, max: 100, class: 'peak', desc: 'Maximum effort' }
    ];
    
    let html = `<p><strong>Max Heart Rate:</strong> ${maxHR} BPM</p>`;
    zones.forEach(zone => {
        const low = Math.round(restingHR + (hrReserve * zone.min / 100));
        const high = Math.round(restingHR + (hrReserve * zone.max / 100));
        html += `<div class="hr-zone ${zone.class}">
            <span>${zone.name}</span>
            <span>${low} - ${high} BPM</span>
        </div>`;
    });
    
    resultDiv.innerHTML = html;
}

// Medication Tracker
function addMedication() {
    const name = document.getElementById('med-name').value;
    const dosage = document.getElementById('med-dosage').value;
    const frequency = document.getElementById('med-frequency').value;
    const time = document.getElementById('med-time').value;
    const tableBody = document.getElementById('med-log');
    
    if (!name || !dosage) {
        alert('Please enter medication name and dosage');
        return;
    }
    
    const row = tableBody.insertRow();
    row.innerHTML = `
        <td>${name}</td>
        <td>${dosage}</td>
        <td>${frequency}</td>
        <td>${time || 'N/A'}</td>
        <td><button onclick="this.parentNode.parentNode.remove()">Delete</button></td>
    `;
    
    // Clear inputs
    document.getElementById('med-name').value = '';
    document.getElementById('med-dosage').value = '';
    document.getElementById('med-time').value = '';
}

// Pregnancy Due Date Calculator
function calculateDueDate() {
    const lmpDate = document.getElementById('lmp-date').value;
    const resultDiv = document.getElementById('pregnancy-result');
    
    if (!lmpDate) {
        resultDiv.innerHTML = 'Please select the date of your last menstrual period';
        resultDiv.className = 'result-box result-warning';
        return;
    }
    
    const lmp = new Date(lmpDate);
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280); // 40 weeks
    
    const today = new Date();
    const weeksPregnant = Math.floor((today - lmp) / (7 * 24 * 60 * 60 * 1000));
    const daysRemaining = Math.floor((dueDate - today) / (24 * 60 * 60 * 1000));
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    resultDiv.innerHTML = `
        <strong>🤰 Estimated Due Date:</strong><br>
        ${dueDate.toLocaleDateString('en-US', options)}<br><br>
        📅 Currently: <strong>${weeksPregnant} weeks pregnant</strong><br>
        ⏳ Days remaining: <strong>${daysRemaining > 0 ? daysRemaining : 0} days</strong>
    `;
    resultDiv.className = 'result-box result-normal';
}

// Body Fat Calculator
function toggleBodyFatFields() {
    const gender = document.querySelector('input[name="bf-gender"]:checked').value;
    const hipField = document.getElementById('hip-field');
    hipField.style.display = gender === 'female' ? 'block' : 'none';
}

function calculateBodyFat() {
    const gender = document.querySelector('input[name="bf-gender"]:checked').value;
    const height = parseFloat(document.getElementById('bf-height').value);
    const waist = parseFloat(document.getElementById('bf-waist').value);
    const neck = parseFloat(document.getElementById('bf-neck').value);
    const hip = parseFloat(document.getElementById('bf-hip').value);
    const resultDiv = document.getElementById('body-fat-result');
    
    if (!height || !waist || !neck) {
        resultDiv.innerHTML = 'Please fill in all required fields';
        resultDiv.className = 'result-box result-warning';
        return;
    }
    
    if (gender === 'female' && !hip) {
        resultDiv.innerHTML = 'Please enter hip measurement for women';
        resultDiv.className = 'result-box result-warning';
        return;
    }
    
    let bodyFat;
    if (gender === 'male') {
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
        bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }
    
    bodyFat = Math.max(0, bodyFat).toFixed(1);
    
    let category, className;
    if (gender === 'male') {
        if (bodyFat < 6) { category = 'Essential Fat'; className = 'result-warning'; }
        else if (bodyFat < 14) { category = 'Athletes'; className = 'result-normal'; }
        else if (bodyFat < 18) { category = 'Fitness'; className = 'result-normal'; }
        else if (bodyFat < 25) { category = 'Average'; className = 'result-warning'; }
        else { category = 'Obese'; className = 'result-danger'; }
    } else {
        if (bodyFat < 14) { category = 'Essential Fat'; className = 'result-warning'; }
        else if (bodyFat < 21) { category = 'Athletes'; className = 'result-normal'; }
        else if (bodyFat < 25) { category = 'Fitness'; className = 'result-normal'; }
        else if (bodyFat < 32) { category = 'Average'; className = 'result-warning'; }
        else { category = 'Obese'; className = 'result-danger'; }
    }
    
    resultDiv.innerHTML = `
        <strong>Body Fat Percentage:</strong> ${bodyFat}%<br>
        <strong>Category:</strong> ${category}
    `;
    resultDiv.className = `result-box ${className}`;
}

// Mental Health Assessment
function assessMentalHealth() {
    const resultDiv = document.getElementById('mh-result');
    let totalScore = 0;
    let answered = 0;
    
    for (let i = 1; i <= 5; i++) {
        const selected = document.querySelector(`input[name="mh${i}"]:checked`);
        if (selected) {
            totalScore += parseInt(selected.value);
            answered++;
        }
    }
    
    if (answered < 5) {
        resultDiv.innerHTML = 'Please answer all questions';
        resultDiv.className = 'result-box result-warning';
        return;
    }
    
    let assessment, className, advice;
    
    if (totalScore <= 4) {
        assessment = 'Minimal - You appear to be doing well';
        className = 'result-normal';
        advice = 'Continue maintaining healthy habits and self-care practices.';
    } else if (totalScore <= 9) {
        assessment = 'Mild - Some signs of stress or low mood';
        className = 'result-warning';
        advice = 'Consider talking to someone you trust, practicing relaxation techniques, and ensuring adequate sleep and exercise.';
    } else if (totalScore <= 14) {
        assessment = 'Moderate - Consider seeking support';
        className = 'result-warning';
        advice = 'It may be helpful to speak with a healthcare provider or mental health professional. You don\'t have to face this alone.';
    } else {
        assessment = 'Moderately Severe - Please seek professional help';
        className = 'result-danger';
        advice = 'We encourage you to reach out to a mental health professional or your doctor. If you\'re in crisis, please call the helpline numbers below.';
    }
    
    resultDiv.innerHTML = `
        <strong>Assessment:</strong> ${assessment}<br><br>
        <strong>Recommendation:</strong> ${advice}<br><br>
        <small>Remember: This is a screening tool, not a diagnosis. A healthcare professional can provide proper evaluation and support.</small>
    `;
    resultDiv.className = `result-box ${className}`;
}

// Workout Logger
function addWorkout() {
    const date = document.getElementById('workout-date').value;
    const type = document.getElementById('workout-type').value;
    const duration = parseInt(document.getElementById('workout-duration').value);
    const intensity = document.getElementById('workout-intensity').value;
    const summaryDiv = document.getElementById('workout-summary');
    const tableBody = document.getElementById('workout-log');
    
    if (!date || !duration) {
        summaryDiv.innerHTML = 'Please fill in date and duration';
        summaryDiv.className = 'result-box result-warning';
        return;
    }
    
    // Estimate calories burned (very rough estimate based on type and intensity)
    const calorieRates = {
        running: 10, walking: 4, cycling: 8, swimming: 9, weights: 6, yoga: 3, hiit: 12, sports: 8, other: 5
    };
    const intensityMultiplier = { low: 0.8, moderate: 1, high: 1.3 };
    const calories = Math.round(calorieRates[type] * duration * intensityMultiplier[intensity]);
    
    summaryDiv.innerHTML = `💪 Great workout! You burned approximately <strong>${calories} calories</strong>`;
    summaryDiv.className = 'result-box result-normal';
    
    const typeDisplay = document.getElementById('workout-type').options[document.getElementById('workout-type').selectedIndex].text;
    
    const row = tableBody.insertRow();
    row.innerHTML = `
        <td>${date}</td>
        <td>${typeDisplay}</td>
        <td>${duration} min</td>
        <td>~${calories}</td>
        <td><button onclick="this.parentNode.parentNode.remove()">Delete</button></td>
    `;
    
    document.getElementById('workout-date').value = '';
    document.getElementById('workout-duration').value = '';
}

// Vaccination Tracker
function addVaccine() {
    const name = document.getElementById('vaccine-name').value;
    const date = document.getElementById('vaccine-date').value;
    const nextDate = document.getElementById('vaccine-next').value;
    const provider = document.getElementById('vaccine-provider').value;
    const tableBody = document.getElementById('vaccine-log');
    
    if (!name || !date) {
        alert('Please enter vaccine name and date');
        return;
    }
    
    const row = tableBody.insertRow();
    row.innerHTML = `
        <td>${name}</td>
        <td>${date}</td>
        <td>${nextDate || 'N/A'}</td>
        <td>${provider || 'N/A'}</td>
        <td><button onclick="this.parentNode.parentNode.remove()">Delete</button></td>
    `;
    
    document.getElementById('vaccine-date').value = '';
    document.getElementById('vaccine-next').value = '';
    document.getElementById('vaccine-provider').value = '';
}

// Health Quiz
const quizQuestions = [
    {
        question: "How many glasses of water should you drink daily?",
        options: ["2-3 glasses", "4-5 glasses", "8 glasses", "12 glasses"],
        correct: 2
    },
    {
        question: "What is the normal body temperature in adults?",
        options: ["35°C (95°F)", "37°C (98.6°F)", "39°C (102°F)", "40°C (104°F)"],
        correct: 1
    },
    {
        question: "How many hours of sleep do adults typically need?",
        options: ["4-5 hours", "5-6 hours", "7-9 hours", "10-12 hours"],
        correct: 2
    },
    {
        question: "What does BMI stand for?",
        options: ["Body Mass Index", "Body Muscle Index", "Basic Metabolic Index", "Blood Mass Indicator"],
        correct: 0
    },
    {
        question: "Which of these is a symptom of diabetes?",
        options: ["Excessive thirst", "Hair loss", "Improved vision", "Decreased urination"],
        correct: 0
    },
    {
        question: "What is the main function of red blood cells?",
        options: ["Fight infections", "Carry oxygen", "Clot blood", "Produce hormones"],
        correct: 1
    },
    {
        question: "What blood pressure reading is considered normal?",
        options: ["90/60 mmHg", "120/80 mmHg", "140/90 mmHg", "160/100 mmHg"],
        correct: 1
    },
    {
        question: "Which vitamin is produced when skin is exposed to sunlight?",
        options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"],
        correct: 2
    }
];

let currentQuestion = 0;
let quizScore = 0;
let quizActive = false;

function startQuiz() {
    currentQuestion = 0;
    quizScore = 0;
    quizActive = true;
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('quiz-score').innerHTML = '';
    showQuestion();
}

function showQuestion() {
    const questionDiv = document.getElementById('quiz-question');
    const optionsDiv = document.getElementById('quiz-options');
    const feedbackDiv = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-btn');
    
    feedbackDiv.innerHTML = '';
    feedbackDiv.className = 'result-box';
    nextBtn.style.display = 'none';
    
    if (currentQuestion >= quizQuestions.length) {
        endQuiz();
        return;
    }
    
    const q = quizQuestions[currentQuestion];
    questionDiv.innerHTML = `Question ${currentQuestion + 1}/${quizQuestions.length}: ${q.question}`;
    
    optionsDiv.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index);
        optionsDiv.appendChild(btn);
    });
}

function selectAnswer(selected) {
    if (!quizActive) return;
    
    const q = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const feedbackDiv = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-btn');
    
    options.forEach((opt, index) => {
        opt.onclick = null;
        if (index === q.correct) {
            opt.classList.add('correct');
        } else if (index === selected) {
            opt.classList.add('wrong');
        }
    });
    
    if (selected === q.correct) {
        quizScore++;
        feedbackDiv.innerHTML = '✅ Correct!';
        feedbackDiv.className = 'result-box result-normal';
    } else {
        feedbackDiv.innerHTML = `❌ Wrong! The correct answer is: ${q.options[q.correct]}`;
        feedbackDiv.className = 'result-box result-danger';
    }
    
    nextBtn.style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
}

function endQuiz() {
    const questionDiv = document.getElementById('quiz-question');
    const optionsDiv = document.getElementById('quiz-options');
    const scoreDiv = document.getElementById('quiz-score');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    
    quizActive = false;
    questionDiv.innerHTML = 'Quiz Complete!';
    optionsDiv.innerHTML = '';
    nextBtn.style.display = 'none';
    startBtn.style.display = 'inline-block';
    startBtn.textContent = 'Play Again';
    
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    let message;
    if (percentage >= 80) message = '🏆 Excellent! Great health knowledge!';
    else if (percentage >= 60) message = '👍 Good job! Keep learning!';
    else message = '📚 Keep studying! Health knowledge is important!';
    
    scoreDiv.innerHTML = `Your Score: ${quizScore}/${quizQuestions.length} (${percentage}%)<br>${message}`;
}

// Age Calculator
function calculateAge() {
    const birthDate = document.getElementById('birth-date').value;
    const resultDiv = document.getElementById('age-result');
    
    if (!birthDate) {
        resultDiv.innerHTML = 'Please enter your date of birth';
        resultDiv.className = 'result-box result-warning';
        return;
    }
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    
    resultDiv.innerHTML = `
        <strong>🎂 Your Age:</strong><br>
        ${years} years, ${months} months, ${days} days<br><br>
        📅 Total: <strong>${totalDays.toLocaleString()} days</strong> (${totalWeeks.toLocaleString()} weeks)
    `;
    resultDiv.className = 'result-box result-normal';
}

// Appointment Tracker
function addAppointment() {
    const doctor = document.getElementById('apt-doctor').value;
    const type = document.getElementById('apt-type').value;
    const date = document.getElementById('apt-date').value;
    const time = document.getElementById('apt-time').value;
    const location = document.getElementById('apt-location').value;
    const notes = document.getElementById('apt-notes').value;
    const listDiv = document.getElementById('appointment-list');
    
    if (!doctor || !date || !time) {
        alert('Please fill in doctor name, date, and time');
        return;
    }
    
    const appointmentItem = document.createElement('div');
    appointmentItem.className = 'appointment-item';
    appointmentItem.innerHTML = `
        <div class="appointment-info">
            <h4>${type} - Dr. ${doctor}</h4>
            <p>📅 ${date} at ${time}</p>
            <p>📍 ${location || 'Location not specified'}</p>
            ${notes ? `<p>📝 ${notes}</p>` : ''}
        </div>
        <button onclick="this.parentNode.remove()">Delete</button>
    `;
    
    listDiv.appendChild(appointmentItem);
    
    // Clear form
    document.getElementById('apt-doctor').value = '';
    document.getElementById('apt-date').value = '';
    document.getElementById('apt-time').value = '';
    document.getElementById('apt-location').value = '';
    document.getElementById('apt-notes').value = '';
}

// Nutrition Search
function searchFood() {
    const searchTerm = document.getElementById('food-search').value.toLowerCase();
    const cards = document.querySelectorAll('.nutrition-card');
    
    cards.forEach(card => {
        const foodData = card.getAttribute('data-food');
        const title = card.querySelector('h3').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || foodData.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize water display
    updateWaterDisplay();
    
    // Initialize body fat hip field visibility
    if (document.getElementById('hip-field')) {
        toggleBodyFatFields();
    }
    
    // Set default dates to today
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = ['sleep-date', 'workout-date', 'vaccine-date', 'apt-date', 'bp-date'];
    dateInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = today;
    });
});
    
  