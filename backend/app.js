import express from 'express';
import { connectDB } from './database/db.js';
import userRoutes from './routes/user.routes.js';
import todoRoutes from './routes/todoRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.use(cors({origin: 'http://localhost:5173', credentials: true,}))
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://todo-app-ecru-eta-91.vercel.app/' 
  ],
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Hello, World');
});

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})