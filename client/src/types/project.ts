export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  
  // Optional detailed fields
  technologies?: string[];
  client?: string;
  role?: string;
  liveUrl?: string;
  githubUrl?: string;
  longDescription?: string;
  challenges?: string;
}
