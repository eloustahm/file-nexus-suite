
import React from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';

interface ChatSearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: 'all' | 'recent';
  onFilterChange: (filter: 'all' | 'recent') => void;
}

export const ChatSearchAndFilters: React.FC<ChatSearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange
}) => {
  return (
    <Card className="p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="md:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Badge
            variant={filterType === 'all' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => onFilterChange('all')}
          >
            All
          </Badge>
          <Badge
            variant={filterType === 'recent' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => onFilterChange('recent')}
          >
            Recent
          </Badge>
        </div>
      </div>
    </Card>
  );
};
