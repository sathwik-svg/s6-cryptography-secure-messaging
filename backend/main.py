from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from cryptography.fernet import Fernet, InvalidToken
from datetime import datetime, timezone
import hashlib
import os

app = FastAPI(
    title="S6 Secure Messaging API",
    version="1.0.0",
    description="Encrypted messaging API for the S6 Cryptography project."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

KEY_FILE = os.path.join(os.path.dirname(__file__), ".secret.key")

def load_key():
    if not os.path.exists(KEY_FILE):
        key = Fernet.generate_key()
        with open(KEY_FILE, "wb") as f:
            f.write(key)
        os.chmod(KEY_FILE, 0o600)
        return key
    with open(KEY_FILE, "rb") as f:
        return f.read()

cipher = Fernet(load_key())
messages = []

class MessageRequest(BaseModel):
    sender: str = Field(min_length=1, max_length=80)
    recipient: str = Field(min_length=1, max_length=80)
    message: str = Field(min_length=1, max_length=5000)

class EncryptedMessage(BaseModel):
    sender: str
    recipient: str
    encrypted_message: str

@app.get("/")
def root():
    return {
        "name": "S6 Secure Messaging API",
        "status": "online",
        "security": "Fernet authenticated encryption",
        "version": "1.0.0"
    }

@app.get("/health")
def health():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

@app.post("/api/messages/encrypt", response_model=EncryptedMessage)
def encrypt_message(request: MessageRequest):
    encrypted = cipher.encrypt(request.message.encode()).decode()

    record = {
        "id": hashlib.sha256(
            f"{request.sender}:{request.recipient}:{encrypted}".encode()
        ).hexdigest()[:16],
        "sender": request.sender,
        "recipient": request.recipient,
        "encrypted_message": encrypted,
        "created_at": datetime.now(timezone.utc).isoformat()
    }

    messages.append(record)

    return {
        "sender": request.sender,
        "recipient": request.recipient,
        "encrypted_message": encrypted
    }

@app.post("/api/messages/decrypt")
def decrypt_message(request: dict):
    encrypted = request.get("encrypted_message")

    if not encrypted:
        raise HTTPException(status_code=400, detail="encrypted_message is required")

    try:
        decrypted = cipher.decrypt(encrypted.encode()).decode()
    except (InvalidToken, ValueError):
        raise HTTPException(status_code=400, detail="Invalid encrypted message")

    return {"message": decrypted}

@app.get("/api/messages")
def get_messages():
    return {
        "count": len(messages),
        "messages": messages
    }

@app.get("/api/security")
def security_status():
    return {
        "encryption": "Fernet",
        "authenticated_encryption": True,
        "key_storage": "Local protected key file",
        "transport": "HTTP locally / HTTPS in production",
        "message_storage": "Encrypted ciphertext",
        "status": "protected"
    }
