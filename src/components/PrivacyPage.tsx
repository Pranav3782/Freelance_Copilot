import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { FadeIn } from './MotionWrappers';

interface PrivacyPageProps {
  onBack?: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  const sections = [
    {
      id: "information-you-provide",
      title: "1. Information You Provide",
      content: "The platform may receive information users intentionally provide, such as your name, email, freelancer profile details, skills, experience, portfolio links, project descriptions, uploaded screenshots or files, proposals, and application tracking information."
    },
    {
      id: "ai-processing",
      title: "2. Information Used for AI Analysis",
      content: "Project information may be processed to understand project requirements, compare projects with your freelancer profile, generate insights, create proposals, identify potential risks, and estimate pricing ranges."
    },
    {
      id: "public-information",
      title: "3. Public Information",
      content: "If the platform processes legitimately accessible public business information, it should identify the source where practical and avoid presenting uncertain information as fact. We do not claim unrestricted access to social networks, LinkedIn, or private databases."
    },
    {
      id: "how-we-use",
      title: "4. How We Use Information",
      content: "We use the information to provide the service, analyze freelance projects, personalize recommendations, improve user experience, maintain platform security, and communicate important service information."
    },
    {
      id: "not-collected",
      title: "5. Information We Don't Intend to Collect",
      content: "The product should not intentionally seek passwords from third-party platforms, private social media information, hidden or private contact information, or sensitive personal information that isn't needed for the platform's core functions."
    },
    {
      id: "third-party",
      title: "6. Third-Party Services",
      content: "Future or actual integrations may involve third-party providers to enhance functionality. Any data shared with these providers will be limited to what is strictly necessary for those specific integrations."
    },
    {
      id: "data-security",
      title: "7. Data Security",
      content: "We use reasonable technical and organizational measures to protect your information, while acknowledging that no absolute promise of perfect security can be made for any internet-connected service."
    },
    {
      id: "data-retention",
      title: "8. Data Retention",
      content: "Information should only be retained as long as reasonably necessary for the relevant service or business purpose, subject to applicable requirements."
    },
    {
      id: "your-choices",
      title: "9. Your Choices",
      content: "You have options regarding your information, including reviewing information, updating profile information, requesting account-related assistance, and deleting your account where supported."
    },
    {
      id: "contact",
      title: "10. Contact",
      content: "Have a privacy question? Contact the platform using the official support or contact method provided by the website."
    }
  ];

  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="pt-8 pb-20 bg-[#F7F7F5] min-h-screen">
      {/* Top Back to Home Navigation */}
      {onBack && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border-2 border-[#050505] hover:bg-[#FFD51F] text-[#050505] font-black text-xs shadow-retro-sm btn-tactile cursor-pointer transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      )}

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <FadeIn direction="up">
          <span className="px-4 py-1.5 rounded-full bg-[#E747A8] text-white text-xs font-black uppercase tracking-wider border-2 border-[#050505] shadow-[2px_2px_0px_#050505] inline-block mb-6">
            Privacy
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#050505] mb-6">
            Your information deserves to be handled carefully.
          </h1>
          <p className="text-xl font-bold text-[#050505]/70 leading-relaxed max-w-2xl mx-auto mb-6">
            Here's a simple explanation of how information may be used when you use the platform.
          </p>
          <p className="text-sm font-black text-[#050505]/50 uppercase tracking-widest">
            Last updated: {currentDate}
          </p>
        </FadeIn>
      </section>

      {/* CONTENT WITH SIDEBAR */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Important Disclaimer */}
        <div className="mb-12 max-w-4xl mx-auto">
          <FadeIn direction="up">
            <div className="bg-[#CDB3F4] rounded-2xl border-4 border-[#050505] shadow-[6px_6px_0px_#050505] p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FFF39A] border-2 border-[#050505] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#050505]" />
              </div>
              <div>
                <p className="text-[#050505] font-black text-lg">
                  This page is written in simple language to make our approach easier to understand. It does not replace professional legal advice.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-start relative max-w-5xl mx-auto">
          
          {/* Sticky Sidebar */}
          <div className="hidden md:block w-64 shrink-0 sticky top-32">
            <div className="bg-white rounded-2xl border-4 border-[#050505] shadow-[4px_4px_0px_#050505] p-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#050505]/50 mb-4">Contents</h3>
              <ul className="space-y-3">
                {sections.map((s, idx) => (
                  <li key={idx}>
                    <a href={`#${s.id}`} className="text-sm font-bold text-[#050505]/70 hover:text-[#6F86F5] transition-colors line-clamp-1">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-12 pb-24">
            {sections.map((section, idx) => (
              <div key={idx} id={section.id} className="scroll-mt-32">
                <h2 className="text-2xl sm:text-3xl font-black text-[#050505] mb-4">
                  {section.title}
                </h2>
                <p className="text-lg font-medium text-[#050505]/80 leading-relaxed">
                  {section.content}
                </p>
                {idx !== sections.length - 1 && (
                  <div className="mt-12 h-0.5 w-full bg-[#050505]/10 rounded-full" />
                )}
              </div>
            ))}

            {/* Contact Card */}
            <div className="mt-16 bg-[#FFF39A] rounded-2xl border-4 border-[#050505] shadow-[6px_6px_0px_#050505] p-8 text-center">
              <h3 className="text-2xl font-black text-[#050505] mb-2">Have a privacy question?</h3>
              <p className="text-base font-bold text-[#050505]/80">
                Contact the platform using the official support/contact method provided by the website.
              </p>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
