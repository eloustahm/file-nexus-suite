
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Template } from '@/types';

interface TemplateFieldEditorProps {
  template: Template;
  onFieldChange: (fieldName: string, value: string) => void;
}

export const TemplateFieldEditor = ({ template, onFieldChange }: TemplateFieldEditorProps) => {
  return (
    <div className="space-y-4">
      {template.fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name}>
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          
          {field.type === 'text' && (
            <Input
              id={field.name}
              value={field.value || ''}
              onChange={(e) => onFieldChange(field.name, e.target.value)}
              placeholder={`Enter ${field.label.toLowerCase()}...`}
              required={field.required}
            />
          )}
          
          {field.type === 'textarea' && (
            <Textarea
              id={field.name}
              value={field.value || ''}
              onChange={(e) => onFieldChange(field.name, e.target.value)}
              placeholder={`Enter ${field.label.toLowerCase()}...`}
              rows={4}
              required={field.required}
            />
          )}
          
          {field.type === 'select' && field.options && (
            <Select value={field.value || ''} onValueChange={(value) => onFieldChange(field.name, value)}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${field.label.toLowerCase()}...`} />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          {field.type === 'date' && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => onFieldChange(field.name, date ? date.toISOString() : '')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
      ))}
    </div>
  );
};
