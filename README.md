# 📅 Time Table Generator  

A **full-stack web app** to automatically generate class timetables by configuring teachers, subjects, and working days.  

🚀 **Locally works fine** but ⚠️ needs some extra configuration during deployment (CORS, MongoDB Atlas IP whitelist, and environment variables).  

---

## 🛠️ Tech Stack  

- **Frontend:** React (Vite), TailwindCSS, Axios, jsPDF  
- **Backend:** Node.js, Express.js, MongoDB (Atlas), Helmet, CORS, Morgan  
- **Deployment:** Vercel (Frontend), Render (Backend)  

---

## 📂 Project Structure  

```
time-table-generator/
│
├── backend/                      # Backend service (Node + Express)
│   ├── src/
│   │   ├── db.js                 # MongoDB connection
│   │   ├── server.js             # Express server setup
│   │   ├── routes/               # API Routes
│   │   │   ├── subjects.js
│   │   │   ├── teachers.js
│   │   │   ├── settings.js
│   │   │   ├── timetable.js
│   │   │   └── reset.js
│   │   └── models/               # MongoDB Models
│   │       ├── Subject.js
│   │       ├── Teacher.js
│   │       └── Timetable.js
│   ├── package.json
│   └── .env                      # Backend environment variables
│
├── frontend/                     # Frontend service (React + Vite)
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   │   ├── GenerateTimetable.jsx
│   │   │   ├── TeacherForm.jsx
│   │   │   ├── SubjectForm.jsx
│   │   │   └── SettingsForm.jsx
│   │   ├── pages/                # Page components
│   │   │   ├── Home.jsx
│   │   │   └── Timetable.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── package.json
│   └── .env                      # Frontend environment variables
│
├── README.md                     # Project documentation
└── .gitignore

```

## ⚙️ Setup Instructions
**1️⃣ Clone the repo**
```
git clone https://github.com/<your-username>/time-table-generator.git
cd time-table-generator
```

**2️⃣ Backend Setup**
```
cd backend
npm install
```
- Create .env file inside backend/
  ```
  MONGO_URI=your-mongodb-atlas-uri
  PORT=5001
  CLIENT_ORIGIN=https://time-table-generator-frontend.vercel.app
  ```
- Run backend:
  ```
  npm start
  ```
- Server should run at http://localhost:5001
# 
## 3️⃣ Frontend Setup
```
cd frontend
npm install
```
App should open at http://localhost:5173

## 🌍 Deployment Notes (Important 🚨)
⚠️ Currently, the project works locally but **may crash after deployment.**

**✅ MongoDB Atlas**
- Go to Network Access in MongoDB Atlas
- Add this IP → ``` 0.0.0.0/0 ``` (allow all, for testing)
- Make sure database username & password are correct

**Frontend (Vercel)**
- Go to Vercel → Import frontend repo
- **Build Command:** ``` vite build ```
- **Output Directory:** ```dist```
- Add Environment Variable:
  ```
    VITE_API_BASE_URL= https://time-table-generator-backend.onrender.com/api
  ```
**Backend (Render)**

- Go to Render → Create new Web Service
- Connect backend repo
- **Build Command:** npm install
- **Start Command:** node src/server.js
- Add Environment Variables:
    - ```MONGO_URI=your-mongodb-atlas-uri ```
    - ```CLIENT_ORIGIN=https://time-table-generator-frontend.vercel.app```

#
## 📸 Screenshots
<img width="1606" height="956" alt="Screenshot 2025-09-01 at 02 53 56" src="https://github.com/user-attachments/assets/b287dd35-4880-46ce-9ddd-06629cef9ead" />

## 📹 Demo Video


## ✅ CORS Issue

If backend logs show:

```
Error: Not allowed by CORS
```
#

**✅ API Endpoints**

| Method | Endpoint                  | Description                |
| ------ | ------------------------- | -------------------------- |
| GET    | `/api/subjects`           | Fetch all subjects         |
| POST   | `/api/subjects`           | Add new subject            |
| GET    | `/api/teachers`           | Fetch all teachers         |
| POST   | `/api/teachers`           | Add new teacher            |
| POST   | `/api/timetable/generate` | Generate timetable         |
| GET    | `/api/timetable`          | Fetch generated timetables |
| DELETE | `/api/timetable/:id`      | Delete timetable           |

# 🚧 Known Issues in Deployment

- ❌ CORS errors (fix by aligning CLIENT_ORIGIN & VITE_API_BASE_URL)
- ❌ MongoDB connection errors (fix by adding ``` 0.0.0.0/0 ``` in whitelist)
- ❌ 500 errors after deploy (usually ENV variables misconfigured)

# 👨‍💻 Author
Developed by **Rishu Raj ✨**
