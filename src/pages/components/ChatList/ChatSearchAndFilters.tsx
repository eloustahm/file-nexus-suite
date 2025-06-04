
import React from 'react';
import {
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  Box
} from '@mui/material';
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
    <Paper sx={{ p: 3, mb: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box display="flex" gap={1}>
            <Chip
              label="All"
              onClick={() => onFilterChange('all')}
              color={filterType === 'all' ? 'primary' : 'default'}
              variant={filterType === 'all' ? 'filled' : 'outlined'}
            />
            <Chip
              label="Recent"
              onClick={() => onFilterChange('recent')}
              color={filterType === 'recent' ? 'primary' : 'default'}
              variant={filterType === 'recent' ? 'filled' : 'outlined'}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
