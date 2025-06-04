#!/usr/bin/env node

/**
 * Direct database operations script for user_reviews table
 * This script uses the Supabase admin client to perform database operations
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase admin client with service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createUserReviewsTable() {
  console.log('🚀 Creating user_reviews table...');
  
  try {
    // Create the user_reviews table using raw SQL through Supabase
    const { data, error } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        -- Create user_reviews table
        CREATE TABLE IF NOT EXISTS user_reviews (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          reviewer_name TEXT NOT NULL,
          reviewer_company TEXT,
          reviewer_email TEXT NOT NULL,
          rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
          review_text TEXT NOT NULL,
          is_approved BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (error) {
      console.error('❌ Error creating table:', error);
      return false;
    }
    
    console.log('✅ user_reviews table created successfully');
    return true;
  } catch (err) {
    console.error('❌ Exception creating table:', err);
    return false;
  }
}

async function setupRLSPolicies() {
  console.log('🔒 Setting up Row Level Security policies...');
  
  try {
    // Enable RLS and create policies
    const { data, error } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        -- Enable Row Level Security
        ALTER TABLE user_reviews ENABLE ROW LEVEL SECURITY;
        
        -- Drop existing policies if they exist
        DROP POLICY IF EXISTS "Approved reviews are viewable by everyone" ON user_reviews;
        DROP POLICY IF EXISTS "Anyone can submit reviews" ON user_reviews;
        DROP POLICY IF EXISTS "Service role can manage reviews" ON user_reviews;
        
        -- Public can view only approved reviews
        CREATE POLICY "Approved reviews are viewable by everyone" ON user_reviews
          FOR SELECT USING (is_approved = true);
        
        -- Anyone can submit a review (will be pending approval)
        CREATE POLICY "Anyone can submit reviews" ON user_reviews
          FOR INSERT WITH CHECK (true);
        
        -- Service role can manage all reviews
        CREATE POLICY "Service role can manage reviews" ON user_reviews
          FOR ALL USING (auth.role() = 'service_role');
      `
    });

    if (error) {
      console.error('❌ Error setting up RLS policies:', error);
      return false;
    }
    
    console.log('✅ RLS policies set up successfully');
    return true;
  } catch (err) {
    console.error('❌ Exception setting up RLS:', err);
    return false;
  }
}

async function createIndexes() {
  console.log('📊 Creating database indexes...');
  
  try {
    const { data, error } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        -- Create indexes for better performance
        CREATE INDEX IF NOT EXISTS idx_user_reviews_approved ON user_reviews(is_approved);
        CREATE INDEX IF NOT EXISTS idx_user_reviews_rating ON user_reviews(rating);
        CREATE INDEX IF NOT EXISTS idx_user_reviews_created_at ON user_reviews(created_at DESC);
      `
    });

    if (error) {
      console.error('❌ Error creating indexes:', error);
      return false;
    }
    
    console.log('✅ Database indexes created successfully');
    return true;
  } catch (err) {
    console.error('❌ Exception creating indexes:', err);
    return false;
  }
}

async function insertSampleData() {
  console.log('📝 Inserting sample review data...');
  
  const sampleReviews = [
    {
      reviewer_name: 'Sarah Johnson',
      reviewer_company: 'TechCorp Solutions',
      reviewer_email: 'sarah.johnson@techcorp.com',
      rating: 5,
      review_text: 'Outstanding work! The portfolio website exceeded all expectations. Professional, responsive, and delivered on time. Highly recommend for any web development project.',
      is_approved: true
    },
    {
      reviewer_name: 'Michael Chen',
      reviewer_company: 'StartupXYZ',
      reviewer_email: 'michael@startupxyz.com',
      rating: 5,
      review_text: 'Incredible attention to detail and excellent communication throughout the project. The final result was exactly what we envisioned and more.',
      is_approved: true
    },
    {
      reviewer_name: 'Emily Rodriguez',
      reviewer_company: 'Digital Marketing Pro',
      reviewer_email: 'emily@digitalmarketingpro.com',
      rating: 4,
      review_text: 'Great developer with solid technical skills. Delivered a clean, modern website that perfectly represents our brand. Very satisfied with the results.',
      is_approved: true
    },
    {
      reviewer_name: 'David Thompson',
      reviewer_company: null,
      reviewer_email: 'david.thompson@email.com',
      rating: 5,
      review_text: 'Professional, reliable, and talented. The website looks amazing and functions perfectly across all devices. Will definitely work together again.',
      is_approved: true
    },
    {
      reviewer_name: 'Lisa Wang',
      reviewer_company: 'InnovateLab',
      reviewer_email: 'lisa@innovatelab.com',
      rating: 4,
      review_text: 'Excellent work on our company website. Clean code, great design, and responsive layout. The project was completed ahead of schedule.',
      is_approved: false // This one is pending approval for testing
    }
  ];

  try {
    const { data, error } = await supabaseAdmin
      .from('user_reviews')
      .insert(sampleReviews)
      .select();

    if (error) {
      console.error('❌ Error inserting sample data:', error);
      return false;
    }
    
    console.log(`✅ Inserted ${data.length} sample reviews successfully`);
    console.log('📊 Sample data summary:');
    console.log(`   - Approved reviews: ${sampleReviews.filter(r => r.is_approved).length}`);
    console.log(`   - Pending reviews: ${sampleReviews.filter(r => !r.is_approved).length}`);
    return true;
  } catch (err) {
    console.error('❌ Exception inserting sample data:', err);
    return false;
  }
}

async function verifyTableCreation() {
  console.log('🔍 Verifying table creation and data...');
  
  try {
    // Check if table exists and get count
    const { count, error } = await supabaseAdmin
      .from('user_reviews')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('❌ Error verifying table:', error);
      return false;
    }
    
    console.log(`✅ Table verified successfully with ${count} records`);
    
    // Get approved reviews count
    const { count: approvedCount, error: approvedError } = await supabaseAdmin
      .from('user_reviews')
      .select('*', { count: 'exact', head: true })
      .eq('is_approved', true);

    if (!approvedError) {
      console.log(`📊 Approved reviews: ${approvedCount}`);
    }
    
    return true;
  } catch (err) {
    console.error('❌ Exception verifying table:', err);
    return false;
  }
}

async function main() {
  console.log('🎯 Starting user_reviews table setup...\n');
  
  const steps = [
    { name: 'Create Table', fn: createUserReviewsTable },
    { name: 'Setup RLS Policies', fn: setupRLSPolicies },
    { name: 'Create Indexes', fn: createIndexes },
    { name: 'Insert Sample Data', fn: insertSampleData },
    { name: 'Verify Setup', fn: verifyTableCreation }
  ];
  
  for (const step of steps) {
    const success = await step.fn();
    if (!success) {
      console.log(`\n❌ Setup failed at step: ${step.name}`);
      process.exit(1);
    }
    console.log(''); // Add spacing between steps
  }
  
  console.log('🎉 user_reviews table setup completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('   1. Test the API endpoints');
  console.log('   2. Verify frontend integration');
  console.log('   3. Test review submission and approval flow');
}

// Run the setup
main().catch(console.error);
