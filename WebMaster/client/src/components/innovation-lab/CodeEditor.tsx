import { useState } from "react";
import { Button } from "@/components/ui/button";
import { libraries, pythonCodeExample, programmingLanguages } from "@/lib/data";

type CodeEditorProps = {
  initialCode?: string;
  initialLanguage?: string;
};

const CodeEditor = ({ initialCode = pythonCodeExample, initialLanguage = "python" }: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState(initialLanguage);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    
    // Set example code for the selected language
    const selectedLang = programmingLanguages.find(l => l.id === lang);
    if (selectedLang && selectedLang.examples) {
      // Join examples with newlines and set as code
      setCode(selectedLang.examples.join('\n\n'));
    }
  };

  const runCode = () => {
    setIsRunning(true);
    
    // Different output messages based on selected language
    const selectedLang = programmingLanguages.find(l => l.id === language);
    
    if (language === "python") {
      setOutput([
        `$ Running ${language} script...`,
        "Importing libraries...",
        "Processing data...",
        "Generating visualization..."
      ]);
    } else if (language === "javascript") {
      setOutput([
        `$ Running ${language} code...`,
        "Initializing Node.js environment...",
        "Loading modules...",
        "Executing script..."
      ]);
    } else if (language === "java") {
      setOutput([
        `$ Compiling ${language} code...`,
        "javac Main.java",
        "$ Running class file...",
        "java Main"
      ]);
    } else if (language === "cpp") {
      setOutput([
        `$ Compiling ${language} code...`,
        "g++ -std=c++17 main.cpp -o program",
        "$ Running executable...",
        "./program"
      ]);
    }

    // Simulate code execution with success message
    setTimeout(() => {
      setOutput(prev => [...prev, `✓ ${selectedLang?.name || language} code executed successfully`]);
      setIsRunning(false);
    }, 1800);
  };

  // Create line numbers for the code editor
  const lines = code.split('\n');
  const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 bg-gray-800 text-white">
        <div className="flex justify-between items-center mb-3">
          <div className="flex space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
          <div className="text-sm text-gray-400">
            {programmingLanguages.find(l => l.id === language)?.description}
          </div>
        </div>
        
        <div className="flex space-x-4 text-sm overflow-x-auto">
          {programmingLanguages.map(lang => {
            const isActive = language === lang.id;
            return (
              <button 
                key={lang.id}
                className={`px-4 py-2 rounded-md flex items-center transition-all transform ${
                  isActive ? 'bg-primary text-white scale-105' : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => handleLanguageChange(lang.id)}
                style={{ 
                  boxShadow: isActive ? `0 4px 8px rgba(0,0,0,0.2), 0 0 0 2px ${lang.color}` : 'none',
                  borderLeft: isActive ? `4px solid ${lang.color}` : 'none'
                }}
              >
                <i className={`${lang.icon} mr-2`}></i>
                {lang.name}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 code-editor-container">
          <div className="flex">
            <div className="line-numbers text-gray-400 bg-gray-900 py-3 px-3 text-right">
              {lineNumbers.map(num => (
                <div key={num}>{num}</div>
              ))}
            </div>
            <textarea 
              className="code-editor bg-gray-900 text-white p-3 w-full code-font overflow-x-auto resize-none outline-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
            />
          </div>
        </div>
        
        <div className="md:w-1/4 bg-gray-100 p-4">
          <h3 className="font-bold mb-3 text-gray-900">Tools & Libraries</h3>
          <div className="space-y-2">
            {libraries.map((lib, index) => (
              <div key={index} className="flex items-center">
                <i className={`${lib.icon} text-primary mr-2`}></i>
                <span>{lib.name}</span>
              </div>
            ))}
          </div>
          <Button 
            className="mt-4 w-full bg-primary text-white"
            onClick={runCode}
            disabled={isRunning}
          >
            {isRunning ? "Running..." : "Run Code"}
          </Button>
        </div>
      </div>
      
      <div className="terminal-container bg-black text-green-400 p-4 code-font">
        <div className="flex justify-between items-center mb-2 text-xs text-gray-400 border-b border-gray-800 pb-2">
          <div>Terminal Output</div>
          <div className="flex space-x-3">
            <span>bash</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        {output.map((line, index) => {
          const langColor = programmingLanguages.find(l => l.id === language)?.color || '#3776AB';
          if (line.startsWith("$")) {
            return (
              <p key={index} className="text-gray-400 font-bold">
                {line}
              </p>
            );
          } else if (line.startsWith("✓")) {
            return (
              <p key={index} className="text-white font-bold" style={{ color: langColor }}>
                {line}
              </p>
            );
          } else {
            return <p key={index}>{line}</p>;
          }
        })}
        <p className="blink mt-1">_</p>
      </div>
    </div>
  );
};

export default CodeEditor;
