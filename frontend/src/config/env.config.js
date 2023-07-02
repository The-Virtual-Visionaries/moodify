const backendUri = process.env.REACT_APP_BACKEND_URI;

if (!backendUri) {
  console.error("Missing REACT_APP_BACKEND_URI in .env file");
  process.exit(1);
}

export const BACKEND_URI = backendUri;
