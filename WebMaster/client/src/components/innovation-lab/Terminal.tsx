import { useState, useEffect, useRef } from "react";
import { 
  MaximizeIcon, 
  MinimizeIcon, 
  XIcon,
  PlayIcon,
  SquareIcon,
  TerminalIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TerminalProps {
  language: string;
  code: string;
  isRunning: boolean;
  onRun: () => void;
  onStop: () => void;
  output: string[];
}

const Terminal: React.FC<TerminalProps> = ({ 
  language, 
  code, 
  isRunning, 
  onRun, 
  onStop, 
  output 
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever output changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const formatOutput = (line: string, index: number) => {
    if (line.startsWith("$")) {
      return (
        <div key={index} className="text-gray-400 font-mono">
          {line}
        </div>
      );
    } else if (line.startsWith("✓")) {
      return (
        <div key={index} className="text-green-400 font-mono">
          {line}
        </div>
      );
    } else if (line.startsWith("ERROR") || line.startsWith("Error")) {
      return (
        <div key={index} className="text-red-400 font-mono">
          {line}
        </div>
      );
    } else if (line.startsWith("WARNING") || line.startsWith("Warning")) {
      return (
        <div key={index} className="text-yellow-400 font-mono">
          {line}
        </div>
      );
    } else {
      return (
        <div key={index} className="text-gray-300 font-mono">
          {line}
        </div>
      );
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-900 rounded-md shadow-lg border border-gray-700 w-48">
        <div className="flex justify-between items-center p-2 border-b border-gray-700">
          <div className="flex items-center">
            <TerminalIcon className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-xs text-gray-300">Terminal</span>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={() => setIsMinimized(false)}
            >
              <MaximizeIcon className="h-3 w-3 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-gray-900 flex flex-col ${
        isFullScreen 
        ? "fixed inset-0 z-50" 
        : "rounded-b-lg border-t border-gray-700 h-56"
      }`}
    >
      <div className="flex justify-between items-center px-3 py-1 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center">
          <TerminalIcon className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-xs text-gray-300">Terminal</span>
        </div>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsMinimized(true)}
          >
            <MinimizeIcon className="h-3 w-3 text-gray-400" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsFullScreen(!isFullScreen)}
          >
            {isFullScreen ? (
              <MinimizeIcon className="h-3 w-3 text-gray-400" />
            ) : (
              <MaximizeIcon className="h-3 w-3 text-gray-400" />
            )}
          </Button>
          {isFullScreen && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsFullScreen(false)}
            >
              <XIcon className="h-3 w-3 text-gray-400" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex-grow overflow-auto p-2" ref={terminalRef}>
        <div className="flex justify-end mb-2">
          <Button
            size="sm"
            variant={isRunning ? "destructive" : "default"}
            className={`h-7 ${isRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
            onClick={isRunning ? onStop : onRun}
          >
            {isRunning ? (
              <>
                <SquareIcon className="h-3 w-3 mr-1" />
                <span className="text-xs">Stop</span>
              </>
            ) : (
              <>
                <PlayIcon className="h-3 w-3 mr-1" />
                <span className="text-xs">Run</span>
              </>
            )}
          </Button>
        </div>
        
        {output.length === 0 ? (
          <div className="italic text-gray-500 text-sm font-mono p-1">
            Click "Run" to execute your code...
          </div>
        ) : (
          <div className="font-mono text-xs space-y-1">
            {output.map((line, index) => formatOutput(line, index))}
            <div className="h-4 w-2 bg-gray-400 animate-pulse inline-block ml-1"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;