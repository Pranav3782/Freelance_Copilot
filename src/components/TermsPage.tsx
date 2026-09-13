import React from 'react';
import { AlertTriangle, Info, ArrowLeft } from 'lucide-react';
import { FadeIn } from './MotionWrappers';

interface TermsPageProps {
  onBack?: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const sections = [
    {
      id: "using",
      title: "1. Using the Platform",
      content: "Users are responsible for providing accurate information, maintaining account security, using the platform lawfully, and reviewing AI-generated information before relying on it."
    },
    {
      id: "ai-assistance",
      title: "2. AI Is an Assistant",
      content: "AI-generated match scores, pricing suggestions, risk assessments, project interpretations, proposals, and recommendations are estimates or assistance and should be independently reviewed."
    },
    {
      id: "no-guarantees",
      title: "3. No Guaranteed Outcomes",
      content: "The platform does not guarantee that a freelancer will win a project, receive a response, get an interview, be hired, receive a particular price, or achieve a particular business outcome."
    },
    {
      id: "pricing",
      title: "4. Pricing Estimates",
      content: "Pricing Intelligence provides estimates based on available information. It is not a guaranteed market rate or professional financial advice."
    },
    {
      id: "public-info",
      title: "5. Public Information",
      content: "Where public information is used, users should understand that information may be incomplete, outdated, or inaccurate."
    },
    {
      id: "user-content",
      title: "6. User Content",
      content: "Users remain responsible for the project descriptions, profile information, portfolio information, and other content they provide."
    },
    {
      id: "generated-content",
      title: "7. Proposals and Generated Content",
      content: "Users should review AI-generated proposals before sending them. The Truth Checker is designed to reduce false claims, but users remain responsible for the final communication they send."
    },
    {
      id: "third-party",
      title: "8. Third-Party Platforms",
      content: "The platform does not depend on unauthorized scraping of freelance marketplaces. Any future integrations should use official APIs, permissions, or other authorized methods where applicable."
    },
    {
      id: "prohibited",
      title: "9. Prohibited Use",
      content: "Prohibited activities include unlawful use, abuse, attempting to access unauthorized information, malicious activity, and misuse of the service."
    },
    {
      id: "availability",
      title: "10. Service Availability",
      content: "The platform may change, update, suspend, or discontinue features. Uninterrupted availability cannot be guaranteed."
    },
    {
      id: "liability",
      title: "11. Limitation of Liability",
      content: "[Insert legally reviewed limitation-of-liability terms appropriate for the business's jurisdiction.]"
    },
    {
      id: "changes",
      title: "12. Changes to Terms",
      content: "These terms may be updated from time to time, and users should review the latest version."
    },
    {
      id: "contact",
      title: "13. Contact",
      content: "Questions about these terms? Contact us through the official contact method provided on the platform."
    }
  ];

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
          <span className="px-4 py-1.5 rounded-full bg-[#6F86F5] text-white text-xs font-black uppercase tracking-wider border-2 border-[#050505] shadow-[2px_2px_0px_#050505] inline-block mb-6">
            Terms & Conditions
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#050505] mb-6">
            The simple version of our terms.
          </h1>
          <p className="text-xl font-bold text-[#050505]/70 leading-relaxed max-w-2xl mx-auto mb-6">
            These terms explain the basic rules for using the platform.
          </p>
          <p className="text-sm font-black text-[#050505]/50 uppercase tracking-widest">
            Last updated: {currentDate}
          </p>
        </FadeIn>
      </section>

      {/* CONTENT WITH SIDEBAR */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Important Notice */}
        <div className="mb-12 max-w-4xl mx-auto">
          <FadeIn direction="up">
            <div className="bg-[#FFD51F] rounded-2xl border-4 border-[#050505] shadow-[6px_6px_0px_#050505] p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-[#050505] flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-[#050505]" />
              </div>
              <div>
                <p className="text-[#050505] font-black text-lg">
                  <span className="uppercase mr-2">Important:</span>
                  These terms should be reviewed and finalized for the actual business, jurisdiction and legal structure before the platform is launched publicly.
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
                
                {/* Special styling for AI Assistant section */}
                {section.id === "ai-assistance" ? (
                  <div className="bg-[#6F86F5] text-white rounded-2xl border-4 border-[#050505] shadow-[6px_6px_0px_#050505] p-6 md:p-8 mt-4">
                    <h3 className="text-xl md:text-2xl font-black mb-4">
                      AI helps you decide. It doesn't decide for you.
                    </h3>
                    <p className="font-semibold text-white/90 text-lg leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ) : (
                  <p className="text-lg font-medium text-[#050505]/80 leading-relaxed">
                    {section.content}
                  </p>
                )}

                {idx !== sections.length - 1 && (
                  <div className="mt-12 h-0.5 w-full bg-[#050505]/10 rounded-full" />
                )}
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
