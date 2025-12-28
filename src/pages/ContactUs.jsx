import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';

function ContactUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form logic here
  };

  return (
    <div className="min-h-screen bg-[#F8F9F5]">
      {/* Hero Section - Matching Landing Style */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#1A252F]">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#4ADE80 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#4ADE80]/10 border border-[#4ADE80]/20 px-4 py-1.5 rounded-sm mb-6">
              <MessageSquare size={14} className="text-[#4ADE80]" />
              <span className="text-[#4ADE80] text-[10px] font-bold uppercase tracking-[0.2em]">Global Support Node</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extralight text-white tracking-tighter leading-none mb-6">
              Connect with <span className="font-bold text-[#4ADE80]">Agro AI</span>
            </h1>
            <p className="text-lg text-white/60 font-light max-w-2xl leading-relaxed">
              Have questions about our neural diagnostics or enterprise integration? 
              Our technical team is available for global consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Contact Info Cards */}
            <div className="space-y-8">
              <div className="group p-8 bg-white border border-gray-100 rounded-sm hover:shadow-2xl transition-all duration-500">
                <div className="w-12 h-12 bg-[#F8F9F5] rounded-sm flex items-center justify-center mb-6 group-hover:bg-[#1A252F] transition-all duration-500">
                  <Mail className="text-[#2E8B57] group-hover:text-[#4ADE80]" size={20} />
                </div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2C3E50] mb-2">Technical Inquiries</h3>
                <p className="text-gray-500 font-light">support@agroai.tech</p>
              </div>

              <div className="group p-8 bg-white border border-gray-100 rounded-sm hover:shadow-2xl transition-all duration-500">
                <div className="w-12 h-12 bg-[#F8F9F5] rounded-sm flex items-center justify-center mb-6 group-hover:bg-[#1A252F] transition-all duration-500">
                  <Phone className="text-[#2E8B57] group-hover:text-[#4ADE80]" size={20} />
                </div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2C3E50] mb-2">Direct Line</h3>
                <p className="text-gray-500 font-light">+1 (555) 012-3456</p>
              </div>

              <div className="group p-8 bg-white border border-gray-100 rounded-sm hover:shadow-2xl transition-all duration-500">
                <div className="w-12 h-12 bg-[#F8F9F5] rounded-sm flex items-center justify-center mb-6 group-hover:bg-[#1A252F] transition-all duration-500">
                  <Clock className="text-[#2E8B57] group-hover:text-[#4ADE80]" size={20} />
                </div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2C3E50] mb-2">Operational Hours</h3>
                <p className="text-gray-500 font-light">Mon - Fri: 08:00 - 18:00 GMT</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-10 md:p-16 border border-gray-100 rounded-sm shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-[#4ADE80]" />
               
               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                      <input type="text" className="w-full bg-[#F8F9F5] border-none p-4 rounded-sm focus:ring-1 focus:ring-[#4ADE80] transition-all outline-none text-sm" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                      <input type="email" className="w-full bg-[#F8F9F5] border-none p-4 rounded-sm focus:ring-1 focus:ring-[#4ADE80] transition-all outline-none text-sm" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Subject</label>
                    <input type="text" className="w-full bg-[#F8F9F5] border-none p-4 rounded-sm focus:ring-1 focus:ring-[#4ADE80] transition-all outline-none text-sm" placeholder="Enterprise Integration" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Message</label>
                    <textarea rows="5" className="w-full bg-[#F8F9F5] border-none p-4 rounded-sm focus:ring-1 focus:ring-[#4ADE80] transition-all outline-none text-sm resize-none" placeholder="Describe your inquiry..."></textarea>
                  </div>

                  <button type="submit" className="bg-[#1A252F] hover:bg-[#2E8B57] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-12 py-5 rounded-sm transition-all duration-500 flex items-center gap-3 shadow-xl active:scale-95">
                    Transmit Message
                    <Send size={14} className="text-[#4ADE80]" />
                  </button>
               </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;