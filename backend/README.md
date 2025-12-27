# NeuroNet Backend API

Backend API for NeuroNet - A mental health support platform built with FastAPI.

## 🏗️ Project Status

**STEP 0: Backend Foundation**

This is the initial backend setup. Business logic, authentication, database models, and feature endpoints will be added in subsequent steps.

## 📋 Prerequisites

- Python 3.9 or higher
- pip (Python package manager)

## 🚀 Setup Instructions

### 1. Create Virtual Environment

```bash
# Navigate to the backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

```bash
# Copy the example environment file
copy .env.example .env

# Edit .env with your actual configuration values
# (For STEP 0, default values will work)
```

### 4. Run the Server

```bash
uvicorn app.main:app --reload
```

The server will start at `http://localhost:8000`

## 📡 Available Endpoints

### Root Endpoint
- **GET** `/` - Confirms backend is running

### Health Check
- **GET** `/health` - Service health status

### API Documentation
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py        # Environment configuration
│   │   ├── database.py      # Database connection (placeholder)
│   │   └── security.py      # Security utilities (placeholder)
│   └── api/
│       ├── __init__.py
│       └── health.py        # Health check endpoints
├── requirements.txt         # Python dependencies
├── .env.example            # Environment variables template
└── README.md               # This file
```

## 🔄 Next Steps

The following will be implemented in subsequent steps:

- **STEP 1**: Neon PostgreSQL database connection and models
- **STEP 2**: JWT authentication and user management
- **STEP 3**: Patient and therapist profile endpoints
- **STEP 4**: Appointment scheduling system
- **STEP 5**: Session notes and progress tracking
- **STEP 6**: Additional features (mood tracking, buddy matching, etc.)

## 🛠️ Technology Stack

- **Framework**: FastAPI
- **Server**: Uvicorn
- **Configuration**: Pydantic Settings
- **Environment**: Python-dotenv

## 📝 Notes

- This is a hackathon project focused on rapid development
- No AVC, video, WebRTC, blockchain, or AI logic in this initial setup
- Authentication and database logic are placeholders for now
- CORS is configured for development (adjust for production)

---

Built with ❤️ for NeuroNet
