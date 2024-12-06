import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: Request) {
  try {
    const { jobDescription } = await request.json();

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    const response = await anthropic.messages.create({
      model: "claude-2.0",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are tasked with generating a high-quality, professional resume based on a given job description. Follow these instructions carefully to create a tailored resume that highlights the most relevant skills and experiences for the position.

                    First, carefully read and analyze the following job description:

                    <job_description>
                    ${jobDescription}
                    </job_description>

                    Before creating the resume, analyze the job description to identify:
                    1. Key skills and qualifications required
                    2. Main responsibilities of the role
                    3. Industry-specific keywords and phrases
                    4. Company culture and values (if mentioned)

                    Now, create a professional resume tailored to this job description. Follow these guidelines:

                    1. Use a clean, professional format with clear section headings.
                    2. Tailor the content to match the job requirements and company culture.
                    3. Use action verbs and quantifiable achievements where possible.
                    4. Keep the resume concise, ideally one to two pages long.
                    5. Ensure all information is relevant to the position.

                    Include the following sections in the resume:

                    1. Contact Information: Full name, phone number, email address, and location (city, state).
                    2. Professional Summary: A brief 2-3 sentence overview highlighting your most relevant qualifications for the position.
                    3. Skills: A bulleted list of key skills that match the job requirements.
                    4. Work Experience: List relevant jobs in reverse chronological order. For each position, include:
                      - Job title
                      - Company name
                      - Dates of employment
                      - 3-5 bullet points describing key responsibilities and achievements
                    5. Education: List degrees, institutions, and graduation dates.
                    6. Additional Sections (if relevant): Certifications, Awards, Publications, or Volunteer Work.

                    When writing the resume content:
                    - Mirror the language and keywords used in the job description.
                    - Highlight experiences and skills that directly relate to the job requirements.
                    - Quantify achievements and results whenever possible.
                    - Avoid using personal pronouns.
                    - Use present tense for current positions and past tense for previous roles.

                    Output the completed resume within <resume> tags, formatted as if it were a text document with appropriate line breaks and spacing between sections.`,
        },
      ],
    });

    if (response.content && response.content.length > 0) {
      const resume = response.content[0].text;
      return NextResponse.json({ resume });
    } else {
      console.error("Claude response error: ", response);
      return NextResponse.json(
        { error: "Unable to generate resume" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error generating resume:", error);
    return NextResponse.json(
      { error: "Failed to generate resume. Please try again later." },
      { status: 500 }
    );
  }
}
