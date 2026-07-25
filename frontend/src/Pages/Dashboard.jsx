import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { LuAward, LuMessageSquare, LuTarget, LuCircleCheck } from 'react-icons/lu';
import { dashboardData } from "../data"


const Dashboard = () => {

  const [userData, setUserData] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (!token || !storedUser) {
      navigate('/login')
    } else {
      setUserData(JSON.parse(storedUser))
    }

  }, [navigate]);

  if (!userData) {
    return (
      <div className='h-screen w-full flex items-center justify-center text-[#00A97F] font-medium text-xl' >
        Loading Dashboard...
      </div>
    )
  }

  console.log(userData)

return (
    <div className='min-h-screen p-4  md:p-6 lg:p-8 bg-gray-50'>
      
      {/* ================= 1st ROW: HEADER / PROFILE BANNER ================= */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center md:justify-between gap-6 relative overflow-hidden mb-6">
        
        {/* Decorative background accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A97F] opacity-[0.03] rounded-bl-full pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center gap-5 z-10 text-center md:text-left w-full md:w-auto">
          {/* Avatar */}
          <div
            className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-gray-50 shadow-md bg-cover bg-center shrink-0"
            style={{ backgroundImage: `url(${userData?.avatarUrl || 'https://via.placeholder.com/150'})` }}
          ></div>
          
          {/* User Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{userData?.name || "Username"}</h1>
            <p className="text-gray-500 font-medium mt-1">{userData?.title}</p>
          </div>
        </div>

        {/* Rank Badge */}
        <div className="flex flex-col items-center md:items-end z-10 bg-gray-50 px-6 py-4 rounded-xl border border-gray-100 w-full md:w-auto mt-2 md:mt-0">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Overall Rank</span>
          <div className="flex items-center gap-2">
            <LuAward className="text-yellow-500" size={28} />
            <span className="text-4xl font-extrabold text-gray-900">#{userData?.kpiMetrics?.rank}</span>
          </div>
        </div>
      </div>

      {/* ================= 2nd ROW: STATS PODIUM ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        
        {/* Card 1: Score */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Total Score</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-extrabold text-gray-900">{userData?.kpiMetrics?.currentScore}</span>
            <span className="text-lg text-gray-400 font-medium">/ {userData?.kpiMetrics?.maxScore}</span>
          </div>
        </div>

        {/* Card 2: Rank */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Global Rank</span>
          <span className="text-3xl md:text-4xl font-extrabold text-gray-900">#{userData?.kpiMetrics?.rank}</span>
        </div>

        {/* Card 3: Tasks */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Tasks Completed</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-extrabold text-gray-900">{userData?.kpiMetrics?.tasksCompletedPercentage}</span>
            <span className="text-lg text-[#00A97F] font-bold">%</span>
          </div>
        </div>

        {/* Card 4: Kudos */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Peer Kudos</span>
          <span className="text-3xl md:text-4xl font-extrabold text-gray-900">{userData?.kpiMetrics?.kudosReceived}</span>
        </div>
      </div>

      {/* ================= 3rd ROW: ANALYTICS (TUMHARA CODE) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Performance Trend Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-2 h-[400px] flex flex-col">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800">Performance Trend</h2>
            <p className="text-sm text-gray-500">Your overall score progression over the last 6 months.</p>
          </div>

          <div className="flex-1 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userData?.performanceHistory} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 5]} stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#00A97F"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#00A97F', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competency Radar Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-1 h-[400px] flex flex-col">
          <div className="mb-2">
            <h2 className="text-lg font-bold text-gray-800">Skill Matrix</h2>
            <p className="text-sm text-gray-500">Current core competencies.</p>
          </div>

          <div className="flex-1 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={userData?.competencies}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Skills" dataKey="score" stroke="#00A97F" fill="#00A97F" fillOpacity={0.4} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ================= 4th ROW: FEED & GOALS (TUMHARA CODE) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 w-full mb-8">
        
        {/* Left: Activity & Feedback Feed */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-2 flex flex-col">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Recent Activity & Feedback</h2>
              <p className="text-sm text-gray-500">Shoutouts, badges, and milestones.</p>
            </div>
            <button className="text-sm font-medium text-[#00A97F] hover:underline">View All</button>
          </div>

          <div className="flex flex-col gap-5 flex-1 overflow-y-auto pr-2">
            {userData?.activities && userData.activities.length > 0 ? (
              userData.activities.map((activity, index) => {
                let icon, bgColor, textColor;
                if (activity.type === 'shoutout') {
                  icon = <LuMessageSquare size={18} />; bgColor = 'bg-blue-100'; textColor = 'text-blue-600';
                } else if (activity.type === 'badge') {
                  icon = <LuAward size={20} />; bgColor = 'bg-yellow-100'; textColor = 'text-yellow-600';
                } else {
                  icon = <LuCircleCheck size={20} />; bgColor = 'bg-green-100'; textColor = 'text-[#00A97F]';
                }

                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center ${textColor} flex-shrink-0`}>
                      {icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.dateStr}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">No recent activity found.</p>
            )}
          </div>
        </div>

        {/* Right: Current Goals (OKRs) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-1 flex flex-col">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Current Goals</h2>
              <p className="text-sm text-gray-500">Q3 Objectives</p>
            </div>
            <LuTarget className="text-gray-400" size={20} />
          </div>

          <div className="flex flex-col gap-6 mt-2">
            {userData?.goals && userData.goals.length > 0 ? (
              userData.goals.map((goal, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">{goal.title}</span>
                    <span className="font-bold text-[#00A97F]">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-[#00A97F] h-2 rounded-full transition-all duration-1000" style={{ width: `${goal.progress}%` }}></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No active goals currently.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  )

}

export default Dashboard
