import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Fetch webpage content
    const webpageResponse = await fetch(url);
    const pageContent = await webpageResponse.text();

    // Initialize Claude
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    // Ask Claude to extract the job description
    const response = await anthropic.messages.create({
      model: "claude-2.1",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Extract only the job description, requirements, and responsibilities from this webpage content: ${pageContent}`,
        },
      ],
    });

    // Check if Claude's response contains the expected content
    if (response.content && response.content.length > 0) {
      // Handle different types of content blocks
      const contentBlock = response.content[0];
      let description = "";

      if ("text" in contentBlock) {
        description = contentBlock.text;
      } else if (typeof contentBlock === "string") {
        description = contentBlock;
      } else {
        throw new Error("Unexpected content format from Claude");
      }

      return NextResponse.json({ description });
    } else {
      console.error("Claude response error:", response);
      return NextResponse.json(
        {
          error: "Unable to extract job description from the provided content.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch job description" },
      { status: 500 }
    );
  }
}
