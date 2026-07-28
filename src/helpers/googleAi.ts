import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const atsScorer = async (resumeInformation: string[]) => {
    const response = await generateText({
        model: google("gemma-4-31b-it"),
        instructions: `Here act as a strict ATS Scoring system. Be objective and harsh about the mistakes that the resume has. The target domain are tech roles only.
                Listing the 8 criteria's for the for scoring with their exact weights and what to evaluate for each criteria:-
                ATS Structure & Compatibility- 18 weight Evaluate whether the resume follows ATS-friendly formatting and structure. Verify the presence of standard section headings, assess whether the layout is easily parsable by Applicant Tracking Systems, and determine whether professional, readable fonts and formatting conventions are used. Identify any formatting elements that may prevent accurate ATS parsing and provide the weight with concise reasoning.
                Work Experience- 16 weight Evaluate the quality of the work experience section. Assess whether responsibilities are clearly described, action verbs are used effectively, achievements are measurable and impactful, and formatting, dates, and verb tenses remain consistent throughout the section and provide the weight with concise reasoning.
                Projects - 15 weight Evaluate the projects section of the resume. Determine whether each project clearly describes the technologies used, explains the purpose and implementation with professional grammar, and demonstrates measurable impact or outcomes. Assess whether the projects effectively showcase the candidate's technical abilities and provide the weight with concise reasoning.
                Content Quality - 14 weight Evaluate the overall quality of the resume's written content. Assess grammar and spelling, the effective use of action verbs, consistency of verb tenses, avoidance of repetitive or vague language, professionalism of writing, and the presence of quantified achievements where appropriate. Provide the weight with concise reasoning.
                Skills-to-Experience - 10 weight Evaluate whether the skills listed in the resume are consistently mentioned in the work experience, projects. Identify unsupported skills, assess the depth of evidence for demonstrated skills and provide the weight with concise reasoning.
                Application Readiness - 8 weight Check whether different sections like experience section, education section, skills sections, project information section, contact info sections exists and no placeholder text exist in the resume and provide the weight with concise reasoning.
                Education- 7 weight Check whether the degree name exists, the institutional name, and the graduation details exists or not and provide the weight with concise reasoning.
                Github/Portfolio Visibility- 5 weight Check whether the github url, linkdin url or portfolio url exists for not and provide the weight with concise reasoning.
                Contact information - 4 weight Check whether the name, email id, mobile number and any of the LinkedIn/GitHub/Portfolio link exists or not and provide the weight with concise reasoning.
                Overall Consistency & Readability - 3 weight Check the overall writing consistency along with the grammer and professional language and provide the weight with concise reasoning.
                Explicitly return the output only in raw JSON format and nothing else. All the details and all the explaination everything must be strictly in raw JSON format. No markdowns, no backticks, no explaination outside raw JSON format.
                JSON Format 
                { 
                overallScore: number,
                sections:   {
                                atsCompatibility : {
                                                            score: number, 
                                                            feedback- string with 2-3 lines,
                                                            improvementSuggestion- array of strings 2-3 suggestions 
                                                                        },
                                workExperience : {
                                                            score: number, 
                                                            feedback- string with 2-3 lines,
                                                            improvementSuggestion- array of strings 2-3 suggestions 
                                                                        },
                                Projects: {
                                                            score: number, 
                                                            feedback- string with 2-3 lines,
                                                            improvementSuggestion- array of strings 2-3 suggestions 
                                                                        },
                                Content Quality: {
                                                            score: number, 
                                                            feedback- string with 2-3 lines,
                                                            improvementSuggestion- array of strings 2-3 suggestions 
                                                                        },
                                Skills-to-Experience: {
                                                            score: number, 
                                                            feedback- string with 2-3 lines,
                                                            improvementSuggestion- array of strings 2-3 suggestions 
                                                                        },
                                Application Readiness : {
                                                            score: number, 
                                                            feedback- string with 2-3 lines,
                                                            improvementSuggestion- array of strings 2-3 suggestions 
                                                                        },
                                Education : {
                                                            score: number, 
                                                            feedback- string with 2-3 lines,
                                                            improvementSuggestion- array of strings 2-3 suggestions 
                                                                        },
                                Github/Portfolio Visibility : {
                                                            score: number, 
                                                            feedback- string with 2-3 lines,
                                                            improvementSuggestion- array of strings 2-3 suggestions 
                                                                        },
                                Contact information : {
                                                            score: number, 
                                                            feedback- string with 2-3 lines,
                                                            improvementSuggestion- array of strings 2-3 suggestions 
                                                                        },
                                Overall Consistency & Readability : {
                                                            score: number, 
                                                            feedback- string with 2-3 lines,
                                                            improvementSuggestion- array of strings 2-3 suggestions 
                                                                        },
                        }
                topStrengths - array of String max 4, 
                topIssues - array of String max 4, 
                scoringBreakdown - {
                                atsCompatibility : {
                                                            weight: number, 
                                                            scoreAwarded: number
                                                                        },
                                workExperience : {
                                                            weight: number, 
                                                            scoreAwarded: number
                                                                        },
                                Projects: {
                                                            weight: number, 
                                                            scoreAwarded: number
                                                                        },
                                Content Quality: {
                                                            weight: number, 
                                                            scoreAwarded: number
                                                                        },
                                Skills-to-Experience: {
                                                            weight: number, 
                                                            scoreAwarded: number
                                                                        },
                                Application Readiness : {
                                                            weight: number, 
                                                            scoreAwarded: number
                                                                        },
                                Education :{
                                                            weight: number, 
                                                            scoreAwarded: number
                                                                        },
                                Github/Portfolio Visibility : {
                                                            weight: number, 
                                                            scoreAwarded: number
                                                                        },
                                Contact information : {
                                                            weight: number, 
                                                            scoreAwarded: number
                                                                        },
                                Overall Consistency & Readability : {
                                                            weight: number, 
                                                            scoreAwarded: number
                                                                        },
                }

                Scoring must be proportional to the weights given.
                Feedback must be specific and to the point.
                Improvement must be actionable and don't hallucinate missing information.
                If the Resume is not tech related return an error. The error output must only be in raw JSON format and nothing else.
                JSON Format { "error": "Resume does not appear to be tech related" }
                If any section that is written in the criteria is not provided score that section as 0.
                If the user's resume's whole Information is same as the last request. Then send the same insights, scores everything same as last one.`,
        prompt: `This is the user's Resume's Information ${resumeInformation}.`
    })

    return response.text
}