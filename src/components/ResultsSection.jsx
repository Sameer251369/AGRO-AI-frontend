import React from 'react';
import { AlertCircle, CheckCircle, ShieldCheck, Info, Activity, ArrowRight } from 'lucide-react';

function ResultsSection({ result }) {
  // result.confidence comes from our mapped state in Home.js
  const confidencePercentage = Math.round((result.confidence || 0.75) * 100);
  const confidenceColor = confidencePercentage >= 80 ? '#4ADE80' : confidencePercentage >= 60 ? '#F59E0B' : '#EF4444';

  return (
    <section className="py-24 bg-[#F8F9F5]">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header - Matching Landing Style */}
        <div className="text-center mb-16 animate-in fade-in duration-700">
          <div className="inline-flex items-center gap-2 bg-[#4ADE80]/10 border border-[#4ADE80]/20 px-4 py-1.5 rounded-full mb-6">
            <Activity size={14} className="text-[#4ADE80]" />
            <span className="text-[#4ADE80] text-[10px] font-bold uppercase tracking-[0.2em]">Diagnostic Report</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-[#2C3E50] tracking-tight">
            Analysis <span className="font-bold">Summary</span>
          </h2>
          <div className="w-16 h-1 bg-[#4ADE80] mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Result Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-sm shadow-xl border-l-4 border-[#2E8B57] relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-[#2C3E50] mb-3 tracking-tight">
                    {result.diseaseName}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-[#1A252F] text-white text-[10px] font-bold uppercase tracking-widest rounded-sm">
                      {/* Fixed category mapping */}
                      {typeof result.category === 'string' ? result.category.replace('_', ' ') : 'GENERAL'}
                    </span>
                    {result.severity && (
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm border ${
                        result.severity.toLowerCase() === 'high' ? 'border-red-200 text-red-500 bg-red-50' : 
                        result.severity.toLowerCase() === 'medium' ? 'border-amber-200 text-amber-500 bg-amber-50' : 
                        'border-emerald-200 text-emerald-500 bg-emerald-50'
                      }`}>
                        {result.severity} Priority
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-[#F8F9F5] p-4 rounded-sm border border-gray-100 min-w-[140px] text-center">
                  <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-1">Confidence</div>
                  <div className="text-3xl font-bold" style={{ color: confidenceColor }}>
                    {confidencePercentage}%
                  </div>
                  <div className="w-full bg-gray-200 h-1 mt-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-1000" 
                      style={{ width: `${confidencePercentage}%`, backgroundColor: confidenceColor }}
                    />
                  </div>
                </div>
              </div>

              {result.summary && (
                <div className="p-6 bg-[#F8F9F5] rounded-sm border-l-2 border-gray-200 italic text-[#64748B] font-light leading-relaxed">
                  "{result.summary}"
                </div>
              )}
            </div>

            {/* Treatment Protocol */}
            <div className="bg-[#1A252F] p-10 rounded-sm shadow-2xl text-white">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="text-[#4ADE80]" size={24} />
                <h3 className="text-xl font-bold uppercase tracking-[0.15em]">Treatment Protocol</h3>
              </div>
              {/* This maps to the treatment array from our database */}
              <TreatmentList items={result.treatment} />
            </div>
          </div>

          {/* Sidebar - Symptoms & Prevention */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-sm shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="text-red-500" size={20} />
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#2C3E50]">Identified Symptoms</h4>
              </div>
              <SymptomsList items={result.symptoms} bulletColor="#EF4444" />
            </div>

            <div className="bg-white p-8 rounded-sm shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Info className="text-[#2E8B57]" size={20} />
                <h4 className="text-sm font-bold uppercase tracking-widest text-[#2C3E50]">Prevention</h4>
              </div>
              <SymptomsList 
                items={result.preventionTips} 
                icon={<CheckCircle size={14} className="text-[#2E8B57]" />} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function SymptomsList({ items = [], bulletColor = '#EF4444', icon = null }) {
  const [expanded, setExpanded] = React.useState(false);
  const visibleCount = expanded ? items.length : 5;

  if (!items || items.length === 0) {
    return <div className="text-[10px] uppercase font-bold text-gray-400">Data Unavailable</div>;
  }

  return (
    <div>
      <ul className="space-y-4">
        {items.slice(0, visibleCount).map((it, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-[#64748B] font-light leading-snug animate-in fade-in slide-in-from-left-2">
            {icon ? (
              <span className="flex-shrink-0 mt-1">{icon}</span>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: bulletColor }} />
            )}
            <span>{it}</span>
          </li>
        ))}
      </ul>
      {items.length > visibleCount && (
        <button 
          className="mt-6 text-[10px] font-bold text-[#2E8B57] uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all" 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show Less' : `View All ${items.length}`} <ArrowRight size={12} />
        </button>
      )}
    </div>
  );
}

function TreatmentList({ items = [] }) {
  const [expanded, setExpanded] = React.useState(false);
  const visibleCount = expanded ? items.length : 4;

  if (!items || items.length === 0) {
    return <div className="text-gray-500 font-light italic">No protocol steps defined for this detection.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {items.slice(0, visibleCount).map((step, index) => (
          <div key={index} className="group flex gap-5 p-4 rounded-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <span className="flex-shrink-0 w-8 h-8 rounded-sm bg-[#4ADE80] text-[#1A252F] flex items-center justify-center text-xs font-black">
              0{index + 1}
            </span>
            <p className="text-gray-300 font-light text-sm leading-relaxed">{step}</p>
          </div>
        ))}
      </div>
      {items.length > visibleCount && (
        <button 
          className="text-[10px] font-bold text-[#4ADE80] uppercase tracking-[0.2em] border-b border-[#4ADE80]/30 pb-1" 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Collapse Protocol' : `Expand Full Protocol (${items.length} Steps)`}
        </button>
      )}
    </div>
  );
}

export default ResultsSection;