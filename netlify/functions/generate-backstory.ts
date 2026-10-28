import { GoogleGenAI } from "@google/genai";

type Event = {
  httpMethod: string;
  body: string | null;
};

export const handler = async (event: Event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let input: Record<string, string | undefined>;
  try {
    input = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) };
  }

  const { name, characterClass, race, weapon, armor, trait } = input;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Write a unique, dramatic, 1-to-2 sentence fantasy origin backstory for a hero named ${name || "the adventurer"}, a ${race || "Human"} ${characterClass || "Warrior"} equipped with ${weapon || "weapon"} and ${armor || "armor"}. Trait: ${trait || "Courageous"}. Do not include quotes or surrounding conversational text, output only the backstory sentences directly.`,
      });

      const backstory = response.text?.trim();
      if (backstory) {
        return { statusCode: 200, body: JSON.stringify({ backstory }) };
      }
    } catch (error) {
      console.warn("Gemini backstory generation failed; using procedural fallback:", error);
    }
  }

  const origins = [
    `Born under a blood moon in a forgotten fortress, ${name || "this hero"} was trained from infancy to master the secrets of the ${characterClass || "class"}.`,
    `Exiled from their ancestral homeland for wielding banned elemental arcana, ${name || "they"} now wander the dangerous wilderness seeking ultimate power and justice.`,
    `Rescued from dragonfire as a child, ${name || "this hero"} carries an ancient runic seal that pulses whenever evil approaches.`,
    `A former royal guard commander who lost everything in a shadow coup, ${name || "they"} now quest to reclaim their fallen order's lost honor.`,
  ];

  return {
    statusCode: 200,
    body: JSON.stringify({ backstory: origins[Math.floor(Math.random() * origins.length)] }),
  };
};
