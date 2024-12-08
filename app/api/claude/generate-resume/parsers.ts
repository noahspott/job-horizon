import Anthropic from "@anthropic-ai/sdk";

/**
 * Extracts content between XML-like tags in a string
 * @param text - The input string containing XML-like tags
 * @param tagName - The name of the tag to search for
 * @returns The content between the opening and closing tags, or null if not found
 */
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

/**
 * Extracts the text content from an Anthropic API response
 * @param response - The response object from the Anthropic API
 * @returns The extracted text content
 * @throws {Error} If the response format is invalid or missing content
 */
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

/**
 * Extracts the complete resume content from Claude's response
 * @param response - The response object from the Anthropic API
 * @returns The content between <resume> tags, or null if not found
 */
export function parseResume(response: Anthropic.Message): string | null {
  const content = extractClaudeContent(response);
  return parseXMLTag(content, "resume");
}

/**
 * Extracts the professional summary section from Claude's response
 * @param response - The response object from the Anthropic API
 * @returns The content between <professional_summary> tags, or null if not found
 */
export function parseProfessionalSummary(
  response: Anthropic.Message
): string | null {
  const content = extractClaudeContent(response);
  return parseXMLTag(content, "professional_summary");
}

/**
 * Extracts the work experience section from Claude's response
 * @param response - The response object from the Anthropic API
 * @returns The content between <work_experience_section> tags, or null if not found
 */
export function parseWorkExperience(response: Anthropic.Message): string | null {
  const content = extractClaudeContent(response);
  return parseXMLTag(content, "work_experience_section");
}

/**
 * Extracts the skills section from Claude's response
 * @param response - The response object from the Anthropic API
 * @returns The content between <skills_section> tags, or null if not found
 */
export function parseSkills(response: Anthropic.Message): string | null {
  const content = extractClaudeContent(response);
  return parseXMLTag(content, "skills_section");
}
