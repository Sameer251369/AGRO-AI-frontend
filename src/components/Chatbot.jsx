import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, ArrowRight } from 'lucide-react';

// EXPANDED KNOWLEDGE BASE
const AGRO_KNOWLEDGE = {
  "tomato": "Check for 'Early Blight' (brown spots with rings). Increase airflow and use copper-based fungicides. Ensure consistent watering to prevent blossom end rot.",
  "wheat": "Look for yellow rust or powdery mildew. Apply propiconazole if infection exceeds 5%. Ensure high nitrogen levels during the tillering stage.",
  "rice": "Watch for 'Bacterial Leaf Blight'. Maintain proper drainage. If 'Brown Plant Hopper' is seen, use neem-based sprays.",
  "potato": "Late blight is common in humid weather. Use Mancozeb and avoid overhead irrigation. Store harvested tubers in cool, dark environments.",
  "corn": "Watch for Fall Armyworm damage in the whorl. Use pheromone traps for monitoring. Ensure soil has adequate Zinc and Phosphorus.",
  "soil": "Optimal soil pH for most crops is 6.0-7.5. Use lime to raise pH (if acidic) or gypsum to lower it (if alkaline).",
  "pest": "For aphids and mites, a mixture of soap water and neem oil is effective. For larger larvae, consider Bacillus thuringiensis.",
  "fertilizer": "NPK 19-19-19 is good for general growth. Switch to high Phosphorus for root development.",
  "water": "Most vegetable crops require 1-2 inches of water per week. Drip irrigation reduces fungal risks.",
  "organic": "Focus on crop rotation, green manures, and companion planting (like marigolds with tomatoes) to naturally deter pests.",
  "leaf": "Yellow leaves (Chlorosis) usually indicate Nitrogen deficiency. Yellowing with green veins indicates Iron or Magnesium deficiency.",
  "root": "Wilting despite wet soil suggests Root Rot. Improve drainage immediately and avoid overwatering.",
  "fungus": "White powdery coating on leaves is Powdery Mildew. Use a baking soda spray or sulfur-based organic fungicides.",
};

function Chatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'AGRO AI Intelligence Hub initialized. System is locked in English mode. Please describe your crop symptoms or soil conditions.' }
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const boxRef = useRef();

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isSending]);

  const generateRealAnswer = (query) => {
    const q = query.toLowerCase();
    let responses = [];
    
    Object.keys(AGRO_KNOWLEDGE).forEach(key => {
      if (q.includes(key)) responses.push(AGRO_KNOWLEDGE[key]);
    });

    return responses.length > 0 
      ? responses.join(" ") 
      : "I am analyzing your specific case. Please mention the crop name (e.g., Tomato, Wheat) and the primary symptom for a detailed diagnostic.";
  };

  const send = async () => {
    if (!input.trim() || isSending) return;
    const userMsg = input.trim();
    
    setMessages((m) => [...m, { from: 'user', text: userMsg }]);
    setInput('');
    setIsSending(true);

    try {
      const systemContext = `[STRICT: ENGLISH ONLY] User Query: ${userMsg}`;
      
     // Replace localhost with your Railway Production URL
const res = await fetch('https://agro-ai-backend-production-8c2e.up.railway.app/api/chat/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: systemContext }),
});
      
      const data = await res.json();
      let botReply = data.reply || data.response;

      const hasHindi = /[\u0900-\u097F]/.test(botReply);
      if (!botReply || hasHindi || botReply.length < 5) {
        botReply = generateRealAnswer(userMsg);
      }
      
      setMessages((m) => [...m, { from: 'bot', text: botReply }]);
    } catch (e) {
      setMessages((m) => [...m, { from: 'bot', text: generateRealAnswer(userMsg) }]);
    } finally {
      setIsSending(false);
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] pt-32 pb-12 transition-all duration-500">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Title Bar */}
        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="inline-flex items-center gap-2 bg-[#4ADE80]/10 border border-[#4ADE80]/20 px-4 py-1.5 rounded-sm mb-4">
              <Sparkles size={14} className="text-[#4ADE80]" />
              <span className="text-[#4ADE80] text-[10px] font-bold uppercase tracking-[0.2em]">Neural Consultant v2.0</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
              AI <span className="font-bold text-[#4ADE80]">Consultation</span>
            </h2>
            <div className="w-16 h-1 bg-[#4ADE80] mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="bg-[#1E293B]/50 p-8 rounded-sm shadow-2xl border border-white/5 backdrop-blur-md">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 text-[#4ADE80] border-b pb-4 border-white/5">Diagnostic Nodes</h3>
              <ul className="space-y-5 text-xs font-light text-gray-400">
                {['Cereal Analysis', 'Horticulture Standards', 'Pathogen Scanning', 'Soil Microbiome'].map((item) => (
                  <li key={item} className="flex gap-3 items-start group cursor-default">
                    <ArrowRight size={14} className="text-[#4ADE80]/50 group-hover:text-[#4ADE80] group-hover:translate-x-1 transition-all" /> 
                    <span className="group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Chat Console */}
          <div className="lg:col-span-3 flex flex-col h-[650px] bg-[#1E293B]/30 rounded-sm shadow-2xl border border-white/5 overflow-hidden relative backdrop-blur-xl">
            
            <div ref={boxRef} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                  <div className={`flex gap-4 max-w-[85%] ${m.from === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-sm shrink-0 flex items-center justify-center border transition-all duration-500 ${
                      m.from === 'user' 
                        ? 'bg-[#2E8B57] border-[#2E8B57] text-white' 
                        : 'bg-[#0F172A] border-white/10 text-[#4ADE80]'
                    }`}>
                      {m.from === 'user' ? <User size={18} /> : <Bot size={18} />}
                    </div>
                    <div className={`p-5 rounded-sm text-sm leading-relaxed shadow-xl border ${
                      m.from === 'user' 
                        ? 'bg-[#0F172A] text-white border-white/5' 
                        : 'bg-white text-[#0F172A] border-transparent'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
              
              {isSending && (
                <div className="flex justify-start">
                  <div className="flex gap-4 animate-pulse">
                    <div className="w-10 h-10 rounded-sm bg-[#0F172A] flex items-center justify-center border border-white/10">
                      <Loader2 size={18} className="text-[#4ADE80] animate-spin" />
                    </div>
                    <div className="bg-[#0F172A]/50 px-6 py-4 rounded-sm border border-white/5 text-[10px] font-bold uppercase tracking-widest text-[#4ADE80]">
                      Parsing Neural Stream...
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Console */}
            <div className="p-8 bg-[#0F172A]/80 border-t border-white/5">
              <div className="relative group">
                <textarea 
                  value={input} 
                  onKeyDown={onKey} 
                  onChange={(e) => setInput(e.target.value)} 
                  placeholder="Query System..." 
                  className="w-full bg-[#1E293B] border border-white/10 text-white rounded-sm p-5 pr-40 text-sm focus:outline-none focus:border-[#4ADE80]/50 transition-all resize-none shadow-2xl" 
                  rows={2} 
                />
                <button 
                  onClick={send} 
                  disabled={isSending || !input.trim()} 
                  className="absolute right-3 bottom-3 bg-[#4ADE80] hover:bg-[#3dbb6b] disabled:bg-gray-800 text-[#0F172A] px-8 py-3 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-3 active:scale-95 shadow-xl"
                >
                  {isSending ? 'Syncing' : 'Transmit'}
                  <Send size={14} />
                </button>
              </div>
              <div className="mt-4 flex justify-between items-center opacity-30">
                <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Node: EN-01</span>
                <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Secured Transmission</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;