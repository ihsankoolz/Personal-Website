import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center px-6 py-24"
    >
      <div className="max-w-3xl w-full mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[#00E5BE] mb-4">05. What's Next?</p>
          <h2 className="text-4xl md:text-5xl mb-6 text-gray-100">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            I'm currently looking for summer 2027 internship opportunities in
            quantitative trading, software engineering, or machine learning.
            Whether you have an opportunity, a question, or just want to say hi,
            feel free to reach out!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a
              href="mailto:your.email@example.com"
              className="group flex items-center gap-3 px-6 py-3 bg-transparent border-2 border-[#00E5BE] text-[#00E5BE] rounded-lg hover:bg-[#00E5BE]/10 transition-all duration-300"
            >
              <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>your.email@example.com</span>
            </a>
          </div>

          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 text-gray-400 hover:text-[#00E5BE] transition-colors duration-300"
              aria-label="GitHub profile"
            >
              <div className="p-3 border border-gray-700 rounded-full group-hover:border-[#00E5BE] transition-colors duration-300">
                <Github className="h-6 w-6" />
              </div>
              <span className="text-sm">GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 text-gray-400 hover:text-[#00E5BE] transition-colors duration-300"
              aria-label="LinkedIn profile"
            >
              <div className="p-3 border border-gray-700 rounded-full group-hover:border-[#00E5BE] transition-colors duration-300">
                <Linkedin className="h-6 w-6" />
              </div>
              <span className="text-sm">LinkedIn</span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 text-gray-400 hover:text-[#00E5BE] transition-colors duration-300"
              aria-label="View Resume"
            >
              <div className="p-3 border border-gray-700 rounded-full group-hover:border-[#00E5BE] transition-colors duration-300">
                <ExternalLink className="h-6 w-6" />
              </div>
              <span className="text-sm">Resume</span>
            </a>
          </div>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-24 text-gray-500 text-sm"
        >
          <p>Built with React, Tailwind CSS, and Motion</p>
          <p className="mt-2">© 2026 Your Name. All rights reserved.</p>
        </motion.footer>
      </div>
    </section>
  );
}
