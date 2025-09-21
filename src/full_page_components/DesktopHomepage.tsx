import Link from "next/link";
import React from "react";
import PageLink from "@/components/PageLink";
import {
  Github,
  Linkedin,
  LucideMapPinHouse,
  Mail,
  Phone,
  FileText,
} from "lucide-react";

export const DesktopHomepage = () => {
  return (
    <div className="page-container p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl flex gap-8">
        {/* Left Profile Card */}
        <aside className="w-[320px] shrink-0">
          <div className="card p-8 text-center">
            <div className="flex justify-center mb-6">
              <img
                src={`/images/joel_pf_lower_res.jpg`}
                alt="Profile Photo"
                width={200}
                height={200}
                className="rounded-2xl object-cover shadow-lg"
                fetchPriority="low"
                loading="lazy"
                decoding="async"
              />
            </div>

            <h1 className="text-2xl font-bold mb-2">Joel Hempel</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Passionate about Technology
            </p>

            {/* Contact Section */}
            <div className="space-y-3 text-left">
              <h2 className="text-lg font-semibold mb-3">Contact</h2>

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
                <span
                  className="text-sm link-hover"
                  onClick={() =>
                    navigator.clipboard.writeText("joelhempel35@gmail.com")
                  }
                >
                  joelhempel35@gmail.com
                </span>
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
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-8">
          {/* Welcome Section */}
          <div className="card p-8">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Welcome!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm currently completing my Bachelor's Degree in Computer Science
              at the University of British Columbia. This site showcases my
              professional experience, personal projects, and interests. Feel
              free to explore the sections below to learn more about my journey
              and work.
            </p>
          </div>

          {/* Navigation Grid */}
          <nav className="grid grid-cols-2 gap-4">
            <a
              href={`/other_data/Joel_Hempel_Resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 group hover:border-accent/50 dark:hover:border-accent/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                    Resume
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    View my experience
                  </p>
                </div>
                <FileText className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors" />
              </div>
            </a>

            <Link
              href="/projects"
              className="card p-6 group hover:border-accent/50 dark:hover:border-accent/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                    Projects
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    See what I've built
                  </p>
                </div>
                <div className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors">
                  →
                </div>
              </div>
            </Link>

            <Link
              href="/recommendations_awards"
              className="card p-6 group hover:border-accent/50 dark:hover:border-accent/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                    Recognition
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Awards & recommendations
                  </p>
                </div>
                <div className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors">
                  →
                </div>
              </div>
            </Link>

            <Link
              href="/about"
              className="card p-6 group hover:border-accent/50 dark:hover:border-accent/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                    About Me
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Get to know me
                  </p>
                </div>
                <div className="w-6 h-6 text-gray-400 group-hover:text-accent transition-colors">
                  →
                </div>
              </div>
            </Link>
          </nav>
        </main>
      </div>
    </div>
  );
};
