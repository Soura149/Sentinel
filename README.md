# Sentinel - Smart ICU Management System

A comprehensive, AI-powered ICU management system for monitoring patient vitals, managing medical records, and receiving intelligent healthcare insights powered by Google Gemini.

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Project Overview

**Sentinel** is a production-ready, AI-powered Smart ICU Dashboard designed for modern healthcare facilities. It combines real-time patient monitoring, intelligent insights, and comprehensive medical record management in one seamless platform.

### Key Highlights

- **AI-Powered Insights**: Automated patient analysis using Google Gemini 2.5 Flash Lite
- **Real-time Monitoring**: Live vital signs tracking with historical trends
- **Secure & Role-Based**: JWT authentication with Admin/Staff access control
- **Intelligent Chat**: AI assistant for quick patient queries
- **Medical Records Hub**: Upload, view, and AI-analyze medical documents
- **Modern UI**: Glassmorphism design with light/dark mode support

---

## Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Charts**: Recharts for real-time vital sign visualization
- **Styling**: Custom CSS with design tokens (glassmorphism, dark mode)
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT-based with bcrypt password hashing
- **File Upload**: Multer (supports images, PDFs, text files)
- **Email**: Nodemailer (for patient OTP)

### AI Service
- **Language**: Python 3.9+
- **Framework**: FastAPI
- **AI Models**: 
  - Google Gemini 2.5 Flash (insights, chat) - 1,500 requests/day
  - Google Gemini 2.5 Flash Lite (image analysis, patient chat)
- **Features**: 
  - Medical insights generation
  - Conversational AI assistant
  - Medical image analysis
  - Plain text responses (no markdown/special characters)

---

## Features

### Authentication & Security
- JWT-based authentication with secure token management
- Role-based access control (Admin & Staff)
- Password hashing with bcrypt
- OTP verification for patient access

### Patient Management
- Complete CRUD operations for patient records
- Track demographics, admission status, medical history
- Manage allergies, blood type, and emergency contacts
- Multi-patient dashboard with search and filters

### Real-time Vitals Monitoring
- **7 Vital Parameters**:
  - Heart Rate (bpm)
  - Blood Pressure (mmHg)
  - Oxygen Saturation (%)
  - Temperature (°F)
  - Respiratory Rate (breaths/min)
  - Blood Sugar (mg/dL)
  - CO2 Levels (mmHg)
- Interactive charts with historical data
- Color-coded alerts for abnormal readings
- Manual entry and bulk data import

### Medical Records Hub
- **File Types Supported**:
  - Images (X-rays, CT scans, photos)
  - PDFs (lab reports, prescriptions)
  - Text reports (doctor's notes)
- AI-powered document analysis
- Secure file storage and retrieval
- Download original files
- Categorized by type (Lab, Imaging, Prescription, etc.)

### AI Command Center
- **Comprehensive Patient Insights**:
  - Critical Index calculation (0-100 scale)
  - Automated concern detection (Critical/Warning/Info)
  - Trend analysis from vital signs
  - Medication and care recommendations
- **Conversational AI Assistant**:
  - Context-aware patient discussions
  - Medical query responses
  - Plain text responses (optimized for readability)
- **Medical Image Analysis**:
  - Visual diagnosis assistance
  - Severity assessment
  - Treatment suggestions
  - Allergy-aware medication recommendations

### Modern UI/UX
- Glassmorphism design with subtle gradients
- Light/Dark mode toggle
- Responsive layout (desktop, tablet, mobile)
- Smooth animations and transitions
- Accessible color schemes (WCAG compliant)

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.0+ ([Download](https://nodejs.org/))
- **Python** 3.9+ ([Download](https://www.python.org/downloads/))
- **MongoDB** (Local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Google Gemini API Key** ([Get Free Key](https://aistudio.google.com/app/apikey))

---

## Quick Start

### Option 1: Automated Setup (Windows - Recommended)

```powershell
# Run the setup wizard from the project root
.\setup.ps1
```

The wizard will:
1. Install all dependencies (backend, frontend, AI service)
2. Create `.env` files from templates
3. Guide you through configuration
4. Optionally seed sample data

### Option 2: Manual Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/Soura149/Sentinel.git
cd Sentinel
```

#### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file (copy from .env.example if available)
# Add the following variables:
```

**`.env` Configuration**:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/icu_dashboard

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Email (for Patient OTP - optional for development)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Server
PORT=5000
```

**Email Setup (Gmail)**:
1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character app password as `SMTP_PASS`

**Seed Sample Data** (Optional):
```bash
npm run seed
```

**Start Backend**:
```bash
npm run dev
```
*Runs on: `http://localhost:5000`*

#### 3. AI Service Setup

```bash
cd ai-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
# Add:
```

**`.env` Configuration**:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=8000
HOST=0.0.0.0
```

**Start AI Service**:
```bash
uvicorn main:app --reload
```
*Runs on: `http://localhost:8000`*
*API Docs: `http://localhost:8000/docs`*

#### 4. Frontend Setup

```bash
cd frontend
npm install

# Start development server
npm run dev
```
*Runs on: `http://localhost:5173`*

---

## Default Credentials

> **Security Warning**: Change these credentials immediately in production!

### Admin Account
- **Email**: `admin@icu.com`
- **Password**: `admin123`
- **Permissions**: Full access

### Staff Account
- **Email**: `staff1@icu.com`
- **Password**: `staff123`
- **Permissions**: Patient management, vitals entry

### Patient Account
- Use the OTP system for secure patient access
- OTP sent via email or logged to console (dev mode)

---

## Database Schema

### Collections

#### `users`
```javascript
{
  _id: ObjectId,
  username: String,
  email: String (unique),
  password: String (bcrypt hashed),
  role: String (enum: 'admin', 'staff'),
  createdAt: Date,
  updatedAt: Date
}
```

#### `patients`
```javascript
{
  _id: ObjectId,
  name: String,
  age: Number,
  gender: String,
  reasonForAdmission: String,
  medicalHistory: String,
  allergies: [String],
  bloodType: String,
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  admissionDate: Date,
  status: String (enum: 'active', 'discharged'),
  createdAt: Date,
  updatedAt: Date
}
```

#### `vitals`
```javascript
{
  _id: ObjectId,
  patientId: ObjectId (ref: Patient),
  heartRate: Number,
  bloodPressure: String,
  oxygenSaturation: Number,
  temperature: Number,
  respiratoryRate: Number,
  bloodSugar: Number,
  co2Level: Number,
  timestamp: Date,
  createdAt: Date
}
```

#### `reports`
```javascript
{
  _id: ObjectId,
  patientId: ObjectId (ref: Patient),
  title: String,
  type: String (enum: 'text', 'image', 'pdf'),
  category: String,
  content: String, // For text reports
  filePath: String, // For uploaded files
  fileUrl: String,
  aiExtractedText: String,
  aiSummary: String,
  timestamp: Date,
  createdAt: Date
}
```

---

## API Documentation

### Backend API (`http://localhost:5000`)

#### Authentication
- `POST /api/auth/register` - Register new staff/admin
- `POST /api/auth/login` - Login
- `POST /api/auth/patient-otp` - Request patient OTP
- `POST /api/auth/patient-verify` - Verify patient OTP

#### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

#### Vitals
- `GET /api/vitals/patient/:patientId` - Get patient vitals
- `POST /api/vitals` - Add vital reading
- `DELETE /api/vitals/:id` - Delete vital reading

#### Reports
- `GET /api/reports/patient/:patientId` - Get patient reports
- `POST /api/reports/upload` - Upload report
- `GET /api/reports/:id` - Get report by ID
- `DELETE /api/reports/:id` - Delete report

### AI Service API (`http://localhost:8000`)

#### Endpoints
- `GET /health` - Health check
- `POST /api/generate-insights` - Generate patient insights
- `POST /api/chat` - AI chat (staff assistant)
- `POST /api/patient-chat` - AI chat (patient queries)
- `POST /api/analyze-medical-image` - Analyze medical images

**Swagger UI**: http://localhost:8000/docs

---

## AI Features & Optimization

### Models Used

| Endpoint | Model | Quota (Free Tier) | Purpose |
|----------|-------|-------------------|---------|
| `/api/generate-insights` | gemini-2.5-flash | 1,500/day | Patient insights |
| `/api/chat` | gemini-2.5-flash | 1,500/day | Staff assistant |
| `/api/analyze-medical-image` | gemini-2.5-flash-lite | 20/day | Image analysis |
| `/api/patient-chat` | gemini-2.5-flash-lite | 20/day | Patient queries |

### Optimizations Applied

**Reduced Token Usage**:
- Vitals limited to last 5 readings (50% reduction)
- Reports limited to top 3 (40% reduction)
- Condensed prompt instructions (30% reduction)

**Smart Rate Limiting**:
- Auto-refresh disabled by default
- 15-minute refresh interval (when enabled)
- No auto-generation on page load

**Special Character Handling**:
- AI instructed to use plain text only
- No markdown formatting in responses
- Backup cleaning on frontend for safety

**Error Handling**:
- Specific error messages for quota/API key/connection issues
- Safe response extraction with fallbacks
- Detailed logging for debugging

### Expected Token Usage

- **Insights**: ~500-600 tokens per call
- **Chat**: ~300-400 tokens per message
- **Image Analysis**: ~700-900 tokens per image

---

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### AI Service Tests
```bash
cd ai-service
pytest
```

### Manual Testing Checklist

- [ ] Login with admin/staff accounts
- [ ] Create new patient
- [ ] Add vital readings (manual entry)
- [ ] Upload medical reports (image, PDF, text)
- [ ] Generate AI insights
- [ ] Chat with AI assistant
- [ ] Test light/dark mode toggle
- [ ] Verify mobile responsiveness

---

## Troubleshooting

### Common Issues

#### "AI service error" or "Quota exceeded"
**Solution**: 
- Check if `GEMINI_API_KEY` is set correctly in `.env`
- Free tier limit: 1,500 requests/day (resets midnight PT)
- Monitor usage: https://ai.dev/usage?tab=rate-limit

#### Email OTP not sending
**Solution**:
- Verify `SMTP_USER` and `SMTP_PASS` are correct
- Enable "Less secure app access" or use App Password (Gmail)
- Check console logs for OTP in development mode

#### MongoDB connection failed
**Solution**:
- Ensure MongoDB is running: `mongod --version`
- Check `MONGODB_URI` format: `mongodb://localhost:27017/icu_dashboard`
- For Atlas, ensure IP whitelist is configured

#### Frontend not connecting to backend
**Solution**:
- Verify backend is running on `http://localhost:5000`
- Check CORS settings in `backend/server.js`
- Ensure no firewall blocking ports 5000, 5173, 8000

---

## Performance Metrics

- **Page Load**: < 2 seconds
- **API Response**: < 200ms (avg)
- **AI Insights**: 2-4 seconds
- **Chart Rendering**: < 500ms
- **File Upload**: Supports up to 10MB files

---

## Security Best Practices

1. **Change Default Credentials** immediately in production
2. **Use Environment Variables** for all sensitive data
3. **Enable HTTPS** in production (use Let's Encrypt)
4. **Implement Rate Limiting** on API endpoints
5. **Regular Database Backups** (use MongoDB Atlas automated backups)
6. **Monitor API Usage** to avoid quota exhaustion
7. **Sanitize User Inputs** (already implemented with express-validator)

---

## Deployment

### Vercel (All Services)

All three components are deployed on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel

# Deploy backend
cd backend
vercel

# Deploy AI service
cd ai-service
vercel
```

**Environment Variables Configuration:**

After deploying each service on Vercel, configure the environment variables:

**Frontend**:
- `VITE_API_URL` - Your backend Vercel URL
- `VITE_AI_SERVICE_URL` - Your AI service Vercel URL

**Backend**:
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Your JWT secret key
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - Email configuration
- `FRONTEND_URL` - Your frontend Vercel URL (for CORS)

**AI Service**:
- `GEMINI_API_KEY` - Your Google Gemini API key

### MongoDB Atlas (Database)
1. Create cluster at https://cloud.mongodb.com
2. Get connection string
3. Add to backend environment variables on Vercel
4. Whitelist Vercel IP addresses (or use `0.0.0.0/0` for all IPs)

---

## License

MIT License - see [LICENSE](LICENSE) for details

---

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Contact & Support

- **GitHub**: [@Soura149](https://github.com/Soura149)
- **Issues**: [GitHub Issues](https://github.com/Soura149/Sentinel/issues)

---

## Acknowledgments

- Google Gemini AI for powerful medical insights
- Open source community for excellent libraries
- Healthcare professionals for domain expertise

---

**Built with care for modern healthcare**
