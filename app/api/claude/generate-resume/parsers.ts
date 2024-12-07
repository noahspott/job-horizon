import Anthropic from "@anthropic-ai/sdk";

// Generic XML-like tag parser that both specific parsers can use
function parseXMLTag(text: string, tagName: string): string | null {
  // Input validation
  if (!text || typeof text !== "string") {
    return null;
  }

  // Case-insensitive regex with potential whitespace handling
  const regex = new RegExp(
    `<${tagName}\\s*>([\\s\\S]*?)<\\/${tagName}\\s*>`,
    "i"
  );
  const match = text.match(regex);

  return match ? match[1].trim() : null;
}

// Helper function to extract content from Claude's response
function extractClaudeContent(response: Anthropic.Message): string {
  if (!response.content) {
    console.error("Claude response error: ", response);
    throw new Error("Unable to process response");
  }

  const contentBlock = response.content[0];

  if (typeof contentBlock === "string") {
    return contentBlock;
  }

  if (contentBlock && "text" in contentBlock) {
    return contentBlock.text;
  }

  console.error("Unexpected content format:", contentBlock);
  throw new Error("Unexpected content format from Claude");
}

export function parseResume(response: Anthropic.Message): string | null {
  const content = extractClaudeContent(response);
  return parseXMLTag(content, "resume");
}

export function parseProfessionalSummary(
  response: Anthropic.Message
): string | null {
  const content = extractClaudeContent(response);
  return parseXMLTag(content, "professional_summary");
}

export function parseWorkExperience(response: Anthropic.Message): string | null {
  const content = extractClaudeContent(response);
  return parseXMLTag(content, "work_experience_section");
}

export function parseSkills(response: Anthropic.Message): string | null {
  const content = extractClaudeContent(response);
  return parseXMLTag(content, "skills_section");
}
