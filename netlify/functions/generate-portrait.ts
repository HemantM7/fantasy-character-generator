import { GoogleGenAI } from "@google/genai";

type Event = {
  httpMethod: string;
  body: string | null;
};

export const handler = async (event: Event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let input: Record<string, string | number | undefined>;
  try {
    input = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  const { characterClass, race, weapon, armor, name, seed } = input;
  const safeSeed = seed || Math.floor(Math.random() * 1000000);
  const charClass = characterClass || "Warrior";
  const charRace = race || "Human";
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Stylized video game cartoon portrait of a fantasy ${charRace} ${charClass}, named ${name || "Hero"}. Wearing ${armor || "gear"} and wielding ${weapon || "weapon"}. Epic video game concept art, vibrant colors, heroic portrait pose, clean 3D cartoon character illustration, digital art.`;
      const response = await ai.models.generateImages({
        model: "imagen-3.0-generate-002",
        prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: "image/jpeg",
          aspectRatio: "1:1",
        },
      });

      const base64Image = response.generatedImages?.[0]?.image?.imageBytes;
      if (base64Image) {
        return {
          statusCode: 200,
          body: JSON.stringify({ imageUrl: `data:image/jpeg;base64,${base64Image}` }),
        };
      }
    } catch (error) {
      console.warn("Imagen generation failed; using image fallback:", error);
    }
  }

  const prompt = `cartoon video game portrait fantasy ${charRace} ${charClass} hero, digital art, vibrant colors, highly detailed 3d video game avatar`;
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&seed=${safeSeed}&nologo=true`;

  return { statusCode: 200, body: JSON.stringify({ imageUrl }) };
};
