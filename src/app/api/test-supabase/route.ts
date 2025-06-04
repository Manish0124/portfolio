import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: error.message,
          details: error 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      data
    });
  } catch (error) {
    console.error('Connection error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to connect to Supabase',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
