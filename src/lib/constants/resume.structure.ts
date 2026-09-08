export const structurePrompt = (resumeInformation: string) => {
    return `This resume is in plain text format: ${resumeInformation}.
    Parse and structure it strictly into the following json format.
    {
        personalInformation:{
                        name:  string,
                        email: string,
                        phoneNumber: string(optional if provided by the user)
                        linkdin: string (linkdin url optional if provided by the user)
                        github:  string (github url optional if provided by the user)
                        },
        summary: "string | null" (optional if provide by user), 
        education: [
                        {
                        "institution": "string",
                        "degree": "string",
                        "fieldOfStudy": "string",
                        "startDate": "string",
                        "endDate": "string",
                        "grade": "string (optional if provided by the user)"
                        }
                    ],
        skills: {
                        categoryName: [string, string, ...]
                },
        experience: [
                        {
                        company: string,
                        title: string,
                        startDate: string,
                        endDate: string,
                        bullets: [string, string, ...]
                        }
                    ]
        projects:   [
                        {
                        name: string,
                        tech: [string, string, ...] (optional if provided by the user),
                        bullets: [string, string, ...],
                        url: string (optional)
                        }
                    ],
        achievements: [
                        {
                        awardName: string
                        organisation: string
                        year: string,
                        description: string
                        }
                       ],
        certifications: [
                            {
                                name: string,
                                issuingOrganization: string,
                                date: string,
                                credentialId: string (optional if provided by the user)
                            }
                        ],
        researchPaper: [
                            {
                            researchTitle: string,
                            institution: string,
                            role: string,
                            startDate: string,
                            endDate: string,
                            description: string,
                            }
                        ] ,
    }
    DO NOT ADD ANYTHING NOT PRESENT, MODIFY ANY CONTENT. JUST ORGANISE THE CONTENT PROVIDED.
    Handle missing sections gracefully (omit them). 
    OUTPUT FORMAT SHOULD BE STRICTLY JSON. Explicitly return the output as raw JSON and nothing else. No markdown, no backticks, no explanation outside the JSON.`
}