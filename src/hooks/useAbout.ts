import { useQuery } from '@tanstack/react-query';
import { TEAM_MEMBERS, VALUES, MILESTONES, type TeamMember, type Value, type Milestone } from '@/constants/about';

// Mock API function - replace with actual API call
const fetchAboutData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    teamMembers: TEAM_MEMBERS,
    values: VALUES,
    milestones: MILESTONES
  };
};

export const useAbout = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['about'],
    queryFn: fetchAboutData
  });

  const getTeamMember = (id: string) => {
    return data?.teamMembers.find(member => member.id === id);
  };

  const getValue = (id: string) => {
    return data?.values.find(value => value.id === id);
  };

  const getMilestone = (id: string) => {
    return data?.milestones.find(milestone => milestone.id === id);
  };

  const getMilestonesByYear = (year: number) => {
    return data?.milestones.filter(milestone => milestone.year === year);
  };

  return {
    teamMembers: data?.teamMembers ?? [],
    values: data?.values ?? [],
    milestones: data?.milestones ?? [],
    isLoading,
    error,
    getTeamMember,
    getValue,
    getMilestone,
    getMilestonesByYear
  };
}; 