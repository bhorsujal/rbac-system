# VRV Security: Role-Based Access Control System

## Project Overview

This is a full-stack web application that demonstrates a robust Role-Based Access Control (RBAC) system, designed to provide secure and granular user access management.

## Key Features

### Authentication
- Secure user registration and login using JWT
- Multi-role authentication system

### Access Control
- Dynamic role-based permissions
- Granular service access control
- Admin panel for user and role management

### User Roles
- **Administrator**: Complete system access
- **Manager**: Service-specific permissions
- **Analyst**: Limited resource access
- **User**: Minimal system interaction

## Technology Stack

### Frontend
- React.js
- Bootstrap
- Axios for API integration

### Backend
- Django
- Django REST Framework
- SQLite database
- JWT authentication

## Quick Setup

### Prerequisites
- Python 3.8+
- Node.js v16+
- npm

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/bhorsujal/rbac-system.git
   cd rbac-system
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv env
   source env/bin/activate  # for Linux
   
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

## Usage

1. Register a new user and select an appropriate role
2. Log in with your credentials
3. Access services based on your assigned role

## Deployment

- **Backend**: PythonAnywhere
- **Frontend**: Vercel

## Note

This project is for educational purposes and demonstrates a practical implementation of Role-Based Access Control.
