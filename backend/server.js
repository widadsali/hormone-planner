require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// ⚠️ HACKATHON MODE: Allows requests from anywhere so Netlify doesn't get blocked.
app.use(cors({ origin: '*' })); 

// ⚠️ FIXED: Replaced standard express.json() with 50MB limit so images don't crash the server
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ⚠️ DEPLOYMENT SWITCH: It uses your cloud MongoDB URL if available, otherwise local.
const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hormonePlanner';

mongoose.connect(dbURI)
  .then(() => console.log('✅ Database Connected'))
  .catch(err => console.error('❌ DB Connection Error:', err));

// --- NEW SCHEMAS ADDED BELOW ---

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  lastPeriodDate: String,
  painTime: String,
  taskPreference: String,
  // ADDED FOR SETTINGS INTEGRATION:
  settings: {
    lastPeriod: String,
    fatigueTime: String,
    focusSchedule: String,
    calorieGoal: Number,
    condition: String
  }
});
const User = mongoose.model('User', UserSchema);

const TaskSchema = new mongoose.Schema({
  userEmail: String,
  text: String,
  category: String,
  deadline: String,
  done: { type: Boolean, default: false },
  date: String
});
const Task = mongoose.model('Task', TaskSchema);

const MealSchema = new mongoose.Schema({
  userEmail: String,
  name: String,
  cals: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  date: String
});
const Meal = mongoose.model('Meal', MealSchema);

// --- ORIGINAL LOG SCHEMA (UNTOUCHED) ---

// Schema for tracking PCOS symptoms, diet, and meds
const LogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  symptoms: String,
  calories: Number,
  tookMeds: Boolean,
  userEmail: String // Added field to link logs to users
});

const Log = mongoose.model('Log', LogSchema);

// --- NEW AUTH & DATA ROUTES ---

app.post('/api/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User saved!', user: newUser });
  } catch (err) { res.status(500).json({ error: 'Registration failed' }); }
});

app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (user) res.json({ user });
    else res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) { res.status(500).json({ error: 'Login error' }); }
});

// NEW: Route to update settings specifically
app.post('/api/save-settings', async (req, res) => {
  try {
    const { email, settings } = req.body;
    const user = await User.findOneAndUpdate(
      { email: email },
      { settings: settings },
      { new: true }
    );
    res.json({ message: 'Settings synced!', user });
  } catch (err) { res.status(500).json({ error: 'Failed to sync settings' }); }
});

app.get('/api/tasks/:email', async (req, res) => {
  const tasks = await Task.find({ userEmail: req.params.email });
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.get('/api/meals/:email', async (req, res) => {
  const meals = await Meal.find({ userEmail: req.params.email });
  res.json(meals);
});

app.post('/api/meals', async (req, res) => {
  const meal = new Meal(req.body);
  await meal.save();
  res.json(meal);
});

// --- ORIGINAL LOG ROUTES (UNTOUCHED) ---

// POST: Save a new log
app.post('/api/logs', async (req, res) => {
  try {
    const newLog = new Log(req.body);
    await newLog.save();
    res.status(201).json({ message: 'Log saved successfully!', log: newLog });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save log' });
  }
});

// GET: Retrieve all logs (for a future chart/history view)
// GET: Retrieve logs for a SPECIFIC user only
app.get('/api/logs/:email', async (req, res) => {
  try {
    // We added the { userEmail: req.params.email } filter!
    const logs = await Log.find({ userEmail: req.params.email }).sort({ date: -1 }).limit(10);
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/analyze-meal', async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    
    // ⚠️ FIXED: Dynamically extract image type (e.g. png, webp, jpeg)
    const mimeType = imageBase64.substring(imageBase64.indexOf(":") + 1, imageBase64.indexOf(";"));
    
    // ⚠️ FIXED: Strip the data URL prefix so Gemini can read the raw Base64 string
    const base64Data = imageBase64.split(",")[1];

    // ⚠️ FIXED: Updated to "gemini-1.5-flash-latest" to resolve the 404 error
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `Analyze this food image. Estimate the total calories, protein (g), carbs (g), and fat (g). Return ONLY a valid JSON object with the exact keys "name", "calories", "protein", "carbs", and "fat". Do not use markdown. Example: {"name": "Grilled Salmon", "calories": 450, "protein": 35, "carbs": 0, "fat": 20}`;

    const imageParts = [{
        inlineData: { data: base64Data, mimeType: mimeType }
    }];

    const result = await model.generateContent([prompt, ...imageParts]);
    const responseText = result.response.text();

    // Clean up response if AI wraps it in ```json blocks
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const nutritionData = JSON.parse(cleanJson);

    res.json(nutritionData);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    res.status(500).json({ error: "Failed to analyze image" });
  }
});

// --- MISSING ROUTES FOR UPDATING AND DELETING TASKS ---

// PUT: Updates the task (marks as done/undone for strikethrough)
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) { res.status(500).json({ error: 'Failed to update task' }); }
});

// DELETE: Completely removes the task when trash is clicked
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: 'Failed to delete task' }); }
});

// For Render to assign a port dynamically
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

