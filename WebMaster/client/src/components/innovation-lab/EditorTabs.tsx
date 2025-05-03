import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { FileType } from "./FileExplorer";

interface EditorTabsProps {
  openFiles: FileType[];
  activeFileId: string | null;
  onSelectTab: (fileId: string) => void;
  onCloseTab: (fileId: string) => void;
}

const EditorTabs: React.FC<EditorTabsProps> = ({
  openFiles,
  activeFileId,
  onSelectTab,
  onCloseTab,
}) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const getLanguageColor = (language: string) => {
    switch (language) {
      case "javascript":
        return "bg-yellow-400";
      case "python":
        return "bg-blue-500";
      case "java":
        return "bg-orange-500";
      case "cpp":
        return "bg-blue-700";
      case "html":
        return "bg-red-500";
      case "css":
        return "bg-blue-400";
      default:
        return "bg-gray-500";
    }
  };

  if (openFiles.length === 0) {
    return (
      <div className="bg-gray-900 h-9 px-2 flex items-center border-b border-gray-700">
        <span className="text-gray-500 text-xs italic">No open files</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 h-9 flex items-center overflow-x-auto border-b border-gray-700 no-scrollbar">
      {openFiles.map((file) => (
        <div
          key={file.id}
          className={`flex items-center h-full px-3 border-r border-gray-700 relative group select-none ${
            activeFileId === file.id
              ? "bg-gray-800 text-white"
              : "bg-gray-900 text-gray-400 hover:bg-gray-800"
          }`}
          onClick={() => onSelectTab(file.id)}
          onMouseEnter={() => setHoveredTab(file.id)}
          onMouseLeave={() => setHoveredTab(null)}
        >
          <div
            className={`h-0.5 absolute top-0 left-0 right-0 ${
              activeFileId === file.id ? getLanguageColor(file.language) : "bg-transparent"
            }`}
          ></div>
          <span className="text-xs whitespace-nowrap mr-2">{file.name}</span>
          <Button
            variant="ghost"
            size="icon"
            className={`h-5 w-5 rounded-full ${
              hoveredTab === file.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onCloseTab(file.id);
            }}
          >
            <XIcon className="h-3 w-3 text-gray-400 hover:text-gray-200" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default EditorTabs;