import { useState, useEffect } from 'react';
import { Sparkles, BookOpen, ShieldCheck, Wifi } from 'lucide-react';

function FeaturesSection() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  const backgroundImages = [
    '/images/deepak-kumar-b4eRRodrirQ-unsplash.jpg',
    '/images/eduardo-prim-3u51-uLQICc-unsplash.jpg',
    '/images/gabriel-jimenez-jin4W1HqgL4-unsplash.jpg',
    '/images/warren-J33qmCVr02A-unsplash.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Slower transition for a more premium feel

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: "Instant Detection",
      description: "Proprietary neural networks provide diagnostic results in sub-second intervals."
    },
    {
      icon: BookOpen,
      title: "Detailed Information",
      description: "Comprehensive botanical database covering morphology and pathogen life cycles."
    },
    {
      icon: ShieldCheck,
      title: "Treatment Protocols",
      description: "Science-backed recovery plans and localized preventative measures."
    },
    {
      icon: Wifi,
      title: "Offline Support",
      description: "Edge-computing capabilities allow for diagnostics in remote field locations."
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-[#F8F9F5]">
      {/* Subtle background carousel watermark */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentBgIndex === index ? 0.04 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F9F5] via-transparent to-[#F8F9F5]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#2E8B57]/10 border border-[#2E8B57]/20 px-4 py-1.5 rounded-full mb-6">
            <span className="text-[#2E8B57] text-[10px] font-bold uppercase tracking-[0.2em]">Core Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-[#2C3E50] tracking-tight">
            Advanced <span className="font-bold">System Features</span>
          </h2>
          <div className="w-16 h-1 bg-[#4ADE80] mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group relative bg-white border border-gray-100 p-8 rounded-sm hover:border-[#4ADE80]/50 transition-all duration-500 hover:shadow-xl cursor-default"
              >
                {/* Decorative Accent */}
                <div className="absolute top-0 left-0 w-1 h-0 bg-[#4ADE80] group-hover:h-full transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="bg-[#F8F9F5] w-14 h-14 rounded-sm flex items-center justify-center mb-6 group-hover:bg-[#1A252F] transition-all duration-500">
                    <Icon 
                      className="w-6 h-6 text-[#2E8B57] group-hover:text-[#4ADE80] transition-colors duration-500" 
                    />
                  </div>
                  
                  <h3 className="text-xs font-bold text-[#2C3E50] uppercase tracking-widest mb-4 group-hover:text-[#2E8B57] transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-[#64748B] text-sm font-light leading-relaxed transition-colors group-hover:text-[#2C3E50]">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;