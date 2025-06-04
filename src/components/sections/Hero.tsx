'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { scrollToSection } from '@/lib/utils';
import { FiDownload, FiArrowDown } from 'react-icons/fi';

export function Hero() {
  const handleDownloadCV = () => {
    // Replace with your actual CV file path
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Your_Name_CV.pdf';
    link.click();
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
               Manish 
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8">
              Full Stack Developer & UI/UX Designer
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              I create beautiful, functional, and user-centered digital experiences.
              Passionate about building scalable web applications with modern technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleDownloadCV}
              className="flex items-center gap-2"
            >
              <FiDownload className="h-4 w-4" />
              Download CV
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <button
              onClick={() => scrollToSection('about')}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Scroll to about section"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FiArrowDown className="h-6 w-6" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
