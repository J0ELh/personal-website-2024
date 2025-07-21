import PageLink from "@/components/PageLink";

import { Github, Linkedin, LucideMapPinHouse, Mail, Phone } from "lucide-react";

export const MobileHomePage = () => {
  // const basePath = useDeploymentContext();

  return (
    <div className="min-h-screen bg-gray-200 py-6 px-4 text-black flex flex-col gap-8">
      {/* -------- profile + contact card -------- */}
      <section className="bg-gray-300/70 rounded-2xl shadow-lg px-6 py-8 flex flex-col items-center gap-6">
        {/* avatar */}
        <img
          src={`/images/joel_pf_lower_res.jpg`}
          alt="Profile Photo"
          width={160}
          height={160}
          className="rounded-full object-cover"
          fetchPriority="low"
          loading="lazy"
          decoding="async"
        />

        {/* name */}
        <h1 className="text-2xl font-extrabold">Joel Hempel</h1>

        {/* contact list */}
        <ul className="w-full flex flex-col items-center gap-3 text-sm">
          <li className="flex items-center gap-2">
            <Linkedin className="size-4 shrink-0" />
            <a
              href="https://www.linkedin.com/in/joelhempel"
              className="text-blue-600 hover:underline"
            >
              linkedin.com/in/joelhempel
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Github className="size-4 shrink-0" />
            <a
              href="https://github.com/J0ELh"
              className="text-blue-600 hover:underline"
            >
              github.com/J0ELh
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="size-4 shrink-0" />
            <span className="break-all">joelhempel35@gmail.com</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone className="size-4 shrink-0" />
            <span>(778) 988‑3112</span>
          </li>
          <li className="flex items-center gap-2">
            <LucideMapPinHouse className="size-4 shrink-0" />
            <span>Vancouver, BC</span>
          </li>
        </ul>
      </section>

      {/* -------- intro -------- */}
      <section className="text-center px-2">
        <h2 className="text-xl font-semibold text-blue-500 mb-2">Hi there!</h2>
        <p className="leading-relaxed">
          I’m a final‑year Computer Science student at the University of British
          Columbia. Explore my projects, awards, and résumé below.
        </p>
      </section>

      {/* -------- nav buttons -------- */}
      <nav className="grid gap-4">
        <a
          href={`/other_data/Joel_Hempel_Resume.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full rounded-xl bg-gray-300 py-3 text-center text-lg font-medium transition hover:bg-gray-400"
        >
          Experience / Resume
        </a>

        <PageLink name="Projects" redirect="projects" />
        <PageLink
          name="Recommendations & Awards"
          redirect="recommendations_awards"
        />
        <PageLink name="About Me" redirect="about" />
      </nav>
    </div>
  );
};
