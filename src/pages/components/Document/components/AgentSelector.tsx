
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Brain, FileText, Search } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  type: string;
  description: string;
  avatar?: string;
  capabilities: string[];
}

interface AgentSelectorProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onAgentChange: (agent: Agent) => void;
}

export const AgentSelector: React.FC<AgentSelectorProps> = ({
  agents,
  selectedAgent,
  onAgentChange
}) => {
  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'research':
        return Search;
      case 'analysis':
        return Brain;
      case 'document':
        return FileText;
      default:
        return Bot;
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => {
          const IconComponent = getAgentIcon(agent.type);
          return (
            <Card 
              key={agent.id} 
              className={`cursor-pointer transition-all ${
                selectedAgent?.id === agent.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
              }`}
              onClick={() => onAgentChange(agent)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {agent.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-3">
                  {agent.description}
                </CardDescription>
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.slice(0, 3).map((capability, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {capability}
                    </Badge>
                  ))}
                  {agent.capabilities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{agent.capabilities.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
