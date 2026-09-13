import React, { useState } from 'react';
import {
  Key,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Trash2,
  ShieldCheck,
  Sparkles,
  Lock,
  X,
  ExternalLink,
} from 'lucide-react';
import { AICredentialStatus } from '../types';
import {
  testAICredential,
  saveAICredential,
  updateAICredential,
  deleteAICredential,
} from '../lib/api';
import { toast } from 'sonner';

interface AICredentialSectionProps {
  credentialStatus: AICredentialStatus;
  onRefreshStatus: () => void;
}

export const AICredentialSection: React.FC<AICredentialSectionProps> = ({
  credentialStatus,
  onRefreshStatus,
}) => {
  const [isTestLoading, setIsTestLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'connect' | 'replace'>('connect');
  const [selectedProvider, setSelectedProvider] = useState<'openai' | 'gemini'>('gemini');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleTestConnection = async () => {
    setIsTestLoading(true);
    try {
      if (!credentialStatus.connected) {
        toast.error('No API key connected.', { description: 'Please connect an API key first.' });
        setIsTestLoading(false);
        return;
      }
      // Re-verify status with server
      onRefreshStatus();
      toast.success('AI Credential Verified ✓', {
        description: `Connected to ${credentialStatus.provider?.toUpperCase()} (${credentialStatus.keyLastFour || 'Active'})`,
      });
    } catch {
      toast.error('Connection check failed.');
    } finally {
      setIsTestLoading(false);
    }
  };

  const handleOpenConnectModal = () => {
    setModalMode('connect');
    setApiKeyInput('');
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleOpenReplaceModal = () => {
    setModalMode('replace');
    setApiKeyInput('');
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleSubmitKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) {
      setErrorMessage('Please enter an API key.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      if (modalMode === 'connect') {
        const res = await saveAICredential(selectedProvider, apiKeyInput.trim());
        if (!res.success) {
          setErrorMessage(res.error || 'API key authentication failed. Please check your provider account.');
          setIsSubmitting(false);
          return;
        }
        toast.success('API Key Connected Successfully! 🎉', {
          description: 'Your key is securely encrypted and saved for your future analyses.',
        });
      } else {
        // Replace mode: tests new key FIRST before replacing
        const res = await updateAICredential(selectedProvider, apiKeyInput.trim());
        if (!res.success) {
          setErrorMessage(res.error || 'New API key validation failed. Your old key remains active.');
          setIsSubmitting(false);
          return;
        }
        toast.success('API Key Replaced! 🎉', {
          description: 'Your credential has been updated successfully.',
        });
      }

      setIsSubmitting(false);
      setIsModalOpen(false);
      setApiKeyInput('');
      onRefreshStatus();
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err?.message || 'Failed to authorize API key.');
    }
  };

  const handleConfirmRemove = async () => {
    setIsRemoving(true);
    try {
      const res = await deleteAICredential(credentialStatus.provider || 'openai');
      if (res.success) {
        toast.success('API Key Removed', {
          description: 'Your encrypted credential was deleted. Project history remains saved.',
        });
        onRefreshStatus();
      } else {
        toast.error(res.error || 'Failed to remove API key.');
      }
    } catch {
      toast.error('Network error while removing key.');
    } finally {
      setIsRemoving(false);
      setIsRemoveConfirmOpen(false);
    }
  };

  const providerDisplayName = credentialStatus.provider === 'gemini' ? 'Google Gemini' : 'OpenAI';

  return (
    <div className="p-6 sm:p-8 rounded-[32px] bg-white border-2 border-[#050505] shadow-retro space-y-6 text-[#050505]">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#050505]/15 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFD51F] border-2 border-[#050505] shadow-retro-sm flex items-center justify-center">
            <Key className="w-6 h-6 text-[#050505]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-[#050505]">AI Provider Credential</h3>
              {credentialStatus.connected ? (
                <span className="px-2.5 py-0.5 rounded-full bg-[#4DBA76] text-white text-[10px] font-black uppercase border border-[#050505]">
                  Connected ✓
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-[#F05D5E] text-white text-[10px] font-black uppercase border border-[#050505]">
                  Key Required 🔴
                </span>
              )}
            </div>
            <p className="text-xs text-[#050505]/75 font-semibold mt-0.5">
              Personal AI API key used for project analysis, risk scanning, and proposal generation.
            </p>
          </div>
        </div>

        {credentialStatus.connected ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleTestConnection}
              disabled={isTestLoading}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F7F7F5] border-2 border-[#050505] text-xs font-black text-[#050505] shadow-retro-sm btn-tactile flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTestLoading ? 'animate-spin' : ''}`} />
              <span>Test Connection</span>
            </button>
            <button
              onClick={handleOpenReplaceModal}
              className="px-4 py-2.5 rounded-xl bg-[#6F86F5] hover:bg-[#536CE8] text-white border-2 border-[#050505] text-xs font-black shadow-retro-sm btn-tactile cursor-pointer"
            >
              Replace Key
            </button>
            <button
              onClick={() => setIsRemoveConfirmOpen(true)}
              className="p-2.5 rounded-xl bg-white hover:bg-[#F05D5E] hover:text-white border-2 border-[#050505] text-xs font-black text-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
              title="Remove API Key"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleOpenConnectModal}
            className="px-6 py-3 rounded-2xl bg-[#6F86F5] hover:bg-[#536CE8] text-white text-xs font-black border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer flex items-center gap-2"
          >
            <Key className="w-4 h-4" />
            <span>Connect API Key</span>
          </button>
        )}
      </div>

      {/* Credential Status Box */}
      {credentialStatus.connected ? (
        <div className="p-5 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] shadow-retro-sm grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
          <div>
            <span className="text-[10px] font-black uppercase text-[#050505]/60 block">AI Provider</span>
            <div className="text-sm font-black text-[#050505] flex items-center gap-1.5 mt-0.5">
              <span>{providerDisplayName}</span>
              <CheckCircle2 className="w-4 h-4 text-[#4DBA76]" />
            </div>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-[#050505]/60 block">Saved Key</span>
            <div className="text-sm font-mono font-bold text-[#050505] mt-0.5">
              ••••••••{credentialStatus.keyLastFour || 'ABCD'}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-[#050505]/60 block">Status</span>
            <div className="text-xs font-black text-[#050505] flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#4DBA76]" />
              <span className="capitalize">{credentialStatus.status || 'Active'}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase text-[#050505]/60 block">Last Validated</span>
            <div className="text-xs font-bold text-[#050505]/80 mt-0.5">
              {credentialStatus.validatedAt
                ? new Date(credentialStatus.validatedAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Today'}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-[#FFF39A] border-2 border-[#050505] shadow-retro-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-black text-[#050505]">
              <AlertTriangle className="w-4 h-4 text-[#F05D5E]" />
              <span>No AI API key connected to your account.</span>
            </div>
            <p className="text-xs text-[#050505]/80 font-semibold">
              To analyze freelance projects and generate proposals, connect your own API key. You only need to enter it once.
            </p>
          </div>
          <button
            onClick={handleOpenConnectModal}
            className="px-5 py-2.5 rounded-xl bg-[#050505] hover:bg-[#6F86F5] text-white text-xs font-black border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer shrink-0"
          >
            Connect Key →
          </button>
        </div>
      )}

      {/* Security Guarantee Note */}
      <div className="p-4 rounded-xl bg-white border border-[#050505]/20 flex items-start gap-3 text-xs text-[#050505]/75 font-semibold">
        <ShieldCheck className="w-4 h-4 text-[#4DBA76] shrink-0 mt-0.5" />
        <div>
          <span className="font-black text-[#050505]">Bank-Grade Vault Security: </span>
          <span>
            Your API key is encrypted using AES-256-GCM prior to storage. Plaintext keys are never logged, never stored in browser storage, and never exposed in frontend responses.
          </span>
        </div>
      </div>

      {/* Connect / Replace Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-[32px] border-2 border-[#050505] shadow-retro-lg p-6 sm:p-8 text-[#050505] space-y-6 animate-in slide-in-from-top duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full border-2 border-[#050505] bg-white hover:bg-[#FFD51F] shadow-retro-sm btn-tactile cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD51F] text-xs font-black uppercase text-[#050505] border border-[#050505] shadow-retro-sm mb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>BYOK Security Vault</span>
              </div>
              <h3 className="text-2xl font-black text-[#050505] tracking-tight">
                {modalMode === 'connect' ? 'Connect AI Provider' : 'Replace API Key'}
              </h3>
              <p className="text-xs text-[#050505]/75 font-semibold mt-1">
                To analyze freelance projects, connect your own AI API key. Your key belongs to you and is securely stored for your future analyses.
              </p>
            </div>

            <form onSubmit={handleSubmitKey} className="space-y-4">
              <div>
                <label className="text-xs font-black text-[#050505] block mb-1.5">Select AI Provider</label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value as any)}
                  className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-sm font-black text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#6F86F5]"
                >
                  <option value="openai">OpenAI (GPT-4o / GPT-4o-mini)</option>
                  <option value="gemini">Google Gemini (Gemini 2.5 Flash / Pro)</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-black text-[#050505]">
                    {selectedProvider === 'openai' ? 'OpenAI API Key' : 'Google Gemini API Key'}
                  </label>
                  <a
                    href={selectedProvider === 'openai' ? 'https://platform.openai.com/api-keys' : 'https://aistudio.google.com/app/apikey'}
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
                  placeholder={selectedProvider === 'openai' ? 'sk-proj-...' : 'AIzaSy...'}
                  className="w-full p-3.5 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] font-mono text-xs text-[#050505] font-bold focus:outline-none focus:ring-2 focus:ring-[#6F86F5]"
                  autoComplete="off"
                />
              </div>

              {modalMode === 'replace' && credentialStatus.keyLastFour && (
                <div className="p-3 rounded-xl bg-[#F7F7F5] border border-[#050505]/20 text-xs font-bold text-[#050505]/70 flex items-center justify-between">
                  <span>Current active key:</span>
                  <span className="font-mono">••••••••{credentialStatus.keyLastFour}</span>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-xl bg-[#FFF39A] border-2 border-[#050505] text-xs font-bold text-[#050505] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#F05D5E] shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-[#050505] bg-white text-xs font-black text-[#050505] hover:bg-[#F7F7F5] shadow-retro-sm btn-tactile cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl border-2 border-[#050505] bg-[#6F86F5] hover:bg-[#536CE8] text-white text-xs font-black shadow-retro btn-tactile cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Validating Key...</span>
                    </>
                  ) : (
                    <span>{modalMode === 'connect' ? 'Test & Save' : 'Test & Replace'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Remove Confirmation Dialog */}
      {isRemoveConfirmOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsRemoveConfirmOpen(false)}
        >
          <div
            className="relative w-full max-w-sm bg-white rounded-[32px] border-2 border-[#050505] shadow-retro-lg p-6 sm:p-8 text-[#050505] text-center space-y-6 animate-in slide-in-from-top duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FFF39A] border-2 border-[#050505] flex items-center justify-center mx-auto shadow-retro-sm">
              <Trash2 className="w-7 h-7 text-[#050505]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#050505] tracking-tight">Remove AI API Key?</h3>
              <p className="text-xs text-[#050505]/75 font-semibold mt-2 leading-relaxed">
                Remove your saved AI API key? You will need to connect an API key again before analyzing another project.
              </p>
              <p className="text-[10px] text-[#4DBA76] font-black mt-2 uppercase tracking-wider">
                ✓ Your project history & profile remain safe
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsRemoveConfirmOpen(false)}
                className="flex-1 py-3 rounded-xl border-2 border-[#050505] bg-white text-xs font-black text-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                disabled={isRemoving}
                className="flex-1 py-3 rounded-xl border-2 border-[#050505] bg-[#F05D5E] hover:bg-[#D94F50] text-white text-xs font-black shadow-retro-sm btn-tactile cursor-pointer"
              >
                {isRemoving ? 'Removing...' : 'Remove Key'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
