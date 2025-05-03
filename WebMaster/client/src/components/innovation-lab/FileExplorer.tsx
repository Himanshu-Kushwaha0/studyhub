import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  FolderIcon, 
  FileIcon, 
  FileTextIcon, 
  FilePlusIcon, 
  FilesIcon,
  FolderPlusIcon,
  MoreVerticalIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type FileType = {
  id: string;
  name: string;
  content: string;
  type: "file";
  language: string;
};

export type FolderType = {
  id: string;
  name: string;
  type: "folder";
  children: (FileType | FolderType)[];
};

type FileExplorerProps = {
  files: (FileType | FolderType)[];
  currentFile: string | null;
  onFileSelect: (fileId: string, file: FileType) => void;
  onAddFile: (parentId?: string) => void;
  onAddFolder: (parentId?: string) => void;
};

const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  currentFile,
  onFileSelect,
  onAddFile,
  onAddFolder,
}) => {
  const [expandedFolders, setExpandedFolders] = useState<{ [key: string]: boolean }>({});

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const getFileIcon = (file: FileType) => {
    switch (file.language) {
      case "javascript":
        return <FileTextIcon className="w-4 h-4 text-yellow-400" />;
      case "python":
        return <FileTextIcon className="w-4 h-4 text-blue-500" />;
      case "java":
        return <FileTextIcon className="w-4 h-4 text-orange-500" />;
      case "cpp":
        return <FileTextIcon className="w-4 h-4 text-blue-700" />;
      case "html":
        return <FileTextIcon className="w-4 h-4 text-red-500" />;
      case "css":
        return <FileTextIcon className="w-4 h-4 text-blue-400" />;
      default:
        return <FileIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const renderItem = (item: FileType | FolderType, depth = 0) => {
    const paddingLeft = `${depth * 12 + 8}px`;

    if (item.type === "folder") {
      const isExpanded = expandedFolders[item.id] || false;
      
      return (
        <li key={item.id}>
          <div 
            className="flex items-center py-1 hover:bg-gray-700 cursor-pointer pr-2 rounded"
            style={{ paddingLeft }}
            onClick={() => toggleFolder(item.id)}
          >
            <FolderIcon 
              className={`w-4 h-4 mr-2 ${isExpanded ? 'text-blue-400' : 'text-yellow-400'}`} 
            />
            <span className="text-sm text-gray-200 flex-grow">{item.name}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVerticalIcon className="h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-gray-800 text-gray-200 border-gray-700">
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onAddFile(item.id);
                }}>
                  <FilePlusIcon className="mr-2 h-4 w-4" />
                  <span>Add File</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onAddFolder(item.id);
                }}>
                  <FolderPlusIcon className="mr-2 h-4 w-4" />
                  <span>Add Folder</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {isExpanded && (
            <ul className="list-none">
              {item.children.map((child) => renderItem(child, depth + 1))}
            </ul>
          )}
        </li>
      );
    } else {
      // File item
      return (
        <li key={item.id}>
          <div 
            className={`flex items-center py-1 hover:bg-gray-700 cursor-pointer rounded px-2 ${
              currentFile === item.id ? "bg-blue-900/50 text-white" : ""
            }`}
            style={{ paddingLeft }}
            onClick={() => onFileSelect(item.id, item)}
          >
            {getFileIcon(item)}
            <span className="text-sm text-gray-200 ml-2">{item.name}</span>
          </div>
        </li>
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 border-r border-gray-700">
      <div className="flex justify-between items-center p-2 border-b border-gray-700">
        <h3 className="font-medium text-sm text-gray-200">EXPLORER</h3>
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => onAddFile()}
          >
            <FilePlusIcon className="h-4 w-4 text-gray-400" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => onAddFolder()}
          >
            <FolderPlusIcon className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      </div>
      <div className="overflow-y-auto flex-grow p-1">
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-sm text-gray-400 p-4">
            <FilesIcon className="h-10 w-10 mb-2 opacity-40" />
            <p className="text-center">No files yet. Create a new file to get started.</p>
          </div>
        ) : (
          <ul className="list-none">
            {files.map((item) => renderItem(item))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;