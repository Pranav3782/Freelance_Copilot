import { auth } from './firebase';
import {
  AICredentialStatus,
  ProjectAnalysis,
  FreelancerProfile,
  OpportunityOutreachSummary,
  OutreachMetrics,
  OutreachEvent,
  FollowUpItem,
  OutreachChannel,
  OutreachEventType,
  OutreachOutcome,
} from '../types';

export async function getAuthHeader(): Promise<Record<string, string>> {
  const currentUser = auth.currentUser;
  if (!currentUser) return {};
  try {
    const token = await currentUser.getIdToken();
    return { Authorization: `Bearer ${token}` };
  } catch (err) {
    console.warn('[API] Failed to retrieve auth ID token:', err);
    return {};
  }
}

export async function fetchAICredentialStatus(): Promise<AICredentialStatus> {
  const headers = await getAuthHeader();
  try {
    const res = await fetch('/api/ai-credentials/status', {
      headers: { ...headers },
    });
    const contentType = res.headers.get('content-type') || '';
    if (!res.ok || !contentType.includes('application/json')) {
      return { connected: false };
    }
    return await res.json();
  } catch (err) {
    console.warn('[API] Error fetching credential status:', err);
    return { connected: false };
  }
}

export async function validateAICredential(
  provider: string = 'gemini',
  apiKey: string
): Promise<{ valid: boolean; message?: string; error?: string; code?: string }> {
  const headers = await getAuthHeader();
  try {
    const res = await fetch('/api/ai-credentials/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({ provider, apiKey }),
    });
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return { valid: false, message: 'Server returned invalid response.', error: 'Server returned invalid response.' };
    }
    const data = await res.json();
    if (!res.ok || !data.valid) {
      return {
        valid: false,
        message: data.message || 'The Gemini API key is invalid or cannot be authenticated.',
        error: data.message || 'Failed to validate API key.',
        code: data.code,
      };
    }
    return { valid: true, message: data.message || 'Gemini API key is valid' };
  } catch (err: any) {
    return { valid: false, message: err?.message || 'Could not reach Gemini. Please try again.', error: err?.message || 'Network error.' };
  }
}

export async function testAICredential(provider: string = 'gemini', apiKey: string): Promise<{ valid: boolean; error?: string }> {
  const res = await validateAICredential(provider, apiKey);
  return { valid: res.valid, error: res.message || res.error };
}

export async function saveAICredential(provider: string = 'gemini', apiKey: string): Promise<{ success: boolean; data?: AICredentialStatus; error?: string }> {
  const headers = await getAuthHeader();
  try {
    const res = await fetch('/api/ai-credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({ provider, apiKey }),
    });
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return { success: false, error: 'Server returned invalid response.' };
    }
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.message || data.error || 'Failed to save API key.' };
    }
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error while saving key.' };
  }
}

export async function updateAICredential(provider: string = 'gemini', apiKey: string): Promise<{ success: boolean; data?: AICredentialStatus; error?: string }> {
  const headers = await getAuthHeader();
  try {
    const res = await fetch('/api/ai-credentials', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({ provider, apiKey }),
    });
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return { success: false, error: 'Server returned invalid response.' };
    }
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.message || data.error || 'Failed to replace API key.' };
    }
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error while updating key.' };
  }
}

export async function deleteAICredential(provider: string = 'gemini'): Promise<{ success: boolean; error?: string }> {
  const headers = await getAuthHeader();
  try {
    const res = await fetch(`/api/ai-credentials?provider=${encodeURIComponent(provider)}`, {
      method: 'DELETE',
      headers: { ...headers },
    });
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return { success: false, error: 'Server returned invalid response.' };
    }
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Failed to remove API key.' };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error while deleting key.' };
  }
}

export async function fetchUserProjects(): Promise<ProjectAnalysis[]> {
  const headers = await getAuthHeader();
  try {
    const res = await fetch('/api/projects', {
      headers: { ...headers },
    });
    const contentType = res.headers.get('content-type') || '';
    if (!res.ok || !contentType.includes('application/json')) return [];
    const data = await res.json();
    return Array.isArray(data.projects) ? data.projects : [];
  } catch (err) {
    console.warn('[API] Failed to fetch projects:', err);
    return [];
  }
}

export async function fetchProjectById(projectId: string): Promise<{ project?: ProjectAnalysis; error?: string; status?: number }> {
  const headers = await getAuthHeader();
  try {
    const res = await fetch(`/api/projects/${encodeURIComponent(projectId)}`, {
      headers: { ...headers },
    });
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return { error: 'Server returned invalid response.', status: res.status };
    }
    const data = await res.json();
    if (!res.ok) {
      return { error: data.message || data.error || 'Failed to fetch project.', status: res.status };
    }
    return { project: data.project, status: res.status };
  } catch (err: any) {
    return { error: err?.message || 'Network error fetching project.', status: 500 };
  }
}

export async function analyzeProjectRequest(payload: {
  projectText: string;
  imageBase64: string | null;
  profile: FreelancerProfile;
}): Promise<ProjectAnalysis> {
  const headers = await getAuthHeader();
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(payload),
  });

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error('Server returned invalid response. Please ensure backend server is running.');
  }

  const data = await res.json();

  if (!res.ok) {
    const errorObj: any = new Error(data.message || data.error || 'Failed to analyze project.');
    errorObj.code = data.code || data.error;
    throw errorObj;
  }

  return data;
}

// ─── Outreach & Follow-up API Helpers ─────────────────────────────────────────

export async function fetchOutreachSummary(): Promise<{ summaries: OpportunityOutreachSummary[]; metrics: OutreachMetrics }> {
  const headers = await getAuthHeader();
  try {
    const res = await fetch('/api/outreach/summary', {
      headers: { ...headers },
    });
    const contentType = res.headers.get('content-type') || '';
    if (!res.ok || !contentType.includes('application/json')) {
      return {
        summaries: [],
        metrics: { totalContacted: 0, dueTodayCount: 0, overdueCount: 0, waitingForReplyCount: 0, wonCount: 0, lostCount: 0 },
      };
    }
    return await res.json();
  } catch (err) {
    console.warn('[API] Failed to fetch outreach summary:', err);
    return {
      summaries: [],
      metrics: { totalContacted: 0, dueTodayCount: 0, overdueCount: 0, waitingForReplyCount: 0, wonCount: 0, lostCount: 0 },
    };
  }
}

export async function fetchOpportunityOutreach(projectId: string): Promise<OpportunityOutreachSummary | null> {
  const headers = await getAuthHeader();
  try {
    const res = await fetch(`/api/outreach/opportunity/${encodeURIComponent(projectId)}`, {
      headers: { ...headers },
    });
    const contentType = res.headers.get('content-type') || '';
    if (!res.ok || !contentType.includes('application/json')) return null;
    return await res.json();
  } catch (err) {
    console.warn('[API] Failed to fetch opportunity outreach:', err);
    return null;
  }
}

export async function logContactInteraction(payload: {
  projectId: string;
  type: string;
  channel: string;
  occurredAt?: string;
  outcome?: string;
  notes?: string;
  nextFollowUpDate?: string | null;
}): Promise<{ success: boolean; summary?: OpportunityOutreachSummary; error?: string }> {
  const headers = await getAuthHeader();
  try {
    const res = await fetch('/api/outreach/log-contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(payload),
    });
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return { success: false, error: 'Server returned invalid response.' };
    }
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.message || data.error || 'Failed to log contact interaction.' };
    }
    return { success: true, summary: data.summary };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error while logging contact.' };
  }
}

export async function generateAIFollowUpMessage(
  projectId: string,
  channel: string = 'Email',
  customInstructions: string = ''
): Promise<{ message: string; recommendation?: string; error?: string; code?: string }> {
  const headers = await getAuthHeader();
  try {
    const res = await fetch('/api/outreach/generate-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({ projectId, channel, customInstructions }),
    });
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return { message: '', error: 'Server returned invalid response.' };
    }
    const data = await res.json();
    if (!res.ok) {
      return { message: '', error: data.message || data.error || 'Failed to generate message.', code: data.code };
    }
    return { message: data.message, recommendation: data.recommendation };
  } catch (err: any) {
    return { message: '', error: err?.message || 'Network error while generating message.' };
  }
}

