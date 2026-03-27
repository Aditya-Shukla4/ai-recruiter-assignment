# AI Recruiter Pro 🚀

A high-fidelity, production-ready AI Candidate Profiling System. This platform allows candidates to input their raw career history, which is then parsed by an advanced LLM into a structured JSON format, and seamlessly rendered into a premium, recruiter-facing dashboard.

---

## ✨ Product Thinking & Brutalist UI

Built with a focus on modern, enterprise-level design principles:

- **Monochrome Aesthetic:** Deep Zinc (900/950) backgrounds with high-contrast Emerald accents. (Zero generic blue/purple templates).
- **Borderless Design:** Zero harsh borders. UI separation is achieved through typography, negative space, and subtle ambient shadows.
- **Stealth Search (⌘K):** Real-time, zero-latency filtering for recruiters to find candidates by tech stack or email.
- **Print-Ready Export:** Built-in PDF export mode that automatically strips dark mode styles for clean, ink-saving prints without external heavy libraries.

---

## 🛠️ Core Tech Stack

| Layer         | Technology                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------- |
| **Frontend**  | React.js, Vite, Tailwind CSS (Custom Zinc/Emerald Theme), Framer Motion, Lucide Icons       |
| **Backend**   | Node.js, Express.js, MongoDB, Mongoose                                                      |
| **AI Engine** | Groq SDK powering `llama-3.3-70b-versatile` for lightning-fast NLP extraction & JSON output |

---

## 📁 Project Architecture

Clean separation of concerns ensuring scalability and easy deployment.

```text
ai-recruiter-assignment/
├── frontend/                  # React + Vite Client
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route-level page components
│   │   └── services/          # API call abstractions
│   ├── index.html
│   └── vite.config.js
│
└── backend/                   # Node.js + Express API
    ├── src/
    │   ├── config/            # DB & environment config
    │   ├── controllers/       # Route handler logic
    │   ├── models/            # Mongoose schemas
    │   ├── routes/            # Express route definitions
    │   └── services/          # AI parsing & business logic
    └── server.js
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites

Make sure you have the following installed and running:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- A free [Groq API Key](https://console.groq.com/)

---

### 1. Backend Setup

Navigate to the backend directory, install dependencies, and configure environment variables.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```plaintext
PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

Start the backend development server:

```bash
npm run dev
```

> The server will start on **port 5000**.

---

### 2. Frontend Setup

Open a new terminal window, navigate to the frontend directory, and install dependencies.

```bash
cd frontend
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Visit **[http://localhost:5173](http://localhost:5173)** to view the application in your browser.

---

## 🧠 AI Parsing Logic

The application uses targeted prompt engineering to instruct the **Llama-3.3-70b-versatile** model to return strictly formatted JSON that matches the Mongoose schema exactly. This guarantees zero parsing errors when piping AI output directly into the database — no sanitization middleware needed.

```
Raw Text Input  →  Groq LLM (Llama 3.3)  →  Structured JSON  →  MongoDB  →  Dashboard
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
