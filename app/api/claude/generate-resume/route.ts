import { createClient } from "@/app/utils/supabase/server";
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

    const supabase = await createClient();

    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError) throw authError;

    // Get the user's profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user?.id)
      .single();

    if (profileError) throw profileError;

    console.log("profile: ", profile);

    // Do AI
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    const response = await anthropic.messages.create({
      model: "claude-2.0",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are an AI assistant tasked with generating a tailored resume for a job applicant based on a given job description and the applicant's information. Your goal is to create a resume that highlights the applicant's relevant skills and experiences without fabricating any information.

                    First, carefully read and analyze the following job description:

                    <job_description>
                    ${jobDescription}
                    </job_description>

                    Now, review the applicant's information:

                    <applicant_info>
                    ${JSON.stringify(profile)}
                    </applicant_info>

                    Using the provided information, create a tailored resume for the applicant. Follow these guidelines:

                    1. Analyze the job description to identify key requirements, skills, and qualifications.
                    2. Review the applicant's information and identify relevant experiences, skills, and qualifications that match the job requirements.
                    3. Structure the resume in the following format:
                      a. Contact Information
                      b. Professional Summary
                      c. Work Experience
                      d. Education
                      e. Skills
                      f. Additional Sections (if applicable, such as certifications, volunteer work, or relevant projects)

                    4. In the Professional Summary, highlight the applicant's most relevant qualifications and experiences that align with the job description.

                    5. For Work Experience:
                      - List relevant positions in reverse chronological order
                      - Focus on achievements and responsibilities that relate to the job requirements
                      - Use action verbs and quantify accomplishments where possible

                    6. In the Education section, include relevant degrees, certifications, or training programs.

                    7. In the Skills section, prioritize skills mentioned in the job description that the applicant possesses.

                    8. If applicable, include additional sections that showcase relevant qualifications or experiences.

                    9. Ensure the resume is concise, typically not exceeding two pages.

                    10. Do not fabricate or exaggerate any information. Only use the details provided in the applicant's information.

                    11. Tailor the language and emphasis of the resume to match the tone and requirements of the job description.

                    Once you have created the resume, present it in the following format:

                    <resume>
                    [Insert the generated resume here, formatted as described above]
                    </resume>

                    Remember, your goal is to create a compelling resume that accurately represents the applicant's qualifications while highlighting their relevance to the specific job opportunity.`,
        },
      ],
    });

    if (response.content && response.content.length > 0) {
      const contentBlock = response.content[0];
      let resume = "";

      if ("text" in contentBlock) {
        resume = contentBlock.text;
      } else if (typeof contentBlock === "string") {
        resume = contentBlock;
      } else {
        throw new Error("Unexpected content format from Claude");
      }

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
