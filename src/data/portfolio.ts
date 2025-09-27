import { Project, Experience, ContactInfo } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Robo-Speaker",
    description: "Developed a robotic speaker in Python using the OS library, enabling automated text-to-speech functionality for seamless voice output.",
    technologies: ["Python"],
    codeUrl: "https://github.com/Shrey-Jani/Python.git"
  },
  {
    id: 2,
    title: "iOS Calculator",
    description: "Built a sleek iOS Calculator in SwiftUI with MVVM, covering core arithmetic, percentage, sign toggle, and continuous operation chaining.",
    technologies: ["Swift"],
    codeUrl: "https://github.com/Shrey-Jani/iOS-Calculator.git"
  },
  {
    id: 3,
    title: "Capstone Project",
    description: "Sugar Cubed Creation — a production-ready, mobile-first e-commerce storefront for a home-based cookie business, built with Next.js (TypeScript), Supabase/Postgres, Prisma, and Square.",
    technologies: ["Node", "Next.js", "Supabase"],
    codeUrl: "https://github.com/Yagna3903/sugar-cubed-creation.git"
  }
];

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Full‑Stack Developer",
    company: "Hackville",
    period: "2025 — Present",
    responsibilities: [
      "Designed and implemented a hackathon application form and collaborated across design & dev to ship features in an agile environment.",
      "Partnered with a cross‑functional team to deliver improvements with a focus on usability and performance."
    ]
  },
  {
    id: 2,
    title: "Full‑Stack Developer Intern",
    company: "Kodmatrix",
    period: "2022 — 2023",
    responsibilities: [
      "Built and maintained full‑stack features across modern frontends and robust APIs; improved performance and UX with iterative releases.",
      "Collaborated with engineers and designers to test and deploy scalable features with code reviews and CI."
    ]
  }
];

export const technologies = [
  "JavaScript", "TypeScript", "React", "Angular", "Tailwind CSS", 
  "Node.js", "Spring Boot", "REST APIs", "AWS", "Azure", 
  "MySQL", "PostgreSQL", "NoSQL"
];

export const contactInfo: ContactInfo = {
  email: "janishre@sheridancollege.ca",
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/Shrey-Jani",
      label: "View GitHub Profile"
    },
    {
      name: "LinkedIn", 
      url: "https://www.linkedin.com/in/shrey-jani/",
      label: "Connect on LinkedIn"
    }
  ]
};