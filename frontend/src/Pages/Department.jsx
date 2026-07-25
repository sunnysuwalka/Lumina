import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { LuCode, LuPenTool, LuMegaphone, LuUsers, LuChevronRight, LuTrendingUp, LuArrowLeft, LuMail, LuTrophy } from 'react-icons/lu';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  
  const [selectedDept, setSelectedDept] = useState(null);
  // Naye states users fetch karne ke liye
  const [deptMembers, setDeptMembers] = useState([]); 
  const [membersLoading, setMembersLoading] = useState(false);

  useEffect(() => {
    // 1. Current user ka data nikalna taaki uska department pata chal sake
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }

    // 2. Departments Fetch karna
    const fetchDepartments = async () => {
      try {
        const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'
        const response = await axios.get(`${baseURL}/api/departments`);
        setDepartments(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching departments data:", err);
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // API Call: Specific department ke members laane ke liye
  const handleViewTeam = async (dept) => {
    setSelectedDept(dept);
    setMembersLoading(true);
    try {
      const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'
      const response = await axios.get(`${baseURL}/api/users/team/${dept.name}`);
      setDeptMembers(response.data);
    } catch (error) {
      console.error("Error fetching department members:", error);
      setDeptMembers([]); 
    } finally {
      setMembersLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 4.0) return 'bg-[#00A97F]'; 
    if (score >= 3.0) return 'bg-yellow-400'; 
    return 'bg-red-400'; 
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center text-[#00A97F] font-bold">Loading Departments...</div>;
  }

  // =================================================================
  // DYNAMIC CALCULATIONS FOR CURRENT USER'S DEPARTMENT
  // =================================================================
  // Saare departments ko score ke hisaab se sort karo taaki Rank nikal sake
  const sortedDepts = [...departments].sort((a, b) => (b.avgScore || 0) - (a.avgScore || 0));
  
  // Current user ka department dhoondo
  const myDeptIndex = sortedDepts.findIndex(d => d.name === userData?.department);
  const myDept = myDeptIndex !== -1 ? sortedDepts[myDeptIndex] : null;
  const myDeptRank = myDeptIndex !== -1 ? myDeptIndex + 1 : '-';

  // --------------------------------------------------------
  // VIEW 1: DEPARTMENT DETAILS
  // --------------------------------------------------------
  if (selectedDept) {
    return (
      <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300 pt-3">
        
        {/* Header & Back Button */}
        <div className="flex items-center pb-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                setSelectedDept(null);
                setDeptMembers([]); // Back jaane pe list clear kar do
              }}
              className="p-2 -ml-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100/50 rounded-lg transition-colors"
            >
              <LuArrowLeft size={22} />
            </button>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedDept.bgColor || 'bg-violet-100'} border ${selectedDept.borderColor || 'border-violet-200'}`}>
              {selectedDept.icon || <LuUsers size={20} className="text-accent" />}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{selectedDept.name}</h1>
              <p className="text-sm text-gray-500">{selectedDept.headcount || 0} Members • Lead by <span className="font-medium text-gray-700">{selectedDept.lead || 'TBD'}</span></p>
            </div>
          </div>
        </div>

        {/* Dynamic Department Performance KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex flex-col">
            <span className="text-xs font-semibold text-gray-500 uppercase">Avg Team Score</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-900">{selectedDept.avgScore || '0.0'}</span>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex flex-col">
            <span className="text-xs font-semibold text-gray-500 uppercase">Monthly Goals</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-900">{selectedDept.monthlyGoalsCompleted || '0'}%</span>
              <span className="text-sm text-gray-400 mb-1">Completed</span>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex flex-col">
            <span className="text-xs font-semibold text-gray-500 uppercase">Kudos Received</span>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-900">{selectedDept.kudosReceived || '0'}</span>
              <span className="text-sm text-gray-400 mb-1">This Quarter</span>
            </div>
          </div>
        </div>

        {/* Dynamic Team List from Backend API */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-5">Employee</div>
            <div className="col-span-3">Role</div>
            <div className="col-span-3">Performance Score</div>
            <div className="col-span-1 text-right">Action</div>
          </div>
          
          <div className="flex flex-col">
            {membersLoading ? (
              <div className="p-8 text-center text-[#00A97F] text-sm font-semibold">
                Loading team members...
              </div>
            ) : deptMembers && deptMembers.length > 0 ? (
              deptMembers.map((member, idx) => {
                // Score nikalne ka logic based on kpiMetrics
                const currentScore = member.kpiMetrics?.currentScore || 0;
                const maxScore = member.kpiMetrics?.maxScore || 5;

                return (
                  <div key={member._id || idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    
                    {/* Employee Info */}
                    <div className="col-span-1 md:col-span-5 flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full bg-cover bg-center text-white flex items-center justify-center font-bold shadow-sm"
                        style={{ 
                          backgroundImage: member.avatarUrl ? `url(${member.avatarUrl})` : 'none',
                          backgroundColor: member.avatarUrl ? 'transparent' : '#00A97F'
                        }}
                      >
                        {!member.avatarUrl && (member.name ? member.name.charAt(0).toUpperCase() : 'E')}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{member.name || `Employee ${idx + 1}`}</h3>
                        <p className="text-xs text-gray-400">{selectedDept.name} Dept.</p>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="col-span-1 md:col-span-3 text-sm text-gray-600">
                      {member.role || member.title || 'Team Member'}
                    </div>

                    {/* Performance Score + Mini Progress Bar */}
                    <div className="col-span-1 md:col-span-3 flex flex-col gap-1 justify-center">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-gray-700">{currentScore} / {maxScore}.0</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${getScoreColor(currentScore)}`} 
                          style={{ width: `${(currentScore / maxScore) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="col-span-1 md:col-span-1 flex justify-end">
                      <button className="p-2 text-gray-400 hover:text-[#00A97F] transition-colors rounded-full hover:bg-green-50">
                        <LuMail size={18} />
                      </button>
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm">
                No members found in this department yet.
              </div>
            )}
          </div>
        </div>

      </div>
    );
  }

  // --------------------------------------------------------
  // VIEW 2: DEPARTMENT GRID (Default View)
  // --------------------------------------------------------
  return (
    <div className="w-full flex flex-col gap-8 animate-in fade-in duration-300 pt-3">
      
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of team performance and metrics across the company.</p>
      </div>

      {/* Dynamic Current User KPI Strip */}
      {myDept && (
        <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 md:px-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Left Side: Text */}
          <div className="flex flex-col items-start">
            <div className="mb-2">
              <span className="bg-violet-50 text-accent border border-violet-100 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Your Department
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{myDept.name}</h2> 
            <p className="text-gray-500 text-sm mt-1">
              Lead by <span className="font-semibold">{myDept.lead || 'TBD'}</span>
            </p>
          </div>

          {/* Right Side: Stats Container */}
          <div className="flex items-center gap-6 md:gap-10 bg-gray-50/80 px-6 py-4 rounded-xl border border-gray-100">
            
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-xs font-semibold uppercase mb-1">Avg Score</span>
              <span className="text-2xl font-bold text-gray-800">{myDept.avgScore || '0.0'}</span>
            </div>
            
            <div className="w-px h-10 bg-gray-200"></div> 
            
            <div className="flex flex-col items-center">
              <span className="text-gray-500 text-xs font-semibold uppercase mb-1">Dept Rank</span>
              <div className="flex items-center gap-1.5">
                <LuTrophy className="text-yellow-500" size={20} />
                <span className="text-2xl font-bold text-gray-800">#{myDeptRank}</span>
              </div>
            </div>
            
          </div>
        </div>
      )}

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div 
            key={dept._id}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow group flex flex-col h-full cursor-pointer"
            onClick={() => handleViewTeam(dept)} // Yahan direct setSelectedDept ki jagah naya API call function laga diya
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${dept.bgColor || 'bg-gray-100'} border ${dept.borderColor || 'border-gray-200'}`}>
                {dept.icon || <LuUsers size={20} className="text-gray-500" />}
              </div>
              <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
                <LuTrendingUp size={14} className="text-gray-500" />
                <span className="text-xs font-semibold text-gray-700">{dept.avgScore || '0.0'} Avg</span>
              </div>
            </div>

            {/* Department Info */}
            <div className="mb-6 flex-grow">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{dept.name}</h2>
              <p className="text-sm text-gray-500">Lead by <span className="font-medium text-gray-700">{dept.lead || 'TBD'}</span></p>
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex -space-x-3">
                {(dept.topMembers || []).map((initial, index) => (
                  <div 
                    key={index} 
                    className="w-8 h-8 rounded-full bg-gray-800 text-white text-xs font-bold flex items-center justify-center border-2 border-white shadow-sm z-10"
                  >
                    {initial}
                  </div>
                ))}
                {(dept.headcount || 0) > 3 && (
                  <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm z-0">
                    +{(dept.headcount || 0) - (dept.topMembers?.length || 0)}
                  </div>
                )}
              </div>

              <button 
                className="text-sm font-semibold text-[#00A97F] group-hover:text-[#008f6b] flex items-center gap-1 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewTeam(dept); // Yahan bhi click karne pe same API call hoga
                }}
              >
                View Team
                <LuChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Departments;