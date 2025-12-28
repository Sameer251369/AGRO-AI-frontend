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
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const features = [
    {
      icon: Sparkles,
      title: "Instant Detection",
      description: "Get results in seconds with our advanced AI technology"
    },
    {
      icon: BookOpen,
      title: "Detailed Information",
      description: "Learn about the disease, symptoms, and affected areas"
    },
    {
      icon: ShieldCheck,
      title: "Treatment Recommendations",
      description: "Receive actionable treatment plans and prevention tips"
    },
    {
      icon: Wifi,
      title: "Offline Support",
      description: "Works without internet after initial setup"
    }
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Subtle background carousel */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentBgIndex === index ? 0.03 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-white/95"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">Features</h2>
          <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
            Everything you need to protect your crops and maximize yield
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group card text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer relative overflow-hidden"
              >
                {/* Animated background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2E8B57]/0 to-[#93C572]/0 group-hover:from-[#2E8B57]/5 group-hover:to-[#93C572]/5 transition-all duration-500 rounded-xl"></div>
                
                <div className="relative z-10">
                  <div className="bg-[#2E8B57]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2E8B57] group-hover:scale-110 transition-all duration-300">
                    <Icon 
                      className="w-8 h-8 text-[#2E8B57] group-hover:text-white transition-colors duration-300" 
                      style={{ width: '32px', height: '32px' }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-2 group-hover:text-[#2E8B57] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-[#64748B] group-hover:text-[#2C3E50] transition-colors duration-300">
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