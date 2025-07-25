**🚀Live Link:** https://todo-app-ecru-eta-91.vercel.app/

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
│ └── src...
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

In frontend/src/api/api.js, uncomment this line for local development:
// baseURL: "http://localhost:3000",  // Uncomment this line

In backend app.js, uncomment this line:
// app.use(cors({origin: 'http://localhost:5173', credentials: true,}))


Frontend will run on http://localhost:5173
Backend will run on http://localhost:3000

**🚀Live Link:** https://todo-app-ecru-eta-91.vercel.app/

🔐 Admin Access
After login, if the user role is admin, a Dashboard button will appear on the TodoManagement page.

🙋‍♂️ Author
Happy Yadav
📧 happy.yadav.contact@gmail.com

