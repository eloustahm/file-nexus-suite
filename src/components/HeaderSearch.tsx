
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, FileText, Folder, Users, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeaderSearch = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const searchResults = [
    {
      type: "document",
      title: "Marketing Report.pdf",
      description: "Last modified 2 days ago",
      icon: FileText,
      path: "/documents"
    },
    {
      type: "folder",
      title: "Project Files",
      description: "Contains 12 documents",
      icon: Folder,
      path: "/folders"
    },
    {
      type: "workflow",
      title: "Document Review Process",
      description: "Active workflow with 3 steps",
      icon: Settings,
      path: "/workflow"
    },
    {
      type: "page",
      title: "User Profile",
      description: "Manage your account settings",
      icon: Users,
      path: "/profile"
    }
  ];

  const filteredResults = searchResults.filter(result =>
    result.title.toLowerCase().includes(value.toLowerCase()) ||
    result.description.toLowerCase().includes(value.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    setOpen(false);
    setValue("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-64 justify-start text-gray-500">
          <Search className="h-4 w-4 mr-2" />
          Search documents, folders...
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-white" align="start">
        <Command>
          <CommandInput 
            placeholder="Search documents, folders..." 
            value={value}
            onValueChange={setValue}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Results">
              {filteredResults.map((result, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => handleSelect(result.path)}
                  className="flex items-center gap-3 p-3 cursor-pointer"
                >
                  <result.icon className="h-4 w-4" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{result.title}</p>
                    <p className="text-xs text-gray-500">{result.description}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
