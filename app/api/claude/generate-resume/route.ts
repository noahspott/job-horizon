import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { parseResume, parseProfessionalSummary, parseWorkExperience, parseSkills } from "./parsers";
import { getProfessionalSummaryPrompt, getResumePrompt, getWorkExperiencePrompt, getSkillsPrompt } from "./prompts";

export async function POST(request: Request) {
  try {
    // Extract job description from the request body
    const { jobDescription } = await request.json();
    if (!jobDescription) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    // Create a Supabase client
    const supabase = await createClient();

    // Authenticate the user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError) throw authError;

    // Fetch the user's profile information
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user?.id)
      .single();
    if (profileError) throw profileError;

    console.log("profile: ", profile);

    // Check if the Anthropic API key is set
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Initialize the Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Create Contact Information Section
    // Don't send this to the AI, just use it to fill in the contact information section
    // If the user has a LinkedIn profile, include it in the contact information
    // If the user has a GitHub profile, include it in the contact information
    // If the user has a personal website, include it in the contact information
    // If the user has a phone number, include it in the contact information
    // If the user has an email address, include it in the contact information

    // Run all AI generations in parallel
    const [professionalSummaryResponse, workExperienceResponse, skillsResponse, resumeResponse] = await Promise.all([
      anthropic.messages.create({
        model: "claude-2.0",
        max_tokens: 400,
        messages: [{ role: "user", content: getProfessionalSummaryPrompt({
          jobDescription,
          workExperience: profile.work_experience,
          education: profile.education,
          skills: profile.skills,
        }) }],
      }),
      
      anthropic.messages.create({
        model: "claude-2.0",
        max_tokens: 1024,
        messages: [{ role: "user", content: getWorkExperiencePrompt({
          jobDescription,
          workExperience: profile.work_experience,
        }) }],
      }),
      
      anthropic.messages.create({
        model: "claude-2.0",
        max_tokens: 1024,
        messages: [{ role: "user", content: getSkillsPrompt({
          jobDescription,
          skills: profile.skills,
        }) }],
      }),
      
      anthropic.messages.create({
        model: "claude-2.0",
        max_tokens: 1024,
        messages: [{ role: "user", content: getResumePrompt({
          jobDescription,
          profile,
        }) }],
      })
    ]);

    // Parse all responses
    const parsedProfessionalSummary = parseProfessionalSummary(professionalSummaryResponse);
    const parsedWorkExperience = parseWorkExperience(workExperienceResponse);
    const parsedSkills = parseSkills(skillsResponse);
    const resume = parseResume(resumeResponse);

    console.log("********************");
    console.log("parsedProfessionalSummary: \n", parsedProfessionalSummary);
    console.log("parsedWorkExperience: \n", parsedWorkExperience);
    console.log("parsedSkills: \n", parsedSkills);
    console.log("********************");
    console.log("resume: ", resume);

    return NextResponse.json({ resume });
  } catch (error) {
    // Log detailed error information
    console.error("Error generating resume:", {
      error: error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    // Return a user-friendly error response
    return NextResponse.json(
      { error: "Failed to generate resume. Please try again later." },
      { status: 500 }
    );
  }
}
