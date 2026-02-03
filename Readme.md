<div align="center">

# 🎓 CONNEXA
### Smart Student Networking Platform

<p>
  <b>Connect. Match. Collaborate.</b>
</p>

<p>
  <img src="https://img.shields.io/badge/Status-Development-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Stack-MERN%20%2B%20Firebase-yellow?style=flat-square" />
</p>

<p>
  Connexa is a college-focused professional networking web application inspired by LinkedIn but designed exclusively for students. It prioritizes location-aware discovery, hybrid matching (Rule-based + ML), and real-time collaboration.
</p>

</div>

---

## 🚀 Project Overview

Connexa enables students to build connection-based networks, discover peers from specific universities/cities, and find collaboration opportunities for hackathons and projects.

### 🏗 Key Architecture Principles
* **BaaS-First:** Zero custom backend server maintenance (relying on Firebase).
* **Hybrid Matching:** Rule-based logic (instant) + ML-based similarity (enhancement).
* **Zero Downtime:** The frontend *never* waits for ML; if the ML service times out, the app falls back seamlessly to rule-based results.

---

## 🛠 Tech Stack

| Component | Technologies |
| :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/-React.js-61DAFB?logo=react&logoColor=black) `Vite` `Tailwind CSS` `Leaflet.js` |
| **Backend (BaaS)** | ![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?logo=firebase&logoColor=black) `Auth` `Firestore` `Storage` |
| **ML Service** | ![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white) `FastAPI` `Pandas` `Scikit-learn` `Render` |

---

## 🧠 Hybrid Matching Strategy (Core Differentiator)

We use a **Fail-Safe** approach to matching to ensure a smooth user experience.

1.  **Level 1: Rule-Based (Always Available) ⚡**
    * **Logic:** Matches based on University, City, State, Department, and Common Interests.
    * **Execution:** Executed instantly on the Client/Firestore side.

2.  **Level 2: ML-Based (Best Effort) 🤖**
    * **Logic:** Uses lightweight vector similarity (TF-IDF / KNN).
    * **Execution:** API hosted on Render.
    * **Timeout Policy:** If the ML API does not respond within **2 seconds** (or hits a cold start), the UI gracefully ignores it and displays only Rule-Based results.

---

## ✨ Core Features

* 🔐 **Authentication:** Secure Signup/Login via Firebase.
* 👤 **Profile System:** Detailed student profiles with skills, bio, and academic info.
* 📰 **Feed:** LinkedIn-style posts (Text/Image) with chronological ordering.
* 🤝 **Match Tab:** Smart suggestions to find peers.
* 🔎 **Discover:** Filter students by location/skills and view Open Invitations.
* 💬 **Real-time Chat:** One-to-one messaging (enabled only after connection acceptance).
* 📢 **Open Invitations:** Post requirements for hackathon teams, projects, or mentorship.

---

## 📂 Folder Structure

```bash
src/
├── main.jsx
├── App.jsx
├── firebase/          # Firebase configuration
├── context/           # React Context (Auth, etc.)
├── routes/            # App Routing
├── services/          # API & Firestore logic
│   ├── authService.js
│   ├── userService.js
│   ├── postService.js
│   ├── connectionService.js
│   ├── chatService.js
│   └── matchService.js
├── components/        # Reusable UI components
│   ├── Navbar.jsx
│   ├── PostCard.jsx
│   ├── UserCard.jsx
│   ├── InvitationCard.jsx
│   └── ...
└── pages/             # Main Views
    ├── auth/
    ├── feed/
    ├── match/
    ├── discover/
    ├── chat/
    └── profile/

```
### 💾 Database Schema (Firestore)

| Collection | Description | Key Fields |
| :--- | :--- | :--- |
| `users` | User Profiles | `uid`, `name`, `university`, `skills`, `connectionCount` |
| `posts` | Feed Content | `authorId`, `text`, `imageUrl`, `likeCount` |
| `connections` | Network Graph | `fromUid`, `toUid`, `status` (pending/accepted) |
| `chats` | Messaging | `members` (array), `lastMessage` |
| `open_requests` | Collaboration | `title`, `tags`, `preferredUniversity` |
## 👥 Team Responsibilities
Chetan Kashniyal : Auth, Profiles, Connection Requests logic.

Akhil Badoni : Feed (Posts/Likes/Comments), Open Invitations system.

Tanisha Bist : Hybrid Matching Logic, Discover Filters, Map View.

Mayank Bhatt : Chat System, Navbar/Layout, UI Polish, Deployment.

## 🚦 Getting Started
### Prerequisites
Node.js & npm

Python 3.9+ (For ML Service)

Firebase Project (Web App configured)Installation

1. Clone the repo
```bash
git clone [https://github.com/your-org/connexa.git](https://github.com/your-org/connexa.git)
cd connexa
```
2. Frontend Setup
```Bash
npm install
# Create .env file with Firebase Config
npm run dev
```
3. ML Service Setup (Optional)
```Bash
cd ml_service
pip install -r requirements.txt
uvicorn main:app --reload
```
## 🤝 Contribution & Git Rules
Main Branch: Stable demo only.

Dev Branch: Integration branch.

Naming Conventions:

Components: PascalCase.jsx

Services: camelCase.js

Commit Messages:feat: add hybrid matching fallback

fix: resolve chat duplication

ui: improve feed layout

<div align="center"><b>Connexa — Portfolio Grade. Industry Aligned.</b></div>

