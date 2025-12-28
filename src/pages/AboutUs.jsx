import { Target, Users, Award, Heart, Leaf, ChevronRight } from 'lucide-react';

function AboutUs() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To empower farmers worldwide with AI-powered technology that makes plant disease detection accessible, accurate, and actionable."
    },
    {
      icon: Users,
      title: "Our Team",
      description: "A dedicated group of agricultural experts, AI researchers, and software engineers passionate about sustainable farming."
    },
    {
      icon: Award,
      title: "Our Expertise",
      description: "Combining decades of agricultural knowledge with cutting-edge machine learning to deliver reliable disease detection."
    },
    {
      icon: Heart,
      title: "Our Commitment",
      description: "Supporting farmers in protecting their crops, increasing yields, and building a more sustainable agricultural future."
    }
  ];

  const stats = [
    { number: "50K+", label: "Farmers Served" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "100+", label: "Disease Types" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9F5]">
      {/* Hero Section - Matching Dark Theme */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-[#2C3E50]">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1600&q=80")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A252F]/90 to-[#2C3E50]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#4ADE80]/10 border border-[#4ADE80]/20 px-4 py-1.5 rounded-full mb-8">
            <Leaf size={14} className="text-[#4ADE80]" />
            <span className="text-[#4ADE80] text-[10px] font-bold uppercase tracking-[0.2em]">Our DNA</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-tight">
            Cultivating <span className="font-bold text-[#4ADE80]">Innovation</span>
          </h1>
          <p className="mt-6 text-[#94A3B8] max-w-2xl mx-auto font-light text-lg leading-relaxed">
            Bridging the gap between Silicon Valley technology and global agricultural heartlands.
          </p>
        </div>
      </section>

      {/* Stats Section - Architectural Floating Cards */}
      <section className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-md p-8 rounded-sm shadow-xl border-b-4 border-[#2E8B57] text-center hover:-translate-y-2 transition-all duration-500 group">
              <div className="text-3xl font-bold text-[#2C3E50] tracking-tight group-hover:text-[#2E8B57] transition-colors">{stat.number}</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748B] mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section - High Contrast Split Layout */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2E8B57] mb-4">The Genesis</h2>
              <h3 className="text-4xl font-light text-[#2C3E50] leading-tight mb-8">
                Democratizing <span className="font-bold">Agricultural Intelligence</span>
              </h3>
              <div className="space-y-6 text-[#64748B] font-light leading-relaxed">
                <p>
                  AGRO AI was born from a simple observation: farmers worldwide lose 
                  significant portions of their crops to diseases that could be prevented if detected early.
                </p>
                <p>
                  Our founders, a team of agricultural scientists and AI engineers, came together to build a tool that 
                  brings expert-level identification to every farmer's smartphone.
                </p>
              </div>
              <button className="mt-10 flex items-center gap-2 text-[#2E8B57] text-[10px] font-bold uppercase tracking-widest hover:gap-4 transition-all">
                Learn about our technology <ChevronRight size={16} />
              </button>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 border-2 border-[#2E8B57]/10 rounded-sm -z-10 translate-x-8 translate-y-8" />
              <img 
                src="https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1000&q=80" 
                alt="Modern Farming" 
                className="rounded-sm shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Glass Grid */}
      <section className="py-24 bg-[#1A252F]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-light text-white tracking-tight">
              Foundational <span className="font-bold text-[#4ADE80]">Values</span>
            </h2>
            <div className="w-16 h-1 bg-[#4ADE80] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="group bg-white/5 backdrop-blur-md p-10 rounded-sm border border-white/10 hover:border-[#4ADE80]/40 transition-all">
                  <div className="flex items-start gap-6">
                    <div className="bg-[#4ADE80]/10 p-4 rounded-sm text-[#4ADE80] group-hover:bg-[#4ADE80] group-hover:text-white transition-all">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-3 tracking-wide">{value.title}</h4>
                      <p className="text-gray-400 font-light text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Presence Footer */}
      <footer className="bg-[#0F172A] text-white py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="text-[#4ADE80]" size={24} />
            <span className="text-xl font-bold tracking-tighter uppercase">Agro <span className="text-[#4ADE80]">AI</span></span>
          </div>
          <div className="w-full h-[1px] bg-white/5 mb-8 max-w-4xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-4xl text-center md:text-left mb-12">
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Network</h5>
              <p className="text-xs text-gray-400 font-light">Supporting over 25 countries across Southeast Asia, India, and North America.</p>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Laboratory</h5>
              <p className="text-xs text-gray-400 font-light">Chadoora, Nudgam<br />Jammu & Kashmir, India</p>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Contact</h5>
              <p className="text-xs text-gray-400 font-light">sameerbashir522@gmail.com<br />+91 6005349142</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em]">© 2025 AGRO AI LABS. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;