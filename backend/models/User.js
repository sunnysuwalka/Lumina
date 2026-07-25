import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Will store hashed password
    title: { type: String, required: true },
    department: { type: String, required: true }, // "Team"
    role: { type: String, enum: ['employee', 'admin'], default: 'employee' },
    avatarUrl: { type: String, default: '' },

    // Top Row Dashboard Metrics
    kpiMetrics: {
      currentScore: { type: Number, default: 0 },
      maxScore: { type: Number, default: 5.0 },
      rank: { type: Number, default: 0 },
      tasksCompletedPercentage: { type: Number, default: 0 },
      kudosReceived: { type: Number, default: 0 },
    },

    // 6-Month Trend Data (Line Chart)
    performanceHistory: [
      {
        month: { type: String },
        score: { type: Number },
      },
    ],

    // Skill Matrix Data (Radar Chart)
    competencies: [
      {
        subject: { type: String },
        score: { type: Number },
        fullMark: { type: Number, default: 100 },
      },
    ],

    // Activity & Feedback Feed
    activities: [
      {
        type: { type: String, enum: ['shoutout', 'badge', 'milestone'] },
        title: { type: String },
        description: { type: String },
        dateStr: { type: String }, // e.g., "2 days ago"
      },
    ],

    // Current Goals (OKRs)
    goals: [
      {
        title: { type: String },
        progress: { type: Number }, // percentage 0-100
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);