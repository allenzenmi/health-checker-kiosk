document.getElementById('bmiForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const age = parseInt(document.getElementById('age').value);
    const sex = document.getElementById('sex').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('heightCm').value);
    
    // if-else: validation
    if (!name || !sex || isNaN(age) || isNaN(weight) || isNaN(heightCm) || age <= 0 || weight <= 0 || heightCm <= 0) {
        alert('Please fill out all fields with valid values.');
        return;
    }
    
    const heightM = heightCm / 100;
    const bmi = +(weight / (heightM * heightM)).toFixed(1);
    
    let category, message, color;
    
    // switch-case: classify BMI
    switch (true) {
        case bmi < 18.5:
            category = 'Underweight'; color = '#5DADE2';
            message = 'Consider a balanced, calorie-sufficient diet.';
            break;
        case bmi < 25:
            category = 'Normal'; color = '#58D68D';
            message = 'Great! Keep up your healthy habits.';
            break;
        case bmi < 30:
            category = 'Overweight'; color = '#F5B041';
            message = 'Consider more physical activity and mindful eating.';
            break;
        default:
            category = 'Obese'; color = '#EC7063';
            message = 'We recommend consulting a healthcare provider.';
    }
    
    showResult(name, bmi, category, message, color);
    recordSubmission({ name, age, sex, weight, heightCm, bmi, category });
});

function showResult(name, bmi, category, message, color) {
    const resultCard = document.getElementById('resultCard');
    resultCard.classList.remove('hidden');
    resultCard.style.backgroundColor = color;
    
    resultCard.innerHTML = `
        <h3>Results for ${name}:</h3>
        <p class="score" style="font-size: 2.5rem; font-weight: 800; margin: 0.5rem 0;">${bmi}</p>
        <h4>Classification: <strong>${category}</strong></h4>
        <p style="margin-top: 0.5rem; font-size: 0.95rem; line-height: 1.4;">${message}</p>
    `;
}

function recordSubmission(record) {
    fetch('https://script.google.com/macros/s/AKfycbzPAAWk36zthEUfpEVaBQCt6ZggMmueCDxu9q4IWwjUd_YGQ97vTHsBxw9n7-o0fGD0dQ/exec', {
    method: 'POST',
    body: JSON.stringify(record)
    }).catch(err => console.error('Could not record submission:', err));
   }