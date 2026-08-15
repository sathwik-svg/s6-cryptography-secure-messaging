import { useState } from "react";
import { motion } from "framer-motion";
import { LockKeyhole, ShieldCheck, Send, Eye, Activity } from "lucide-react";
import "./App.css";

const API = "http://localhost:8000";

export default function App() {
  const [sender, setSender] = useState("Alice");
  const [recipient, setRecipient] = useState("Bob");
  const [message, setMessage] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [status, setStatus] = useState("Ready");

  const encryptAndSend = async () => {
    if (!message.trim()) return;
    setStatus("Encrypting...");
    try {
      const res = await fetch(`${API}/api/messages/encrypt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender, recipient, message })
      });
      const data = await res.json();
      setEncrypted(data.encrypted_message);
      setMessage("");
      setStatus("Message encrypted & secured");
    } catch {
      setStatus("Backend unavailable");
    }
  };

  const decrypt = async () => {
    if (!encrypted) return;
    setStatus("Decrypting...");
    try {
      const res = await fetch(`${API}/api/messages/decrypt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ encrypted_message: encrypted })
      });
      const data = await res.json();
      setDecrypted(data.message);
      setStatus("Message successfully decrypted");
    } catch {
      setStatus("Decryption failed");
    }
  };

  return (
    <main>
      <div className="orb orb1" />
      <div className="orb orb2" />

      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="nav"
      >
        <div className="brand">
          <LockKeyhole size={28} />
          <span>Secure<span>Msg</span></span>
        </div>
        <div className="status"><Activity size={16}/> {status}</div>
      </motion.nav>

      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="badge"><ShieldCheck size={16}/> END-TO-END CRYPTOGRAPHY</div>
          <h1>Private messaging,<br/><span>secured by design.</span></h1>
          <p>Send messages through an authenticated encryption layer and inspect the complete cryptographic workflow.</p>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, scale: .96 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2><Send size={20}/> Secure Message</h2>

          <div className="grid">
            <input value={sender} onChange={e => setSender(e.target.value)} placeholder="Sender" />
            <input value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="Recipient" />
          </div>

          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Write a confidential message..."
          />

          <button onClick={encryptAndSend}>
            <LockKeyhole size={18}/> Encrypt & Send
          </button>

          {encrypted && (
            <div className="result">
              <label>ENCRYPTED CIPHERTEXT</label>
              <code>{encrypted}</code>
              <button className="secondary" onClick={decrypt}>
                <Eye size={17}/> Decrypt
              </button>
            </div>
          )}

          {decrypted && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="decrypted">
              <label>DECRYPTED MESSAGE</label>
              <p>{decrypted}</p>
            </motion.div>
          )}
        </motion.div>
      </section>

      <section className="features">
        <div><ShieldCheck/><b>Authenticated</b><span>Integrity protected</span></div>
        <div><LockKeyhole/><b>Encrypted</b><span>Fernet cryptography</span></div>
        <div><Activity/><b>API Ready</b><span>FastAPI backend</span></div>
      </section>
    </main>
  );
}
