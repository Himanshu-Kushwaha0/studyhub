
import type { Request, Response } from "express";

const textTransformations = {
  uppercase: (text: string) => text.toUpperCase(),
  lowercase: (text: string) => text.toLowerCase(),
  capitalize: (text: string) => text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
  reverse: (text: string) => text.split('').reverse().join(''),
  camelCase: (text: string) => text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()),
  snakeCase: (text: string) => text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_')
};

// Sample image URLs for random generation
const sampleImages = [
  'https://picsum.photos/800/600',
  'https://source.unsplash.com/random/800x600',
  'https://placeimg.com/800/600/any'
];

// Sample video URLs
const sampleVideos = [
  'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
];

export async function generateText(req: Request, res: Response) {
  const { text, style = "standard" } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const transformation = textTransformations[style as keyof typeof textTransformations] || ((t: string) => t);
  const transformed = transformation(text);
  
  return res.json({
    result: transformed,
    style: style
  });
}

export async function generateWebsite(req: Request, res: Response) {
  const { description, theme = "modern" } = req.body;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Generated Website</title>
      <style>
        body { font-family: Arial; margin: 0; padding: 20px; }
        .header { text-align: center; padding: 40px; background: #f0f0f0; }
        .content { max-width: 800px; margin: 20px auto; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${description || 'Welcome to My Website'}</h1>
      </div>
      <div class="content">
        <p>This is a sample website generated with the ${theme} theme.</p>
      </div>
    </body>
    </html>
  `;
  
  return res.json({ html });
}

export async function generateReplitApp(req: Request, res: Response) {
  return res.json({
    code: `
// Sample React App
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="app">
      <h1>Sample React Counter</h1>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}

export default App;
    `
  });
}

export async function generateImage(req: Request, res: Response) {
  const imageUrl = sampleImages[Math.floor(Math.random() * sampleImages.length)];
  
  return res.json({
    images: [imageUrl],
    prompt: req.body.prompt
  });
}

export async function generateVideo(req: Request, res: Response) {
  const videoUrl = sampleVideos[Math.floor(Math.random() * sampleVideos.length)];
  
  return res.json({
    videoUrl,
    status: "completed"
  });
}
