import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Leaf } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import UploadSection from '../components/UploadSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ResultsSection from '../components/ResultsSection';
import DebugConnection from '../components/DebugConnection';

function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const { token } = useAuth();

  const handleImageUpload = async (file) => {
    // 🔥 force reset so React always re-renders
    setAnalysisResult(null);
    setIsAnalyzing(true);

    // force new blob URL every time
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);

    const apiUrl =
      'https://agro-ai-backend-production-8c2e.up.railway.app/api/v1/predict/';

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          ...(token ? { Authorization: `Token ${token}` } : {}),
          'Cache-Control': 'no-store', // 🔥 cache killer
        },
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Prediction failed');
      }

      const data = await res.json();

      // ✅ PURE backend → UI mapping
      if (data.is_plant === false) {
        setAnalysisResult({
          diseaseName: 'Not a plant',
          confidence: data.confidence ?? 0.99,
          category: 'non-plant',
          symptoms: data.symptoms ?? [],
          treatment: data.prescriptions ?? [],
          preventionTips: [],
          summary: data.summary ?? '',
          severity: data.severity ?? '',
        });
      } else if (data.is_healthy) {
        setAnalysisResult({
          diseaseName: 'Healthy',
          confidence: data.confidence ?? 0.95,
          category: 'healthy',
          symptoms: data.symptoms ?? [],
          treatment: data.prescriptions ?? [],
          preventionTips: data.disease?.prevention_tips
            ? data.disease.prevention_tips.split('\n')
            : [],
          summary: data.summary ?? '',
          severity: data.severity ?? '',
        });
      } else {
        setAnalysisResult({
          diseaseName: data.disease?.name || 'Unknown Disease',
          confidence: data.confidence ?? 0.75,
          category: data.disease?.category || 'unknown',
          symptoms: data.symptoms ?? [],
          treatment: data.prescriptions ?? [],
          preventionTips: data.disease?.prevention_tips
            ? data.disease.prevention_tips.split('\n')
            : [],
          summary: data.disease?.description ?? '',
          severity: data.severity ?? '',
        });
      }
    } catch (err) {
      console.error('Prediction error:', err);
      alert('Prediction failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCameraCapture = () => {
    alert('Camera feature coming soon. Use file upload for now.');
  };

  const handleReset = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <>
      <HeroSection />
      <div className="bg-gray-100 py-4">
        <DebugConnection />
      </div>

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
          <p className="text-white/60 text-sm mt-2">
            © 2025 AGRO AI. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;
