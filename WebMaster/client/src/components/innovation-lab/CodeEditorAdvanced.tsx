import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FileType, FolderType } from "./FileExplorer";
import FileExplorer from "./FileExplorer";
import EditorTabs from "./EditorTabs";
import Terminal from "./Terminal";
import AICodeAssistant from "./AICodeAssistant";
import EditorSettings, { EditorTheme, FontSize, TabSize } from "./EditorSettings";
import { Button } from "@/components/ui/button";
import { 
  FolderIcon, 
  SaveIcon, 
  PlayIcon, 
  Loader2Icon,
  DownloadIcon,
  GitBranchIcon,
  PlusIcon,
  SquareSplitHorizontalIcon,
  SquareSplitVerticalIcon
} from "lucide-react";
import { pythonCodeExample, programmingLanguages } from "@/lib/data";

interface CodeEditorAdvancedProps {
  initialCode?: string;
  initialLanguage?: string;
}

const sampleFiles: (FileType | FolderType)[] = [
  {
    id: "folder-1",
    name: "my-project",
    type: "folder",
    children: [
      {
        id: "file-1",
        name: "main.py",
        type: "file",
        language: "python",
        content: pythonCodeExample,
      },
      {
        id: "file-2",
        name: "styles.css",
        type: "file",
        language: "css",
        content: `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}`,
      },
      {
        id: "folder-2",
        name: "components",
        type: "folder",
        children: [
          {
            id: "file-3",
            name: "app.js",
            type: "file",
            language: "javascript",
            content: `// Main application component
import React from 'react';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Welcome to My Application</h1>
        <p>This is a sample application for demonstration</p>
      </header>
      <main>
        <p>Content goes here</p>
      </main>
    </div>
  );
}

export default App;`,
          },
        ],
      },
    ],
  },
];

const CodeEditorAdvanced: React.FC<CodeEditorAdvancedProps> = ({
  initialCode = pythonCodeExample,
  initialLanguage = "python",
}) => {
  // File management state
  const [files, setFiles] = useState<(FileType | FolderType)[]>(sampleFiles);
  const [openFiles, setOpenFiles] = useState<FileType[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  
  // Editor settings
  const [theme, setTheme] = useState<EditorTheme>("vs-dark");
  const [fontSize, setFontSize] = useState<FontSize>(14);
  const [tabSize, setTabSize] = useState<TabSize>(2);
  const [wordWrap, setWordWrap] = useState(true);
  const [minimap, setMinimap] = useState(true);
  
  // Code execution state
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  
  // UI state
  const [splitType, setSplitType] = useState<"vertical" | "horizontal" | null>(null);
  const [layout, setLayout] = useState<"default" | "explorer-only" | "editor-only">("default");
  
  // Initialize with first file open
  useEffect(() => {
    if (files.length > 0) {
      const firstFile = findFirstFile(files);
      if (firstFile && openFiles.length === 0) {
        handleFileSelect(firstFile.id, firstFile);
      }
    }
  }, [files]);
  
  const findFirstFile = (items: (FileType | FolderType)[]): FileType | null => {
    for (const item of items) {
      if (item.type === "file") {
        return item;
      } else if (item.type === "folder" && item.children.length > 0) {
        const file = findFirstFile(item.children);
        if (file) return file;
      }
    }
    return null;
  };
  
  const findFileById = (
    items: (FileType | FolderType)[],
    id: string
  ): FileType | null => {
    for (const item of items) {
      if (item.type === "file" && item.id === id) {
        return item;
      } else if (item.type === "folder") {
        const file = findFileById(item.children, id);
        if (file) return file;
      }
    }
    return null;
  };
  
  const updateFileContent = (id: string, content: string) => {
    const updateItems = (items: (FileType | FolderType)[]): (FileType | FolderType)[] => {
      return items.map((item) => {
        if (item.type === "file" && item.id === id) {
          return { ...item, content };
        } else if (item.type === "folder") {
          return {
            ...item,
            children: updateItems(item.children),
          };
        }
        return item;
      });
    };
    
    setFiles(updateItems(files));
    
    // Also update in open files
    setOpenFiles(
      openFiles.map((file) =>
        file.id === id ? { ...file, content } : file
      )
    );
  };
  
  const handleFileSelect = (fileId: string, file: FileType) => {
    // Check if file is already open
    if (!openFiles.some((f) => f.id === fileId)) {
      setOpenFiles([...openFiles, file]);
    }
    setActiveFileId(fileId);
  };
  
  const handleFileClose = (fileId: string) => {
    const newOpenFiles = openFiles.filter((file) => file.id !== fileId);
    setOpenFiles(newOpenFiles);
    
    // If we closed the active file, select another one
    if (activeFileId === fileId) {
      setActiveFileId(newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1].id : null);
    }
  };
  
  const handleTabSelect = (fileId: string) => {
    setActiveFileId(fileId);
  };
  
  const getActiveFile = (): FileType | null => {
    if (!activeFileId) return null;
    return openFiles.find((file) => file.id === activeFileId) || null;
  };
  
  const getFileLanguage = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    
    const extensionToLanguage: {[key: string]: string} = {
      'py': 'python',
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'h': 'c',
      'hpp': 'cpp',
      'md': 'markdown',
    };
    
    return extensionToLanguage[extension] || 'plaintext';
  };
  
  const addNewFile = (parentId?: string) => {
    const newFileName = `newfile-${openFiles.length + 1}.txt`;
    const newFile: FileType = {
      id: uuidv4(),
      name: newFileName,
      type: "file",
      content: "",
      language: "plaintext",
    };
    
    if (parentId) {
      // Add to specific folder
      const addToFolder = (
        items: (FileType | FolderType)[]
      ): (FileType | FolderType)[] => {
        return items.map((item) => {
          if (item.type === "folder" && item.id === parentId) {
            return {
              ...item,
              children: [...item.children, newFile],
            };
          } else if (item.type === "folder") {
            return {
              ...item,
              children: addToFolder(item.children),
            };
          }
          return item;
        });
      };
      
      setFiles(addToFolder(files));
    } else {
      // Add to root
      setFiles([...files, newFile]);
    }
    
    // Open the new file
    handleFileSelect(newFile.id, newFile);
  };
  
  const addNewFolder = (parentId?: string) => {
    const newFolderName = `new-folder-${Math.floor(Math.random() * 1000)}`;
    const newFolder: FolderType = {
      id: uuidv4(),
      name: newFolderName,
      type: "folder",
      children: [],
    };
    
    if (parentId) {
      // Add to specific folder
      const addToFolder = (
        items: (FileType | FolderType)[]
      ): (FileType | FolderType)[] => {
        return items.map((item) => {
          if (item.type === "folder" && item.id === parentId) {
            return {
              ...item,
              children: [...item.children, newFolder],
            };
          } else if (item.type === "folder") {
            return {
              ...item,
              children: addToFolder(item.children),
            };
          }
          return item;
        });
      };
      
      setFiles(addToFolder(files));
    } else {
      // Add to root
      setFiles([...files, newFolder]);
    }
  };
  
  const runCode = () => {
    const activeFile = getActiveFile();
    if (!activeFile) return;
    
    setIsRunning(true);
    setOutput([]);
    
    // Determine language from file extension
    const language = getFileLanguage(activeFile.name);
    
    // Add initial command output
    if (language === "python") {
      setOutput([
        `$ python ${activeFile.name}`,
        "Initializing Python interpreter...",
      ]);
    } else if (language === "javascript") {
      setOutput([
        `$ node ${activeFile.name}`,
        "Initializing Node.js runtime...",
      ]);
    } else if (language === "java") {
      setOutput([
        `$ javac ${activeFile.name}`,
        "Compiling Java code...",
        "$ java Main",
      ]);
    } else if (language === "cpp" || language === "c") {
      setOutput([
        `$ g++ ${activeFile.name} -o program`,
        "Compiling C++ code...",
        "$ ./program",
      ]);
    } else {
      setOutput([
        `$ Running ${activeFile.name}...`,
        "Initializing runtime...",
      ]);
    }
    
    // Simulate code execution
    setTimeout(() => {
      // Simulate code output based on content and language
      const content = activeFile.content.toLowerCase();
      let simulatedOutput: string[] = [];
      
      if (content.includes("print") || content.includes("console.log")) {
        simulatedOutput.push("Hello, world!");
        
        if (content.includes("error") || content.includes("exception")) {
          simulatedOutput.push("ERROR: An exception occurred during execution");
        }
        
        if (content.includes("for") || content.includes("while")) {
          simulatedOutput.push("Loop iteration 1");
          simulatedOutput.push("Loop iteration 2");
          simulatedOutput.push("Loop iteration 3");
        }
      } else if (content.includes("import") || content.includes("require")) {
        simulatedOutput.push("Imported modules successfully");
        
        if (content.includes("matplotlib") || content.includes("chart")) {
          simulatedOutput.push("Rendering visualization...");
          simulatedOutput.push("Graph successfully displayed");
        }
      }
      
      // Add success message if no output was generated
      if (simulatedOutput.length === 0) {
        simulatedOutput.push("Program executed successfully with no output");
      }
      
      // Add execution complete message
      simulatedOutput.push(`✓ Execution completed in 0.${Math.floor(Math.random() * 800) + 100}s`);
      
      setOutput(prev => [...prev, ...simulatedOutput]);
      setIsRunning(false);
    }, 1500);
  };
  
  const stopExecution = () => {
    setIsRunning(false);
    setOutput(prev => [...prev, "Execution terminated by user"]);
  };
  
  const handleSettingsChange = (settings: {
    theme?: EditorTheme;
    fontSize?: FontSize;
    tabSize?: TabSize;
    wordWrap?: boolean;
    minimap?: boolean;
  }) => {
    if (settings.theme) setTheme(settings.theme);
    if (settings.fontSize) setFontSize(settings.fontSize);
    if (settings.tabSize) setTabSize(settings.tabSize);
    if (settings.wordWrap !== undefined) setWordWrap(settings.wordWrap);
    if (settings.minimap !== undefined) setMinimap(settings.minimap);
  };
  
  const activeFile = getActiveFile();
  
  return (
    <div className="vs-code-editor border border-gray-700 rounded-lg overflow-hidden shadow-xl bg-gray-900 flex flex-col h-[800px] mt-8">
      {/* Top bar with tabs */}
      <div className="bg-gray-800 flex items-center justify-between px-2 py-1 border-b border-gray-700">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <FolderIcon className="h-4 w-4 text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <SaveIcon className="h-4 w-4 text-gray-400" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7" 
            onClick={runCode}
            disabled={isRunning || !activeFile}
          >
            {isRunning ? (
              <Loader2Icon className="h-4 w-4 text-blue-400 animate-spin" />
            ) : (
              <PlayIcon className="h-4 w-4 text-green-400" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <DownloadIcon className="h-4 w-4 text-gray-400" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <GitBranchIcon className="h-4 w-4 text-gray-400" />
          </Button>
          <div className="text-gray-500 text-xs border-l border-gray-700 pl-2 ml-2">
            {activeFile ? activeFile.name : "No file open"}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <AICodeAssistant 
            currentLanguage={activeFile ? getFileLanguage(activeFile.name) : "plaintext"}
            currentCode={activeFile ? activeFile.content : ""}
            onApplyCode={(code) => {
              if (activeFile) {
                updateFileContent(activeFile.id, code);
              }
            }}
          />
          
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setSplitType(splitType === "vertical" ? null : "vertical")}
          >
            <SquareSplitVerticalIcon className={`h-4 w-4 ${splitType === "vertical" ? "text-blue-400" : "text-gray-400"}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setSplitType(splitType === "horizontal" ? null : "horizontal")}
          >
            <SquareSplitHorizontalIcon className={`h-4 w-4 ${splitType === "horizontal" ? "text-blue-400" : "text-gray-400"}`} />
          </Button>
          
          <EditorSettings
            theme={theme}
            fontSize={fontSize}
            tabSize={tabSize}
            wordWrap={wordWrap}
            minimap={minimap}
            onSettingsChange={handleSettingsChange}
          />
        </div>
      </div>
      
      {/* Main editor area */}
      <div className="flex flex-1 overflow-hidden">
        {/* File explorer */}
        <div className="w-52 flex-shrink-0 overflow-auto">
          <FileExplorer
            files={files}
            currentFile={activeFileId}
            onFileSelect={handleFileSelect}
            onAddFile={addNewFile}
            onAddFolder={addNewFolder}
          />
        </div>
        
        {/* Editor area */}
        <div className="flex-grow flex flex-col">
          {/* Editor tabs */}
          <EditorTabs
            openFiles={openFiles}
            activeFileId={activeFileId}
            onSelectTab={handleTabSelect}
            onCloseTab={handleFileClose}
          />
          
          {/* Editor content */}
          <div className="flex-grow overflow-hidden">
            {activeFile ? (
              <div className="relative h-full">
                <div className="absolute inset-0 flex">
                  <div className="flex-grow">
                    <div className="code-editor h-full bg-gray-900 text-gray-300 p-3 font-mono text-sm">
                      <div className="flex flex-row h-full">
                        <div className="line-numbers text-gray-600 pr-3 text-right select-none">
                          {activeFile.content.split('\n').map((_, i) => (
                            <div key={i}>{i + 1}</div>
                          ))}
                        </div>
                        <div className="flex-1 h-full">
                          <textarea
                            className="w-full h-full bg-transparent outline-none resize-none font-mono overflow-y-auto"
                            value={activeFile.content}
                            onChange={(e) => updateFileContent(activeFile.id, e.target.value)}
                            spellCheck="false"
                            rows={20}
                            style={{ minHeight: "400px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {splitType && (
                    <div className="flex-grow">
                      <div className="code-editor h-full overflow-hidden bg-gray-900 text-gray-300 p-3 font-mono text-sm opacity-50 flex justify-center items-center">
                        <div className="text-center">
                          <PlusIcon className="h-8 w-8 mx-auto mb-2 opacity-30" />
                          <p className="text-gray-400">Split view</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Open another file to view side by side
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <FolderIcon className="h-16 w-16 mb-4 opacity-20" />
                <h3 className="text-xl font-medium mb-2">No File Open</h3>
                <p className="text-sm text-gray-600 max-w-md text-center">
                  Select a file from the file explorer or create a new file to get started.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4 border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={() => addNewFile()}
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  New File
                </Button>
              </div>
            )}
          </div>
          
          {/* Terminal */}
          <Terminal
            language={activeFile ? getFileLanguage(activeFile.name) : "plaintext"}
            code={activeFile ? activeFile.content : ""}
            isRunning={isRunning}
            onRun={runCode}
            onStop={stopExecution}
            output={output}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditorAdvanced;