"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Card, CardHeader, CardContent } from "@/app/components/ui/Card";
import { createClient } from "@/app/utils/supabase/client";

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
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    email: "",
    name: "",
    city: "",
    state: "",
    country: "",
    linkedin: "",
    github: "",
    education: [],
    workExperience: [],
    skills: [],
  });

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("Error loading profile:", error);
          return;
        }

        const sanitizedData = {
          email: data.email || "",
          name: data.name || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
          linkedin: data.linkedin || "",
          github: data.github || "",
          education: data.education || [],
          workExperience: data.work_experience || [],
          skills: data.skills || [],
        };

        setProfileData(sanitizedData);
      } catch (error) {
        console.error("Error in loadProfile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [supabase]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300"></div>
        </div>
      </div>
    );
  }

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

  const EditMode = () => {
    const [formData, setFormData] = useState(profileData);
    const [newSkill, setNewSkill] = useState("");

    const handleLocalChange = (field: keyof ProfileData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveChanges = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          console.error("Authentication error: No user found");
          return;
        }

        // Convert camelCase to snake_case for database compatibility
        const dbFormattedData = {
          id: user.id,
          user_id: user.id,
          email: formData.email,
          name: formData.name,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          linkedin: formData.linkedin,
          github: formData.github,
          education: formData.education,
          work_experience: formData.workExperience,
          skills: formData.skills,
          updated_at: new Date().toISOString(),
        };

        console.log("Attempting to save profile with data:", dbFormattedData);

        const { data, error } = await supabase
          .from("profiles")
          .upsert(dbFormattedData, {
            onConflict: "user_id",
            ignoreDuplicates: false,
          })
          .select()
          .single();

        if (error) {
          console.error("Supabase error details:", {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
          });
          throw error;
        }

        console.log("Save successful:", data);
        setProfileData(formData);
        setIsEditing(false);
      } catch (error: any) {
        console.error("Detailed error:", {
          message: error?.message,
          code: error?.code,
          details: error?.details,
          stack: error?.stack,
        });
        alert("Failed to save profile. Please check the console for details.");
      }
    };

    const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && newSkill.trim()) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, newSkill.trim()],
        }));
        setNewSkill("");
      }
    };

    const handleRemoveSkill = (index: number) => {
      setFormData((prev) => ({
        ...prev,
        skills: prev.skills.filter((_, i) => i !== index),
      }));
    };

    const handleEducationChange = (
      index: number,
      field: keyof Education,
      value: string
    ) => {
      setFormData((prev) => ({
        ...prev,
        education: prev.education.map((edu, i) =>
          i === index ? { ...edu, [field]: value } : edu
        ),
      }));
    };

    const handleAddEducation = () => {
      setFormData((prev) => ({
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
      setFormData((prev) => ({
        ...prev,
        education: prev.education.filter((_, i) => i !== index),
      }));
    };

    const handleWorkChange = (
      index: number,
      field: keyof WorkExperience,
      value: string
    ) => {
      setFormData((prev) => ({
        ...prev,
        workExperience: prev.workExperience.map((work, i) =>
          i === index ? { ...work, [field]: value } : work
        ),
      }));
    };

    const handleAddWork = () => {
      setFormData((prev) => ({
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
      setFormData((prev) => ({
        ...prev,
        workExperience: prev.workExperience.filter((_, i) => i !== index),
      }));
    };

    return (
      <div className="space-y-8">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Edit Profile</h2>
            <div className="space-x-2">
              <Button onClick={() => setIsEditing(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
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
                    value={formData.name}
                    onChange={(e) => handleLocalChange("name", e.target.value)}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleLocalChange("email", e.target.value)}
                  />
                  <Input
                    label="City"
                    value={formData.city}
                    onChange={(e) => handleLocalChange("city", e.target.value)}
                  />
                  <Input
                    label="State"
                    value={formData.state}
                    onChange={(e) => handleLocalChange("state", e.target.value)}
                  />
                  <Input
                    label="Country"
                    value={formData.country}
                    onChange={(e) =>
                      handleLocalChange("country", e.target.value)
                    }
                  />
                  <Input
                    label="LinkedIn"
                    value={formData.linkedin}
                    onChange={(e) =>
                      handleLocalChange("linkedin", e.target.value)
                    }
                  />
                  <Input
                    label="GitHub"
                    value={formData.github}
                    onChange={(e) =>
                      handleLocalChange("github", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <h3 className="font-semibold">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
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
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
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
                {formData.education.map((edu, index) => (
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
                {formData.workExperience.map((work, index) => (
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
  };

  return (
    <div className="container mx-auto py-8">
      {isEditing ? <EditMode /> : <ViewMode />}
    </div>
  );
}
