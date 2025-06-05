import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { reviewFormSchema } from '@/lib/validations';
import { Resend } from 'resend';

// Use service role key for database operations to bypass RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

// GET - Fetch approved reviews with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    const offset = (page - 1) * limit;

    // Get approved reviews with pagination
    const { data: reviews, error: reviewsError } = await supabaseAdmin
      .from('user_reviews')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (reviewsError) {
      console.error('Error fetching reviews:', reviewsError);
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      );
    }

    // Get total count of approved reviews
    const { count, error: countError } = await supabaseAdmin
      .from('user_reviews')
      .select('*', { count: 'exact', head: true })
      .eq('is_approved', true);

    if (countError) {
      console.error('Error counting reviews:', countError);
    }

    // Calculate review statistics
    const { data: allReviews, error: statsError } = await supabaseAdmin
      .from('user_reviews')
      .select('rating')
      .eq('is_approved', true);

    let stats = {
      total_reviews: count || 0,
      average_rating: 0,
      rating_distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };

    if (!statsError && allReviews) {
      const totalRating = allReviews.reduce((sum, review) => sum + review.rating, 0);
      stats.average_rating = allReviews.length > 0 ? totalRating / allReviews.length : 0;
      
      // Calculate rating distribution
      allReviews.forEach(review => {
        stats.rating_distribution[review.rating as keyof typeof stats.rating_distribution]++;
      });
    }

    return NextResponse.json({
      reviews: reviews || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
        hasMore: (count || 0) > offset + limit
      },
      stats
    });

  } catch (error) {
    console.error('Reviews GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Submit a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the form data
    const validatedData = reviewFormSchema.parse(body);
    
    console.log('Review submission:', {
      reviewer_name: validatedData.reviewer_name,
      rating: validatedData.rating,
      review_length: validatedData.review_text.length
    });
    
    // Save review to database (pending approval)
    const { data: reviewData, error: dbError } = await supabaseAdmin
      .from('user_reviews')
      .insert([
        {
          reviewer_name: validatedData.reviewer_name,
          reviewer_company: validatedData.reviewer_company || null,
          reviewer_email: validatedData.reviewer_email,
          rating: validatedData.rating,
          review_text: validatedData.review_text,
          is_approved: false, // Requires admin approval
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save review' },
        { status: 500 }
      );
    }

    console.log('Review saved to database:', reviewData?.id);

    // Send email notification to admin
    let emailSuccess = false;
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Portfolio Reviews <noreply@yourdomain.com>',
          to: ['mansihgupta21044@example@example.com'],
          subject: `New Review Submission - ${validatedData.rating} stars`,
          html: `
            <h2>New Review Submission</h2>
            <p><strong>Reviewer:</strong> ${validatedData.reviewer_name}</p>
            <p><strong>Company:</strong> ${validatedData.reviewer_company || 'Not provided'}</p>
            <p><strong>Email:</strong> ${validatedData.reviewer_email}</p>
            <p><strong>Rating:</strong> ${'★'.repeat(validatedData.rating)}${'☆'.repeat(5 - validatedData.rating)} (${validatedData.rating}/5)</p>
            <p><strong>Review:</strong></p>
            <blockquote style="border-left: 4px solid #ccc; margin: 0; padding-left: 16px; color: #666;">
              ${validatedData.review_text}
            </blockquote>
            <hr>
            <p><small>Review ID: ${reviewData?.id}</small></p>
            <p><small>This review is pending approval and will not be displayed publicly until approved.</small></p>
          `,
        });
        emailSuccess = true;
        console.log('Review notification email sent successfully');
      } catch (emailError) {
        console.error('Email error:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { 
        message: 'Review submitted successfully! It will be displayed after approval.',
        reviewId: reviewData?.id,
        emailSent: emailSuccess
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Review submission error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
