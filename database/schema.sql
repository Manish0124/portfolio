-- Portfolio Website Database Schema
-- Run these commands in your Supabase SQL editor

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
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
CREATE TABLE IF NOT EXISTS contact_submissions (
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

-- Insert sample projects (optional)
INSERT INTO projects (title, description, long_description, technologies, category, image, live_url, github_url, featured) VALUES
(
  'E-Commerce Platform',
  'A full-stack e-commerce solution with modern UI and secure payment processing.',
  'Built a comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, order management, and integrated payment processing. The application includes an admin dashboard for inventory management and analytics.',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL', 'Prisma'],
  'Full Stack',
  '/projects/ecommerce.jpg',
  'https://ecommerce-demo.vercel.app',
  'https://github.com/yourusername/ecommerce-platform',
  true
),
(
  'Task Management App',
  'A collaborative task management application with real-time updates and team features.',
  'Developed a comprehensive task management solution with real-time collaboration features, drag-and-drop functionality, team workspaces, and progress tracking. Includes notifications, file attachments, and detailed analytics.',
  ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'Material-UI'],
  'Full Stack',
  '/projects/taskmanager.jpg',
  'https://taskmanager-demo.vercel.app',
  'https://github.com/yourusername/task-manager',
  true
),
(
  'Weather Dashboard',
  'A responsive weather application with location-based forecasts and interactive maps.',
  'Created a modern weather dashboard that provides current conditions, 7-day forecasts, and interactive weather maps. Features location search, favorites, and detailed weather metrics with beautiful data visualizations.',
  ARRAY['Vue.js', 'TypeScript', 'Chart.js', 'OpenWeather API', 'Tailwind CSS'],
  'Frontend',
  '/projects/weather.jpg',
  'https://weather-dashboard-demo.vercel.app',
  'https://github.com/yourusername/weather-dashboard',
  false
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
