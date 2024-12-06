export function parseResume(text: string): string | null {
  // Regular expression to match content between <resume> tags
  const resumeRegex = /<resume>([\s\S]*?)<\/resume>/;

  // Find the match
  const match = text.match(resumeRegex);

  // Return the captured content or null if no match
  return match ? match[1].trim() : null;
}
