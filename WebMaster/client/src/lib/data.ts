export const features = [
  {
    icon: "ri-code-box-line",
    title: "Interactive Coding",
    description: "Code in multiple languages with real-time collaboration and integrated tools."
  },
  {
    icon: "ri-cloud-line",
    title: "Virtual Labs",
    description: "Launch cloud-based environments for testing, simulation, and project deployment."
  },
  {
    icon: "ri-robot-line",
    title: "AI Tools",
    description: "Create content, transform text, and build websites with AI-powered assistants."
  },
  {
    icon: "ri-team-line",
    title: "Collaboration",
    description: "Work together in real-time with integrated communication and sharing tools."
  }
];

export const programmingLanguages = [
  { 
    id: 'python', 
    name: 'Python',
    icon: 'ri-python-fill',
    color: '#3776AB',
    description: 'A versatile language for data science and web development',
    examples: [
      'print("Hello World")',
      'import pandas as pd',
      'def greeting(): return "Hi!"'
    ]
  },
  { 
    id: 'javascript', 
    name: 'JavaScript',
    icon: 'ri-javascript-fill',
    color: '#F7DF1E',
    description: 'The language of the web with vast frameworks ecosystem',
    examples: [
      'console.log("Hello World");',
      'const greeting = () => "Hi!";',
      'document.querySelector(".element").innerHTML = "Content";'
    ]
  },
  { 
    id: 'java', 
    name: 'Java',
    icon: 'ri-code-s-slash-fill',
    color: '#007396',
    description: 'Enterprise-grade language for cross-platform applications',
    examples: [
      'System.out.println("Hello World");',
      'public static void main(String[] args) { }',
      'class Greeting { String say() { return "Hi!"; } }'
    ]
  },
  { 
    id: 'cpp', 
    name: 'C++',
    icon: 'ri-code-box-fill',
    color: '#00599C',
    description: 'High-performance language for system programming',
    examples: [
      '#include <iostream>',
      'std::cout << "Hello World" << std::endl;',
      'int main() { return 0; }'
    ]
  }
];

export const devEnvironments = [
  {
    icon: "ri-reactjs-line",
    title: "Web Development",
    description: "Frontend and backend tools with React, Node.js, and more.",
    link: "#"
  },
  {
    icon: "ri-database-2-line",
    title: "Data Science",
    description: "Jupyter notebooks with pre-installed data science libraries.",
    link: "#"
  },
  {
    icon: "ri-shield-keyhole-line",
    title: "Cybersecurity",
    description: "Penetration testing and security assessment tools.",
    link: "#"
  }
];

export const cloudResources = [
  {
    provider: "AWS",
    icon: "ri-amazon-line",
    status: "Connected",
    resources: [
      { name: "EC2 Instances", count: "2 running" },
      { name: "S3 Buckets", count: "4 active" },
      { name: "Lambda Functions", count: "6 deployed" }
    ]
  },
  {
    provider: "Azure",
    icon: "ri-microsoft-line",
    status: "Connected",
    resources: [
      { name: "VMs", count: "1 running" },
      { name: "App Services", count: "3 active" },
      { name: "Cognitive Services", count: "2 deployed" }
    ]
  },
  {
    provider: "GCP",
    icon: "ri-google-line",
    status: "Setup Needed"
  },
  {
    provider: "Alibaba Cloud",
    icon: "ri-shopping-cart-line",
    status: "Setup Needed"
  }
];

export const quantumModules = [
  {
    title: "Introduction to Quantum Computing",
    description: "Basics of qubits, superposition, and entanglement"
  },
  {
    title: "Quantum Gates and Circuits",
    description: "Understanding quantum operations and measurements"
  },
  {
    title: "Grover's Search Algorithm",
    description: "Quantum algorithm for unstructured search problems"
  },
  {
    title: "Shor's Algorithm",
    description: "Quantum algorithm for integer factorization"
  }
];

export const collaborationProjects = [
  {
    title: "Web App Dashboard",
    status: "Active",
    description: "Frontend development with React and Tailwind",
    members: [
      { initials: "JD", color: "bg-blue-500" },
      { initials: "AM", color: "bg-purple-500" },
      { initials: "RK", color: "bg-green-500" }
    ],
    updated: "2h ago"
  },
  {
    title: "Data Analysis Project",
    status: "Pending",
    description: "Statistical analysis using Python and Pandas",
    members: [
      { initials: "TS", color: "bg-red-500" },
      { initials: "LM", color: "bg-yellow-500" }
    ],
    updated: "1d ago"
  }
];

export const chatMessages = [
  {
    sender: { initials: "JD", color: "bg-blue-500", name: "John Doe" },
    message: "Hey team, I've pushed the new components to the repo. Can someone review?",
    time: "10:45 AM"
  },
  {
    sender: { initials: "AM", color: "bg-purple-500", name: "Alice Miller" },
    message: "I'll take a look at them. Are there any specific areas you want feedback on?",
    time: "10:52 AM"
  }
];

export const achievements = [
  { name: "Code Master", icon: "ri-code-line", color: "bg-blue-100 text-primary", unlocked: true },
  { name: "Team Player", icon: "ri-team-line", color: "bg-purple-100 text-secondary", unlocked: true },
  { name: "Scientist", icon: "ri-flask-line", color: "bg-gray-200 text-dark-light", unlocked: false },
  { name: "AI Explorer", icon: "ri-ai-line", color: "bg-gray-200 text-dark-light", unlocked: false },
  { name: "Data Guru", icon: "ri-database-2-line", color: "bg-gray-200 text-dark-light", unlocked: false },
  { name: "DevOps Pro", icon: "ri-terminal-box-line", color: "bg-gray-200 text-dark-light", unlocked: false }
];

export const pythonCodeExample = 
`import numpy as np
import matplotlib.pyplot as plt

# Define data points
x = np.linspace(-5, 5, 100)
y = np.sin(x)

# Create visualization
plt.figure(figsize=(10, 6))
plt.plot(x, y, color='blue')
plt.title('Sine Wave Function')
plt.show()`;

export const libraries = [
  { name: "NumPy", icon: "ri-calculator-line" },
  { name: "Matplotlib", icon: "ri-bar-chart-box-line" },
  { name: "TensorFlow", icon: "ri-brain-line" },
  { name: "Pandas", icon: "ri-database-2-line" },
  { name: "SciPy", icon: "ri-flask-line" }
];
