import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for character portrait generation
  app.post("/api/generate-portrait", async (req, res) => {
    try {
      const { characterClass, race, weapon, armor, name, seed } = req.body || {};
      const safeSeed = seed || Math.floor(Math.random() * 1000000);
      const charClass = characterClass || 'Warrior';
      const charRace = race || 'Human';

      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const prompt = `Stylized video game cartoon portrait of a fantasy ${charRace} ${charClass}, named ${name || 'Hero'}. Wearing ${armor || 'gear'} and wielding ${weapon || 'weapon'}. Epic video game concept art, vibrant colors, heroic portrait pose, clean 3D cartoon character illustration, digital art.`;

          const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '1:1',
            },
          });

          const base64Image = response.generatedImages?.[0]?.image?.imageBytes;
          if (base64Image) {
            return res.json({ imageUrl: `data:image/jpeg;base64,${base64Image}` });
          }
        } catch (geminiErr) {
          console.warn("Imagen generation failed or not available, using high-quality fallback generator:", geminiErr);
        }
      }

      // Fallback: Pollinations AI fantasy prompt
      const promptText = `cartoon video game portrait fantasy ${charRace} ${charClass} hero, digital art, vibrant colors, highly detailed 3d video game avatar`;
      const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=512&height=512&seed=${safeSeed}&nologo=true`;

      return res.json({ imageUrl: fallbackUrl });
    } catch (err) {
      console.error("Portrait error:", err);
      res.status(500).json({ error: "Failed to generate portrait" });
    }
  });

  // API Route for character backstory generation using Gemini AI
  app.post("/api/generate-backstory", async (req, res) => {
    try {
      const { name, characterClass, race, weapon, armor, trait } = req.body || {};
      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey) {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Write a unique, dramatic, 1-to-2 sentence fantasy origin backstory for a hero named ${name || 'the adventurer'}, a ${race || 'Human'} ${characterClass || 'Warrior'} equipped with ${weapon || 'weapon'} and ${armor || 'armor'}. Trait: ${trait || 'Courageous'}. Do not include quotes or surrounding conversational text, output only the backstory sentences directly.`,
          });

          const backstoryText = response.text?.trim();
          if (backstoryText) {
            return res.json({ backstory: backstoryText });
          }
        } catch (geminiErr) {
          console.warn("Gemini backstory generation failed, using procedural fallback:", geminiErr);
        }
      }

      // Procedural fallback
      const origins = [
        `Born under a blood moon in a forgotten fortress, ${name || 'this hero'} was trained from infancy to master the secrets of the ${characterClass || 'class'}.`,
        `Exiled from their ancestral homeland for wielding banned elemental arcana, ${name || 'they'} now wander the dangerous wilderness seeking ultimate power and justice.`,
        `Rescued from dragonfire as a child, ${name || 'this hero'} carries an ancient runic seal that pulses whenever evil approaches.`,
        `A former royal guard commander who lost everything in a shadow coup, ${name || 'they'} now quest to reclaim their fallen order's lost honor.`
      ];
      const randomBackstory = origins[Math.floor(Math.random() * origins.length)];
      return res.json({ backstory: randomBackstory });
    } catch (err) {
      console.error("Backstory error:", err);
      res.status(500).json({ error: "Failed to generate backstory" });
    }
  });

  // Vite middleware for dev or static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "localhost", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
