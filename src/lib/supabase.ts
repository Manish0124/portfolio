import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database schema types
export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          long_description: string | null;
          technologies: string[];
          category: string;
          image: string;
          live_url: string | null;
          github_url: string | null;
          featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          long_description?: string | null;
          technologies: string[];
          category: string;
          image: string;
          live_url?: string | null;
          github_url?: string | null;
          featured?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          long_description?: string | null;
          technologies?: string[];
          category?: string;
          image?: string;
          live_url?: string | null;
          github_url?: string | null;
          featured?: boolean;
          created_at?: string;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
          created_at?: string;
        };
      };
      user_reviews: {
        Row: {
          id: string;
          reviewer_name: string;
          reviewer_company: string | null;
          reviewer_email: string;
          rating: number;
          review_text: string;
          is_approved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reviewer_name: string;
          reviewer_company?: string | null;
          reviewer_email: string;
          rating: number;
          review_text: string;
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reviewer_name?: string;
          reviewer_company?: string | null;
          reviewer_email?: string;
          rating?: number;
          review_text?: string;
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
