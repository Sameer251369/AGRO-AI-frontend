import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, User, Mail, Lock, UserPlus } from 'lucide-react';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await auth.register(username, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Register failed');
    }
    setLoading(false);
  };

  return (
    // Added pt-32 to push the form down away from the fixed navbar
    <div className="relative min-h-screen flex items-center justify-center pt-32 pb-12 px-4 overflow-hidden bg-[#F8F9F5]">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110 hover:scale-100"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1350&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-[#2E8B57]/30" />
      </div>

      {/* Registration Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Adjusted bg-white/80 and backdrop-blur-md for a 'decent' level of blur */}
        <div className="bg-white/80 backdrop-blur-md p-10 rounded-sm shadow-2xl border-t-4 border-[#2E8B57]">
          
          <div className="mb-8">
            <h2 className="text-3xl font-light text-[#2C3E50] tracking-tight">
              Create <span className="font-bold text-[#2E8B57]">Account</span>
            </h2>
            <p className="text-xs uppercase tracking-widest text-[#64748B] mt-2 font-semibold">
              Join the Precision Agriculture Network
            </p>
          </div>

          {error && (
            <div className="bg-red-50/50 backdrop-blur-sm border-l-2 border-red-500 text-red-600 p-3 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <div className="group">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748B] mb-2 transition-colors group-focus-within:text-[#2E8B57]">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#2E8B57] transition-colors" />
                <input 
                  value={username} 
                  onChange={(e)=>setUsername(e.target.value)} 
                  placeholder="Choose a username" 
                  className="w-full bg-white/50 border-b-2 border-transparent px-10 py-3 rounded-sm text-sm focus:outline-none focus:bg-white focus:border-[#2E8B57] transition-all" 
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748B] mb-2 transition-colors group-focus-within:text-[#2E8B57]">
                Corporate Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#2E8B57] transition-colors" />
                <input 
                  type="email"
                  value={email} 
                  onChange={(e)=>setEmail(e.target.value)} 
                  placeholder="email@example.com" 
                  className="w-full bg-white/50 border-b-2 border-transparent px-10 py-3 rounded-sm text-sm focus:outline-none focus:bg-white focus:border-[#2E8B57] transition-all" 
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748B] mb-2 transition-colors group-focus-within:text-[#2E8B57]">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#2E8B57] transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e)=>setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  className="w-full bg-white/50 border-b-2 border-transparent px-10 py-3 rounded-sm text-sm focus:outline-none focus:bg-white focus:border-[#2E8B57] transition-all" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(s => !s)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2E8B57]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              disabled={loading} 
              className="group w-full bg-[#2E8B57] text-white py-4 rounded-sm text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:bg-[#267347] shadow-lg active:scale-95 disabled:opacity-70 mt-4"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Register Account
                  <UserPlus size={16} className="transition-transform group-hover:scale-110" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-gray-100/50 text-center">
            <p className="text-xs font-bold text-[#64748B] uppercase tracking-widest">
              Already a member? 
              <Link to="/login" className="ml-2 text-[#2E8B57] hover:underline decoration-2 underline-offset-4 transition-colors">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;