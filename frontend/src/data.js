// data.js

export const dashboardData = {
  // 1. User Profile Data
  user: {
    id: "EMP-4092",
    name: "Sunny Suwalka",
    title: "Senior Web Developer",
    department: "Engineering",
    avatarColor: "#00A97F" // Matches your UI
  },

  // 2. KPI Metrics (Top Row)
  kpiMetrics: {
    currentScore: 4.7,
    maxScore: 5.0,
    rank: 2,
    tasksCompletedPercentage: 93,
    kudosReceived: 14 // Assuming we went with the Teamwork metric
  },

  // 3. Chart Data: 6-Month Trend (Recharts LineChart)
  performanceHistory: [
    { month: 'Jan', score: 3.8 },
    { month: 'Feb', score: 4.0 },
    { month: 'Mar', score: 4.1 },
    { month: 'Apr', score: 4.4 },
    { month: 'May', score: 4.5 },
    { month: 'Jun', score: 4.7 }
  ],

  // 4. Chart Data: Skill Matrix (Recharts RadarChart)
  competencies: [
    { subject: 'Frontend React', score: 95, fullMark: 100 },
    { subject: '3D Rendering', score: 90, fullMark: 100 },
    { subject: 'UI/UX Design', score: 85, fullMark: 100 },
    { subject: 'Leadership', score: 70, fullMark: 100 },
    { subject: 'Communication', score: 80, fullMark: 100 }
  ],

  // 5. Feed Data (Bottom Left)
  activities: [
    {
      id: "act_001",
      type: "shoutout", // Can be used for conditionally rendering the icon
      author: "Rahul (Product Manager)",
      title: "Shoutout",
      description: "\"Incredible work on the new dashboard layout. The SVG components are super clean and the transition animations are flawless. Saved us a week of dev time!\"",
      timestamp: "2 days ago"
    },
    {
      id: "act_002",
      type: "badge",
      author: "System",
      title: "Earned the Bug Squasher Badge",
      description: "Resolved 15 high-priority Jira tickets in a single sprint.",
      timestamp: "1 week ago"
    },
    {
      id: "act_003",
      type: "milestone",
      author: "System",
      title: "Completed Milestone: 3D Particle Tracking Demo",
      description: "Successfully integrated hand-gesture controls with the main rendering pipeline.",
      timestamp: "2 weeks ago"
    }
  ],

  // 6. OKRs / Goals Data (Bottom Right)
  currentGoals: [
    {
      id: "goal_001",
      title: "Ship real-time interactive vector map",
      progress: 80
    },
    {
      id: "goal_002",
      title: "Reduce initial load time by 1.5s",
      progress: 45
    },
    {
      id: "goal_003",
      title: "Mentor 2 Junior Devs",
      progress: 20
    }
  ]
};