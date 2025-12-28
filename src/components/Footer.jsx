import React from 'react';
import { Leaf, Github, Twitter, Linkedin, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-[#1A252F] text-white py-16 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="text-[#4ADE80]" size={24} />
              <span className="text-xl font-bold tracking-tighter">AGRO<span className="text-[#4ADE80]">AI</span></span>
            </div>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Advanced neural diagnostics for the next generation of precision agriculture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4ADE80] mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li className="hover:text-white transition-colors cursor-pointer">Neural Detection</li>
              <li className="hover:text-white transition-colors cursor-pointer">AI Consultation</li>
              <li className="hover:text-white transition-colors cursor-pointer">Soil Analysis</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4ADE80] mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li className="hover:text-white transition-colors cursor-pointer">About Mission</li>
              <li className="hover:text-white transition-colors cursor-pointer">Contact Tech</li>
              <li className="hover:text-white transition-colors cursor-pointer">Privacy Protocol</li>
            </ul>
          </div>

          {/* Social/Contact */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4ADE80] mb-6">Connect</h4>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center hover:bg-[#2E8B57] transition-all cursor-pointer">
                <Github size={18} />
              </div>
              <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center hover:bg-[#2E8B57] transition-all cursor-pointer">
                <Twitter size={18} />
              </div>
              <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center hover:bg-[#2E8B57] transition-all cursor-pointer">
                <Mail size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
            © 2025 AGRO AI SYSTEMS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[9px] text-gray-600 uppercase tracking-[0.3em]">
            <span>Encrypted Connection</span>
            <span>Global Node 01</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;