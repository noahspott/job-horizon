/**
 * Generates a prompt for creating a professional summary section of a resume
 * @param jobDescription - The target job posting description
 * @param workExperience - The candidate's work history
 * @param education - The candidate's educational background
 * @param skills - The candidate's skills
 * @returns A structured prompt for the AI to generate a tailored professional summary
 */
export const getProfessionalSummaryPrompt = ({
  jobDescription,
  workExperience,
  education,
  skills,
}: {
  jobDescription: string;
  workExperience: string;
  education: string;
  skills: string;
}) => `You are an AI assistant tasked with writing a professional summary for a resume. The summary should be 3-4 sentences that highlight the candidate's most relevant qualifications for this specific job.

First, analyze this job description:

<job_description>
${jobDescription}
</job_description>

Now, review the candidate's background:

<work_experience>
${workExperience || "No work experience provided"}
</work_experience>

<education>
${education || "No education provided"}
</education>

<skills>
${skills || "No skills provided"}
</skills>

Write a compelling professional summary that:
1. Highlights the most relevant skills and experiences for this role
2. Uses strong action verbs and specific achievements where possible
3. Demonstrates clear value alignment with the job requirements
4. Is written in first person without using "I" statements

Format the response as:
<professional_summary>
[Your summary here]
</professional_summary>`;

/**
 * Generates a prompt for creating a tailored work experience section
 * @param jobDescription - The target job posting description
 * @param workExperience - The candidate's work history
 * @returns A structured prompt for the AI to generate a formatted work experience section
 */
export const getWorkExperiencePrompt = ({
  jobDescription,
  workExperience,
}: {
  jobDescription: string;
  workExperience: any;
}) => {
  return `Please review this job description:

<job_description>
${jobDescription}
</job_description>

And this work experience:

<work_experience>
${JSON.stringify(workExperience)}
</work_experience>

Create a tailored work experience section that follows this exact format for each position:

[Company Name]
[Job Title]
[Start Date] - [End Date]
• [Achievement/responsibility]
• [Achievement/responsibility]
• [Achievement/responsibility]

Guidelines:
1. List positions in reverse chronological order
2. Company name, job title, and dates should NOT have bullet points
3. Only use bullet points (•) for achievements/responsibilities
4. Each bullet point should:
   - Start with a strong action verb
   - Focus on achievements that match the job requirements
   - Include metrics and numbers when available
5. Only include information from the provided work experience
6. Use 3-5 bullet points per position

Present the work experience section in this format:

<work_experience_section>
[Insert formatted work experience following the exact structure above]
</work_experience_section>`;
}

/**
 * Generates a prompt for creating a categorized skills section
 * @param jobDescription - The target job posting description
 * @param skills - The candidate's skills
 * @returns A structured prompt for the AI to generate a categorized skills section
 */
export const getSkillsPrompt = ({
  jobDescription,
  skills,
}: {
  jobDescription: string;
  skills: string;
}) => `Please review this job description:

<job_description>
${jobDescription}
</job_description>

And these skills:

<skills>
${skills || "No skills provided"}
</skills>

Create a tailored skills section for the resume by following these steps:

1. First, analyze the job description to identify the key skill categories that would be most relevant for this role
2. Then, carefully review the candidate's provided skills
3. Create appropriate skill groupings based on the job requirements, but ONLY include skills that are explicitly mentioned in the candidate's skill list
4. Do not fabricate or assume any skills that aren't clearly stated in the candidate's profile
5. Prioritize skills that directly match the job requirements
6. If a skill category from the job description has no matching skills from the candidate, omit that category entirely

Format the response as a bulleted list with categories and comma-separated skills:

<skills_section>
- [Category Name]: [skill1], [skill2], [skill3]
- [Category Name]: [skill1], [skill2]
</skills_section>

Remember: Only include skills that are explicitly listed in the candidate's profile. It's better to have fewer, accurate skills than to include skills the candidate hasn't claimed.`;

