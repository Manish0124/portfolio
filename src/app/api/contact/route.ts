import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { contactFormSchema } from '@/lib/validations';
import { Resend } from 'resend';

// Use service role key for database operations to bypass RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the form data
    const validatedData = contactFormSchema.parse(body);

    console.log('Contact form submission:', validatedData);

    // Try to save to database
    let databaseSuccess = false;
    try {
      const { data, error } = await supabaseAdmin
        .from('contact_submissions')
        .insert([
          {
            name: validatedData.name,
            email: validatedData.email,
            subject: validatedData.subject,
            message: validatedData.message,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        // Don't fail the entire request if database fails
      } else {
        databaseSuccess = true;
        console.log('Successfully saved to database:', data);
      }
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      // Continue without database
    }

    // Send email notification (optional)
    let emailSuccess = false;
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Portfolio Contact <noreply@yourdomain.com>',
          to: ['your.email@example.com'],
          subject: `New Contact Form Submission: ${validatedData.subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Database saved: ${databaseSuccess ? 'Yes' : 'No'}</small></p>
          `,
        });
        emailSuccess = true;
        console.log('Email sent successfully');
      } catch (emailError) {
        console.error('Email error:', emailError);
        // Don't fail the request if email fails
      }
    }

    // Return success if at least one method worked, or if validation passed
    return NextResponse.json(
      {
        message: 'Message received successfully',
        databaseSaved: databaseSuccess,
        emailSent: emailSuccess,
        data: validatedData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
