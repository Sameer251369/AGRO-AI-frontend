import React, { useState } from 'react';

const DebugConnection = () => {
  const [status, setStatus] = useState('Idle');
  const [log, setLog] = useState('');

  const testConnection = async () => {
    // Exact URL from your backend config
    const testUrl = 'https://agro-ai-backend-production-8c2e.up.railway.app/api/v1/diseases/';
    
    setStatus('Testing...');
    setLog(`Attempting to fetch: ${testUrl}\n`);

    try {
      const res = await fetch(testUrl);
      const data = await res.json();
      
      if (res.ok) {
        setStatus('✅ SUCCESS!');
        setLog(prev => prev + `Status: ${res.status}\nData received: ${JSON.stringify(data).substring(0, 100)}...`);
      } else {
        setStatus('❌ FAILED (API Error)');
        setLog(prev => prev + `Status: ${res.status}\nError: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      setStatus('🔥 CRITICAL ERROR');
      setLog(prev => prev + `Possible CORS or Network issue.\nMessage: ${err.message}`);
    }
  };

  return (
    <div className="p-10 bg-gray-900 text-white font-mono text-xs mt-20 z-50 relative">
      <h2 className="text-xl font-bold mb-4">API Connection Debugger</h2>
      <button 
        onClick={testConnection}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 mb-4"
      >
        Run Test
      </button>
      <div className="mb-2">Status: <span className="font-bold">{status}</span></div>
      <pre className="bg-black p-4 rounded border border-gray-700 overflow-x-auto whitespace-pre-wrap">
        {log || 'Click run to begin...'}
      </pre>
    </div>
  );
};

export default DebugConnection;