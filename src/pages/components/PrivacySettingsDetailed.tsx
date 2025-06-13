import { useState } from 'react';
import { usePrivacySettings } from '@/hooks/usePrivacySettings';
import { PRIVACY_CATEGORIES } from '@/constants/privacy';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SectionLoading } from '@/components/LoadingStates';

export function PrivacySettingsDetailed() {
  const [activeCategory, setActiveCategory] = useState(PRIVACY_CATEGORIES[0].id);
  const {
    settings,
    isLoading,
    updateSetting
  } = usePrivacySettings();

  if (isLoading) {
    return <SectionLoading message="Loading privacy settings..." />;
  }

  const categorySettings = settings.filter(setting => setting.category === activeCategory);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Privacy Settings</h2>
        <p className="text-muted-foreground">
          Manage your privacy preferences and data settings
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-3">
          {PRIVACY_CATEGORIES.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {PRIVACY_CATEGORIES.map(category => (
          <TabsContent key={category.id} value={category.id}>
            <div className="space-y-4">
              {categorySettings.map(setting => {
                const Icon = setting.icon;
                return (
                  <Card key={setting.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{setting.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {setting.description}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={setting.enabled}
                        onCheckedChange={(checked) =>
                          updateSetting.mutate({ id: setting.id, enabled: checked })
                        }
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
