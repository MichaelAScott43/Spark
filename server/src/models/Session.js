import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    rawInput: {
      type: String,
      required: true
    },
    aiOutput: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    tone: {
      type: String,
      enum: ['Direct', 'TJ', 'Arlane'],
      default: 'Direct'
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Session = mongoose.model('Session', sessionSchema);
