export type PainCategory = 
  | 'scapula'
  | 'lumbar'
  | 'neck'
  | 'sleep'
  | 'computer'
  | 'stress';

export interface DiagnosticItem {
  id: PainCategory;
  title: string;
  shortDesc: string;
  iconName: string;
  safeFirstSteps: string[];
  exercises: {
    name: string;
    description: string;
    reps: string;
  }[];
  whatToAvoid: string[];
  redFlags: string[];
  recommendedArticleId?: string;
}

export interface ErgonomicValues {
  heightCm: number;
  mode: 'sitting' | 'standing';
  seatHeight: number;
  deskHeight: number;
  monitorTopHeight: number;
  monitorDistance: number;
  elbowAngle: string;
  kneeAngle: string;
  eyeLevelOffset: string;
}

export interface GuidePillar {
  number: string;
  title: string;
  description: string;
  links: {
    id: string;
    title: string;
    readTime: string;
  }[];
}

export interface Article {
  id: string;
  title: string;
  tag: string;
  readTime: string;
  author: string;
  date: string;
  summary: string;
  fullContent: {
    lead: string;
    sections: {
      heading: string;
      body: string;
      bulletPoints?: string[];
      tipBox?: string;
    }[];
    takeaways: string[];
  };
  isFeatured?: boolean;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'chair' | 'desk' | 'monitor' | 'habits';
  tip: string;
}
