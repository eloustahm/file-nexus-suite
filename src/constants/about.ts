import { Users, Award, Globe, Heart, Shield, Zap } from 'lucide-react';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Value {
  id: string;
  title: string;
  description: string;
  icon: typeof Users;
}

export interface Milestone {
  id: string;
  year: number;
  title: string;
  description: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'john-doe',
    name: 'John Doe',
    role: 'CEO & Co-founder',
    bio: 'Former tech lead at Google with 15+ years of experience in document management systems.',
    avatar: '/avatars/john.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe'
    }
  },
  {
    id: 'jane-smith',
    name: 'Jane Smith',
    role: 'CTO & Co-founder',
    bio: 'PhD in Computer Science with expertise in AI and machine learning.',
    avatar: '/avatars/jane.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/janesmith',
      github: 'https://github.com/janesmith'
    }
  },
  {
    id: 'mike-johnson',
    name: 'Mike Johnson',
    role: 'Head of Product',
    bio: 'Product leader with experience at Dropbox and Box.',
    avatar: '/avatars/mike.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/mikejohnson',
      twitter: 'https://twitter.com/mikejohnson'
    }
  },
  {
    id: 'sarah-wilson',
    name: 'Sarah Wilson',
    role: 'Head of Design',
    bio: 'Award-winning designer with a passion for user experience.',
    avatar: '/avatars/sarah.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/sarahwilson',
      twitter: 'https://twitter.com/sarahwilson'
    }
  }
];

export const VALUES: Value[] = [
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'We constantly push boundaries to create better solutions for document management.',
    icon: Zap
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Your data security is our top priority. We implement industry-leading security measures.',
    icon: Shield
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description: 'We believe in the power of teamwork and building strong partnerships.',
    icon: Users
  },
  {
    id: 'excellence',
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from code to customer service.',
    icon: Award
  },
  {
    id: 'global',
    title: 'Global Impact',
    description: 'We re building solutions that help organizations worldwide work better together.',
    icon: Globe
  },
  {
    id: 'community',
    title: 'Community',
    description: 'We value our community and actively contribute to open source projects.',
    icon: Heart
  }
];

export const MILESTONES: Milestone[] = [
  {
    id: 'founding',
    year: 2020,
    title: 'Company Founded',
    description: 'File Nexus Suite was founded with a vision to revolutionize document management.'
  },
  {
    id: 'launch',
    year: 2021,
    title: 'Product Launch',
    description: 'Launched our first version with core document management features.'
  },
  {
    id: 'growth',
    year: 2022,
    title: 'Rapid Growth',
    description: 'Expanded to 50+ countries and reached 1 million users.'
  },
  {
    id: 'ai',
    year: 2023,
    title: 'AI Integration',
    description: 'Introduced advanced AI features for intelligent document processing.'
  },
  {
    id: 'enterprise',
    year: 2024,
    title: 'Enterprise Launch',
    description: 'Launched enterprise-grade features and security enhancements.'
  }
]; 