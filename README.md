S6 Cryptography Secure Messaging
# 🔐 S6 Cryptography Secure Messaging

A full-stack secure messaging platform demonstrating applied cryptography, secure API engineering, modern frontend development, and cloud deployment.

## 🚀 Live Demo

**Frontend:** [Netlify Deployment](https://dulcet-taiyaki-ced013.netlify.app/)

> The frontend is deployed on Netlify. The FastAPI backend is currently configured for separate deployment.

---

## ✨ Features

* 🔐 Authenticated message encryption using Fernet
* 🔓 Secure message decryption
* 💬 Sender and recipient messaging workflow
* 🛡️ Cryptographic integrity protection
* ⚡ FastAPI REST API
* 📚 Interactive Swagger API documentation
* 🎨 Modern animated React interface
* 📊 Security status endpoint
* 🐳 Docker-ready backend
* 🔄 Git-based development workflow
* ☁️ Cloud-deployment ready architecture

---

## 🏗️ Architecture

```text
                    ┌─────────────────────────┐
                    │       React + Vite      │
                    │   Animated Web Client   │
                    └────────────┬────────────┘
                                 │
                              HTTPS
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │       FastAPI API       │
                    │    REST Architecture    │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   Cryptography Layer    │
                    │ Fernet Authenticated    │
                    │       Encryption        │
                    └─────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* JavaScript
* Framer Motion
* Lucide React
* CSS3

### Backend

* Python
* FastAPI
* Uvicorn
* Cryptography
* Pydantic

### DevOps & Cloud

* Git
* GitHub
* Docker
* Netlify
* Cloud-ready FastAPI deployment

---

## 🔒 Security Model

The application uses **Fernet authenticated encryption** to protect message confidentiality and integrity.

```text
Plaintext
    ↓
Fernet Encryption
    ↓
Authenticated Ciphertext
    ↓
API Response
```

For decryption:

```text
Ciphertext
    ↓
Fernet Verification
    ↓
Decryption
    ↓
Original Message
```

The encryption key is generated locally and excluded from Git version control.

> **Security note:** This is an educational portfolio project. A production messaging platform would require additional security engineering, including identity management, key management infrastructure, TLS enforcement, secure persistence, auditing, rate limiting, and an independent security review.

---

## 📡 API Endpoints

| Method | Endpoint                | Purpose                       |
| ------ | ----------------------- | ----------------------------- |
| `GET`  | `/`                     | API information               |
| `GET`  | `/health`               | Health check                  |
| `POST` | `/api/messages/encrypt` | Encrypt and store a message   |
| `POST` | `/api/messages/decrypt` | Decrypt ciphertext            |
| `GET`  | `/api/messages`         | Retrieve encrypted messages   |
| `GET`  | `/api/security`         | Security configuration status |

Interactive documentation:

```text
http://localhost:8000/docs
```

---

## ▶️ Run Locally

### 1. Clone

```bash
git clone https://github.com/sathwik-svg/s6-cryptography-secure-messaging.git
cd s6-cryptography-secure-messaging
```

### 2. Start Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:8000
```

Swagger:

```text
http://localhost:8000/docs
```

---

## 🐳 Docker

Build the backend image:

```bash
docker build -t s6-secure-messaging .
```

Run:

```bash
docker run -p 8000:8000 s6-secure-messaging
```

API:

```text
http://localhost:8000
```

---

## 📁 Project Structure

```text
s6-cryptography-secure-messaging/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .secret.key
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── vite.config.js
│
├── Dockerfile
├── .gitignore
└── README.md
```

> `.secret.key` is generated locally and must never be committed to GitHub.

---

## 🧪 Example Workflow

```text
User enters message
        ↓
React frontend
        ↓
POST /api/messages/encrypt
        ↓
FastAPI
        ↓
Fernet encryption
        ↓
Encrypted ciphertext
        ↓
Frontend displays secure payload
        ↓
POST /api/messages/decrypt
        ↓
Original message
```

---

## ☁️ Deployment

### Frontend

The React frontend is deployed using Netlify.

**Live frontend:**
https://dulcet-taiyaki-ced013.netlify.app/

### Backend

The FastAPI service is Docker-ready and designed for deployment to a container-compatible cloud platform.

---

## 🎯 Engineering Skills Demonstrated

This project demonstrates practical experience with:

* Applied cryptography
* Secure API design
* REST architecture
* Python backend development
* FastAPI
* React
* API integration
* Authentication-aware encryption
* Error handling
* Docker
* Git/GitHub
* Cloud deployment architecture
* Frontend/backend separation

---

## 📈 Future Improvements

* User authentication and authorization
* PostgreSQL persistence
* WebSocket real-time messaging
* Public-key exchange
* Dedicated key-management service
* HTTPS-only production deployment
* Rate limiting
* Audit logging
* Automated security testing
* CI/CD pipeline
* Container orchestration

---

## 🎓 Academic Project

**Project:** S6 Cryptography Secure Messaging
**Program:** B.Tech Computer Science & Engineering
**Purpose:** Applied Cryptography + Full-Stack Engineering Portfolio

---

## 👨‍💻 Author

**Sathwik Ganji**

Computer Science & Engineering
Cloud & Software Engineering Portfolio

---

⭐ If this project demonstrates useful engineering concepts, consider starring the repository.
