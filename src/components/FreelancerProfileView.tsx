import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Plus,
  Trash2,
  Save,
  Check,
  ExternalLink,
  Sparkles,
  LogOut,
  X,
  Edit2,
  UserCheck,
} from 'lucide-react';
import { FreelancerProfile, FreelancerSkill, AICredentialStatus } from '../types';
import { AICredentialSection } from './AICredentialSection';
import { toast } from 'sonner';

import { UserAvatar } from './UserAvatar';

const AVATAR_SEEDS = [
  'alex-chen-01',
  'alex-chen-02',
  'alex-chen-03',
  'alex-chen-04',
  'alex-chen-05',
  'alex-chen-06',
];

interface FreelancerProfileViewProps {
  profile: FreelancerProfile;
  onUpdateProfile: (updated: FreelancerProfile) => void;
  onNavigateToAnalyze: () => void;
  onLogout?: () => void;
  credentialStatus?: AICredentialStatus;
  onRefreshCredentialStatus?: () => void;
}

export const FreelancerProfileView: React.FC<FreelancerProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onNavigateToAnalyze,
  onLogout,
  credentialStatus = { connected: false },
  onRefreshCredentialStatus = () => {},
}) => {
  const [formData, setFormData] = useState<FreelancerProfile>(profile);
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Intermediate' | 'Advanced' | 'Expert'>('Advanced');
  const [isSaved, setIsSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Sync formData when profile changes externally
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsSaved(true);
    toast.success('Profile Updated Successfully ✓');
    setTimeout(() => setIsSaved(false), 2000);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
    toast.info('Unsaved changes discarded');
  };

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;

    // Check for duplicates (normalized comparison)
    const exists = formData.skills.some(
      (s) => s.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (exists) {
      toast.error(`Skill "${trimmed}" is already listed.`);
      return;
    }

    const skill: FreelancerSkill = {
      name: trimmed,
      level: newSkillLevel,
      verified: true,
    };

    setFormData({
      ...formData,
      skills: [...formData.skills, skill],
    });
    setNewSkill('');
  };

  const handleRemoveSkill = (index: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[#050505]">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#050505] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#050505]/70">
            <span>Opportunity Intelligence Engine</span>
            <span>•</span>
            <span className="text-[#4DBA76] font-black">Profile Ground Truth</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#050505] tracking-tight mt-1">
            Freelancer Truth Profile
          </h1>
          <p className="text-sm text-[#050505]/75 font-semibold mt-1">
            AI uses this factual foundation to evaluate project match scores, estimate pricing, and write truth-checked proposals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-[#F05D5E] hover:text-white text-[#050505] font-black text-xs border-2 border-[#050505] shadow-retro btn-tactile transition-all cursor-pointer"
              title="Log out and return to home page"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          )}

          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-[#F7F7F5] text-[#050505] font-black text-xs border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#4DBA76] hover:bg-[#3FA665] text-white font-black text-xs border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaved ? 'Saved!' : 'Save Changes'}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#6F86F5] hover:bg-[#536CE8] text-white font-black text-sm border-2 border-[#050505] shadow-retro btn-tactile cursor-pointer"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* AI Provider BYOK Credential Section */}
      <AICredentialSection
        credentialStatus={credentialStatus}
        onRefreshStatus={onRefreshCredentialStatus}
      />

      {/* Completion & Opportunity Fit Card */}
      <div className="p-6 sm:p-8 rounded-[32px] bg-white border-2 border-[#050505] shadow-retro flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <UserAvatar
              seed={formData.name || 'freelanceos-user'}
              avatarId={formData.avatarUrl || formData.name}
              size={80}
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#4DBA76] text-white flex items-center justify-center text-xs font-black border border-[#050505]">
              <Check className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-[#050505]">{formData.name}</h2>
              <span className="px-3 py-0.5 rounded-full bg-[#FFD51F] text-[#050505] text-[10px] font-black uppercase border-2 border-[#050505] shadow-retro-sm">
                Verified Pro
              </span>
            </div>
            <p className="text-xs text-[#050505]/75 font-semibold">{formData.title}</p>
            <div className="flex items-center gap-4 mt-2 text-xs font-black text-[#050505]">
              <span>${formData.hourlyRate}/hr Standard</span>
              <span>•</span>
              <span>Min Project: ${formData.minProjectBudget}</span>
              <span>•</span>
              <span>{formData.weeklyAvailability} hrs/wk</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto p-5 rounded-2xl bg-[#FFF39A] border-2 border-[#050505] shadow-retro-sm flex items-center gap-6">
          <div>
            <span className="text-[10px] font-black uppercase text-[#050505]/70 block">Opportunity Fit</span>
            <div className="text-2xl font-black text-[#050505]">{formData.profileCompletionScore}% Strong Match</div>
          </div>
          <button
            onClick={onNavigateToAnalyze}
            className="px-4 py-2.5 rounded-xl bg-[#050505] hover:bg-[#6F86F5] text-white text-xs font-black border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer"
          >
            Scan Next Job →
          </button>
        </div>
      </div>

      {/* Avatar Selector in Edit Mode */}
      {isEditing && (
        <div className="p-6 rounded-[28px] bg-[#FFF39A] border-2 border-[#050505] shadow-retro space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-[#050505]">Select Modern Vector Avatar Style</h3>
            <span className="text-xs font-bold text-[#050505]/70">Deterministic & persisted to your account</span>
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            {AVATAR_SEEDS.map((seedItem, idx) => {
              const isSelected = formData.avatarUrl === seedItem;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, avatarUrl: seedItem })}
                  className={`relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#050505] ring-4 ring-[#6F86F5] scale-105'
                      : 'border-[#050505]/30 hover:border-[#050505] opacity-80 hover:opacity-100'
                  }`}
                >
                  <UserAvatar seed={seedItem} size={52} />
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#6F86F5]/40 flex items-center justify-center rounded-2xl">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Basic info & Skills */}
        <div className="lg:col-span-7 space-y-8">
          {/* Identity & Rate Parameters */}
          <div className="p-6 sm:p-8 rounded-[32px] bg-white border-2 border-[#050505] shadow-retro space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-[#050505]">Professional Parameters</h3>
              {!isEditing && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#F7F7F5] border border-[#050505]/20 text-[#050505]/60">
                  View Mode (Click Edit Profile to modify)
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-[#050505]/70 block mb-1">Full Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full p-3 rounded-xl border-2 border-[#050505] text-sm text-[#050505] font-bold focus:outline-none focus:ring-2 focus:ring-[#6F86F5] ${
                    isEditing ? 'bg-white' : 'bg-[#F7F7F5] cursor-not-allowed opacity-90'
                  }`}
                />
              </div>
              <div>
                <label className="text-xs font-black text-[#050505]/70 block mb-1">Professional Title</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full p-3 rounded-xl border-2 border-[#050505] text-sm text-[#050505] font-bold focus:outline-none focus:ring-2 focus:ring-[#6F86F5] ${
                    isEditing ? 'bg-white' : 'bg-[#F7F7F5] cursor-not-allowed opacity-90'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-[#050505]/70 block mb-1">Executive Summary / Bio</label>
              <textarea
                disabled={!isEditing}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className={`w-full p-3 rounded-xl border-2 border-[#050505] text-sm text-[#050505] font-medium focus:outline-none focus:ring-2 focus:ring-[#6F86F5] resize-none ${
                  isEditing ? 'bg-white' : 'bg-[#F7F7F5] cursor-not-allowed opacity-90'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-xs font-black text-[#050505]/70 block mb-1">Standard Hourly Rate</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-sm font-black text-[#050505]">$</span>
                  <input
                    disabled={!isEditing}
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                    className={`w-full p-3 pl-8 rounded-xl border-2 border-[#050505] text-sm font-black text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#6F86F5] ${
                      isEditing ? 'bg-white' : 'bg-[#F7F7F5] cursor-not-allowed opacity-90'
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-black text-[#050505]/70 block mb-1">Min Project Budget</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-sm font-black text-[#050505]">$</span>
                  <input
                    disabled={!isEditing}
                    type="number"
                    value={formData.minProjectBudget}
                    onChange={(e) => setFormData({ ...formData, minProjectBudget: Number(e.target.value) })}
                    className={`w-full p-3 pl-8 rounded-xl border-2 border-[#050505] text-sm font-black text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#6F86F5] ${
                      isEditing ? 'bg-white' : 'bg-[#F7F7F5] cursor-not-allowed opacity-90'
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-black text-[#050505]/70 block mb-1">Weekly Hours Avail.</label>
                <input
                  type="number"
                  disabled={!isEditing}
                  value={formData.weeklyAvailability}
                  onChange={(e) => setFormData({ ...formData, weeklyAvailability: Number(e.target.value) })}
                  className={`w-full p-3 rounded-xl border-2 border-[#050505] text-sm font-black text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#6F86F5] ${
                    isEditing ? 'bg-white' : 'bg-[#F7F7F5] cursor-not-allowed opacity-90'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Verified Skills Container */}
          <div className="p-6 sm:p-8 rounded-[32px] bg-[#CDB3F4] text-[#050505] border-2 border-[#050505] shadow-retro space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-[#050505]">Verified Technical Skills</h3>
                <p className="text-xs font-semibold text-[#050505]/80">Used to calculate technical fit percentages and match scores.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-white border-2 border-[#050505] text-xs font-black text-[#050505] shadow-retro-sm">
                {formData.skills.length} Skills
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {formData.skills.map((sk, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white border-2 border-[#050505] shadow-retro-sm text-xs font-black text-[#050505] flex items-center gap-2 group"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4DBA76]" />
                  <span>{sk.name}</span>
                  <span className="text-[10px] text-[#050505]/70 font-bold">({sk.level})</span>
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveSkill(idx)}
                      className="hover:text-[#F05D5E] transition-colors cursor-pointer"
                      title="Remove skill"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-[#050505]/60 hover:text-[#F05D5E]" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="pt-3 border-t-2 border-[#050505]/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  placeholder="Add skill (e.g. React, Supabase, Docker)..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  className="flex-1 p-2.5 rounded-xl bg-white border-2 border-[#050505] text-xs font-bold text-[#050505] placeholder:text-[#050505]/50 focus:outline-none"
                />
                <select
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value as any)}
                  className="p-2.5 rounded-xl bg-white border-2 border-[#050505] text-xs font-black text-[#050505]"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="p-2.5 rounded-xl bg-[#050505] text-white hover:bg-[#6F86F5] border-2 border-[#050505] shadow-retro-sm btn-tactile cursor-pointer flex items-center justify-center gap-1 font-black text-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Past Portfolio Case Studies */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-6 sm:p-8 rounded-[32px] bg-white border-2 border-[#050505] shadow-retro space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-[#050505]">Portfolio Case Studies</h3>
                <p className="text-xs text-[#050505]/70 font-semibold">Truth-checked evidence cited in proposals.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#FFD51F] border-2 border-[#050505] text-xs font-black text-[#050505] shadow-retro-sm">
                {formData.portfolio.length} Projects
              </span>
            </div>

            <div className="space-y-3">
              {formData.portfolio.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#F7F7F5] border-2 border-[#050505] shadow-retro-sm space-y-2 hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-xs text-[#050505] leading-tight">{item.title}</h4>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#6F86F5] hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-[11px] text-[#050505]/75 font-semibold leading-relaxed line-clamp-2">{item.description}</p>
                  {item.metric && (
                    <div className="p-2.5 rounded-xl bg-[#FFF39A] border border-[#050505] text-[10px] font-black text-[#050505] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#050505]" />
                      <span>{item.metric}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-lg bg-white border border-[#050505] font-black text-[#050505]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
