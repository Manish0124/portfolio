import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
  try {
    // Test if we can create a simple table first
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: 'Test Setup',
          email: 'test@setup.com',
          subject: 'Database Setup Test',
          message: 'This is a test message to create the table structure'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database setup error:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error,
          message: 'Table does not exist. Please create it manually in Supabase dashboard.'
        },
        { status: 500 }
      );
    }

    // If successful, delete the test record
    if (data) {
      await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', data.id);
    }

    return NextResponse.json({
      success: true,
      message: 'Database table exists and is working correctly',
      data
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to test database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
