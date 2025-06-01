
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Key, 
  Eye, 
  EyeOff, 
  Check, 
  AlertTriangle,
  Save,
  Trash2,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Integrations = () => {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    openai: localStorage.getItem('openai_api_key') || '',
    perplexity: localStorage.getItem('perplexity_api_key') || '',
    elevenlabs: localStorage.getItem('elevenlabs_api_key') || ''
  });
  const [integrationStatus, setIntegrationStatus] = useState({
    openai: !!localStorage.getItem('openai_api_key'),
    perplexity: !!localStorage.getItem('perplexity_api_key'),
    elevenlabs: !!localStorage.getItem('elevenlabs_api_key')
  });

  const handleApiKeyChange = (service: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [service]: value }));
  };

  const handleSaveApiKey = (service: string) => {
    const key = apiKeys[service as keyof typeof apiKeys];
    if (key.trim()) {
      localStorage.setItem(`${service}_api_key`, key);
      setIntegrationStatus(prev => ({ ...prev, [service]: true }));
      toast({
        title: "API Key Saved",
        description: `${service.charAt(0).toUpperCase() + service.slice(1)} API key has been saved securely.`,
      });
    }
  };

  const handleRemoveApiKey = (service: string) => {
    localStorage.removeItem(`${service}_api_key`);
    setApiKeys(prev => ({ ...prev, [service]: '' }));
    setIntegrationStatus(prev => ({ ...prev, [service]: false }));
    toast({
      title: "API Key Removed",
      description: `${service.charAt(0).toUpperCase() + service.slice(1)} API key has been removed.`,
    });
  };

  const maskApiKey = (key: string) => {
    if (!key) return '';
    return key.length > 8 ? `${key.substring(0, 4)}${'*'.repeat(key.length - 8)}${key.substring(key.length - 4)}` : key;
  };

  const integrations = [
    {
      id: 'openai',
      name: 'OpenAI',
      description: 'Enable AI-powered document generation, summarization, and chat features',
      icon: '🤖',
      features: ['Document Generation', 'AI Chat', 'Summarization', 'Classification']
    },
    {
      id: 'perplexity',
      name: 'Perplexity AI',
      description: 'Add real-time web search and research capabilities to your documents',
      icon: '🔍',
      features: ['Web Search', 'Research Assistant', 'Fact Checking']
    },
    {
      id: 'elevenlabs',
      name: 'ElevenLabs',
      description: 'Convert your documents to high-quality speech with AI voices',
      icon: '🎤',
      features: ['Text-to-Speech', 'Voice Cloning', 'Audio Generation']
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        <p className="text-gray-600 mt-1">Connect external services to enhance your workflow</p>
      </div>

      <div className="grid gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{integration.icon}</div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {integration.name}
                      {integrationStatus[integration.id as keyof typeof integrationStatus] && (
                        <Badge className="bg-green-100 text-green-800">
                          <Check className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {integration.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label htmlFor={`${integration.id}-key`}>API Key</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id={`${integration.id}-key`}
                      type={showApiKey ? "text" : "password"}
                      placeholder={`Enter your ${integration.name} API key`}
                      value={apiKeys[integration.id as keyof typeof apiKeys]}
                      onChange={(e) => handleApiKeyChange(integration.id, e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button 
                    onClick={() => handleSaveApiKey(integration.id)}
                    disabled={!apiKeys[integration.id as keyof typeof apiKeys]}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  {integrationStatus[integration.id as keyof typeof integrationStatus] && (
                    <Button 
                      variant="outline"
                      onClick={() => handleRemoveApiKey(integration.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {integrationStatus[integration.id as keyof typeof integrationStatus] && (
                  <div className="text-sm text-gray-600">
                    Current key: {maskApiKey(apiKeys[integration.id as keyof typeof apiKeys])}
                  </div>
                )}
              </div>

              {!integrationStatus[integration.id as keyof typeof integrationStatus] && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    API key required to use {integration.name} features
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Notice</CardTitle>
          <CardDescription>Important information about API key storage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              • API keys are stored locally in your browser and are not sent to our servers
            </p>
            <p>
              • Keys are encrypted and only accessible from this device
            </p>
            <p>
              • You can remove your API keys at any time using the delete button
            </p>
            <p>
              • For production use, consider using environment variables or a secure key management service
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
