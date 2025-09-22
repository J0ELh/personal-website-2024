import Link from "next/link";
import { Github, Linkedin, LucideMapPinHouse, Mail, Phone, FileText } from "lucide-react";

export const MobileHomePage = () => {
  return (
    <div className="page-container py-6 px-4 flex flex-col gap-6">
      {/* Profile Card */}
      <section className="card p-6 flex flex-col items-center">
        <img
          src={`/images/joel_pf_lower_res.jpg`}
          alt="Profile Photo"
          width={150}
          height={150}
          className="rounded-2xl object-cover shadow-lg mb-4"
          fetchPriority="low"
          loading="lazy"
          decoding="async"
        />

        <h1 className="text-2xl font-bold mb-1">Joel Hempel</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Computer Science Student</p>

        {/* Contact Info */}
        <div className="w-full space-y-2">
          <a
            href="https://www.linkedin.com/in/joelhempel"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm">LinkedIn</span>
          </a>

          <a
            href="https://github.com/J0ELh"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm">GitHub</span>
          </a>

          <div className="flex items-center gap-3 p-2">
            <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm break-all">joelhempel35@gmail.com</span>
          </div>

          <div className="flex items-center gap-3 p-2">
            <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm">(778) 988-3112</span>
          </div>

          <div className="flex items-center gap-3 p-2">
            <LucideMapPinHouse className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm">Vancouver, BC</span>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="card p-6">
        <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          Welcome!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
          I&apos;m completing my Bachelor&apos;s in Computer Science at UBC.
          Explore my projects, experience, and awards below.
        </p>
      </section>

      {/* Navigation */}
      <nav className="space-y-3">
        <a
          href={`/other_data/Joel_Hempel_Resume.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="card p-4 flex items-center justify-between group hover:border-accent/50 dark:hover:border-accent/30 w-full"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-accent transition-colors" />
            <span className="font-medium group-hover:text-accent transition-colors">Resume</span>
          </div>
          <span className="text-gray-400 group-hover:text-accent transition-colors">→</span>
        </a>

        <Link
          href="/projects"
          className="card p-4 flex items-center justify-between group hover:border-accent/50 dark:hover:border-accent/30 w-full"
        >
          <span className="font-medium group-hover:text-accent transition-colors">Projects</span>
          <span className="text-gray-400 group-hover:text-accent transition-colors">→</span>
        </Link>

        <Link
          href="/recommendations_awards"
          className="card p-4 flex items-center justify-between group hover:border-accent/50 dark:hover:border-accent/30 w-full"
        >
          <span className="font-medium group-hover:text-accent transition-colors">Recognition</span>
          <span className="text-gray-400 group-hover:text-accent transition-colors">→</span>
        </Link>

        <Link
          href="/about"
          className="card p-4 flex items-center justify-between group hover:border-accent/50 dark:hover:border-accent/30 w-full"
        >
          <span className="font-medium group-hover:text-accent transition-colors">About Me</span>
          <span className="text-gray-400 group-hover:text-accent transition-colors">→</span>
        </Link>
      </nav>
    </div>
  );
};