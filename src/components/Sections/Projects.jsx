import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import { portfolioApi } from '@/api/portfolioApi';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    portfolioApi.entities.FeaturedProject.list('order', 100)
      .then(data => {
        setProjects(data.map(p => ({
          title: p.title,
          description: p.description,
          tech: p.tech_stack || [],
          github: p.github_url || '#',
          caseStudy: p.case_study_url || '#',
          _image: p.image_url || '',
        })));
      })
      .catch(() => {});
  }, []);

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-obsidian/40 font-medium mb-4">Work</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-20">
            Featured<br />
            <span className="italic text-obsidian/50">projects.</span>
          </h2>
        </motion.div>

        <div className="space-y-24">
          {projects.length === 0 && (
            <p className="rounded-2xl border border-dashed border-sand px-6 py-12 text-center text-sm text-obsidian/40">Featured projects will appear here after you publish them from the admin panel.</p>
          )}
          {projects.map((project, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <motion.div
                key={project.title + i}
                className={`grid lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:[direction:rtl]' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="rounded-2xl overflow-hidden aspect-[4/3] bg-sand/30 lg:[direction:ltr]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  {project._image ? <img src={project._image} alt={project.title} className="w-full h-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-obsidian/30">No thumbnail</div>}
                </motion.div>

                <div className="lg:[direction:ltr] space-y-4">
                  <h3 className="text-3xl font-heading font-bold">{project.title}</h3>
                  <p className="text-base text-obsidian/60 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 text-xs font-mono bg-sand/50 rounded-full text-obsidian/60">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm border border-obsidian/20 rounded-full hover:bg-obsidian hover:text-ivory transition-colors duration-300"
                    >
                      <Github size={14} />
                      GitHub
                    </a>
                    <a
                      href={project.caseStudy}
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-obsidian text-ivory rounded-full hover:bg-charcoal transition-colors duration-300"
                    >
                      Case Study
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
