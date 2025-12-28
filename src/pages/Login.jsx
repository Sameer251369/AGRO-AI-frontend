import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Leaf } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import UploadSection from '../components/UploadSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ResultsSection from '../components/ResultsSection';

function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const { token } = useAuth();

  const handleImageUpload = async (file) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setIsAnalyzing(true);

    // Updated to your Railway URL
    const apiUrl = 'https://agro-ai-backend-production-8c2e.up.railway.app/api/v1/predict/';
    
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: token ? { Authorization: `Token ${token}` } : {},
      });

      if (!res.ok) throw new Error('Backend error');
      const data = await res.json();

      // Mapping Railway Backend response (data.details is the Disease object)
      const details = data.details;
      
      setAnalysisResult({
        diseaseName: data.prediction || "Unknown Condition",
        confidence: 0.92, // Placeholder as backend model matures
        category: details?.category || 'general',
        symptoms: details?.symptoms || [],
        treatment: details?.treatment || [],
        preventionTips: details?.preventionTips || [],
        summary: details?.description || 'No detailed description available.',
        severity: "Moderate", 
      });

    } catch (err) {
      console.error("API Error:", err);
      // Keep your fallback for demo purposes if API fails
      setAnalysisResult({
        diseaseName: "Connection Issue",
        confidence: 0,
        category: "error",
        symptoms: ["Could not reach the AI server"],
        treatment: ["Check your internet connection", "Ensure the backend is awake"],
        preventionTips: []
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCameraCapture = () => {
    alert('Camera feature would open here. For demo, please use file upload.');
  };

  const handleReset = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <>
      <HeroSection />
      <UploadSection 
        onImageUpload={handleImageUpload}
        onCameraCapture={handleCameraCapture}
        isAnalyzing={isAnalyzing}
        uploadedImage={uploadedImage}
        onReset={handleReset}
      />
      {analysisResult && <ResultsSection result={analysisResult} />}
      <FeaturesSection />
      <HowItWorksSection />
      <footer className="bg-[#2E8B57] text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-6 h-6" />
            <span className="text-xl font-bold">AGRO AI</span>
          </div>
          <p className="text-white/80">Trusted by farmers worldwide</p>
          <p className="text-white/60 text-sm mt-2">© 2025 AGRO AI. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;