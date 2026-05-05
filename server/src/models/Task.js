import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    text: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['critical', 'important', 'noise', 'risk', 'today'],
      default: 'today'
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Task = mongoose.model('Task', taskSchema);
