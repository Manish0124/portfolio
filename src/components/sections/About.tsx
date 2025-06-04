'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import {
  // Technology Icons
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiVuedotjs,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiPrisma,
  SiGit,
  SiGithub,
  SiDocker,
  SiAmazon,
  SiVercel,
  SiFigma,
  SiLinux,
  SiHtml5,
  SiCss3,
  SiSass,
  SiRedux,
  SiExpress,
  SiGraphql,
} from 'react-icons/si';
import {
  // Category Icons
  TbBrandReact,
  TbServer,
  TbTools,
  TbCloud,
} from 'react-icons/tb';
import { FiCode } from 'react-icons/fi';

const skills = [
  {
    category: 'Frontend Development',
    icon: TbBrandReact,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Sass', icon: SiSass, color: '#CC6699' },
      { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
      { name: 'Redux', icon: SiRedux, color: '#764ABC' },
    ],
  },
  {
    category: 'Backend Development',
    icon: TbServer,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, color: '#000000' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
      { name: 'Prisma', icon: SiPrisma, color: '#2D3748' },
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: TbTools,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#181717' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'VS Code', icon: FiCode, color: '#007ACC' },
      { name: 'Linux', icon: SiLinux, color: '#FCC624' },
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
    ],
  },
  {
    category: 'Cloud & Deployment',
    icon: TbCloud,
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'AWS', icon: SiAmazon, color: '#232F3E' },
      { name: 'Vercel', icon: SiVercel, color: '#000000' },
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About Me
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer with over 4 years of experience
            creating digital solutions that make a difference.
          </p>
        </motion.div>

        {/* Personal Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-8">
                Get to know me
              </h3>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  I'm a dedicated full-stack developer based in [Your Location],
                  passionate about creating innovative web solutions that solve real-world problems.
                  My approach combines technical expertise with creative problem-solving to deliver
                  exceptional user experiences.
                </p>
                <p>
                  My journey in web development started [X] years ago, and since then,
                  I've had the privilege of working with diverse teams and technologies
                  to build applications that users love. I specialize in modern web technologies
                  and enjoy staying at the forefront of industry trends.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies,
                  contributing to open-source projects, or enjoying outdoor activities.
                  I believe in continuous learning and sharing knowledge with the developer community.
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-blue-100 dark:border-blue-800/30">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">4+</div>
                        <div className="text-sm text-muted-foreground">Years Experience</div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">50+</div>
                        <div className="text-sm text-muted-foreground">Projects Completed</div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">20+</div>
                        <div className="text-sm text-muted-foreground">Happy Clients</div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">15+</div>
                        <div className="text-sm text-muted-foreground">Technologies</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Skills & Technologies Section */}
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/10 dark:to-purple-950/10 rounded-3xl -mx-4 sm:-mx-6 lg:-mx-8" />

          <div className="relative py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-4">
                Skills & Technologies
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Here are the technologies and tools I work with to bring ideas to life
              </p>
            </motion.div>

            <div className="space-y-12">
              {skills.map((category, categoryIndex) => {
                const CategoryIcon = category.icon;
                return (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Category Header */}
                    <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
                      <div className={`p-2.5 rounded-lg bg-gradient-to-r ${category.color} shadow-md`}>
                        <CategoryIcon className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="text-lg sm:text-xl font-semibold text-foreground">
                        {category.category}
                      </h4>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 sm:gap-4">
                      {category.skills.map((skill, skillIndex) => {
                        const SkillIcon = skill.icon;
                        return (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: categoryIndex * 0.1 + skillIndex * 0.03,
                              type: "spring",
                              stiffness: 120
                            }}
                            viewport={{ once: true }}
                            whileHover={{
                              scale: 1.05,
                              y: -3,
                              transition: { duration: 0.2 }
                            }}
                            className="group"
                          >
                            <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border hover:border-primary/40 bg-background/80 backdrop-blur-sm">
                              <CardContent className="p-3 sm:p-4 flex flex-col items-center text-center">
                                <div
                                  className="mb-2 sm:mb-3 p-2 sm:p-2.5 rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-2"
                                  style={{
                                    backgroundColor: `${skill.color}12`,
                                    border: `1px solid ${skill.color}20`
                                  }}
                                >
                                  <SkillIcon
                                    className="h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300"
                                    style={{
                                      color: skill.color === '#000000' ? 'currentColor' : skill.color
                                    }}
                                  />
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                                  {skill.name}
                                </span>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Work Experience
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey and the impact I've made along the way
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500 bg-gradient-to-br from-background to-muted/20">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                          {exp.position}
                        </h4>
                        <p className="text-primary font-medium text-lg mb-1">{exp.company}</p>
                        <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                          {exp.duration}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {exp.description.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2" />
                          <p className="text-muted-foreground leading-relaxed">{item}</p>
                        </motion.div>
                      ))}
                    </div>
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
