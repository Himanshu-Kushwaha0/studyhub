import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, SendIcon, BrainCogIcon, CheckIcon, XIcon, CodeIcon, BookIcon, LightbulbIcon, KeyRound } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { ApiKeyModal, ApiServiceType } from "@/components/ui/api-key-modal";
import { apiRequest } from "@/lib/queryClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AICodeAssistantProps {
  currentLanguage: string;
  currentCode: string;
  onApplyCode: (code: string) => void;
}

// Common code snippets by language
const codeSnippets: Record<string, Array<{name: string, description: string, code: string}>> = {
  "python": [
    {
      name: "List Comprehension",
      description: "Create a new list by filtering and transforming elements",
      code: 
`# Generate a list of squared numbers for even values from 1-10
squares = [x**2 for x in range(1, 11) if x % 2 == 0]
print(squares)  # [4, 16, 36, 64, 100]`
    },
    {
      name: "API Request",
      description: "Send HTTP request and process JSON response",
      code:
`import requests

def fetch_data(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise exception for 4XX/5XX responses
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

# Example usage
data = fetch_data("https://api.example.com/data")
if data:
    print(f"Received {len(data)} items")`
    },
    {
      name: "File I/O",
      description: "Read and write files with proper error handling",
      code:
`def read_file(filename):
    try:
        with open(filename, 'r') as file:
            return file.read()
    except FileNotFoundError:
        print(f"File {filename} not found")
        return None
    except Exception as e:
        print(f"Error reading file: {e}")
        return None

def write_file(filename, content):
    try:
        with open(filename, 'w') as file:
            file.write(content)
        return True
    except Exception as e:
        print(f"Error writing file: {e}")
        return False

# Example usage
data = read_file('input.txt')
if data:
    modified_data = data.upper()
    write_file('output.txt', modified_data)`
    },
    {
      name: "Simple Flask Web App",
      description: "Basic Flask application with routes and templates",
      code:
`from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Mock database as a simple list
items = []

@app.route('/')
def index():
    return render_template('index.html', items=items)

@app.route('/add', methods=['POST'])
def add_item():
    item = request.form.get('item')
    if item:
        items.append(item)
    return redirect(url_for('index'))

@app.route('/clear')
def clear_items():
    items.clear()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')`
    },
    {
      name: "Data Analysis with Pandas",
      description: "Basic data manipulation with pandas library",
      code:
`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Create a sample DataFrame
data = {
    'Name': ['John', 'Anna', 'Peter', 'Linda'],
    'Age': [28, 34, 29, 42],
    'City': ['New York', 'Boston', 'San Francisco', 'Chicago'],
    'Salary': [65000, 78000, 82000, 69000]
}

df = pd.DataFrame(data)
print("DataFrame:")
print(df)

# Basic statistics
print("\nBasic statistics:")
print(df.describe())

# Filtering data
print("\nPeople older than 30:")
print(df[df['Age'] > 30])

# Adding a new column
df['Salary After Tax'] = df['Salary'] * 0.7
print("\nDataFrame with new column:")
print(df)

# Grouping data
grouped = df.groupby('City').mean()
print("\nAverage by city:")
print(grouped)`
    }
  ],
  "javascript": [
    {
      name: "Array Methods",
      description: "Common array operations with map, filter, and reduce",
      code:
`// Sample data
const users = [
  { id: 1, name: 'John', age: 25, active: true },
  { id: 2, name: 'Jane', age: 30, active: false },
  { id: 3, name: 'Bob', age: 22, active: true },
  { id: 4, name: 'Alice', age: 28, active: true }
];

// Map - transform each element
const names = users.map(user => user.name);
console.log(names); // ['John', 'Jane', 'Bob', 'Alice']

// Filter - keep elements that match condition
const activeUsers = users.filter(user => user.active);
console.log(activeUsers.length); // 3

// Reduce - accumulate values
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
console.log(totalAge); // 105

// Chaining operations
const averageAgeOfActiveUsers = users
  .filter(user => user.active)
  .reduce((sum, user, index, array) => sum + user.age / array.length, 0);
console.log(averageAgeOfActiveUsers); // 25`
    },
    {
      name: "Fetch API",
      description: "Make HTTP requests and handle responses",
      code:
`// Basic GET request
async function fetchData(url) {
  try {
    const response = await fetch(url);
    
    // Check if the response is ok (status 200-299)
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

// POST request with JSON body
async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! Status: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Post error:', error);
    return null;
  }
}

// Example usage
fetchData('https://api.example.com/users')
  .then(data => {
    if (data) console.log('Users:', data);
  });`
    },
    {
      name: "React Component",
      description: "Create a functional React component with hooks",
      code:
`import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  // State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Side effect to fetch user data
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(\`https://api.example.com/users/\${userId}\`);
        
        if (!response.ok) {
          throw new Error(\`Failed to fetch user: \${response.status}\`);
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId]); // Re-fetch when userId changes
  
  // Conditional rendering
  if (loading) return <div>Loading user...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;
  
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={() => console.log('Profile action')}>
        View Details
      </button>
    </div>
  );
};

export default UserProfile;`
    },
    {
      name: "Express Server",
      description: "Basic Express.js server with routes and middleware",
      code:
`const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Logging middleware
app.use((req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next();
});

// Sample data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json(user);
});

// Create a new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
    }
  ],
  "java": [
    {
      name: "ArrayList Operations",
      description: "Common ArrayList operations with Java Streams",
      code:
`import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ArrayListExample {
    public static void main(String[] args) {
        // Create and initialize an ArrayList
        List<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        fruits.add("Mango");
        
        // Print the list
        System.out.println("Fruits: " + fruits);
        
        // Check if an element exists
        boolean hasApple = fruits.contains("Apple");
        System.out.println("Contains Apple: " + hasApple);
        
        // Remove an element
        fruits.remove("Banana");
        System.out.println("After removal: " + fruits);
        
        // Using Java Streams for filtering
        List<String> filteredFruits = fruits.stream()
                .filter(fruit -> fruit.startsWith("A") || fruit.startsWith("O"))
                .collect(Collectors.toList());
        System.out.println("Filtered fruits: " + filteredFruits);
        
        // Transform list elements
        List<String> upperCaseFruits = fruits.stream()
                .map(String::toUpperCase)
                .collect(Collectors.toList());
        System.out.println("Uppercase fruits: " + upperCaseFruits);
    }
}`
    },
    {
      name: "File Reading",
      description: "Read a file line by line with try-with-resources",
      code:
`import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

public class FileReadingExample {
    
    // Read file line by line with BufferedReader
    public static void readWithBufferedReader(String filePath) {
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        }
    }
    
    // Read all lines at once using Files (Java 8+)
    public static List<String> readAllLines(String filePath) {
        try {
            return Files.readAllLines(Paths.get(filePath));
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
            return List.of(); // Return empty list on error
        }
    }
    
    // Read file as a string (Java 11+)
    public static String readFileAsString(String filePath) {
        try {
            return Files.readString(Paths.get(filePath));
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
            return ""; // Return empty string on error
        }
    }
    
    // Example usage
    public static void main(String[] args) {
        String filePath = "example.txt";
        
        System.out.println("Reading with BufferedReader:");
        readWithBufferedReader(filePath);
        
        System.out.println("\\nReading all lines:");
        List<String> lines = readAllLines(filePath);
        lines.forEach(System.out::println);
        
        System.out.println("\\nFile as string:");
        String content = readFileAsString(filePath);
        System.out.println(content);
    }
}`
    }
  ],
  "plaintext": [
    {
      name: "Project README",
      description: "A template for a project README.md file",
      code:
`# Project Name

A brief description of what this project does and who it's for.

## Features

- Feature 1: Description of feature 1
- Feature 2: Description of feature 2
- Feature 3: Description of feature 3

## Installation

\`\`\`bash
npm install my-project
# or
yarn add my-project
\`\`\`

## Usage

\`\`\`javascript
import { myFunction } from 'my-project';

// Example usage
const result = myFunction();
console.log(result);
\`\`\`

## API Reference

#### Function Name

\`\`\`
  myFunction(param1, param2)
\`\`\`

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| \`param1\` | \`string\` | Description of param1 |
| \`param2\` | \`number\` | Description of param2 |

## Contributing

Contributions are always welcome!

See \`contributing.md\` for ways to get started.

## License

[MIT](https://choosealicense.com/licenses/mit/)`
    }
  ]
};

// Add a generic option for each language
function getDefaultSnippets(language: string) {
  return [
    {
      name: "Hello World",
      description: `Simple ${language} hello world program`,
      code: getHelloWorldByLanguage(language)
    }
  ];
}

function getHelloWorldByLanguage(language: string): string {
  switch (language.toLowerCase()) {
    case 'python':
      return 'print("Hello, World!")';
    case 'javascript':
      return 'console.log("Hello, World!");';
    case 'java':
      return `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;
    case 'c':
      return `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`;
    case 'cpp':
      return `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`;
    default:
      return '// Hello World program for ' + language;
  }
}

const AICodeAssistant: React.FC<AICodeAssistantProps> = ({
  currentLanguage,
  currentCode,
  onApplyCode,
}) => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openApiKeyModal, setOpenApiKeyModal] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState("");
  
  // Get available snippets for current language
  const getAvailableSnippets = () => {
    const language = currentLanguage.toLowerCase();
    const snippets = codeSnippets[language] || [];
    
    // Add default snippet if there are none for this language
    return snippets.length > 0 ? snippets : getDefaultSnippets(language);
  };
  
  const handleGenerateCode = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await apiRequest('POST', '/api/ai/generate-text', {
        prompt: `Generate ${currentLanguage} code for the following task: ${prompt}\n\nPlease provide only the code without explanation.`,
        style: 'technical'
      });
      
      // Check if response contains API fallback indicator or error message
      if (response && response.fallback) {
        // API key issue - show clear error message
        setError("OpenAI API key is missing or rate limit exceeded. Please add your API key to continue.");
        setOpenApiKeyModal(true);
        return;
      }
      
      // Check if the result appears to be a fallback response
      if (response && response.result && response.result.includes("fallback")) {
        setError("OpenAI API key is required. Please add your API key to enable this feature.");
        setOpenApiKeyModal(true);
        return;
      }
      
      setResult(response.result);
    } catch (err) {
      console.error("Error generating code:", err);
      setError("Failed to generate code. Please try again or add your API key.");
      setOpenApiKeyModal(true);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleAnalyzeCode = async () => {
    if (!currentCode.trim()) {
      setError("No code to analyze.");
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await apiRequest('POST', '/api/ai/analyze-code', {
        code: currentCode,
        language: currentLanguage
      });
      
      // Check if response contains API fallback indicator or error message
      if (response && response.fallback) {
        // API key issue - show clear error message
        setError("OpenAI API key is missing or rate limit exceeded. Please add your API key to continue.");
        setOpenApiKeyModal(true);
        return;
      }
      
      // Check if the result appears to be a fallback response
      if (response && response.result && response.result.includes("fallback")) {
        setError("OpenAI API key is required. Please add your API key to enable this feature.");
        setOpenApiKeyModal(true);
        return;
      }
      
      setResult(response.result);
    } catch (err) {
      console.error("Error analyzing code:", err);
      setError("Failed to analyze code. Please try again or add your API key.");
      setOpenApiKeyModal(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyCode = () => {
    if (result) {
      // Extract just the code from the response (removing any markdown code blocks)
      let codeToApply = result;
      const codeBlockRegex = /\`\`\`(?:\w+)?\n([\s\S]*?)\n\`\`\`/g;
      const match = codeBlockRegex.exec(result);
      
      if (match && match[1]) {
        codeToApply = match[1];
      }
      
      onApplyCode(codeToApply);
    }
  };
  
  const handleSelectSnippet = (value: string) => {
    setSelectedSnippet(value);
    const snippets = getAvailableSnippets();
    const snippet = snippets.find(s => s.name === value);
    
    if (snippet) {
      setResult(snippet.code);
    }
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none"
          >
            <BrainCogIcon className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px] bg-gray-900 text-gray-100 border-gray-700">
          <SheetHeader>
            <SheetTitle className="text-white">AI Code Assistant</SheetTitle>
            <SheetDescription className="text-gray-400">
              Generate code or analyze your current code using AI
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            <Tabs defaultValue="generate" className="w-full">
              <TabsList className="bg-gray-800 border-gray-700 mb-4">
                <TabsTrigger value="generate" className="data-[state=active]:bg-gray-700">
                  <SendIcon className="h-4 w-4 mr-2" />
                  Generate Code
                </TabsTrigger>
                <TabsTrigger value="analyze" className="data-[state=active]:bg-gray-700">
                  <BrainCogIcon className="h-4 w-4 mr-2" />
                  Analyze Code
                </TabsTrigger>
                <TabsTrigger value="snippets" className="data-[state=active]:bg-gray-700">
                  <CodeIcon className="h-4 w-4 mr-2" />
                  Code Snippets
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="generate">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Generate Code with AI</label>
                  <Textarea 
                    placeholder="Example: Create a function to sort an array using bubble sort" 
                    className="bg-gray-800 border-gray-700 text-gray-200 h-24"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleGenerateCode}
                    disabled={isGenerating || !prompt.trim()}
                  >
                    {isGenerating ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <SendIcon className="h-4 w-4 mr-2" />
                    )}
                    Generate Code
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="analyze">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-300">Analyze Current Code</label>
                    <span className="text-xs text-gray-500">{currentLanguage}</span>
                  </div>
                  
                  <div className="bg-gray-800 rounded-md p-2 text-xs text-gray-400 font-mono mb-2">
                    <p className="truncate">{currentCode ? currentCode.substring(0, 100) + "..." : "No code in editor"}</p>
                  </div>
                  
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={handleAnalyzeCode}
                    disabled={isGenerating || !currentCode.trim()}
                  >
                    {isGenerating ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <BrainCogIcon className="h-4 w-4 mr-2" />
                    )}
                    Analyze Current Code
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="snippets">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Code Snippets for {currentLanguage}
                  </label>
                  
                  <Select value={selectedSnippet} onValueChange={handleSelectSnippet}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                      <SelectValue placeholder="Select a code snippet" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                      {getAvailableSnippets().map((snippet) => (
                        <SelectItem 
                          key={snippet.name} 
                          value={snippet.name}
                          className="hover:bg-gray-700"
                        >
                          <div>
                            <span>{snippet.name}</span>
                            <p className="text-xs text-gray-400">{snippet.description}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center text-xs text-amber-400">
                    <LightbulbIcon className="h-3 w-3 mr-1" />
                    <span>Select a snippet to see code examples for {currentLanguage}</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {error && (
              <div className="bg-red-900/30 text-red-300 p-3 rounded-md text-sm flex flex-col space-y-2">
                <div>{error}</div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="self-start bg-red-800/30 hover:bg-red-700/50 border-red-700/50 text-red-200"
                  onClick={() => setOpenApiKeyModal(true)}
                >
                  <KeyRound className="h-4 w-4 mr-2" />
                  Set API Key
                </Button>
              </div>
            )}
            
            {result && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-300">Result</label>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-7 bg-blue-800/30 hover:bg-blue-800/50 border-blue-700/50 text-blue-300"
                      >
                        Apply to Editor
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-gray-800 border-gray-700 text-gray-100">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Apply Generated Code</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                          This will replace the current code in your editor. Are you sure?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-700 text-gray-200 hover:bg-gray-600">Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          onClick={handleApplyCode}
                        >
                          <CheckIcon className="h-4 w-4 mr-2" />
                          Apply Code
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <div className="bg-gray-800 rounded-md p-3 overflow-auto max-h-[300px]">
                  <pre className="text-gray-300 whitespace-pre-wrap text-sm font-mono">{result}</pre>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
      
      <ApiKeyModal
        isOpen={openApiKeyModal}
        onClose={() => setOpenApiKeyModal(false)}
        onSuccess={() => {
          setOpenApiKeyModal(false);
          setError(null);
        }}
        defaultService="openai"
        error={error || undefined}
      />
    </>
  );
};

export default AICodeAssistant;