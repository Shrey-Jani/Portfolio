import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiAngular,
  SiTailwindcss,
  SiNodedotjs,
  SiSpringboot,
  SiAmazon,
  SiMysql,
  SiPostgresql,
  SiMongodb,
} from "react-icons/si";
import { FaServer, FaMicrosoft } from "react-icons/fa";
import { IconType } from "react-icons";

interface TechLogo {
  icon: IconType;
  title: string;
  href: string;
}

export const techLogos: TechLogo[] = [
  {
    icon: SiJavascript,
    title: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    icon: SiTypescript,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    icon: SiReact,
    title: "React",
    href: "https://react.dev",
  },
  {
    icon: SiAngular,
    title: "Angular",
    href: "https://angular.io",
  },
  {
    icon: SiTailwindcss,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    icon: SiNodedotjs,
    title: "Node.js",
    href: "https://nodejs.org",
  },
  {
    icon: SiSpringboot,
    title: "Spring Boot",
    href: "https://spring.io/projects/spring-boot",
  },
  {
    icon: FaServer,
    title: "REST APIs",
    href: "https://restfulapi.net",
  },
  {
    icon: SiAmazon,
    title: "AWS",
    href: "https://aws.amazon.com",
  },
  {
    icon: FaMicrosoft,
    title: "Azure",
    href: "https://azure.microsoft.com",
  },
  {
    icon: SiMysql,
    title: "MySQL",
    href: "https://www.mysql.com",
  },
  {
    icon: SiPostgresql,
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
  },
  {
    icon: SiMongodb,
    title: "NoSQL",
    href: "https://www.mongodb.com",
  },
];
