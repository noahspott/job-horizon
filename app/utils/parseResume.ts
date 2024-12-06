export function parseResume(text: string): string | null {
  // Input validation
  if (!text || typeof text !== "string") {
    return null;
  }

  // Case-insensitive regex with potential whitespace handling
  const resumeRegex = /<resume\s*>([\s\S]*?)<\/resume\s*>/i;

  const match = text.match(resumeRegex);

  // Return the captured content or null if no match
  return match ? match[1].trim() : null;
}
