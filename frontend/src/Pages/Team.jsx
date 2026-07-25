import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbSearch } from 'react-icons/tb';
import { LuChevronRight, LuFilter, LuArrowUpDown, LuX } from 'react-icons/lu';
import axios from 'axios';

const Team = () => {
  const [UserData, setUserData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search, Sort, Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [activeFilter, setActiveFilter] = useState('');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const user = localStorage.getItem('user');

        if (!user) {
          setLoading(false);
          navigate('/login');
          return;
        }

        const parsedUser = JSON.parse(user);
        setUserData(parsedUser);

        const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'

        const response = await axios.get(`${baseURL}/api/users/team/${parsedUser.department}`) ;
        setTeamMembers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching department data:", err);
        setError("Problem Loading Team Data.");
        setLoading(false);
      }
    };
    fetchTeamData();
  }, [navigate]);

  // Unique roles for filter dropdown
  const uniqueRoles = useMemo(() => {
    const roles = teamMembers.map(member => member.title || member.role);
    return [...new Set(roles)];
  }, [teamMembers]);

  // Processed members logic (Search + Filter + Sort)
  const processedMembers = useMemo(() => {
    let result = [...teamMembers];

    // Search Logic
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(m => 
        m.name.toLowerCase().includes(q) || 
        (m.title || m.role || "").toLowerCase().includes(q)
      );
    }

    // Filter Logic
    if (activeFilter) {
      result = result.filter(m => (m.title || m.role) === activeFilter);
    }

    // Sort Logic
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (sortConfig.key === 'name') {
          return sortConfig.direction === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        if (sortConfig.key === 'rank') {
          const rankA = a.kpiMetrics?.rank || 999;
          const rankB = b.kpiMetrics?.rank || 999;
          return sortConfig.direction === 'asc' ? rankA - rankB : rankB - rankA;
        }
        return 0;
      });
    }

    return result;
  }, [teamMembers, searchQuery, activeFilter, sortConfig]);

  if (loading) {
    return <div className="h-screen flex items-center justify-center text-[#00A97F] font-bold">Loading Team Data...</div>;
  }
  
  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-300 md:pt-6 pt-12">
      
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Team Directory</h1>
        <p className="text-gray-500 text-sm mt-1">Manage and view all members of the {UserData?.department} Team.</p>
      </div>

      {/* Main Content Box */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[70vh]">

        {/* Toolbar (Search & Filters) */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4 bg-gray-50/50 relative">
          <div className="font-semibold text-gray-800 text-lg text-left">
             {UserData?.department} <span className="text-gray-400 font-normal text-sm ml-1">• {processedMembers.length} Members</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            
            {/* Sort Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowSortDropdown(!showSortDropdown); setShowFilterDropdown(false); }}
                className={`p-2 rounded-lg transition-colors ${sortConfig.key ? 'bg-[#00A97F]/10 text-[#00A97F]' : 'text-gray-400 hover:text-gray-800 hover:bg-gray-200'}`}
              >
                <LuArrowUpDown size={18} />
              </button>
              {showSortDropdown && (
                <div className="absolute top-10 left-0 sm:left-auto sm:right-0 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-2">
                  <div className="px-3 pb-2 mb-1 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">Sort By</div>
                  <button onClick={() => { setSortConfig({ key: 'rank', direction: 'asc' }); setShowSortDropdown(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${sortConfig.key === 'rank' ? 'bg-[#00A97F]/10 text-[#00A97F] font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}>Rank (Top First)</button>
                  <button onClick={() => { setSortConfig({ key: 'name', direction: 'asc' }); setShowSortDropdown(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'bg-[#00A97F]/10 text-[#00A97F] font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}>Name (A - Z)</button>
                  <button onClick={() => { setSortConfig({ key: 'name', direction: 'desc' }); setShowSortDropdown(false); }} className={`w-full text-left px-4 py-2 text-sm transition-colors ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'bg-[#00A97F]/10 text-[#00A97F] font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}>Name (Z - A)</button>
                </div>
              )}
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowFilterDropdown(!showFilterDropdown); setShowSortDropdown(false); }}
                className={`p-2 mr-2 rounded-lg transition-colors ${activeFilter || showFilterDropdown ? 'bg-[#00A97F]/10 text-[#00A97F]' : 'text-gray-400 hover:text-gray-800 hover:bg-gray-200'}`}
              >
                <LuFilter size={18} />
              </button>
              {showFilterDropdown && (
                <div className="absolute top-10 left-0 sm:left-auto sm:right-0 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-2 overflow-hidden">
                  <div className="px-3 pb-2 mb-1 border-b border-gray-100 flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Filter by Role
                    {activeFilter && <button onClick={() => setActiveFilter('')} className="text-red-400 flex items-center hover:text-red-600"><LuX size={14}/></button>}
                  </div>
                  
                  {/* All Roles Option */}
                  <button 
                    onClick={() => { setActiveFilter(''); setShowFilterDropdown(false); }} 
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeFilter === '' ? 'bg-[#00A97F]/10 text-[#00A97F] font-semibold border-l-2 border-[#00A97F]' : 'text-gray-700 hover:bg-gray-50 border-l-2 border-transparent'}`}
                  >
                    All Roles
                  </button>

                  {/* Dynamic Roles */}
                  {uniqueRoles.map(role => (
                    <button 
                      key={role} 
                      onClick={() => { setActiveFilter(role); setShowFilterDropdown(false); }} 
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${activeFilter === role ? 'bg-[#00A97F]/10 text-[#00A97F] font-semibold border-l-2 border-[#00A97F]' : 'text-gray-700 hover:bg-gray-50 border-l-2 border-transparent'}`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Premium Search Bar */}
            <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#00A97F]/20 focus-within:border-[#00A97F] transition-all w-full sm:w-64 shadow-sm">
              <TbSearch className="text-gray-400 mr-2" size={18} />
              <input
                type="text"
                placeholder="Search Team Members"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm border-none focus:outline-none text-gray-700 placeholder-gray-400 bg-transparent"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                  <LuX size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* List Area */}
        <div className="overflow-y-auto flex-1 p-3">
          {processedMembers.length > 0 ? (
            processedMembers.map((member, index) => {
              return (
                <div
                  key={member._id}
                  className="flex items-center justify-between p-3 mb-2 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer border border-transparent hover:border-gray-100"
                >
                  {/* Left: Avatar & Name */}
                  <div className="flex items-center gap-4 w-1/3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm bg-center bg-cover bg-gray-200" style={{ backgroundImage: `url(${member?.avatarUrl})` }}>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">{member.name}</h3>
                      <p className="text-xs text-gray-500 md:hidden">{member.title || member.role}</p> 
                    </div>
                  </div>

                  {/* Middle: Role */}
                  <div className="hidden md:flex flex-1 items-center">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      {member.title || member.role}
                    </span>
                  </div>

                  {/* Right: Rank & Chevron */}
                  <div className="flex items-center gap-4 justify-end w-1/3">
                    <div className="text-xs font-bold text-gray-600 bg-white border border-gray-200 shadow-sm px-2.5 py-1 rounded-md">
                      #{member.kpiMetrics?.rank || 'N/A'}
                    </div>
                    <button className="text-gray-300 group-hover:text-[#00A97F] transition-colors">
                      <LuChevronRight size={20} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col h-full items-center justify-center text-gray-500 text-sm gap-2">
              <TbSearch size={32} className="text-gray-300" />
              <span>No team members match your criteria.</span>
              {(searchQuery || activeFilter) && (
                <button 
                  onClick={() => { setSearchQuery(''); setActiveFilter(''); setSortConfig({key: null, direction: 'asc'}); }} 
                  className="text-[#00A97F] hover:underline font-medium mt-1"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Team;