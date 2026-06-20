import {model} from './geminiConfig'

class GeminiService {
    async generateJson(prompt) {
        try {
            const result =
            await model.generateContent(prompt)

        const response =
            await result.response.text()

        return JSON.parse(
            response
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim()
        )
        } catch (error) {
            console.log("GEMINI SERVICE ERROR:", error)
            throw error
        }

        
    }
    async analyzeResume({
        resumeText,
        targetRole
    }) {

        const prompt = `
        You are an expert ATS Resume Analyzer.
        Target Role:${targetRole}

        Resume:${resumeText}
        Analyze this resume and return ONLY valid JSON.

        Rules:
        * atsScore must be between 0 and 100
        * roleFit must be between 0 and 100
        * verdict must be one of:
        "Excellent"
        "Good"
        "Average"
        "Needs Improvement"

        Return:

        {
            "atsScore": 0,
            "roleFit": 0,
            "verdict": "",
            "keywordsFound": [],
            "missingSkills": [],
            "strengths": [],
            "improvements": [],
            "actionPlan": []
        }
            Do not include markdown.
            Do not include explanations.
            Return only JSON.`
        return this.generateJson(prompt)
    }

    async analyzeResumeMatch({
        resumeText,
        jobDescription
    }) {

        const prompt = `
        You are an ATS Resume Matching System.

        Resume:${resumeText}
        Job Description:${jobDescription}
        Compare both and return ONLY valid JSON.

        Rules:
        * matchScore must be between 0 and 100

        Return:

        {
            "matchScore": 0,
            "matchedSkills": [],
            "missingSkills": [],
            "recommendations": []
        }
            Do not include markdown.
            Do not include explanations.
            Return only JSON.`

        return this.generateJson(prompt)
    }

}

const geminiService = new GeminiService()

export default geminiService
