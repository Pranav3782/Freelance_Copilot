import React, { useState } from 'react';
import { ArrowLeft, Mail, Send, CheckCircle2, AlertCircle, Copy, Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface ContactPageProps {
  onBack: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const OFFICIAL_EMAIL = 'surya.nallagonda123@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(OFFICIAL_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Frontend Validation
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      toast.error('Please enter your name.');
      return;
    }

    if (!trimmedEmail || !validateEmail(trimmedEmail)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!trimmedMessage) {
      toast.error('Please enter your message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        toast.success("Message sent successfully. Thanks for reaching out. We'll get back to you soon.");
        // Reset form
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const errorMsg = data.message || data.error || "Couldn't send your message. Please try again.";
        toast.error(errorMsg);
      }
    } catch {
      toast.error(`Couldn't send your message. Please try again or email us directly at ${OFFICIAL_EMAIL}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#050505] pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back to Home Button */}
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border-2 border-[#050505] hover:bg-[#FFD51F] text-[#050505] font-black text-xs shadow-retro-sm btn-tactile cursor-pointer transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            ← Back to Home
          </button>
        </div>

        {/* Page Title & Description */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF39A] border-2 border-[#050505] shadow-retro-sm text-xs font-black uppercase tracking-wider text-[#050505]">
            <Mail className="w-3.5 h-3.5" />
            Support & Inquiry
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#050505] tracking-tight">Contact Us</h1>
          <p className="text-base sm:text-lg font-semibold text-[#050505]/80 leading-relaxed">
            Have a question, feedback, or need help? Send us a message.
          </p>
        </div>

        {/* Direct Email Card */}
        <div className="p-6 rounded-3xl bg-white border-3 border-[#050505] shadow-retro flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#6F86F5] text-white flex items-center justify-center border-2 border-[#050505] shadow-retro-sm shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-[#050505]/60 block">Email us</span>
              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="font-black text-base sm:text-lg text-[#050505] hover:text-[#6F86F5] hover:underline transition-colors"
              >
                {OFFICIAL_EMAIL}
              </a>
            </div>
          </div>

          <button
            onClick={handleCopyEmail}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#FFF39A] hover:bg-[#FFD51F] text-[#050505] border-2 border-[#050505] shadow-retro-sm font-black text-xs flex items-center justify-center gap-2 btn-tactile cursor-pointer"
          >
            {copiedEmail ? <Check className="w-4 h-4 text-[#4DBA76]" /> : <Copy className="w-4 h-4" />}
            {copiedEmail ? 'Copied Email' : 'Copy Email'}
          </button>
        </div>

        {/* Contact Form Card */}
        <div className="p-6 sm:p-10 rounded-[32px] bg-white border-3 border-[#050505] shadow-retro-lg space-y-6">
          <h2 className="text-xl font-black text-[#050505]">Send a Direct Message</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="block text-xs font-black uppercase text-[#050505]">
                Name <span className="text-[#F05D5E]">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                disabled={isSubmitting}
                className="w-full px-4 py-3.5 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] text-sm font-bold text-[#050505] placeholder-[#050505]/40 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#6F86F5] transition-all"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="block text-xs font-black uppercase text-[#050505]">
                Email Address <span className="text-[#F05D5E]">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                disabled={isSubmitting}
                className="w-full px-4 py-3.5 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] text-sm font-bold text-[#050505] placeholder-[#050505]/40 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#6F86F5] transition-all"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="block text-xs font-black uppercase text-[#050505]">
                Message <span className="text-[#F05D5E]">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                disabled={isSubmitting}
                maxLength={2000}
                className="w-full px-4 py-3.5 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] text-sm font-bold text-[#050505] placeholder-[#050505]/40 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#6F86F5] transition-all resize-y"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-[#6F86F5] hover:bg-[#536CE8] disabled:bg-[#050505]/40 text-white font-black text-sm border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
