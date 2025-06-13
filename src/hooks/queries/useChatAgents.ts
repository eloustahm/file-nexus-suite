import { useChatQuery } from './useChatQuery';

export const useChatAgents = () => {
  const { agents, isLoadingAgents, agentsError, refetchAgents } = useChatQuery();

  return {
    agents,
    isLoading: isLoadingAgents,
    error: agentsError,
    refetch: refetchAgents,
  };
}; 