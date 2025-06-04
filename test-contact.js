// Simple test script for the contact API endpoint
// Run with: node test-contact.js

const testContactForm = async () => {
  const testData = {
    name: "Test User",
    email: "test@example.com",
    subject: "Test Subject",
    message: "This is a test message from the contact form."
  };

  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Contact form test successful:', result);
    } else {
      console.log('❌ Contact form test failed:', result);
    }
  } catch (error) {
    console.error('❌ Error testing contact form:', error.message);
  }
};

// Only run if Supabase is configured
if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_url_here') {
  testContactForm();
} else {
  console.log('⚠️  Supabase not configured. Skipping contact form test.');
  console.log('   Configure your .env.local file to test the contact form.');
}
