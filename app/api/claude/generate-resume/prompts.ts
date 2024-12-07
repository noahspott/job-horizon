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

export const getResumePrompt = ({
  jobDescription,
  profile,
}: {
  jobDescription: string;
  profile: any;
}) => {
  return `You are an AI assistant tasked with generating a tailored resume for a job applicant based on a given job description and the applicant's information. Your goal is to create a resume that highlights the applicant's relevant skills and experiences without fabricating any information.

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

Remember, your goal is to create a compelling resume that accurately represents the applicant's qualifications while highlighting their relevance to the specific job opportunity.`;
}

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

Based on the job description and work experience provided, create a tailored work experience section for a resume. Follow these guidelines:

1. List positions in reverse chronological order
2. Focus on achievements and responsibilities that directly relate to the job requirements
3. Use strong action verbs to begin each bullet point
4. Quantify accomplishments where possible using numbers and metrics
5. Emphasize skills and experiences that match keywords from the job description
6. Keep descriptions concise but impactful
7. Only use information provided in the work experience data
8. Format each position consistently with:
   - Company name
   - Job title
   - Dates of employment
   - Location (if provided)
   - 3-5 bullet points of key achievements/responsibilities

Present the work experience section in this format:

<work_experience_section>
[Insert formatted work experience here]
</work_experience_section>`;
}

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

Based on the job description and skills provided, create a tailored skills section for a resume. Follow these guidelines:

1. Organize skills into relevant categories (e.g., Technical Skills, Soft Skills, Tools & Technologies)
2. Prioritize skills that directly match or relate to the job requirements
3. List the most relevant skills first within each category
4. Include only skills mentioned in the provided skills data
5. Format the skills in a clear, scannable way
6. If applicable, indicate proficiency levels for technical skills
7. Ensure all listed skills are relevant to the position

Present the skills section in this format:

<skills_section>
[Insert categorized skills here]
</skills_section>`;

