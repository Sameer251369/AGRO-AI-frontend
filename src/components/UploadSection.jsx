import { useState } from 'react';
import { Camera, Upload, X, Loader2, Lock, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function UploadSection({ onImageUpload, onCameraCapture, isAnalyzing, uploadedImage, onReset }) {
  const [isDragging, setIsDragging] = useState(false);
  const { token } = useAuth(); // Accessing the token from our new AuthContext
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!token) return; // Prevent drag interaction if not logged in
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (!token) {
      navigate('/login');
      return;
    }

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && token) {
      onImageUpload(file);
    } else if (!token) {
      navigate('/login');
    }
  };

  return (
    <section id="upload-section" className="py-24 bg-[#F8F9F5]">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#2E8B57]/10 border border-[#2E8B57]/20 px-4 py-1.5 rounded-full mb-6">
            <ImageIcon size={14} className="text-[#2E8B57]" />
            <span className="text-[#2E8B57] text-[10px] font-bold uppercase tracking-[0.2em]">Diagnostic Engine</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-[#2C3E50] tracking-tight">
            Analyze Your <span className="font-bold">Plant Photo</span>
          </h2>
          <div className="w-16 h-1 bg-[#4ADE80] mx-auto mt-6 mb-4" />
          <p className="text-[#64748B] max-w-xl mx-auto font-light leading-relaxed">
            Ensure high-resolution lighting and focus on the affected foliage for 95%+ detection accuracy.
          </p>
        </div>

        {!uploadedImage ? (
          !token ? (
            /* Premium Auth Wall - This is triggered if token is null */
            <div className="bg-[#1A252F] p-12 text-center rounded-sm shadow-2xl relative overflow-hidden border border-white/10 animate-in fade-in duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Lock size={120} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Secure Diagnostics</h3>
              <p className="text-gray-400 mb-10 max-w-sm mx-auto font-light">
                To access our neural network analysis and historical tracking, please verify your account.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <button 
                  onClick={() => navigate('/login')} 
                  className="w-full sm:w-auto px-10 py-3.5 bg-[#2E8B57] text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#4ADE80] transition-all"
                >
                  Log In
                </button>
                <button 
                  onClick={() => navigate('/register')} 
                  className="w-full sm:w-auto px-10 py-3.5 bg-white/5 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm border border-white/20 hover:bg-white/10 transition-all"
                >
                  Create Account
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`group relative border-2 border-dashed rounded-sm p-16 text-center transition-all duration-500 cursor-pointer ${
                  isDragging 
                    ? 'border-[#2E8B57] bg-[#2E8B57]/5 shadow-inner' 
                    : 'border-gray-200 bg-white hover:border-[#2E8B57]/50 hover:shadow-2xl'
                }`}
              >
                <Upload 
                  className={`w-12 h-12 mx-auto mb-6 transition-all duration-500 ${
                    isDragging ? 'text-[#2E8B57] scale-110' : 'text-gray-300 group-hover:text-[#2E8B57]'
                  }`}
                />
                <h3 className="text-xl font-bold text-[#2C3E50] mb-2 tracking-tight">
                  Drop Image <span className="font-light">or Browse</span>
                </h3>
                <p className="text-xs text-[#64748B] font-bold uppercase tracking-[0.1em] mb-8">
                  JPG or PNG, max 10MB
                </p>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-input"
                />
                <label 
                  htmlFor="file-input" 
                  className="inline-block px-10 py-3.5 bg-[#2C3E50] text-white text-[10px] font-bold uppercase tracking-widest rounded-sm cursor-pointer hover:bg-[#2E8B57] transition-all"
                >
                  Select From Device
                </label>
              </div>

              {/* Camera Trigger */}
              <div className="text-center">
                <button 
                  onClick={onCameraCapture}
                  className="group flex items-center gap-3 mx-auto text-[#2E8B57] text-[10px] font-bold uppercase tracking-[0.2em] hover:gap-5 transition-all"
                >
                  <Camera size={18} />
                  <span>Launch Live Capture</span>
                </button>
              </div>
            </div>
          )
        ) : (
          /* Analysis & Preview Mode */
          <div className="bg-white p-4 rounded-sm shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-500">
            <div className="relative overflow-hidden rounded-sm bg-gray-50">
              <img 
                src={uploadedImage} 
                alt="Uploaded plant" 
                className={`w-full h-auto max-h-[600px] object-contain transition-all duration-700 ${isAnalyzing ? 'blur-md scale-105 opacity-50' : ''}`}
              />
              
              {!isAnalyzing && (
                <button
                  onClick={onReset}
                  className="absolute top-6 right-6 bg-[#2C3E50]/80 backdrop-blur-md text-white p-3 rounded-sm shadow-xl hover:bg-red-500 transition-all active:scale-95 z-20"
                >
                  <X size={20} />
                </button>
              )}

              {/* Scanning Animation Overlay */}
              {isAnalyzing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                   {/* Visual Scan Bar */}
                   <div className="w-full h-1.5 bg-[#4ADE80] absolute top-0 animate-[scan_2.5s_ease-in-out_infinite] shadow-[0_0_15px_rgba(74,222,128,0.8)]" />
                   
                   <div className="bg-white/90 backdrop-blur-md p-10 rounded-sm shadow-2xl border border-white flex flex-col items-center">
                      <Loader2 size={40} className="text-[#2E8B57] animate-spin mb-6" />
                      <h3 className="text-lg font-bold text-[#2C3E50] uppercase tracking-widest mb-1">
                        Neural Scan
                      </h3>
                      <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-[0.1em]">
                        Processing Image Patterns...
                      </p>
                   </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(600px); opacity: 0; }
        }
      `}} />
    </section>
  );
}

export default UploadSection;