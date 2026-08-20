import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LuEye, LuEyeOff, LuShieldCheck } from 'react-icons/lu';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [employeeId, setEmployeeId] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('')
    setLoading(true);

    try {

    const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

      const response = await axios.post(`${baseURL}/api/auth/login`, {
        employeeId,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('Login Successful:', user.name);
      navigate('/')
    } catch (err) {
  console.error('LOGIN ERROR:', err);
  console.error('Response:', err.response);
  console.error('Request:', err.request);
  console.error('Message:', err.message);

  setError(
    err.response?.data?.message ||
    err.message ||
    'Something went wrong!'
  );
} finally {
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">

      {/* --- LOGIN CARD --- */}
      <div className="mt-8 mx-auto sm:w-auto ">
        <div className="py-8 px-4 md:w-[40vw] w-[90vw] mx-auto shadow-xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleLogin}>

            {/* Employee ID Input */}
            <div>
              <label htmlFor="empId" className="block text-sm font-semibold text-gray-700">
                Employee ID
              </label>
              <div className="mt-2 relative">
                <input
                  id="empId"
                  name="empId"
                  type="text"
                  required
                  placeholder="e.g. EMP-001"
                  /* Yahan py-border ko hata kar py-3 kar diya hai */
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A97F]/20 focus:border-[#00A97F] transition-all sm:text-sm text-gray-900 bg-gray-50 focus:bg-white"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A97F]/20 focus:border-[#00A97F] transition-all sm:text-sm text-gray-900 bg-gray-50 focus:bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Show/Hide Password Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#00A97F] transition-colors"
                >
                  {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                </button>
              </div>
            </div>

            {/* Actions: Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#00A97F] focus:ring-[#00A97F] border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                  Remember me
                </label>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#00A97F] hover:bg-[#008f6b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A97F] transition-all hover:-translate-y-0.5"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
};

export default Login;