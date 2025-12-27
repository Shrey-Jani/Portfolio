export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  codeUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issued: string;
  description: string;
  credentialUrl?: string;
  image?: {
    src: string;
    alt: string;
  };
}

export interface SocialLink {
  name: string;
  url: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  socialLinks: SocialLink[];
}
