
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain } from "lucide-react";
import { Agent } from '../types/chatTypes';

interface AgentSelectorProps {
  agents: Agent[];
  selectedAgent: Agent | null;
  onAgentSelect: (agent: Agent | null) => void;
}

export const AgentSelector = ({ agents, selectedAgent, onAgentSelect }: AgentSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Writing Agent
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Select 
          value={selectedAgent?.id} 
          onValueChange={(agentId) => onAgentSelect(agents.find(a => a.id === agentId) || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a writing agent" />
          </SelectTrigger>
          <SelectContent>
            {agents.map((agent) => (
              <SelectItem key={agent.id} value={agent.id}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{agent.icon}</span>
                  <div>
                    <div className="font-medium">{agent.name}</div>
                    <div className="text-xs text-gray-500">{agent.description}</div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {selectedAgent && (
          <div className={`p-3 rounded-lg ${selectedAgent.color}`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{selectedAgent.icon}</span>
              <div>
                <div className="font-medium">{selectedAgent.name}</div>
                <div className="text-xs">{selectedAgent.description}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
