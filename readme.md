CycleSync: Hormone-Aware Wellness & Performance 
CycleSync is a wellness and performance optimizer designed to align a user's workflow, nutrition, and health tracking with their unique hormonal rhythms.
Frontend: https://thriving-elf-52618d.netlify.app/
Backend API: https://hormone-planner.onrender.com
 Core Features
  Hormone-Synced Planner
Dynamic Task Prioritization: Automatically categorizes tasks into "High Energy" or "Restful" based on the user's current cycle phase.
Phase-Specific Logic: Recommends "Deep Work" and creative tasks during the Follicular phase and administrative or restful tasks during the Menstrual phase.
 AI-Powered Nutrition Tracker
Image Analysis: Users can log meals by uploading photos.
Gemini AI Integration: Uses the Google Gemini API to instantly estimate calories, protein, carbs, and fats from images.
Calorie Management: Features a dynamic ring tracker that alerts users if they exceed their daily goal.
 Wellness & PCOS Management
Symptom Tracking: Dedicated inputs for tracking mental focus, inflammation, and recovery.
Health Profiles: Tailored dietary advice for conditions such as PCOS, PCOD, and Endometriosis.
 Tech Stack
Component
Technology
Frontend
HTML5, Tailwind CSS, JavaScript (Vanilla), Chart.js
Backend
Node.js, Express.js
Database
MongoDB Atlas (Mongoose ODM)
AI Engine
Google Gemini API
Deployment
Render (Backend), Netlify (Frontend)

 The Bio-Hack Algorithm
The application calculates the current cycle day based on the user's lastPeriodDate. It then maps the day to specific biological states:
Menstrual (Days 1-5): Focus on recovery and low-effort administrative tasks.
Follicular (Days 6-13): Prime time for brainstorming and complex problem-solving.
Ovulatory (Days 14-17): Peak communication window for pitching and teamwork.
Luteal (Days 18-28): Independent work phase; focus on stabilizing blood sugar.
 Project Structure

Plaintext


hormone-planner/
├── backend/
│   ├── server.js          # Express API & Gemini AI Integration
│   ├── package.json       # Dependencies (Mongoose, Cors, Dotenv)
│   └── .env               # Environment Variables (Secure)
├── frontend/
│   └── index.html         # Responsive UI, Charts, & Frontend Logic
├── .gitignore             # Prevents sensitive API keys from being leaked
└── README.md


