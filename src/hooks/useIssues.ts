import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type IssueCategory = 'infrastructure' | 'hygiene' | 'safety' | 'internet' | 'classroom' | 'food' | 'transport' | 'other';
export type IssuePriority = 'low' | 'medium' | 'high' | 'critical';
export type IssueStatus = 'reported' | 'acknowledged' | 'in_progress' | 'resolved' | 'closed';

export interface Issue {
  id: string;
  created_at: string;
  updated_at: string;
  content: string;
  category: IssueCategory;
  priority: IssuePriority;
  status: IssueStatus;
  location_text: string | null;
  location_area: string | null;
  ai_summary: string | null;
  ai_tags: string[];
  reporter_id: string | null;
  is_anonymous: boolean;
  assigned_authority_id: string | null;
  upvotes_count: number;
  resolution_notes: string | null;
  resolved_at: string | null;
  reporter?: {
    full_name: string | null;
    email: string;
  };
}

export interface ClassificationResult {
  category: IssueCategory;
  priority: IssuePriority;
  location_text: string;
  location_area: string;
  summary: string;
  tags: string[];
  suggested_authority: string;
}

export function useIssues(filter?: IssueCategory | 'all') {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchIssues = async () => {
    try {
      let query = supabase
        .from('campus_issues')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter && filter !== 'all') {
        query = query.eq('category', filter);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching issues:', error);
        toast({
          title: "Error",
          description: "Failed to load issues",
          variant: "destructive"
        });
        return;
      }

      setIssues(data as Issue[]);
    } catch (err) {
      console.error('Error in fetchIssues:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [filter]);

  return { issues, isLoading, refetch: fetchIssues };
}

export async function classifyIssue(content: string): Promise<ClassificationResult | null> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/classify-issue`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({ content })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to classify issue');
    }

    return await response.json();
  } catch (err) {
    console.error('Error classifying issue:', err);
    return null;
  }
}

export async function createIssue(
  content: string,
  classification: ClassificationResult,
  reporterId: string | null,
  isAnonymous: boolean
) {
  const { data, error } = await supabase
    .from('campus_issues')
    .insert({
      content,
      category: classification.category,
      priority: classification.priority,
      location_text: classification.location_text,
      location_area: classification.location_area,
      ai_summary: classification.summary,
      ai_tags: classification.tags,
      reporter_id: reporterId,
      is_anonymous: isAnonymous
    })
    .select()
    .single();

  return { data, error };
}

export async function toggleUpvote(issueId: string, userId: string) {
  // Check if already upvoted
  const { data: existing } = await supabase
    .from('issue_upvotes')
    .select('id')
    .eq('issue_id', issueId)
    .eq('user_id', userId)
    .single();

  if (existing) {
    // Remove upvote
    const { error } = await supabase
      .from('issue_upvotes')
      .delete()
      .eq('issue_id', issueId)
      .eq('user_id', userId);
    return { action: 'removed', error };
  } else {
    // Add upvote
    const { error } = await supabase
      .from('issue_upvotes')
      .insert({ issue_id: issueId, user_id: userId });
    return { action: 'added', error };
  }
}

export async function updateIssueStatus(
  issueId: string,
  status: IssueStatus,
  resolutionNotes?: string
) {
  const updates: Record<string, unknown> = { status };
  
  if (status === 'resolved') {
    updates.resolved_at = new Date().toISOString();
  }
  
  if (resolutionNotes) {
    updates.resolution_notes = resolutionNotes;
  }

  const { data, error } = await supabase
    .from('campus_issues')
    .update(updates)
    .eq('id', issueId)
    .select()
    .single();

  return { data, error };
}
