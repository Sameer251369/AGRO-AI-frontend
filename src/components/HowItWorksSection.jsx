import { Upload, Sparkles, CheckCircle } from 'lucide-react';

function HowItWorksSection() {
  const steps = [
    {
      icon: Upload,
      number: 1,
      title: "Digital Intake",
      description: "Upload or capture a high-resolution photo of the affected plant foliage."
    },
    {
      icon: Sparkles,
      number: 2,
      title: "Neural Analysis",
      description: "Our trained AI models scan for pathogenic patterns and cellular irregularities."
    },
    {
      icon: CheckCircle,
      number: 3,
      title: "Expert Protocol",
      description: "Receive a tailored treatment plan with localized prevention strategies."
    }
  ];

  return (
    <section className="py-24 bg-[#F8F9F5]">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-20 animate-in fade-in duration-700">
          <div className="inline-flex items-center gap-2 bg-[#2E8B57]/10 border border-[#2E8B57]/20 px-4 py-1.5 rounded-full mb-6">
            <span className="text-[#2E8B57] text-[10px] font-bold uppercase tracking-[0.2em]">Efficiency Protocol</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-[#2C3E50] tracking-tight">
            The <span className="font-bold">Agro-AI</span> Process
          </h2>
          <div className="w-16 h-1 bg-[#4ADE80] mx-auto mt-6" />
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            
            {/* Architectural Connection Lines */}
            <div className="hidden md:block absolute top-[100px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" 
                 style={{ zIndex: 0 }}>
            </div>

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative z-10 group">
                  <div className="text-center transition-all duration-500">
                    
                    {/* Step Number Circle */}
                    <div className="bg-[#1A252F] text-white w-12 h-12 rounded-sm flex items-center justify-center mx-auto mb-8 text-sm font-bold shadow-xl group-hover:bg-[#2E8B57] transition-all duration-500 relative">
                      <span className="relative z-10">0{step.number}</span>
                    </div>

                    {/* Icon Container */}
                    <div className="bg-white w-24 h-24 rounded-sm flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                      <Icon 
                        className="w-10 h-10 text-[#2C3E50] group-hover:text-[#2E8B57] transition-colors duration-500" 
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-sm font-bold text-[#2C3E50] uppercase tracking-widest mb-4 group-hover:text-[#2E8B57] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[#64748B] text-sm font-light leading-relaxed px-4">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;