import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role key for admin database operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting user_reviews table setup...');
    
    // Step 1: Create the user_reviews table
    console.log('📋 Creating user_reviews table...');
    
    const createTableSQL = `
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
    `;

    const { error: createError } = await supabaseAdmin.rpc('exec_sql', {
      sql: createTableSQL
    });

    if (createError) {
      console.error('❌ Error creating table:', createError);
      return NextResponse.json({ error: 'Failed to create table', details: createError }, { status: 500 });
    }

    console.log('✅ Table created successfully');

    // Step 2: Set up Row Level Security policies
    console.log('🔒 Setting up RLS policies...');
    
    const rlsSQL = `
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
    `;

    const { error: rlsError } = await supabaseAdmin.rpc('exec_sql', {
      sql: rlsSQL
    });

    if (rlsError) {
      console.error('❌ Error setting up RLS:', rlsError);
      return NextResponse.json({ error: 'Failed to setup RLS', details: rlsError }, { status: 500 });
    }

    console.log('✅ RLS policies set up successfully');

    // Step 3: Create indexes for performance
    console.log('📊 Creating indexes...');
    
    const indexSQL = `
      CREATE INDEX IF NOT EXISTS idx_user_reviews_approved ON user_reviews(is_approved);
      CREATE INDEX IF NOT EXISTS idx_user_reviews_rating ON user_reviews(rating);
      CREATE INDEX IF NOT EXISTS idx_user_reviews_created_at ON user_reviews(created_at DESC);
    `;

    const { error: indexError } = await supabaseAdmin.rpc('exec_sql', {
      sql: indexSQL
    });

    if (indexError) {
      console.error('❌ Error creating indexes:', indexError);
      return NextResponse.json({ error: 'Failed to create indexes', details: indexError }, { status: 500 });
    }

    console.log('✅ Indexes created successfully');

    // Step 4: Insert sample data
    console.log('📝 Inserting sample data...');
    
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
        is_approved: false // Pending approval for testing
      }
    ];

    const { data: insertedReviews, error: insertError } = await supabaseAdmin
      .from('user_reviews')
      .insert(sampleReviews)
      .select();

    if (insertError) {
      console.error('❌ Error inserting sample data:', insertError);
      return NextResponse.json({ error: 'Failed to insert sample data', details: insertError }, { status: 500 });
    }

    console.log(`✅ Inserted ${insertedReviews.length} sample reviews`);

    // Step 5: Verify the setup
    console.log('🔍 Verifying setup...');
    
    const { count: totalCount, error: countError } = await supabaseAdmin
      .from('user_reviews')
      .select('*', { count: 'exact', head: true });

    const { count: approvedCount, error: approvedError } = await supabaseAdmin
      .from('user_reviews')
      .select('*', { count: 'exact', head: true })
      .eq('is_approved', true);

    if (countError || approvedError) {
      console.error('❌ Error verifying setup');
      return NextResponse.json({ error: 'Failed to verify setup' }, { status: 500 });
    }

    console.log('🎉 Setup completed successfully!');

    return NextResponse.json({
      success: true,
      message: 'user_reviews table setup completed successfully',
      stats: {
        total_reviews: totalCount,
        approved_reviews: approvedCount,
        pending_reviews: (totalCount || 0) - (approvedCount || 0)
      },
      inserted_reviews: insertedReviews.length
    });

  } catch (error) {
    console.error('❌ Setup error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
