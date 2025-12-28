import { useState } from 'react';
import { MapPin, TrendingUp, Users, Leaf, CheckCircle, Quote, ArrowUpRight } from 'lucide-react';

function OurWork() {
  const [activeTab, setActiveTab] = useState('impact');

  const projects = [
    {
      title: "Tomato Disease Detection",
      location: "Maharashtra, India",
      farmers: "15,000+",
      impact: "Reduced crop loss by 35%",
      image: "https://images.unsplash.com/photo-1592813082147-97507d383925?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Rice Pest Management",
      location: "Philippines",
      farmers: "8,500+",
      impact: "Increased yield by 28%",
      image: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Wheat Health Monitoring",
      location: "Punjab, Pakistan",
      farmers: "12,000+",
      impact: "Early detection rate: 92%",
      image: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Corn Disease Prevention",
      location: "Iowa, USA",
      farmers: "5,000+",
      impact: "Saved $2.5M in losses",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const achievements = [
    { icon: Users, number: "50,000+", label: "Farmers Empowered" },
    { icon: MapPin, number: "25+", label: "Countries Reached" },
    { icon: TrendingUp, number: "40%", label: "Yield Increase" },
    { icon: CheckCircle, number: "100+", label: "Disease Types" }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Maharashtra, India",
      quote: "AGRO AI helped me identify tomato blight early. I saved 80% of my crop that season. This technology is a game-changer.",
      crop: "Tomato Farmer"
    },
    {
      name: "Maria Santos",
      location: "Philippines",
      quote: "Before AGRO AI, I would lose crops to diseases I couldn't identify. Now I detect problems immediately. Yields have doubled.",
      crop: "Rice Farmer"
    },
    {
      name: "Ahmed Hassan",
      location: "Pakistan",
      quote: "The app is so easy to use. It's like having an agricultural expert in your pocket 24/7. Even my father uses it now.",
      crop: "Wheat Farmer"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9F5]">
      {/* Hero Section - Matching Login/Register Style */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-[#2C3E50]">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A252F]/80 to-[#2C3E50]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#4ADE80]/10 border border-[#4ADE80]/20 px-4 py-1.5 rounded-full mb-8">
            <TrendingUp size={14} className="text-[#4ADE80]" />
            <span className="text-[#4ADE80] text-[10px] font-bold uppercase tracking-[0.2em]">Global Impact Report</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-tight">
            Making a <span className="font-bold text-[#4ADE80]">Real Impact</span>
          </h1>
          <p className="mt-6 text-[#94A3B8] max-w-2xl mx-auto font-light text-lg leading-relaxed">
            Transforming traditional farming into precision agriculture through accessible AI technology.
          </p>
        </div>
      </section>

      {/* Stats Section - Floating Achievement Cards */}
      <section className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {achievements.map((ach, idx) => (
            <div key={idx} className="bg-white/90 backdrop-blur-md p-8 rounded-sm shadow-xl border-b-4 border-[#2E8B57] text-center group hover:-translate-y-2 transition-all duration-500">
              <ach.icon size={24} className="mx-auto mb-4 text-[#2E8B57] group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-[#2C3E50] tracking-tight">{ach.number}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] mt-1">{ach.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl font-light text-[#2C3E50] tracking-tight">
                Global <span className="font-bold text-[#2E8B57]">Implementations</span>
              </h2>
              <div className="w-20 h-1 bg-[#4ADE80] mt-4 mb-6" />
              <p className="text-[#64748B] font-light">Deploying custom neural networks tailored to specific regional climates and crop varieties.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div key={index} className="group relative bg-white rounded-sm overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A252F] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[#4ADE80]">
                    <MapPin size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{project.location}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-4 group-hover:text-[#2E8B57] transition-colors">{project.title}</h3>
                  <div className="flex flex-wrap gap-6 mt-4 pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-[#2E8B57]" />
                      <span className="text-xs font-bold text-[#64748B] uppercase tracking-tighter">{project.farmers} Farmers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-[#2E8B57]" />
                      <span className="text-xs font-bold text-[#64748B] uppercase tracking-tighter">{project.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Frosted Glass Layout */}
      <section className="py-24 bg-[#1A252F] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <Leaf className="absolute top-10 left-10 text-white" size={120} />
          <Leaf className="absolute bottom-10 right-10 text-white" size={120} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-light text-white tracking-tight">
              Voices from the <span className="font-bold text-[#4ADE80]">Field</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md p-8 rounded-sm border border-white/10 hover:border-[#4ADE80]/40 transition-all group">
                <Quote size={32} className="text-[#4ADE80] mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                <p className="text-gray-300 font-light leading-relaxed mb-8 italic">"{t.quote}"</p>
                <div className="pt-6 border-t border-white/10">
                  <div className="font-bold text-white text-sm tracking-wide">{t.name}</div>
                  <div className="text-[#4ADE80] text-[10px] font-bold uppercase tracking-[0.2em] mt-1">{t.crop}</div>
                  <div className="text-gray-500 text-[10px] uppercase mt-2">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unified Footer */}
      <footer className="bg-[#0F172A] text-white py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="text-[#4ADE80]" size={24} />
            <span className="text-xl font-bold tracking-tighter uppercase">Agro <span className="text-[#4ADE80]">AI</span></span>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-8">
            <a href="#" className="hover:text-[#4ADE80] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#4ADE80] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#4ADE80] transition-colors">Satellite Data</a>
          </div>
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">© 2025 AGRO AI GLOBAL SYSTEMS. J&K, INDIA.</p>
        </div>
      </footer>
    </div>
  );
}

export default OurWork;