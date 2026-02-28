// frontend/app.js

// ⚠️ CHANGE THIS TO YOUR RENDER URL BEFORE DEPLOYING FRONTEND
// Example: const API_URL = 'https://hormone-api-xyz.onrender.com/api/logs';
const API_URL = 'http://localhost:5000/api/logs'; 

// 1. Calculate Hormone Phase (Hardcoded start date for demo)
const lastPeriodDate = new Date('2026-02-15'); 

function updateDashboard() {
    const today = new Date();
    const diffDays = Math.ceil(Math.abs(today - lastPeriodDate) / (1000 * 60 * 60 * 24)); 
    const dayInCycle = (diffDays % 28) + 1;

    let phase = {};
    if (dayInCycle <= 5) {
        phase = { name: 'Menstrual', color: '#ef4444', focus: 'Rest & Admin tasks.', diet: 'Increase iron & warm foods.' };
    } else if (dayInCycle <= 14) {
        phase = { name: 'Follicular', color: '#22c55e', focus: 'Brainstorming & complex problems.', diet: 'Fresh veggies & lean proteins.' };
    } else if (dayInCycle <= 17) {
        phase = { name: 'Ovulatory', color: '#eab308', focus: 'Pitching & teamwork.', diet: 'Light, antioxidant-rich meals.' };
    } else {
        phase = { name: 'Luteal', color: '#8b5cf6', focus: 'Deep, independent work.', diet: 'Low-GI foods to prevent PCOS cravings.' };
    }

    // Update UI Elements
    document.getElementById('phase-badge').textContent = `${phase.name} Phase (Day ${dayInCycle})`;
    document.getElementById('phase-badge').style.backgroundColor = phase.color;
    document.getElementById('dashboard-header').style.borderBottomColor = phase.color;
    document.getElementById('focus-text').textContent = phase.focus;
    document.getElementById('nutrition-tip').textContent = `✓ ${phase.diet}`;
}

// 2. Handle Form Submission to Backend (Daily Health Log)
document.getElementById('health-log-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page reload

    // Hide previous messages when submitting a new log
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';

    // Gather data from inputs
    const logData = {
        symptoms: document.getElementById('symptoms').value,
        calories: document.getElementById('calories').value,
        tookMeds: document.getElementById('took-meds').checked
    };

    try {
        // Send data to our Node.js server using the API_URL variable
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logData)
        });

        if (response.ok) {
            document.getElementById('success-message').style.display = 'block';
            document.getElementById('health-log-form').reset(); // Clear form
            setTimeout(() => document.getElementById('success-message').style.display = 'none', 3000);
        } else {
            throw new Error('Server returned an error');
        }
    } catch (error) {
        console.error("Error saving log:", error);
        // Displays your clean HTML error message instead of an alert window
        document.getElementById('error-message').style.display = 'block';
    }
});

// 3. Phase-Sync Task Manager Logic

// Determine the current phase name from the badge text
function getCurrentPhaseName() {
    const badgeText = document.getElementById('phase-badge').textContent;
    if (badgeText.includes('Menstrual')) return 'Menstrual';
    if (badgeText.includes('Follicular')) return 'Follicular';
    if (badgeText.includes('Ovulatory')) return 'Ovulatory';
    return 'Luteal';
}

// Handle adding a new task
document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskInput = document.getElementById('new-task');
    const taskType = document.getElementById('task-type').value;
    const currentPhase = getCurrentPhaseName();
    const warningText = document.getElementById('task-warning');
    
    if (taskInput.value.trim() === '') return;

    // The "Bio-Hack" Logic: Check for mismatched tasks
    let showWarning = false;
    if (currentPhase === 'Menstrual' && (taskType === 'Social' || taskType === 'Deep Work')) showWarning = true;
    if (currentPhase === 'Luteal' && taskType === 'Social') showWarning = true;
    if (currentPhase === 'Ovulatory' && taskType === 'Admin') showWarning = true;

    if (showWarning) {
        warningText.style.display = 'block';
        setTimeout(() => warningText.style.display = 'none', 4000);
    } else {
        warningText.style.display = 'none';
    }

    // Add task to the UI
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskInput.value}</span>
        <span class="task-tag">${taskType}</span>
    `;
    
    // Color code the left border based on the task type
    if (taskType === 'Admin') li.style.borderLeftColor = '#ef4444';
    if (taskType === 'Creative') li.style.borderLeftColor = '#22c55e';
    if (taskType === 'Social') li.style.borderLeftColor = '#eab308';
    if (taskType === 'Deep Work') li.style.borderLeftColor = '#8b5cf6';

    document.getElementById('task-list').appendChild(li);
    taskInput.value = ''; // clear input
});

// Initialize the dashboard on load
updateDashboard();