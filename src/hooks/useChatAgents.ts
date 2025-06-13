import { useState } from 'react';
import { Agent } from '@/types';
import { agents } from '@/config/agents';

export const useChatAgents = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const getAgentSwitchMessage = (agent: Agent) => {
    switch (agent.personality) {
      case 'formal':
        return 'I am now operating in professional mode. I will provide formal, detailed responses with comprehensive analysis.';
      case 'creative':
        return 'Hey there! 🎨 I\'ve switched to creative mode! Let\'s explore these documents with some fresh, imaginative perspectives!';
      case 'analytical':
        return 'Data mode activated! 📊 I\'ll focus on metrics, trends, and quantitative insights from your documents.';
      case 'casual':
        return 'Cool! 😊 I\'m now in casual mode - let\'s chat about your docs in a friendly, easy-going way!';
      default:
        return 'Agent mode updated successfully.';
    }
  };

  const getAgentResponse = (userMessage: string, agent: Agent, selectedDocuments: string[]) => {
    const baseResponse = selectedDocuments.length === 0 
      ? 'Please select one or more documents first so I can provide specific insights.'
      : selectedDocuments.length === 1
      ? `Based on "${selectedDocuments[0]}", here's what I found: ${userMessage.includes('summary') ? 'This document contains key information about project timelines and budget allocations...' : 'I can help you with specific questions about this document.'}`
      : `Analyzing ${selectedDocuments.length} documents (${selectedDocuments.slice(0, 2).join(', ')}${selectedDocuments.length > 2 ? ` and ${selectedDocuments.length - 2} more` : ''}): ${userMessage.includes('summary') ? 'I found common themes across these documents including budget considerations, project timelines, and strategic objectives...' : 'I can help you find connections and insights across these documents.'}`;

    switch (agent.personality) {
      case 'formal':
        return `${baseResponse} I recommend reviewing the key metrics and ensuring alignment with organizational objectives.`;
      case 'creative':
        return `🌟 ${baseResponse} There are some really interesting patterns here that could spark new ideas!`;
      case 'analytical':
        return `📈 ${baseResponse} Let me break down the data points: 85% relevance score, 3 key themes identified, 7 actionable insights extracted.`;
      case 'casual':
        return `${baseResponse} Pretty cool stuff in there! Let me know if you want me to dive deeper into anything specific! 😄`;
      default:
        return baseResponse;
    }
  };

  return {
    agents,
    selectedAgent,
    setSelectedAgent,
    getAgentSwitchMessage,
    getAgentResponse
  };
};
