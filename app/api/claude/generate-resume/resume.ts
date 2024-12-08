/**
 * Generates a formatted header section for a resume
 * @param profile - Object containing personal profile information
 * @param profile.name - Full name of the person
 * @param profile.email - Email address
 * @param profile.phone - Phone number
 * @param profile.linkedin - LinkedIn profile URL or username
 * @param profile.github - GitHub profile URL or username
 * @returns Formatted string with name and contact information, separated by newlines
 */
export const getHeader = (profile: {
    name?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
}) => {
    const parts = [profile.name || 'Name not provided'];
    
    const contactLine = [
        profile.email && `Email: ${profile.email}`,
        profile.phone && `Phone: ${profile.phone}`
    ].filter(Boolean).join(' | ');
    
    const socialLine = [
        profile.linkedin && `LinkedIn: ${profile.linkedin}`,
        profile.github && `Github: ${profile.github}`
    ].filter(Boolean).join(' | ');
    
    if (contactLine) parts.push(contactLine);
    if (socialLine) parts.push(socialLine);
    
    return parts.join('\n');
}; 

/**
 * Generates a formatted education section for a resume
 * @param education - Object containing education details
 * @param education.degree - Type of degree (e.g., "Bachelor of Science")
 * @param education.school - Name of the educational institution
 * @param education.fieldOfStudy - Major or area of study
 * @param education.startDate - Start date of education
 * @param education.endDate - End date or expected completion date
 * @returns Formatted string with education details, separated by newlines
 */
export const getEducationSection = (education: {
    degree?: string;
    school?: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
}) => {
    const parts = [];
    
    if (education.degree && education.fieldOfStudy) {
        parts.push(`${education.degree} in ${education.fieldOfStudy}`);
    } else if (education.degree) {
        parts.push(education.degree);
    }
    
    if (education.school) {
        parts.push(education.school);
    }
    
    const dateLine = [
        education.startDate,
        education.endDate
    ].filter(Boolean).join(' – ');
    
    if (dateLine) {
        parts.push(dateLine);
    }
    
    return parts.join('\n');
};

