# MERN Todo App

A full-stack Todo Management Application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
This app supports user authentication, role-based access (admin/user), and a dashboard for administrators.

---

## 🚀 Features

- User Authentication (Login)
- Role-based access control (RBAC)
  - Regular users can manage their todos
  - Admin users have additional access to the Dashboard
- Todo CRUD operations (Create, Read, Update, Delete)
- Protected Routes with JWT
- Clean, responsive UI using Tailwind CSS

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios
- React Router

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- dotenv for environment configs

---

## 📦 Folder Structure
```bash
Todo-app/
├── frontend/ # React frontend
│ └── todo
          └──src...
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ └── routes/
└── README.md
```


---

## 🧑‍💻 Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/Happyyadav007/Todo-app.git
cd Todo-app

Backend setup

cd backend
npm install
npm run dev


Frontend setup

cd frontend
npm install
npm run dev

```
create .env file in Backend folder
```bash
JWT_SECRET=TODO_APP
MONGO_URI=mongodb://localhost:27017/todoapp
```
also uncomment baseURL: "http://localhost:3000", this line in frontend/src/api/api.js

Frontend will run on http://localhost:5173
Backend will run on http://localhost:3000

🔐 Admin Access
After login, if the user role is admin, a Dashboard button will appear on the TodoManagement page.

🙋‍♂️ Author
Happy Yadav
📧 happy.yadav.contact@gmail.com

