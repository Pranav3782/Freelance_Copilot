import React, { useState, useEffect } from 'react';
import {
  Clock,
  Send,
  Sparkles,
  Plus,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  User,
  Copy,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Tag,
  Briefcase,
} from 'lucide-react';
import {
  ProjectAnalysis,
  OpportunityOutreachSummary,
  OutreachChannel,
  OutreachEventType,
  OutreachOutcome,
} from '../types';
import { fetchOpportunityOutreach, logContactInteraction, generateAIFollowUpMessage } from '../lib/api';
import { toast } from 'sonner';

interface ClientFollowUpSectionProps {
  project: ProjectAnalysis;
  onRefreshParent?: () => void;
}

export const ClientFollowUpSection: React.FC<ClientFollowUpSectionProps> = ({
  project,
  onRefreshParent,
}) => {
  const [summary, setSummary] = useState<OpportunityOutreachSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Log Contact Modal State
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logType, setLogType] = useState<OutreachEventType>('Follow-up');
  const [logChannel, setLogChannel] = useState<OutreachChannel>('Email');
  const [logOutcome, setLogOutcome] = useState<OutreachOutcome>('No Response');
  const [logNotes, setLogNotes] = useState('');
  const [logNextDate, setLogNextDate] = useState('');
  const [isSubmittingLog, setIsSubmittingLog] = useState(false);

  // AI Follow-up Message Generator State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiChannel, setAiChannel] = useState<OutreachChannel>('Email');
  const [aiInstructions, setAiInstructions] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const loadSummary = async () => {
    setIsLoading(true);
    try {
      const data = await fetchOpportunityOutreach(project.id);
      setSummary(data);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, [project.id]);

  const handleOpenLogModal = (defaultType?: OutreachEventType) => {
    if (defaultType) setLogType(defaultType);
    setLogNotes('');
    setLogNextDate('');
    setIsLogModalOpen(true);
  };

  const handleLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLog(true);

    try {
      const res = await logContactInteraction({
        projectId: project.id,
        type: logType,
        channel: logChannel,
        outcome: logOutcome,
        notes: logNotes.trim(),
        nextFollowUpDate: logNextDate ? new Date(logNextDate).toISOString() : null,
      });

      if (res.success && res.summary) {
        setSummary(res.summary);
        toast.success(`Logged Event #${res.summary.events.length} ✓`, {
          description: `Outreach interaction saved for ${res.summary.client.name}.`,
        });
        setIsLogModalOpen(false);
        if (onRefreshParent) onRefreshParent();
      } else {
        toast.error(res.error || 'Failed to log contact interaction.');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Error saving interaction.');
    } finally {
      setIsSubmittingLog(false);
    }
  };

  const handleGenerateAiMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGeneratingAi(true);
    setGeneratedMessage('');
    setAiRecommendation('');

    try {
      const res = await generateAIFollowUpMessage(project.id, aiChannel, aiInstructions.trim());
      if (res.error && (res.code === 'AI_CREDENTIAL_REQUIRED' || res.code === 'INVALID_CREDENTIAL')) {
        toast.error('AI API Key Required', { description: res.error });
        setIsGeneratingAi(false);
        return;
      }
      setGeneratedMessage(res.message || '');
      setAiRecommendation(res.recommendation || '');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to generate message.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleCopyMessage = () => {
    if (!generatedMessage) return;
    navigator.clipboard.writeText(generatedMessage);
    setIsCopied(true);
    toast.success('Message Copied to Clipboard! 📋');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const clientName = summary?.client?.name || project.clientIntelligence?.companyName || 'Opportunity Client';
  const clientCompany = summary?.client?.company || project.clientIntelligence?.companyName || 'Direct Client';
  const totalAttempts = summary?.opportunity?.totalContactAttempts || summary?.events?.length || 0;
  const lastContactMethod = summary?.opportunity?.lastContactMethod || 'N/A';
  const nextFollowUpAt = summary?.opportunity?.nextFollowUpAt;
  const currentStatus = summary?.opportunity?.currentFollowUpStatus || 'Waiting for Reply';

  return (
    <div className="p-4 sm:p-6 md:p-8 rounded-[28px] sm:rounded-[32px] bg-white border-2 border-[#050505] shadow-retro space-y-5 sm:space-y-6 text-[#050505] w-full max-w-full overflow-hidden">
      {/* Header & Status Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#050505]/15 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#4DCA85] border-2 border-[#050505] shadow-retro-sm flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#050505]" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-[#050505]">Client Follow-up & Outreach</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFD51F] text-[#050505] text-[10px] font-black uppercase border border-[#050505] shadow-retro-sm">
                {currentStatus}
              </span>
            </div>
            <p className="text-xs text-[#050505]/75 font-semibold mt-0.5">
              Chronological contact history and next recommended actions for <span className="font-black text-[#050505]">{clientName}</span>.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              setIsAiModalOpen(true);
              if (!generatedMessage) handleGenerateAiMessage();
            }}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#6F86F5] hover:bg-[#536CE8] text-white text-xs font-black border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Generate Message</span>
          </button>

          <button
            onClick={() => handleOpenLogModal()}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#FFD51F] hover:bg-[#E5BE10] text-[#050505] text-xs font-black border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Log Contact</span>
          </button>
        </div>
      </div>

      {/* Summary Info Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] shadow-retro-sm text-xs">
        <div>
          <span className="text-[10px] font-black uppercase text-[#050505]/60 block">Client & Company</span>
          <div className="font-black text-[#050505] text-sm mt-0.5 truncate">{clientCompany}</div>
        </div>

        <div>
          <span className="text-[10px] font-black uppercase text-[#050505]/60 block">Contact Attempts</span>
          <div className="font-black text-[#050505] text-sm mt-0.5 flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-[#6F86F5]/20 text-[#6F86F5] font-mono border border-[#050505]/20">
              #{totalAttempts}
            </span>
            <span>attempts</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-black uppercase text-[#050505]/60 block">Last Contact Method</span>
          <div className="font-black text-[#050505] text-xs mt-1 flex items-center gap-1">
            <Send className="w-3.5 h-3.5 text-[#050505]/70" />
            <span>{lastContactMethod}</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-black uppercase text-[#050505]/60 block">Next Follow-up</span>
          <div className="font-black text-xs mt-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#050505]/70" />
            <span>
              {nextFollowUpAt
                ? new Date(nextFollowUpAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                : 'Not Scheduled'}
            </span>
          </div>
        </div>
      </div>

      {/* Chronological Outreach Timeline */}
      <div className="space-y-4 pt-2">
        <h4 className="text-sm font-black text-[#050505] uppercase tracking-wider flex items-center gap-2">
          <span>Contact History Timeline</span>
          <span className="px-2 py-0.5 rounded-full bg-[#050505] text-white text-[10px]">
            {summary?.events?.length || 0} events
          </span>
        </h4>

        {isLoading ? (
          <div className="p-8 text-center text-xs font-bold text-[#050505]/60 animate-pulse">
            Loading contact history...
          </div>
        ) : !summary?.events || summary.events.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#FFF39A]/50 border-2 border-dashed border-[#050505]/30 text-center space-y-3">
            <MessageSquare className="w-8 h-8 text-[#050505]/40 mx-auto" />
            <div>
              <p className="text-xs font-black text-[#050505]">No outreach logged yet.</p>
              <p className="text-[11px] text-[#050505]/75 font-semibold mt-0.5">
                Log your first message or proposal sent to initialize tracking.
              </p>
            </div>
            <button
              onClick={() => handleOpenLogModal('Initial Contact')}
              className="px-4 py-2 rounded-xl bg-[#050505] text-white text-xs font-black shadow-retro-sm btn-tactile cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Initial Contact</span>
            </button>
          </div>
        ) : (
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#050505]/20">
            {summary.events.map((evt) => (
              <div key={evt.id} className="relative flex items-start gap-4 group">
                <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#FFD51F] border-2 border-[#050505] flex items-center justify-center text-[9px] font-black font-mono">
                  {evt.sequenceNumber}
                </div>

                <div className="flex-1 p-4 rounded-2xl bg-white border-2 border-[#050505] shadow-retro-sm space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#050505]/10 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#050505]">
                        #{evt.sequenceNumber} {evt.type}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#F7F7F5] border border-[#050505]/20 text-[10px] font-bold text-[#050505]">
                        via {evt.channel}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold text-[#050505]/60">
                      {new Date(evt.occurredAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {evt.notes && (
                    <p className="text-xs text-[#050505]/85 font-semibold bg-[#F7F7F5] p-2.5 rounded-xl border border-[#050505]/10">
                      "{evt.notes}"
                    </p>
                  )}

                  <div className="flex items-center justify-between text-[11px] font-bold pt-1">
                    <div className="flex items-center gap-1.5 text-[#050505]/70">
                      <span>Outcome:</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#6F86F5]/10 text-[#6F86F5] font-black border border-[#6F86F5]/20">
                        {evt.outcome || 'No Response'}
                      </span>
                    </div>

                    {evt.nextFollowUpDate && (
                      <div className="flex items-center gap-1 text-[#4DBA76] font-black">
                        <Calendar className="w-3 h-3" />
                        <span>
                          Next: {new Date(evt.nextFollowUpDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal 1: Log Contact Interaction */}
      {isLogModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsLogModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-[32px] border-2 border-[#050505] shadow-retro-lg p-6 sm:p-8 text-[#050505] space-y-6 animate-in slide-in-from-top duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsLogModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full border-2 border-[#050505] bg-white hover:bg-[#FFD51F] shadow-retro-sm btn-tactile cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD51F] text-xs font-black uppercase text-[#050505] border border-[#050505] shadow-retro-sm mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Sequence Event #{totalAttempts + 1}</span>
              </div>
              <h3 className="text-2xl font-black text-[#050505] tracking-tight">Log Client Interaction</h3>
              <p className="text-xs text-[#050505]/75 font-semibold mt-1">
                Record outreach activity with <span className="font-black text-[#050505]">{clientName}</span>.
              </p>
            </div>

            <form onSubmit={handleLogSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-[#050505] block mb-1">Interaction Type</label>
                  <select
                    value={logType}
                    onChange={(e) => setLogType(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-black text-[#050505]"
                  >
                    <option value="Initial Contact">Initial Contact</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Client Replied">Client Replied</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Pricing Discussion">Pricing Discussion</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Final Follow-up">Final Follow-up</option>
                    <option value="Won">Won (Hired)</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-[#050505] block mb-1">Contact Method</label>
                  <select
                    value={logChannel}
                    onChange={(e) => setLogChannel(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-black text-[#050505]"
                  >
                    <option value="Freelancer">Freelancer Platform Chat</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Website Form">Website Form</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-[#050505] block mb-1">Outcome</label>
                <select
                  value={logOutcome}
                  onChange={(e) => setLogOutcome(e.target.value as any)}
                  className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-black text-[#050505]"
                >
                  <option value="No Response">No Response</option>
                  <option value="Replied">Replied</option>
                  <option value="Interested">Interested</option>
                  <option value="Not Interested">Not Interested</option>
                  <option value="Asked Information">Asked for Portfolio/Info</option>
                  <option value="Requested Proposal">Requested Proposal</option>
                  <option value="Requested Call">Requested Call</option>
                  <option value="Negotiating">Negotiating Price</option>
                  <option value="Won">Won Project</option>
                  <option value="Lost">Lost Project</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black text-[#050505] block mb-1">Notes / Key Details</label>
                <textarea
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                  placeholder="e.g. Client liked portfolio, requested milestone proposal by Friday..."
                  className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-bold text-[#050505] min-h-[80px]"
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#050505] block mb-1">Schedule Next Follow-up (Optional)</label>
                <input
                  type="date"
                  value={logNextDate}
                  onChange={(e) => setLogNextDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-bold text-[#050505]"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-[#050505] bg-white text-xs font-black text-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingLog}
                  className="flex-1 py-3 rounded-xl border-2 border-[#050505] bg-[#FFD51F] hover:bg-[#E5BE10] text-[#050505] text-xs font-black shadow-retro btn-tactile cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmittingLog ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving Event...</span>
                    </>
                  ) : (
                    <span>Save Event #{totalAttempts + 1}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: AI Follow-up Message Generator */}
      {isAiModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsAiModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-[32px] border-2 border-[#050505] shadow-retro-lg p-6 sm:p-8 text-[#050505] space-y-6 animate-in slide-in-from-top duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAiModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full border-2 border-[#050505] bg-white hover:bg-[#FFD51F] shadow-retro-sm btn-tactile cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6F86F5] text-white text-xs font-black uppercase border border-[#050505] shadow-retro-sm mb-2">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Grounded AI Outreach Assistant</span>
              </div>
              <h3 className="text-2xl font-black text-[#050505] tracking-tight">Generate AI Follow-up Message</h3>
              <p className="text-xs text-[#050505]/75 font-semibold mt-1">
                Reads actual stored contact history for <span className="font-black text-[#050505]">{clientName}</span> without hallucinating facts.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-[#050505] block mb-1">Target Channel</label>
                  <select
                    value={aiChannel}
                    onChange={(e) => setAiChannel(e.target.value as any)}
                    className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-black text-[#050505]"
                  >
                    <option value="Email">Email</option>
                    <option value="Freelancer">Freelancer Platform Chat</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Phone">Phone Script</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-[#050505] block mb-1">Custom Tone / Focus (Optional)</label>
                  <input
                    type="text"
                    value={aiInstructions}
                    onChange={(e) => setAiInstructions(e.target.value)}
                    placeholder="e.g. Keep short, friendly, focus on milestone delivery..."
                    className="w-full p-3 rounded-xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-bold text-[#050505]"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateAiMessage}
                disabled={isGeneratingAi}
                className="w-full py-3 rounded-xl bg-[#6F86F5] hover:bg-[#536CE8] text-white text-xs font-black border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer flex items-center justify-center gap-2"
              >
                {isGeneratingAi ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Reading History & Generating Message...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Regenerate Message</span>
                  </>
                )}
              </button>

              {aiRecommendation && (
                <div className="p-3.5 rounded-xl bg-[#FFF39A] border-2 border-[#050505] text-xs font-bold text-[#050505] flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#050505] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black">AI Timing Suggestion: </span>
                    <span>{aiRecommendation}</span>
                  </div>
                </div>
              )}

              {generatedMessage ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-[#050505]">Generated Message</label>
                    <button
                      onClick={handleCopyMessage}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#F7F7F5] border-2 border-[#050505] text-xs font-black text-[#050505] shadow-retro-sm btn-tactile cursor-pointer flex items-center gap-1.5"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-[#4DBA76]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied!' : 'Copy Text'}</span>
                    </button>
                  </div>

                  <textarea
                    value={generatedMessage}
                    onChange={(e) => setGeneratedMessage(e.target.value)}
                    className="w-full p-4 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] text-xs font-mono font-bold text-[#050505] min-h-[160px] focus:outline-none"
                  />
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-[#F7F7F5] border-2 border-dashed border-[#050505]/20 text-center text-xs font-bold text-[#050505]/60">
                  Click "Regenerate Message" to produce a grounded message based on stored history.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
