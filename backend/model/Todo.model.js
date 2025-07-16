import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        trim:true,
        maxLength: 100,
    },
    description:{
          type: String,
        required:true,
        trim:true,
        maxLength: 500,
    },
    due_date:{
        type: Date,
    }, 
    category:{
        type: String,
        enum: ["urgent", "non-urgent"],
        required:true,
    }, 
    status:{
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
} ,{ timestamps: true });


const Todo = mongoose.model('Todo', todoSchema);
export default Todo;