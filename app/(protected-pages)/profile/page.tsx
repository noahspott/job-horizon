"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/input";
import { Card, CardHeader, CardContent } from "@/app/components/ui/Card";

interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ProfileData {
  // Account Info
  email: string;
  name: string;

  // Resume Info
  city: string;
  state: string;
  country: string;
  linkedin: string;
  github: string;
  education: Education[];
  workExperience: WorkExperience[];
  skills: string[];
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    email: "user@example.com",
    name: "John Doe",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    education: [
      {
        school: "University of Example",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        startDate: "2018",
        endDate: "2022",
      },
    ],
    workExperience: [
      {
        company: "Tech Corp",
        position: "Software Engineer",
        startDate: "2022",
        endDate: "Present",
        description: "Full-stack development",
      },
    ],
    skills: ["React", "TypeScript", "Node.js"],
  });

  const ViewMode = () => (
    <div className="space-y-8">
      <Card>
        <CardHeader className="text-xl font-bold">
          Account Information
        </CardHeader>
        <CardContent>
          <p>Email: {profileData.email}</p>
          <p>Name: {profileData.name}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Resume</h2>
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Personal Information</h3>
            <p>City: {profileData.city}</p>
            <p>State: {profileData.state}</p>
            <p>Country: {profileData.country}</p>
            <p>LinkedIn: {profileData.linkedin}</p>
            <p>GitHub: {profileData.github}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Education</h3>
            {profileData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <p>
                  {edu.school} - {edu.degree}
                </p>
                <p>{edu.fieldOfStudy}</p>
                <p>
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Work Experience</h3>
            {profileData.workExperience.map((work, index) => (
              <div key={index} className="mb-4">
                <p>
                  {work.company} - {work.position}
                </p>
                <p>
                  {work.startDate} - {work.endDate}
                </p>
                <p>{work.description}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Skills</h3>
            <p>{profileData.skills.join(", ")}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const EditMode = () => (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <div className="space-x-2">
            <Button onClick={() => setIsEditing(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-300">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Name"
                  value={profileData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <Input
                  label="Email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                <Input
                  label="City"
                  value={profileData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                />
                <Input
                  label="State"
                  value={profileData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                />
                <Input
                  label="Country"
                  value={profileData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                />
                <Input
                  label="LinkedIn"
                  value={profileData.linkedin}
                  onChange={(e) =>
                    handleInputChange("linkedin", e.target.value)
                  }
                />
                <Input
                  label="GitHub"
                  value={profileData.github}
                  onChange={(e) => handleInputChange("github", e.target.value)}
                />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-700 text-gray-100 rounded-full px-3 py-1"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="ml-2 text-gray-300 hover:text-gray-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <Input
                  placeholder="Add a skill..."
                  onKeyDown={handleAddSkill}
                  className="w-32"
                />
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Education</h3>
                <Button
                  type="button"
                  onClick={handleAddEducation}
                  variant="outline"
                  size="sm"
                >
                  Add Education
                </Button>
              </div>
              {profileData.education.map((edu, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="School"
                      value={edu.school}
                      onChange={(e) =>
                        handleEducationChange(index, "school", e.target.value)
                      }
                    />
                    <Input
                      label="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(index, "degree", e.target.value)
                      }
                    />
                    <Input
                      label="Field of Study"
                      value={edu.fieldOfStudy}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "fieldOfStudy",
                          e.target.value
                        )
                      }
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Start Date"
                        value={edu.startDate}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        label="End Date"
                        value={edu.endDate}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleRemoveEducation(index)}
                    variant="outline"
                    className="text-red-500"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            {/* Work Experience */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Work Experience</h3>
                <Button
                  type="button"
                  onClick={handleAddWork}
                  variant="outline"
                  size="sm"
                >
                  Add Experience
                </Button>
              </div>
              {profileData.workExperience.map((work, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Company"
                      value={work.company}
                      onChange={(e) =>
                        handleWorkChange(index, "company", e.target.value)
                      }
                    />
                    <Input
                      label="Position"
                      value={work.position}
                      onChange={(e) =>
                        handleWorkChange(index, "position", e.target.value)
                      }
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Start Date"
                        value={work.startDate}
                        onChange={(e) =>
                          handleWorkChange(index, "startDate", e.target.value)
                        }
                      />
                      <Input
                        label="End Date"
                        value={work.endDate}
                        onChange={(e) =>
                          handleWorkChange(index, "endDate", e.target.value)
                        }
                      />
                    </div>
                    <textarea
                      className="col-span-2 p-2 border rounded bg-gray-700 text-gray-100 border-gray-600"
                      placeholder="Description"
                      value={work.description}
                      onChange={(e) =>
                        handleWorkChange(index, "description", e.target.value)
                      }
                      rows={3}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleRemoveWork(index)}
                    variant="outline"
                    className="text-red-500"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const handleWorkChange = (
    index: number,
    field: keyof WorkExperience,
    value: string
  ) => {
    setProfileData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((work, i) =>
        i === index ? { ...work, [field]: value } : work
      ),
    }));
  };

  const handleAddEducation = () => {
    setProfileData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          school: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
        },
      ],
    }));
  };

  const handleRemoveEducation = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleAddWork = () => {
    setProfileData((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const handleRemoveWork = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index),
    }));
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, e.currentTarget.value.trim()],
      }));
      e.currentTarget.value = "";
    }
  };

  const handleRemoveSkill = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    // Here you would typically send the data to your backend
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto py-8">
      {isEditing ? <EditMode /> : <ViewMode />}
    </div>
  );
}
