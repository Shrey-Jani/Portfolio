import { Project, Experience, ContactInfo, Certificate } from "../types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Robo-Speaker",
    description:
      "Developed a robotic speaker in Python using the OS library, enabling automated text-to-speech functionality for seamless voice output.",
    technologies: ["Python"],
    codeUrl: "https://github.com/Shrey-Jani/Python.git",
  },
  {
    id: 2,
    title: "iOS Calculator",
    description:
      "Built a sleek iOS Calculator in SwiftUI with MVVM, covering core arithmetic, percentage, sign toggle, and continuous operation chaining.",
    technologies: ["Swift"],
    codeUrl: "https://github.com/Shrey-Jani/iOS-Calculator.git",
  },
  {
    id: 3,
    title: "Capstone Project",
    description:
      "Sugar Cubed Creation — a production-ready, mobile-first e-commerce storefront for a home-based cookie business, built with Next.js (TypeScript), Supabase/Postgres, Prisma, and Square.",
    liveUrl: "https://sugar-cubed-creations.vercel.app",
    technologies: ["Node", "Next.js", "Supabase"],
    codeUrl: "https://github.com/Yagna3903/sugar-cubed-creation.git",
  },
];

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Full‑Stack Developer",
    company: "Hackville",
    period: "October 2025 - Present",
    responsibilities: [
      "Improved user experience and event efficiency by developing key features for Hackville’s hackathon portal, collaborating with designers and organizers, ensuring smooth operations for 400+ attendees.",
      "Delivered incremental product updates in an agile environment by coordinating with cross-functional teams of developers, designers, and managers, resulting in a faster release cycle and a more reliable event platform.",
    ],
  },
  {
    id: 2,
    title: "Full‑Stack Developer Intern",
    company: "Kodmatrix",
    period: "June 2025 — September 2023",
    responsibilities: [
      "Built and maintained full-stack features using Next.js, React, Node.js, and Supabase, contributing to stable and production-ready releases.",
      "Improved performance by benchmarking API latency, defining KPIs, and reducing P95 latency by 20%.",
      "Collaborated in code reviews to ensure clean, maintainable, and testable implementations.",
    ],
  },
  {
    id: 3,
    title: "Full-Stack Developer Intern",
    company: "Samskrita Bharati",
    period: "September 2024 — December 2024",
    responsibilities: [
      "Developed interactive quiz web applications using React, Tailwind CSS, and DOM APIs..",
      "Integrated UX features (audio, animations) while maintaining optimal frontend performance.",
      "Managed domain and deployed the application with AWS-based hosting solutions.",
    ],
  },
];

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "AWS Certified Cloud Developer",
    issuer: "Amazon Web Services",
    issued: "December 2025",
    description: "",
    credentialUrl:
      "https://www.credly.com/badges/10661791-67f0-48f1-a1aa-10dcfb805c93/print",
    image: {
      src: "/images/aws.png",
      alt: "AWS Certified Cloud Developer certificate",
    },
  },
  {
    id: 2,
    title: "Capstone Competition Finalist",
    issuer: "Sheridan College",
    issued: "2025",
    description:
      "Finalist — Team Sugar Cubed Creations at the Information Systems Engineering Capstone Competition 2025, hosted by Sheridan College Institute of Technology and Advanced Learning.",
    image: {
      src: "/images/sheridan.jpg",
      alt: "Sheridan Capstone Competition Finalist certificate",
    },
  },
];

export const technologies = [
  "JavaScript",
  "TypeScript",
  "React",
  "Angular",
  "Tailwind CSS",
  "Node.js",
  "Spring Boot",
  "REST APIs",
  "AWS",
  "Azure",
  "MySQL",
  "PostgreSQL",
  "NoSQL",
];

export const contactInfo: ContactInfo = {
  email: "janishre@sheridancollege.ca",
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/Shrey-Jani",
      label: "View GitHub Profile",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/shrey-jani/",
      label: "Connect on LinkedIn",
    },
  ],
};
