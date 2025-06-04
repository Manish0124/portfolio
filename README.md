# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Supabase. Features dark/light mode, smooth animations, contact form, and project showcase.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS v4
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Smooth Animations**: Framer Motion for engaging user experience
- **Contact Form**: Working contact form with email notifications
- **Project Showcase**: Filterable project gallery with live demos
- **SEO Optimized**: Meta tags, structured data, and performance optimized
- **Database Integration**: Supabase for contact form submissions
- **Email Notifications**: Resend integration for contact form emails

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database**: Supabase
- **Email**: Resend
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: React Icons (Feather Icons)
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

   # Resend Configuration (for email notifications)
   RESEND_API_KEY=your_resend_api_key_here

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL commands from `database/schema.sql`
   - Update your environment variables with Supabase credentials

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

Create the following tables in your Supabase database:

```sql
-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  technologies TEXT[] NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to projects
CREATE POLICY "Projects are viewable by everyone" ON projects
  FOR SELECT USING (true);

-- Create policies for contact submissions (insert only)
CREATE POLICY "Anyone can submit contact form" ON contact_submissions
  FOR INSERT WITH CHECK (true);
```

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `src/components/sections/Hero.tsx` - Name, title, description
- `src/components/sections/About.tsx` - About text, skills, experience
- `src/components/layout/Footer.tsx` - Social links
- `src/data/projects.ts` - Your projects
- `src/app/layout.tsx` - SEO metadata

### Styling
- Colors and themes: `src/app/globals.css`
- Component styles: Individual component files
- Tailwind config: `tailwind.config.ts`

### Content
- Projects: `src/data/projects.ts`
- Images: `public/` directory
- CV/Resume: `public/cv.pdf`

## 📧 Email Setup (Optional)

To enable email notifications for contact form submissions:

1. Sign up for [Resend](https://resend.com)
2. Get your API key
3. Add it to your `.env.local` file
4. Update the email addresses in `src/app/api/contact/route.ts`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📱 Features Overview

### Navigation
- Smooth scrolling between sections
- Mobile-responsive hamburger menu
- Theme toggle (dark/light mode)

### Hero Section
- Animated introduction
- Call-to-action buttons
- Scroll indicator

### About Section
- Personal information
- Skills with progress bars
- Work experience timeline

### Projects Section
- Filterable project gallery
- Project cards with hover effects
- Live demo and GitHub links

### Contact Section
- Working contact form
- Form validation
- Email notifications
- Contact information

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Vercel](https://vercel.com/) for hosting and deployment
