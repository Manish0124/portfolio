'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { 
  FiCode, 
  FiDatabase, 
  FiLayout, 
  FiServer,
  FiGitBranch,
  FiTool
} from 'react-icons/fi';

const skills = [
  {
    category: 'Frontend',
    icon: FiLayout,
    skills: [
      { name: 'React/Next.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Vue.js', level: 75 },
    ],
  },
  {
    category: 'Backend',
    icon: FiServer,
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 75 },
    ],
  },
  {
    category: 'Tools & Others',
    icon: FiTool,
    skills: [
      { name: 'Git/GitHub', level: 90 },
      { name: 'Docker', level: 70 },
      { name: 'AWS', level: 75 },
      { name: 'Figma', level: 85 },
    ],
  },
];

const experience = [
  {
    company: 'Tech Company',
    position: 'Senior Full Stack Developer',
    duration: '2022 - Present',
    description: [
      'Led development of scalable web applications using React and Node.js',
      'Improved application performance by 40% through optimization techniques',
      'Mentored junior developers and conducted code reviews',
    ],
  },
  {
    company: 'Startup Inc.',
    position: 'Frontend Developer',
    duration: '2020 - 2022',
    description: [
      'Built responsive web applications using React and TypeScript',
      'Collaborated with designers to implement pixel-perfect UI components',
      'Integrated RESTful APIs and managed application state',
    ],
  },
];

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm a passionate full-stack developer with over 4 years of experience
            creating digital solutions that make a difference.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Get to know me
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm a dedicated full-stack developer based in [Your Location], 
                passionate about creating innovative web solutions that solve real-world problems.
              </p>
              <p>
                My journey in web development started [X] years ago, and since then, 
                I've had the privilege of working with diverse teams and technologies 
                to build applications that users love.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, 
                contributing to open-source projects, or enjoying outdoor activities.
              </p>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Skills & Technologies
            </h3>
            <div className="space-y-6">
              {skills.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={category.category}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Icon className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold text-foreground">
                          {category.category}
                        </h4>
                      </div>
                      <div className="space-y-3">
                        {category.skills.map((skill) => (
                          <div key={skill.name}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-foreground">{skill.name}</span>
                              <span className="text-muted-foreground">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <motion.div
                                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                viewport={{ once: true }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Work Experience
          </h3>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground">
                          {exp.position}
                        </h4>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground mt-1 sm:mt-0">
                        {exp.duration}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
