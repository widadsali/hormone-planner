<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# [CycleSync] 🎯

## Basic Details

### Team Name: [RCB]

### Team Members
- Member 1: [Widad Sali] - [TKMCE Kollam]
- Member 2: [Mary Joicy Thomas] - [TKMCE Kollam]

### Hosted Project Link
[(https://thriving-elf-52618d.netlify.app/)]

### Project Description
[**CycleSync** is a wellness and performance optimizer designed to align a user's workflow, nutrition, and health tracking with their unique hormonal rhythms.]

### The Problem statement
[Many individuals struggle to maintain consistent productivity and wellness because traditional planners ignore the significant impact of hormonal fluctuations on energy, mood, and cognitive function.]

### The Solution
[We provide a "Bio-Hack" solution that maps tasks and nutrition to the four phases of the menstrual cycle, ensuring users work with their biology rather than against it.]

---

## Technical Details

### Technologies/Components Used

**For Software:**
* **Languages**: JavaScript (Vanilla), HTML5, CSS3
* **Frameworks**: Express.js (Backend), Tailwind CSS (UI)
* **Libraries**: Mongoose (Database), Chart.js (Analytics), Axios (API calls), Dotenv
* **Tools**: VS Code, Git, GitHub, Render (Hosting), Netlify (Hosting)


## Features

List the key features of your project:
* **Hormone-Synced Planner**: Automatically categorizes tasks into "High Energy" or "Restful" based on the biological phase.
* **AI-Powered Nutrition Tracker**: Uses Google Gemini AI to analyze food photos and estimate nutritional content including calories, protein, carbs, and fats.
* **Bio-Performance Analytics**: Visualizes productivity heatmaps and readiness trends using Chart.js.
* **PCOS/Wellness Management**: Dedicated tracking for symptoms like inflammation, mental focus, and recovery.
---

## Implementation

### For Software:

#### Installation
```bash
# Clone the repository
git clone [https://github.com/widadsali/hormone-planner.git](https://github.com/widadsali/hormone-planner.git)

# Install backend dependencies
cd backend
npm install

# Start the backend server
node server.js

# For frontend: Open frontend/index.html in a browser



## Project Documentation

### For Software:

#### Screenshots (Add at least 3)

![Screenshot1](Add screenshot 1 here with proper name)
*Add caption explaining what this shows*

![Screenshot2](Add screenshot 2 here with proper name)
*Add caption explaining what this shows*

![Screenshot3](Add screenshot 3 here with proper name)
*Add caption explaining what this shows*

#### Diagrams

**System Architecture:**

![Architecture Diagram](docs/architecture.png)
*The application follows a Client-Server architecture. The Vanilla JS frontend communicates with a Node.js/Express backend hosted on Render, which manages a MongoDB Atlas database and integrates the Google Gemini AI Pro Vision model*

**Application Workflow:**

![Workflow](docs/workflow.png)
*User Logs In -> Input Cycle Data -> App Calculates Phase -> Planner Adjusts Recommendations -> User Logs Meal -> Gemini AI Processes Photo -> Dashboard Updates.*

---



#### Build Photos

![Team](Add photo of your team here)

![Components](Add photo of your components here)
*List out all components shown*

![Build](Add photos of build process here)
*Explain the build steps*

![Final](Add photo of final product here)
*Explain the final build*

---

## Additional Documentation

### For Web Projects with Backend:

#### API Documentation

**Base URL:** `https://hormone-planner.onrender.com/api`

##### Endpoints

**POST /api/endpoint**
- **Description:** [Sends an image to Gemini AI for nutritional breakdown.]
- **Parameters:**
  - `param1` (string): [Description]
  - `param2` (integer): [Description]
- **Response:**
{
  "calories": 450,
  "protein": "20g",
  "carbs": "50g",
  "fat": "15g"
}
```

**POST /api/endpoint**
- **Description:** [Registers a new user with cycle details.]
- **Request Body:**
```json
{
  "status": "success",
  "message": "User registered successfully"
}
```
- **Response:**
```json
{
  "status": "success",
  "message": "Operation completed"
}
```

[Add more endpoints as needed...]

---

### For Mobile Apps:

#### App Flow Diagram

![App Flow](docs/app-flow.png)
*Explain the user flow through your application*

#### Installation Guide

**For Android (APK):**
1. Download the APK from [Release Link]
2. Enable "Install from Unknown Sources" in your device settings:
   - Go to Settings > Security
   - Enable "Unknown Sources"
3. Open the downloaded APK file
4. Follow the installation prompts
5. Open the app and enjoy!

**For iOS (IPA) - TestFlight:**
1. Download TestFlight from the App Store
2. Open this TestFlight link: [Your TestFlight Link]
3. Click "Install" or "Accept"
4. Wait for the app to install
5. Open the app from your home screen

**Building from Source:**
```bash
# For Android
flutter build apk
# or
./gradlew assembleDebug

# For iOS
flutter build ios
# or
xcodebuild -workspace App.xcworkspace -scheme App -configuration Debug
```

---

### For Hardware Projects:

#### Bill of Materials (BOM)

| Component | Quantity | Specifications | Price | Link/Source |
|-----------|----------|----------------|-------|-------------|
| Arduino Uno | 1 | ATmega328P, 16MHz | ₹450 | [Link] |
| LED | 5 | Red, 5mm, 20mA | ₹5 each | [Link] |
| Resistor | 5 | 220Ω, 1/4W | ₹1 each | [Link] |
| Breadboard | 1 | 830 points | ₹100 | [Link] |
| Jumper Wires | 20 | Male-to-Male | ₹50 | [Link] |
| [Add more...] | | | | |

**Total Estimated Cost:** ₹[Amount]

#### Assembly Instructions

**Step 1: Prepare Components**
1. Gather all components listed in the BOM
2. Check component specifications
3. Prepare your workspace
![Step 1](images/assembly-step1.jpg)
*Caption: All components laid out*

**Step 2: Build the Power Supply**
1. Connect the power rails on the breadboard
2. Connect Arduino 5V to breadboard positive rail
3. Connect Arduino GND to breadboard negative rail
![Step 2](images/assembly-step2.jpg)
*Caption: Power connections completed*

**Step 3: Add Components**
1. Place LEDs on breadboard
2. Connect resistors in series with LEDs
3. Connect LED cathodes to GND
4. Connect LED anodes to Arduino digital pins (2-6)
![Step 3](images/assembly-step3.jpg)
*Caption: LED circuit assembled*

**Step 4: [Continue for all steps...]**

**Final Assembly:**
![Final Build](images/final-build.jpg)
*Caption: Completed project ready for testing*

---

### For Scripts/CLI Tools:

#### Command Reference

**Basic Usage:**
```bash
python script.py [options] [arguments]
```

**Available Commands:**
- `command1 [args]` - Description of what command1 does
- `command2 [args]` - Description of what command2 does
- `command3 [args]` - Description of what command3 does

**Options:**
- `-h, --help` - Show help message and exit
- `-v, --verbose` - Enable verbose output
- `-o, --output FILE` - Specify output file path
- `-c, --config FILE` - Specify configuration file
- `--version` - Show version information

**Examples:**

```bash
# Example 1: Basic usage
python script.py input.txt

# Example 2: With verbose output
python script.py -v input.txt

# Example 3: Specify output file
python script.py -o output.txt input.txt

# Example 4: Using configuration
python script.py -c config.json --verbose input.txt
```

#### Demo Output

**Example 1: Basic Processing**

**Input:**
```
This is a sample input file
with multiple lines of text
for demonstration purposes
```

**Command:**
```bash
python script.py sample.txt
```

**Output:**
```
Processing: sample.txt
Lines processed: 3
Characters counted: 86
Status: Success
Output saved to: output.txt
```

**Example 2: Advanced Usage**

**Input:**
```json
{
  "name": "test",
  "value": 123
}
```

**Command:**
```bash
python script.py -v --format json data.json
```

**Output:**
```
[VERBOSE] Loading configuration...
[VERBOSE] Parsing JSON input...
[VERBOSE] Processing data...
{
  "status": "success",
  "processed": true,
  "result": {
    "name": "test",
    "value": 123,
    "timestamp": "2024-02-07T10:30:00"
  }
}
[VERBOSE] Operation completed in 0.23s
```

---

## Project Demo

### Video
[Add your demo video link here - YouTube, Google Drive, etc.]

*Explain what the video demonstrates - key features, user flow, technical highlights*

### Additional Demos
[Add any extra demo materials/links - Live site, APK download, online demo, etc.]

---

## AI Tools Used (Optional - For Transparency Bonus)

If you used AI tools during development, document them here for transparency:

**Tool Used:** [e.g., GitHub Copilot, v0.dev, Cursor, ChatGPT, Claude]

**Purpose:** [What you used it for]
- Example: "Generated boilerplate React components"
- Example: "Debugging assistance for async functions"
- Example: "Code review and optimization suggestions"

**Key Prompts Used:**
- "Create a REST API endpoint for user authentication"
- "Debug this async function that's causing race conditions"
- "Optimize this database query for better performance"

**Percentage of AI-generated code:** [Approximately X%]

**Human Contributions:**
- Architecture design and planning
- Custom business logic implementation
- Integration and testing
- UI/UX design decisions

*Note: Proper documentation of AI usage demonstrates transparency and earns bonus points in evaluation!*

---

## Team Contributions

- [Widad Sali]: [Backend development, Gemini AI integration, and Database design.]
- [Mary Joicy Thomas]: [Frontend UI development, Hormone-logic implementation, and Documentation.]


---

## License

This project is licensed under the [LICENSE_NAME] License - see the [LICENSE](LICENSE) file for details.

**Common License Options:**
- MIT License (Permissive, widely used)
- Apache 2.0 (Permissive with patent grant)
- GPL v3 (Copyleft, requires derivative works to be open source)

---

Made with ❤️ at TinkerHub