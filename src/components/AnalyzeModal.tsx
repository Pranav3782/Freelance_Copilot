import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
  Image as ImageIcon,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Key,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { Crown } from 'lucide-react';
import { sampleTemplates } from '../data/mockData';
import { FreelancerProfile, ProjectAnalysis, AICredentialStatus } from '../types';
import { analyzeProjectRequest, saveAICredential } from '../lib/api';
import { toast } from 'sonner';

interface AnalyzeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalysisComplete: (analysis: ProjectAnalysis) => void;
  profile: FreelancerProfile;
  credentialStatus?: AICredentialStatus;
  onRefreshCredentialStatus?: () => void;
}

export const AnalyzeModal: React.FC<AnalyzeModalProps> = ({
  isOpen,
  onClose,
  onAnalysisComplete,
  profile,
  credentialStatus = { connected: false } as AICredentialStatus,
  onRefreshCredentialStatus = () => {},
}) => {
  const [tab, setTab] = useState<'paste' | 'screenshot' | 'file' | 'url'>('paste');
  const [projectText, setProjectText] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [projectUrl, setProjectUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showLimitReachedPopup, setShowLimitReachedPopup] = useState(false);

  // Setup Key state inside modal if key is missing or invalid
  const [showKeySetup, setShowKeySetup] = useState(!credentialStatus.connected);
  const [provider, setProvider] = useState<'openai' | 'gemini'>('gemini');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [keySetupError, setKeySetupError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setShowKeySetup(!credentialStatus.connected);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, credentialStatus.connected]);

  if (!isOpen) return null;

  const analysisStages = [
    'Reading project & parsing scope requirements...',
    'Extracting implicit dependencies & tech stack...',
    'Scanning client legitimacy & risk factors...',
    'Comparing against your profile & past portfolio...',
    'Calculating match score & pricing intelligence...',
    'Generating proposal strategy & verifying truth claims...',
  ];

  const handleSaveCredential = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) {
      setKeySetupError('Please enter an API key.');
      return;
    }

    setKeySetupError(null);
    setIsTestingKey(true);

    try {
      const res = await saveAICredential(provider, apiKeyInput.trim());
      if (!res.success) {
        setKeySetupError(res.error || 'API key validation failed. Please check your provider account.');
        setIsTestingKey(false);
        return;
      }

      toast.success('API Key Connected! 🎉', {
        description: 'Your credential was validated and encrypted securely.',
      });
      setIsTestingKey(false);
      setShowKeySetup(false);
      setApiKeyInput('');
      onRefreshCredentialStatus();
    } catch (err: any) {
      setIsTestingKey(false);
      setKeySetupError(err?.message || 'Failed to authorize API key.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartAnalysis = async () => {
    if (!credentialStatus.connected) {
      setShowKeySetup(true);
      return;
    }

    if (!projectText.trim() && !screenshotPreview) {
      setErrorMessage('Please paste a project description or upload a screenshot/document.');
      return;
    }

    setErrorMessage(null);
    setIsAnalyzing(true);
    setAnalysisStep(0);

    const interval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < analysisStages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 450);

    try {
      const resultData = await analyzeProjectRequest({
        projectText,
        imageBase64: screenshotPreview,
        profile,
      });

      clearInterval(interval);

      const fullAnalysis: ProjectAnalysis = {
        ...resultData,
        id: resultData.id || `proj-${Date.now()}`,
        analysisTimestamp: resultData.analysisTimestamp || new Date().toISOString(),
        applicationStage: 'Analysed',
      };

      setTimeout(() => {
        setIsAnalyzing(false);
        onAnalysisComplete(fullAnalysis);
        onClose();
      }, 500);
    } catch (err: any) {
      clearInterval(interval);
      console.warn('Analysis error:', err);
      setIsAnalyzing(false);

      if (err?.code === 'FREE_LIMIT_REACHED' || err?.code === 'LIMIT_REACHED') {
        setShowLimitReachedPopup(true);
      } else if (err?.code === 'AI_CREDENTIAL_REQUIRED' || err?.code === 'INVALID_CREDENTIAL') {
        setShowKeySetup(true);
        setKeySetupError(err?.message || 'Please connect a valid AI API key to continue.');
      } else {
        setErrorMessage(err?.message || 'Encountered an issue analyzing the project. Please retry.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 flex justify-center items-start">
      {/* Limit Reached Modal Popup */}
      {showLimitReachedPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-[32px] border-2 border-[#050505] shadow-retro-lg p-7 sm:p-9 text-[#050505] text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-[#FFD51F] border-2 border-[#050505] shadow-retro-sm flex items-center justify-center mx-auto">
              <Crown className="w-8 h-8 text-[#050505]" />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight text-[#050505]">Free analysis limit reached</h3>
              <p className="text-sm text-[#050505]/75 font-semibold mt-2 leading-relaxed">
                You've used all 5 free analyses. Upgrade to Pro to continue analyzing projects without restrictions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
              <button
                onClick={() => setShowLimitReachedPopup(false)}
                className="w-full sm:flex-1 py-3.5 rounded-xl border-2 border-[#050505] bg-white hover:bg-[#F7F7F5] text-sm font-black text-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
              >
                Maybe later
              </button>
              <a
                href="https://rzp.io/rzp/xDK9HxA"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowLimitReachedPopup(false)}
                className="w-full sm:flex-1 py-3.5 rounded-xl border-2 border-[#050505] bg-[#FFD51F] hover:bg-[#6F86F5] hover:text-white text-[#050505] text-sm font-black shadow-retro-sm btn-tactile cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <span>Upgrade to Pro</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-3xl bg-white rounded-[36px] border-2 border-[#050505] shadow-retro-lg p-6 sm:p-10 my-6 sm:my-10 text-[#050505] shrink-0">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isAnalyzing}
          className="absolute top-6 right-6 p-2 rounded-full border-2 border-[#050505] bg-white text-[#050505] hover:bg-[#FFD51F] shadow-retro-sm btn-tactile cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {showKeySetup ? (
          /* Inline API Key Setup Step */
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD51F] text-xs font-black uppercase tracking-wider text-[#050505] border-2 border-[#050505] shadow-retro-sm mb-3">
                <Lock className="w-3.5 h-3.5 text-[#050505]" />
                Connect AI Provider Key
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#050505] tracking-tight">
                Connect your AI API key to begin
              </h2>
              <p className="text-sm text-[#050505]/75 font-semibold mt-1 leading-relaxed">
                To analyze freelance projects, connect your own AI API key. Your key belongs to you, is securely encrypted, and will be saved for your future project analyses.
              </p>
            </div>

            <form onSubmit={handleSaveCredential} className="space-y-4 p-6 rounded-3xl bg-[#F7F7F5] border-2 border-[#050505] shadow-retro-sm">
              <div>
                <label className="text-xs font-black text-[#050505] block mb-1.5">Select Provider</label>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as any)}
                  className="w-full p-3 rounded-xl bg-white border-2 border-[#050505] text-sm font-black text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#6F86F5]"
                >
                  <option value="openai">OpenAI (GPT-4o / GPT-4o-mini)</option>
                  <option value="gemini">Google Gemini (Gemini 2.5 Flash / Pro)</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-black text-[#050505]">
                    {provider === 'openai' ? 'OpenAI API Key' : 'Google Gemini API Key'}
                  </label>
                  <a
                    href={provider === 'openai' ? 'https://platform.openai.com/api-keys' : 'https://aistudio.google.com/app/apikey'}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-[#6F86F5] hover:underline flex items-center gap-1"
                  >
                    <span>Get Key</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder={provider === 'openai' ? 'sk-proj-...' : 'AIzaSy...'}
                  className="w-full p-3.5 rounded-xl bg-white border-2 border-[#050505] font-mono text-xs text-[#050505] font-bold focus:outline-none focus:ring-2 focus:ring-[#6F86F5]"
                  autoComplete="off"
                />
              </div>

              {keySetupError && (
                <div className="p-3 rounded-xl bg-[#FFF39A] border-2 border-[#050505] text-xs font-bold text-[#050505] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#F05D5E] shrink-0" />
                  <span>{keySetupError}</span>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border-2 border-[#050505] bg-white text-xs font-black text-[#050505] hover:bg-[#F7F7F5] shadow-retro-sm btn-tactile cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isTestingKey}
                  className="flex-1 py-3 rounded-xl border-2 border-[#050505] bg-[#6F86F5] hover:bg-[#536CE8] text-white text-xs font-black shadow-retro btn-tactile cursor-pointer flex items-center justify-center gap-2"
                >
                  {isTestingKey ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Validating Key...</span>
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4" />
                      <span>Test & Save Key</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="p-4 rounded-2xl bg-white border border-[#050505]/20 flex items-start gap-2.5 text-xs text-[#050505]/75 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#4DBA76] shrink-0 mt-0.5" />
              <span>
                Your key will be securely encrypted (AES-256-GCM) and saved to your account. You will not need to paste it again for future analyses.
              </span>
            </div>
          </div>
        ) : isAnalyzing ? (
          /* Multi-Stage AI Progress Animation */
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-[#6F86F5] border-2 border-[#050505] shadow-retro flex items-center justify-center text-white">
                <Sparkles className="w-10 h-10 animate-spin text-[#FFD51F]" />
              </div>
              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#FFD51F] text-[#050505] border-2 border-[#050505] flex items-center justify-center text-xs font-black shadow-sm">
                AI
              </div>
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="text-2xl font-black text-[#050505] tracking-tight">
                Analyzing Opportunity Intelligence...
              </h3>
              <p className="text-sm font-black text-[#6F86F5] min-h-[24px]">
                {analysisStages[analysisStep]}
              </p>
            </div>

            <div className="w-full max-w-md bg-[#F7F7F5] rounded-2xl p-4 space-y-2.5 text-left border-2 border-[#050505] shadow-retro-sm">
              {analysisStages.map((stg, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs">
                  {idx < analysisStep ? (
                    <CheckCircle2 className="w-4 h-4 text-[#4DBA76] shrink-0" />
                  ) : idx === analysisStep ? (
                    <RefreshCw className="w-4 h-4 text-[#6F86F5] animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-[#050505]/30 shrink-0" />
                  )}
                  <span className={idx <= analysisStep ? 'text-[#050505] font-black' : 'text-[#050505]/50 font-bold'}>
                    {stg.replace('...', '')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Input Form */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD51F] text-xs font-black uppercase tracking-wider text-[#050505] border-2 border-[#050505] shadow-retro-sm mb-3">
                  Opportunity Intelligence
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#050505] tracking-tight">
                  What opportunity are you considering?
                </h2>
                <p className="text-sm text-[#050505]/75 font-semibold mt-1">
                  Paste the project description, upload an image/screenshot, or select an example below.
                </p>
              </div>

              {credentialStatus.connected && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF39A] border-2 border-[#050505] text-xs font-black text-[#050505] shadow-retro-sm">
                  <span className="w-2 h-2 rounded-full bg-[#4DBA76]" />
                  <span>Key Active (••••{credentialStatus.keyLastFour || 'ABCD'})</span>
                </div>
              )}
            </div>

            {/* Input Mode Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] shadow-retro-sm max-w-md">
              <button
                onClick={() => setTab('paste')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  tab === 'paste' ? 'bg-[#6F86F5] text-white border-2 border-[#050505] shadow-retro-sm' : 'text-[#050505] hover:bg-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Paste Text
              </button>
              <button
                onClick={() => setTab('screenshot')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  tab === 'screenshot' ? 'bg-[#6F86F5] text-white border-2 border-[#050505] shadow-retro-sm' : 'text-[#050505] hover:bg-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Screenshot
              </button>
              <button
                onClick={() => setTab('url')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  tab === 'url' ? 'bg-[#6F86F5] text-white border-2 border-[#050505] shadow-retro-sm' : 'text-[#050505] hover:bg-white'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                Project URL
              </button>
            </div>

            {/* Tab 1: Paste Text */}
            {tab === 'paste' && (
              <div className="space-y-3">
                <textarea
                  value={projectText}
                  onChange={(e) => setProjectText(e.target.value)}
                  placeholder="Paste the job description from Upwork, Freelancer, Contra, email, or brief here...&#10;&#10;e.g. 'Looking for a senior Next.js developer to build a modern analytics dashboard with Supabase auth and Stripe billing. Budget $4,500. Timeline 4 weeks...'"
                  rows={7}
                  className="w-full p-4 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] focus:outline-none focus:ring-2 focus:ring-[#6F86F5] text-sm text-[#050505] font-medium leading-relaxed transition-all placeholder:text-[#050505]/40 resize-none shadow-inner"
                />
              </div>
            )}

            {/* Tab 2: Upload Screenshot / Dropzone */}
            {tab === 'screenshot' && (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#050505] bg-[#FFF39A]/30 hover:bg-[#FFF39A]/60 rounded-3xl p-8 text-center cursor-pointer transition-all"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,application/pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                {screenshotPreview ? (
                  <div className="space-y-3">
                    <img
                      src={screenshotPreview}
                      alt="Project preview"
                      className="max-h-48 mx-auto rounded-xl object-contain border-2 border-[#050505] shadow-retro-sm"
                    />
                    <p className="text-xs font-black text-[#050505]">{fileName || 'Screenshot uploaded'}</p>
                    <span className="text-xs text-[#6F86F5] underline font-bold">Click to change file</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#050505] text-white flex items-center justify-center mx-auto border-2 border-[#050505] shadow-retro-sm">
                      <Upload className="w-6 h-6 text-[#FFD51F]" />
                    </div>
                    <div>
                      <p className="text-base font-black text-[#050505]">
                        Drag & drop a project screenshot or brief here
                      </p>
                      <p className="text-xs font-semibold text-[#050505]/70 mt-1">Supports PNG, JPG, WebP, or PDF</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Project URL */}
            {tab === 'url' && (
              <div className="p-6 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] space-y-4">
                <div>
                  <label className="text-xs font-black text-[#050505] block mb-1">Direct Job Link</label>
                  <input
                    type="url"
                    value={projectUrl}
                    onChange={(e) => setProjectUrl(e.target.value)}
                    placeholder="https://www.upwork.com/jobs/~01..."
                    className="w-full p-3 rounded-xl bg-white border-2 border-[#050505] text-[#050505] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#6F86F5]"
                  />
                </div>
                <div className="flex items-start gap-2 text-xs text-[#050505]/75 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#4DBA76] shrink-0 mt-0.5" />
                  <span>
                    To respect marketplace terms, please paste the public description or upload a screenshot.
                  </span>
                </div>
              </div>
            )}

            {/* 1-Click Example Templates */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-black text-[#050505]/70 uppercase tracking-wider">
                Or try a realistic sample opportunity:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sampleTemplates.map((tpl, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setProjectText(tpl.text);
                      setTab('paste');
                    }}
                    className="p-3.5 text-left rounded-2xl bg-[#F7F7F5] hover:bg-[#FFF39A] border-2 border-[#050505] shadow-retro-sm hover:shadow-retro text-xs transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <span className="font-black text-[#050505] leading-tight group-hover:text-[#6F86F5] transition-colors">{tpl.title}</span>
                    <span className="text-[10px] font-bold text-[#050505]/60 mt-1">{tpl.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-[#FFF39A] border-2 border-[#050505] text-xs font-bold text-[#050505] flex items-center gap-2 shadow-retro-sm">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#FF941D]" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* CTA */}
            <div className="pt-4 border-t-2 border-[#050505]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-black text-[#050505]/75 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#4DBA76]" />
                <span>Zero hallucinations • Powered by your own AI key</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border-2 border-[#050505] text-sm font-black text-[#050505] bg-white hover:bg-[#F7F7F5] shadow-retro-sm btn-tactile cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartAnalysis}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#6F86F5] hover:bg-[#536CE8] text-white font-black text-sm border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer"
                >
                  Analyze Opportunity
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
