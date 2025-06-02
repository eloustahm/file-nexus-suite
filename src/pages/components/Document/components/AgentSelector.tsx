
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot } from "lucide-react";
import { Agent } from '../types/chatTypes';

interface AgentSelectorProps {
  agents: Agent[];
  selectedAgent: Agent;
  onAgentChange: (agentId: string) => void;
}

export const AgentSelector = ({ agents, selectedAgent, onAgentChange }: AgentSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Agents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedAgent.id === agent.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => onAgentChange(agent.id)}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">{agent.name}</span>
              <Badge variant="outline" className="text-xs">
                {agent.type}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{agent.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
