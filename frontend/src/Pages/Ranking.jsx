import React, { useEffect, useState } from 'react';
import { LuTrophy, LuMedal, LuChevronRight } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Ranking = () => {
  const [UserData, setUserData] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      navigate('/login');
    } else {
      setUserData(JSON.parse(storedUser));
    }

    const fetchLeaderboard = async () => {
      try {
        
        const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
        const response = await axios.get(`${baseURL}/api/users/leaderboard`);
        setLeaderboard(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard", error);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [navigate]);

  if (loading) {
    return <div className="h-screen flex items-center justify-center text-[#00A97F] font-bold">Loading Leaderboard...</div>;
  }

  return (
    <div className="w-full overflow-x-hidden md:pt-0 pt-10"> {/* Parent me overflow-x-hidden add kiya to prevent horizontal scroll */}

      {/* User Stats Header - Added overflow-x-auto and responsive gaps */}
      <div className='h-auto w-full flex flex-col md:flex-row md:justify-between md:items-center px-4 md:gap-24 md:pb-0 pb-4 shadow-sm overflow-x-auto whitespace-nowrap hide-scrollbar'>
        <div className='h-[20vh] flex items-center px-2 justify-between shrink-0'>
          <div className='h-[100%] flex items-center justify-center gap-3'>
            <div className='h-[60%] aspect-square rounded-full bg-cover bg-center border border-gray-200' style={{ backgroundImage: `url(${UserData?.avatarUrl})` }} ></div>
            <div>
              <div className='text-[1.3rem] font-bold leading-none'>{UserData?.name}</div>
              <span className='text-[0.8rem] text-gray-500'>{UserData?.title}</span>
            </div>
          </div>
        </div>

        <div className='flex gap-5 md:gap-10'>
          <div className='flex flex-col gap-2 items-center justify-center shrink-0'>
            <div className='text-[0.8rem] leading-none text-gray-900 font-semibold uppercase tracking-wide'>Score</div>
            <div>
              <span className='md:text-[2rem] text-[1.8rem] leading-none font-bold text-[#00A97F]'>{UserData?.kpiMetrics?.currentScore}</span>
              <span className='leading-none text-gray-500 font-medium italic'> / {UserData?.kpiMetrics?.maxScore}</span>
            </div>
          </div>
          <div className='flex flex-col gap-2 items-center justify-center shrink-0'>
            <div className='text-[0.8rem] leading-none text-gray-900 font-semibold uppercase tracking-wide'>Rank</div>
            <div>
              <span className='md:text-[2rem] text-[1.8rem] leading-none font-bold text-gray-800'>#{UserData?.kpiMetrics?.rank}</span>
            </div>
          </div>
          <div className='flex flex-col gap-2 items-center justify-center shrink-0'>
            <div className='text-[0.8rem] leading-none text-gray-900 font-semibold uppercase tracking-wide'>Tasks Done</div>
            <div>
              <span className='md:text-[2rem] text-[1.8rem] leading-none font-bold text-gray-800'>{UserData?.kpiMetrics?.tasksCompletedPercentage}</span>
              <span className='leading-none text-[#00A97F] font-bold'>%</span>
            </div>
          </div>
          <div className='flex flex-col gap-2 items-center justify-center shrink-0'>
            <div className='text-[0.8rem] leading-none text-gray-900 font-semibold uppercase tracking-wide'>Shoutouts</div>
            <div>
              <span className='md:text-[2rem] text-[1.8rem] leading-none font-bold text-gray-800'>{UserData?.kpiMetrics?.kudosReceived}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      {leaderboard && leaderboard.length > 0 && (
        <div className='h-fit pt-10 pb-16  w-full flex gap-3 md:gap-10 items-center justify-center mt-6 px-2'>

          {/* Rank 2: Silver (Added max-w/max-h logic for mobile) */}
          <div
            className={`relative h-[25vh] max-h-[25vw] max-w-[25vw] md:max-w-none md:max-h-none aspect-square rounded-full bg-cover bg-center bg-no-repeat shadow-md ${leaderboard[1]?._id === UserData?._id ? 'border-4 border-slate-400' : 'bg-slate-100'}`}
            style={{ backgroundImage: `url(${leaderboard[1]?.avatarUrl || ''})` }}
          >
            <div className='absolute -top-3 md:-top-4 -left-3 md:-left-4 font-bold italic text-2xl md:text-[2rem] text-slate-500 drop-shadow-sm z-10'>#2</div>
            <div className='w-[110%] h-auto min-h-[40px] md:min-h-[50px] bg-white/80 backdrop-blur-md border border-gray-200 rounded-lg flex items-center justify-center md:justify-start py-1 px-2 md:px-3 gap-4 absolute top-full -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-lg'>
              <div className="flex shrink-0 items-center justify-center h-8 w-8 aspect-square rounded-full bg-gradient-to-tr from-slate-400 via-gray-200 to-white shadow-sm border border-gray-200">
                <LuMedal className="text-slate-700" size={18} />
              </div>
              <div className='flex flex-col gap-0.5 overflow-hidden text-left w-full'>
                <h3 className="leading-none font-bold text-gray-800 text-[10px] md:text-sm truncate">
                  {leaderboard[1]?.name || 'N/A'}
                </h3>
                <p className="leading-none font-bold text-[10px] md:text-xs text-[#00A97F]">
                  {leaderboard[1]?.kpiMetrics?.currentScore || 0} pts
                </p>
              </div>
            </div>
          </div>

          {/* Rank 1: Gold (Added max-w/max-h logic for mobile) */}
          <div
            className={`relative h-[30vh] max-h-[30vw] max-w-[30vw] md:max-w-none md:max-h-none aspect-square rounded-full bg-cover bg-center bg-no-repeat shadow-xl z-10 ${leaderboard[0]?._id === UserData?._id ? 'border-4 border-yellow-400' : 'bg-yellow-50'}`}
            style={{ backgroundImage: `url(${leaderboard[0]?.avatarUrl || ''})` }}
          >
            <div className='absolute -top-4 md:-top-6 -left-4 md:-left-6 font-extrabold italic text-3xl md:text-[2.5rem] text-yellow-600 drop-shadow-sm z-10'>#1</div>
            <div className='w-[110%] h-auto min-h-[45px] md:min-h-[50px] bg-white/90 backdrop-blur-md border border-yellow-200 rounded-lg flex items-center justify-center md:justify-start py-1.5 px-2 md:px-3 gap-4 absolute top-full -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-xl'>
              <div className="flex shrink-0 items-center justify-center h-10 w-10 aspect-square rounded-full bg-gradient-to-tr from-yellow-500 via-yellow-300 to-yellow-100 shadow-md border border-yellow-300">
                <LuTrophy className="text-yellow-800" size={20} />
              </div>
              <div className='flex flex-col gap-0.5 overflow-hidden md:text-left w-full'>
                <h3 className="leading-none font-bold text-gray-800 text-[10px] md:text-sm truncate">
                  {leaderboard[0]?.name || 'N/A'}
                </h3>
                <p className="leading-none font-bold text-[11px] md:text-sm text-[#00A97F]">
                  {leaderboard[0]?.kpiMetrics?.currentScore || 0} pts
                </p>
              </div>
            </div>
          </div>

          {/* Rank 3: Bronze (Added max-w/max-h logic for mobile) */}
          <div
            className={`relative h-[20vh] max-h-[20vw] max-w-[20vw] md:max-w-none md:max-h-none aspect-square rounded-full bg-cover bg-center bg-no-repeat shadow-md ${leaderboard[2]?._id === UserData?._id ? 'border-4 border-[#C58339]' : 'bg-orange-50'}`}
            style={{ backgroundImage: `url(${leaderboard[2]?.avatarUrl || ''})` }}
          >
            <div className='absolute -top-2 md:-top-3 -left-2 md:-left-3 font-bold italic text-xl md:text-[1.5rem]  text-slate-700 drop-shadow-sm z-10'>#3</div>
            <div className='w-[110%] h-auto min-h-[35px] md:min-h-[45px] bg-white/80 backdrop-blur-md border border-gray-200 rounded-lg flex items-center justify-center md:justify-start py-1 px-1.5 md:px-2 gap-2 absolute top-full -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-lg'>
              <div className="flex shrink-0 items-center justify-center h-7 w-7 aspect-square rounded-full bg-gradient-to-tr from-[#804A00] via-[#C58339] to-[#4A2511] shadow-sm border border-[#C58339]/50">
                <LuMedal className="text-white/90" size={14} />
              </div>
              <div className='flex flex-col gap-0.5 overflow-hidden text-left w-full'>
                <h3 className="leading-none font-bold text-gray-800 text-[9px] md:text-xs truncate">
                  {leaderboard[2]?.name || 'N/A'}
                </h3>
                <p className="leading-none font-bold text-[9px] md:text-[10px] text-[#00A97F]">
                  {leaderboard[2]?.kpiMetrics?.currentScore || 0} pts
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rest of the List (Rank 4+) */}
      {leaderboard && leaderboard.length > 3 && (
        <div className='pt-5 w-full overflow-y-auto h-[50vh] px-4 md:pr-4 relative hide-scrollbar pb-10'>

          {(() => {
            const CurrentUserIndex = leaderboard.findIndex(u => u._id === UserData?._id);
            const currentUser = leaderboard[CurrentUserIndex];
            const isCurrentUserInList = CurrentUserIndex >= 3;

            return (
              <>
                {/* Current User Highlighted Row */}
                {isCurrentUserInList && (
                  <div className='py-3 px-4 w-full mb-3 bg-green-50 border border-green-200 shadow-sm flex justify-between items-center gap-1 rounded-xl'>
                    <div className='flex items-center gap-3 md:gap-4'>
                      <div className='w-6 md:w-8 font-bold text-xl text-[#00A97F]'>{CurrentUserIndex + 1}.</div>
                      <div
                        className='h-12 md:h-[7vh] aspect-square bg-[#00A97F] rounded-full bg-cover bg-center border-2 border-[#00A97F] shrink-0'
                        style={{ backgroundImage: `url(${currentUser?.avatarUrl || ''})` }}
                      ></div>
                      <span className="font-bold text-accent md:text-lg">
                        {currentUser?.name} <span className="text-sm font-normal italic ml-1">(You)</span>
                      </span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className="flex flex-col items-end">
                        <span className="text-xs md:text-sm text-[#00A97F]/80">{currentUser?.title}</span>
                        <span className="font-bold text-lg text-[#00A97F]">{currentUser?.kpiMetrics?.currentScore} pts</span>
                      </div>
                      <div><LuChevronRight className="text-[#00A97F] hidden md:block" /></div>
                    </div>
                  </div>
                )}

                {/* Normal Mapped Users */}
                {leaderboard.slice(3).map((user, index) => {
                  if (user._id === UserData?._id) return null;

                  return (
                    <div key={user._id} className='py-3 px-4 w-full mb-2 bg-white hover:bg-gray-50 border border-gray-100 shadow-sm flex justify-between items-center gap-1 rounded-xl transition-colors'>
                      <div className='flex items-center gap-3 md:gap-4'>
                        <div className='w-6 md:w-8 font-bold text-lg text-gray-400'>{index + 4}.</div>
                        <div
                          className='h-10 md:h-[6vh] aspect-square bg-gray-200 rounded-full bg-cover bg-center shrink-0 border border-gray-200'
                          style={{ backgroundImage: `url(${user.avatarUrl || ''})` }}
                        ></div>
                        <span className="font-semibold text-black text-sm ">{user.name}</span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-500">{user.title}</span>
                          <span className="font-bold text-gray-700">{user.kpiMetrics?.currentScore} pts</span>
                        </div>
                        <div><LuChevronRight className="text-gray-400 hidden md:block" /></div>
                      </div>
                    </div>
                  );
                })}
              </>
            );
          })()}

        </div>
      )}

    </div>
  );
};

export default Ranking;