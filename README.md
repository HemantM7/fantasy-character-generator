# Fantasy Character Generator

## Run locally

1. Install dependencies with `npm install`.
2. Create `.env.local` in the project root and set `GEMINI_API_KEY` to your Gemini API key.
3. Start the app with `npm run dev`.

## Deploy to Netlify

1. Push the project to your Git provider and import it in Netlify.
2. In **Site configuration → Environment variables**, add `GEMINI_API_KEY` with your Gemini API key. Make it available to Functions and the deploy contexts you use.
3. Deploy the site. Netlify builds the frontend and deploys the API endpoints as Functions.

Do not add the key to frontend variables such as `VITE_GEMINI_API_KEY`, commit it to the repository, or expose it in client-side code.
