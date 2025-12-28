import { useState, useEffect } from 'react';
import { Leaf, ArrowDown, ShieldCheck, Microscope, Sprout } from 'lucide-react';

function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const backgroundImages = [
    '/images/deepak-kumar-b4eRRodrirQ-unsplash.jpg',
    '/images/eduardo-prim-3u51-uLQICc-unsplash.jpg',
    '/images/gabriel-jimenez-jin4W1HqgL4-unsplash.jpg',
    '/images/warren-J33qmCVr02A-unsplash.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 6000); // Slightly longer for better readability
    return () => clearInterval(interval);
  }, []);

  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A252F]">
      {/* Background Layer with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out transform ${
              currentImageIndex === index ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#F8F9F5]"></div>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Subtle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#2E8B57]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sprout size={14} className="text-[#4ADE80]" />
            Precision Agriculture Engine
          </div>

          {/* Typography */}
          <h1 className="text-6xl md:text-8xl font-extralight text-white mb-6 tracking-tighter leading-tight animate-in fade-in duration-1000 delay-200">
            AGRO <span className="font-black text-[#4ADE80] drop-shadow-2xl">AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white font-light mb-6 max-w-2xl mx-auto tracking-tight animate-in fade-in duration-1000 delay-300">
            Advanced <span className="font-bold">Plant Health</span> Diagnostics
          </p>
          
          <p className="text-base md:text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light animate-in fade-in duration-1000 delay-500">
            Utilizing state-of-the-art computer vision to identify crop diseases in real-time. 
            Capture imagery to receive immediate, actionable insights for your farm.
          </p>

          {/* Action Button */}
          <div className="animate-in fade-in zoom-in-95 duration-1000 delay-700">
            <button 
              onClick={scrollToUpload}
              className="group bg-[#2E8B57] hover:bg-[#4ADE80] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-12 py-5 rounded-sm inline-flex items-center gap-4 transition-all duration-500 shadow-2xl active:scale-95"
            >
              Initialize Diagnostic
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Trust Bar */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-1000">
            <div className="flex flex-col items-center group cursor-default">
              <div className="mb-4 p-4 rounded-sm bg-white/5 border border-white/10 group-hover:border-[#4ADE80]/50 group-hover:bg-[#4ADE80]/10 transition-all duration-500">
                <ShieldCheck className="text-[#4ADE80]" size={24} />
              </div>
              <span className="text-[10px] font-bold text-white/50 group-hover:text-white uppercase tracking-[0.2em] transition-colors">Expert Verified</span>
            </div>
            
            <div className="flex flex-col items-center group cursor-default">
              <div className="mb-4 p-4 rounded-sm bg-white/5 border border-white/10 group-hover:border-[#4ADE80]/50 group-hover:bg-[#4ADE80]/10 transition-all duration-500">
                <Microscope className="text-[#4ADE80]" size={24} />
              </div>
              <span className="text-[10px] font-bold text-white/50 group-hover:text-white uppercase tracking-[0.2em] transition-colors">Neural Analysis</span>
            </div>
            
            <div className="flex flex-col items-center group cursor-default">
              <div className="mb-4 p-4 rounded-sm bg-white/5 border border-white/10 group-hover:border-[#4ADE80]/50 group-hover:bg-[#4ADE80]/10 transition-all duration-500">
                <Leaf className="text-[#4ADE80]" size={24} />
              </div>
              <span className="text-[10px] font-bold text-white/50 group-hover:text-white uppercase tracking-[0.2em] transition-colors">Global Impact</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-[1px] transition-all duration-700 ${
              currentImageIndex === index ? 'bg-[#4ADE80] w-12' : 'bg-white/20 w-6 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSection;