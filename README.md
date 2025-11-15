# Upteky Dashboard

**Upteky Dashboard** is a MERN-based analytics and feedback management system designed to help teams track performance, view feedback data, and manage user activity efficiently. The project includes user authentication, chart analytics, file uploads, and a clean interactive UI.

---

## 🚀 Prompt

 Full-Stack Development Task: Feedback Management Dashboard

Objective: Build and deploy a complete full-stack Feedback Management Dashboard application. The entire project should be production-ready and deployed to demonstrate full-stack capabilities (frontend, backend, database, and deployment).

Duration & Constraint: The project must be designed for a rapid build (simulating a 2-hour task).

🚀 Project Stack & Technologies

Please use the following or equivalent modern technologies:
* 
Frontend Example Stack: React (or a similar modern framework like Vue/Angular)

Backend Example Stack: Node.js + Express.js

Database Options: SQLite, MySQL, or MongoDB

I. Frontend Requirements (Dashboard & Form)
Develop a responsive user interface with the following components:
1. Feedback Submission Form:
   * Include fields for Name, Email, Message, and Rating (a selection from 1 to 5).

Implement logic to send the submitted data to the backend API (POST /api/feedback) upon submission.
Feedback Display Table:
Display all submitted feedbacks in a clear table.

The table must include columns for Name, Email, Rating, Message, and CreatedAt (timestamp).
Analytics Cards (Basic Insights):
Display key metrics using dedicated cards:

Total Feedbacks.

Average Rating.

Positive Ratings (defined as a rating of 4 or 5).

Negative Ratings (defined as a rating of 1 or 2, i.e., less than 3).

II. Backend (Express.js API) Requirements

Build a RESTful API using Express.js:
1. API Endpoints:
   * 
POST /api/feedback: Endpoint to accept and persist new feedback submissions.

GET /api/feedback: Endpoint to fetch and return all feedback records.

GET /api/stats (Optional): Endpoint to return analytics data (e.g., average rating, total count).

Data Validation:
Implement basic server-side validation to ensure Name and Message fields are not empty upon submission.

Database Interaction: Ensure the API correctly interacts with the chosen database (see Section III).

III. Database Requirements

Database Choice: Use SQLite, MySQL, or MongoDB.

Schema/Collection: Create a table or collection named feedbacks with the following fields:

id (primary key)

name (string)

email (string)

message (text)

rating (integer, 1-5)

createdAt (datetime/timestamp)

IV. Optional Bonus Features

Incorporate the following features for a higher score (if time permits):
* 
Search/Filter: Add functionality to search or filter the displayed feedbacks by Rating.

Export Data: Implement a feature to allow exporting the fetched feedback data to a CSV file.

Authentication: Implement Basic Authentication for accessing the dashboard view, ensuring only authorized users can see the feedback and analytics.

V. Deployment Strategy

The final output must be deployed and working live:
* 
Frontend: Deploy to Vercel or Netlify.

Backend: Deploy the Express API to Render, Railway, or Cyclic.

Database: Use a hosted solution (e.g., Mongo Atlas or Render MySQL) or use a local SQLite instance stored in the repo.

VI. Deliverables Checklist

Provide the complete code and deployment links:
1. A single GitHub Repository link containing both frontend and backend code.

The Live URL for the Frontend Dashboard.

The Live URL for the Backend API.

Evaluation Focus: Functionality (30%), Code Quality (20%), and Working Live Demo (10%) are high-priority criteria.

Make the UI/UX more catchcy and use color gradients too

---

## 🧭 Repo structure

```
uptekyDash/
├─ backend/
│  ├─ src/
│  │  ├─ controllers/
│  │  ├─ models/
│  │  ├─ routes/
│  │  ├─ middlewares/
│  │  └─ index.js
│  ├─ .env.example
│  └─ package.json
├─ frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ services/
│  │  └─ App.js
│  └─ package.json
├─ README.md
└─ .gitignore
```

---

## 🛠️ Tech stack

* **Frontend:** React, React Router, Axios, Chart.js (or Recharts)
* **Backend:** Node.js, Express
* **Database:** MongoDB (Mongoose)
* **Auth:** JWT
* **Storage:** Local / Cloud (e.g., AWS S3) for uploaded files

---

## ⚙️ Quick start

### Prerequisites

* Node.js (>= 14)
* npm or yarn
* MongoDB (local or Atlas)

### 1. Clone the repo

```bash
git clone https://github.com/PavanChauhan12/uptekyDash.git
cd uptekyDash
```

### 2. Backend setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MONGO_URI, JWT_SECRET, PORT, etc.
npm install
npm run dev
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
npm start
```

Open `http://localhost:3000` for the frontend and `http://localhost:5050` (or configured port) for the backend API.

---

## 🔐 Environment variables (example)

Create a `.env` in `backend/` with:

```
PORT=5050
MONGO_URI=mongodb://localhost:27017/upteky
JWT_SECRET=your_jwt_secret_here
UPLOAD_DIR=uploads
```

---

## ✅ Key API endpoints (examples)

* `POST /api/auth/register` — Register user
* `POST /api/auth/login` — Login user (returns JWT)
* `GET /api/dashboard/files` — List uploaded files (auth)
* `POST /api/files/upload` — Upload Excel file (auth)
* `GET /api/charts` — Get chart metadata
* `POST /api/charts` — Create chart metadata

---

## 🧩 Example: Merging `master` into `main`

If your repo still has a `master` branch and you want to merge commits to `main`:

```bash
# fetch remote changes
git fetch origin

# create main locally from master (if not already present)
git checkout master
git checkout -b main

# or merge master into existing main
# git checkout main
# git merge master

# push main to remote
git push -u origin main
```

---

## 🧪 Development notes

* Frontend stores auth token in `localStorage` and sends Authorization header `Bearer <token>` to protected APIs.
* Backend validates JWT with middleware; add role-based checks (admin/user) where needed.
* Charts and uploads are tracked in MongoDB; maintain an index on `createdAt` for quick queries.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m "feat: add ..."`
4. Push to your branch and open a pull request

Please follow conventional commits and include clear descriptions.

---

## 📝 License

This project is open source — add your preferred license here (e.g., MIT).

---

## 📫 Contact

Created by Pavan Chauhan — feel free to open issues or contact me via GitHub.
