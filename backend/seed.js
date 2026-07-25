import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import dns from 'dns'; 
import User from './models/User.js';

// ISP DNS blocking bypass
dns.setServers(['8.8.8.8', '1.1.1.1']); 

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB. Clearing old data...');
    
    await User.deleteMany({});
    
    const hashedPassword = await bcrypt.hash('lumina123', 10);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    // Data Pools for Generation
    const firstNames = ['Sunny', 'Priya', 'Rahul', 'Amit', 'Neha', 'Rohan', 'Kriti', 'Vikram', 'Anjali', 'Karan', 'Sneha', 'Arjun', 'Pooja', 'Aditya', 'Divya'];
    const lastNames = ['Sharma', 'Verma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Mehta', 'Jain', 'Bose', 'Das'];
    const departments = ['Engineering', 'Design', 'Product', 'Marketing', 'QA'];
    
    const rolesData = {
      'Engineering': ['Frontend Developer', 'Backend Engineer', 'Fullstack Dev', 'WebGL Specialist'],
      'Design': ['UI/UX Designer', 'Product Designer', 'Graphic Artist', 'Vector Illustrator'],
      'Product': ['Product Manager', 'Scrum Master', 'Agile Coach'],
      'Marketing': ['SEO Specialist', 'Content Strategist', 'Campaign Manager'],
      'QA': ['Automation Tester', 'QA Analyst']
    };

    const coreSkills = ['Frontend', 'Backend', 'UI/UX', 'Leadership', 'Communication', 'Three.js', 'React', 'Problem Solving', 'Vector Graphics'];
    
    const possibleGoals = [
      'Migrate legacy code to React',
      'Refactor usVoiceCommand.js integration',
      'Reduce initial load time by 1.5s',
      'Design product packaging for new pet brand',
      'Build interactive 3D particle system',
      'Mentor 2 Junior Devs',
      'Draft responsive SVG city map assets'
    ];

    const possibleActivities = [
      { type: 'shoutout', title: 'Shoutout from Product Team', description: 'Incredible work on the new dashboard layout. Saved us a week of dev time!' },
      { type: 'badge', title: 'Earned the Bug Squasher Badge', description: 'Resolved 15 high-priority Jira tickets in a single sprint.' },
      { type: 'milestone', title: 'Completed Course: Advanced WebGL', description: 'Finished the 40-hour certification.' },
      { type: 'shoutout', title: 'Shoutout from Design Lead', description: 'The 3D product mockups were pixel perfect.' }
    ];

    const employees = [];

    for (let i = 1; i <= 50; i++) {
      const dept = departments[Math.floor(Math.random() * departments.length)];
      const titleOptions = rolesData[dept];
      
      // Randomize data
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const currentScore = (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1);
      
      // Generate email here so we can use it for the avatar string
      const userEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@lumina.com`;
      
      // Generate 6 months of slight score variations
      const history = months.map((m, index) => ({
        month: m,
        score: Math.max(3.0, Math.min(5.0, parseFloat(currentScore) - (5 - index) * 0.1 + (Math.random() * 0.3 - 0.1))).toFixed(1)
      }));

      // Pick 5 random skills
      const shuffledSkills = [...coreSkills].sort(() => 0.5 - Math.random()).slice(0, 5);
      const competencies = shuffledSkills.map(skill => ({
        subject: skill,
        score: Math.floor(Math.random() * 40) + 60, // Score between 60-100
        fullMark: 100
      }));

      // Pick 3 random goals
      const shuffledGoals = [...possibleGoals].sort(() => 0.5 - Math.random()).slice(0, 3);
      const goals = shuffledGoals.map(goal => ({
        title: goal,
        progress: Math.floor(Math.random() * 100)
      }));

      employees.push({
        employeeId: `EMP-${i.toString().padStart(3, '0')}`,
        name: `${firstName} ${lastName}`,
        email: userEmail, // <-- Variable use kiya
        password: hashedPassword,
        title: titleOptions[Math.floor(Math.random() * titleOptions.length)],
        department: dept,
        role: i === 1 ? 'admin' : 'employee', 
        
        // NAYA ADDITION: Random profile picture based on user's unique email
        avatarUrl: `https://i.pravatar.cc/150?u=${userEmail}`, 
        
        kpiMetrics: {
          currentScore: parseFloat(currentScore),
          maxScore: 5.0,
          rank: Math.floor(Math.random() * 50) + 1,
          tasksCompletedPercentage: Math.floor(Math.random() * 40) + 60, 
          kudosReceived: Math.floor(Math.random() * 50)
        },
        performanceHistory: history,
        competencies: competencies,
        activities: [...possibleActivities].sort(() => 0.5 - Math.random()).slice(0, 3).map((act, idx) => ({
          ...act,
          dateStr: `${idx + 1} days ago`
        })),
        goals: goals
      });
    }

    await User.insertMany(employees);
    console.log(`Successfully seeded ${employees.length} employees into the database!`);
    
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();