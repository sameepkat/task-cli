import mongoose, { Schema } from "mongoose";

const todoSchema: Schema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
