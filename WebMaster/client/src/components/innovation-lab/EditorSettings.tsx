import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  SettingsIcon, 
  MoonIcon, 
  SunIcon, 
  PaletteIcon,
  LayoutIcon,
  TextIcon
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export type EditorTheme = "vs-dark" | "light" | "hc-black" | "github" | "monokai";
export type FontSize = 12 | 14 | 16 | 18 | 20;
export type TabSize = 2 | 4;

interface EditorSettingsProps {
  theme: EditorTheme;
  fontSize: FontSize;
  tabSize: TabSize;
  wordWrap: boolean;
  minimap: boolean;
  onSettingsChange: (settings: {
    theme?: EditorTheme;
    fontSize?: FontSize;
    tabSize?: TabSize;
    wordWrap?: boolean;
    minimap?: boolean;
  }) => void;
}

const EditorSettings: React.FC<EditorSettingsProps> = ({
  theme,
  fontSize,
  tabSize,
  wordWrap,
  minimap,
  onSettingsChange,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <SettingsIcon className="h-4 w-4 text-gray-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-gray-800 border-gray-700 text-gray-100">
        <div className="space-y-4">
          <h4 className="font-medium text-sm border-b border-gray-700 pb-2">Editor Settings</h4>
          
          <Tabs defaultValue="appearance">
            <TabsList className="bg-gray-900 text-gray-400">
              <TabsTrigger value="appearance" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                <PaletteIcon className="h-4 w-4 mr-2" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="editor" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                <TextIcon className="h-4 w-4 mr-2" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="layout" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                <LayoutIcon className="h-4 w-4 mr-2" />
                Layout
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="space-y-3 pt-3">
              <div className="space-y-1">
                <Label className="text-xs text-gray-400">Theme</Label>
                <Select
                  value={theme}
                  onValueChange={(value) => onSettingsChange({ theme: value as EditorTheme })}
                >
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-300">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-gray-300">
                    <SelectItem value="vs-dark">VS Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="hc-black">High Contrast</SelectItem>
                    <SelectItem value="github">GitHub</SelectItem>
                    <SelectItem value="monokai">Monokai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label className="text-xs text-gray-400">Font Size: {fontSize}px</Label>
                <Slider
                  defaultValue={[fontSize]}
                  min={12}
                  max={20}
                  step={2}
                  onValueChange={(value) => onSettingsChange({ fontSize: value[0] as FontSize })}
                  className="py-2"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="editor" className="space-y-3 pt-3">
              <div className="space-y-1">
                <Label className="text-xs text-gray-400">Tab Size</Label>
                <Select
                  value={tabSize.toString()}
                  onValueChange={(value) => onSettingsChange({ tabSize: parseInt(value) as TabSize })}
                >
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-gray-300">
                    <SelectValue placeholder="Select tab size" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-gray-300">
                    <SelectItem value="2">2 spaces</SelectItem>
                    <SelectItem value="4">4 spaces</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Word Wrap</Label>
                <Switch
                  checked={wordWrap}
                  onCheckedChange={(checked) => onSettingsChange({ wordWrap: checked })}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="layout" className="space-y-3 pt-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-400">Show Minimap</Label>
                <Switch
                  checked={minimap}
                  onCheckedChange={(checked) => onSettingsChange({ minimap: checked })}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditorSettings;