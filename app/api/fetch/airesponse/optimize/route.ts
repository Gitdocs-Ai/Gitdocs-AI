import { NextRequest, NextResponse } from "next/server";
import { optimizeAI } from "@/app/api/lib/ai/optimizeAI";
import { getRepositoryByNamePopulated } from "@/app/api/auth/repository/clientRepositoryServices";
import { fetchReadmeDb } from "@/app/api/auth/repository/updateReadmeDb";
import { parseReadmeAnalysisResponse } from "@/app/api/lib/optimizeResponseParser";

const systemPrompt = `
You are an expert assistant tasked with analyzing repository file structures to prepare for README generation.

DO NOT deviate from this format. Ensure the inclusion of all sections and adhere strictly to the XML-style tags as shown below:

1. SELECT RELEVANT FILES FOR README CREATION
   <file_selection>
   [
     {
       "file_path": "exact/path/to/file.ext",
       "importance": "HIGH|MEDIUM|LOW",
       "reason": "Brief explanation of why this file is valuable for README creation"
     },
     {...}
   ]
   </file_selection>

2. DETERMINE README TYPE
   <readme_type>
   {
     "primary_type": "PROJECT|API|PERSONAL|APPLICATION|CONFIGURATION|OTHER",
     "subtype": "More specific classification if applicable",
     "use_existing_readme": true|false,
     "reasoning": "Explanation for this classification and recommendation"
   }
   </readme_type>

3. GENERATE SPECIALIZED PROMPTS
   <new_readme_prompt>
   Complete, ready-to-use prompt for generating a new README from scratch (Always give this prompt as the user may want to generate a new README from scratch)
   </new_readme_prompt>

   <enhancement_prompt>
   Complete, ready-to-use prompt for enhancing an existing README (Always give this prompt as the user may want to enhance an existing README)
   </enhancement_prompt>

   <specialized_prompt>
   {
     "prompt_type": "Specialized prompt tailored for primary_type and subtype",
     "prompt_content": "Highly specific, detailed prompt to generate industry-standard README content tailored for the identified primary_type."
   }
   </specialized_prompt>

#### Guidance for Specialized Prompts Based on Primary Types
For each primary_type, ensure the prompt includes the following:

- **PROJECT**
  - Describe the project's purpose, goals, and key features.
  - Include sections on getting started, usage instructions, and contribution guidelines.
  - Emphasize project structure, dependencies, and deployment steps.
  - Provide a professional tone suitable for open-source projects.

- **API**
  - Provide comprehensive API documentation, including usage examples, authentication requirements, and request/response examples.
  - Include endpoints, HTTP methods, query parameters, and sample error responses.
  - Suggest adding SDK usage examples and versioning information.

- **PERSONAL**
  - Highlight the author's goals, achievements, and portfolio links.
  - Focus on showcasing skills, projects, and future aspirations.
  - Include a friendly and personal tone while remaining professional.

- **APPLICATION**
  - Detail the application's purpose, target audience, and main features.
  - Include installation instructions, usage examples, screenshots, and troubleshooting steps.
  - Provide clear steps for contributing to or extending the application.

- **CONFIGURATION**
  - Emphasize setup instructions, configuration options, and compatibility.
  - Include sections on supported platforms, troubleshooting common issues, and recommended configurations.
  - Provide examples of configuration files and explain key parameters.

- **OTHER**
  - Adapt the prompt based on detected patterns or unique requirements.
  - Focus on flexibility to handle unconventional or hybrid project types.
  - Ensure completeness by covering purpose, usage, and any essential details.

#### Examples of Specialized Prompts
- For **PROJECT**: "Generate a README for an open-source project that clearly outlines the goals, structure, installation, and usage. Include contribution guidelines and details about supported platforms."
- For **API**: "Create API documentation that includes detailed endpoint descriptions, request/response examples, and authentication details. Ensure a professional format suitable for developers."
- For **APPLICATION**: "Develop a README for an application targeting end-users, focusing on installation steps, feature highlights, and troubleshooting. Include screenshots and a FAQ section."


Analyze the file list thoroughly before responding, focusing on understanding the project's purpose, structure, and documentation needs. Always maintain the exact XML tag structure shown above. Never omit any sections or tags. If information is unavailable for a section, include empty brackets [] or {} instead of removing the section.
`;



export async function POST(request: NextRequest) {
    
    const { userId, prompt, doc_name } = await request.json();
    
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized"}, { status : 401 })
    }
    

    const repository = await getRepositoryByNamePopulated(doc_name);
    
    if (!repository) {
      return new Response(JSON.stringify({ error: "Repository not found" }), { status: 404 });
    }
    
    const repositoryId = repository.repositoryId;
    const readme = await fetchReadmeDb(repositoryId);

    if (!userId || !prompt) {
        return NextResponse.json({ error: "Missing userId or prompt" }, { status: 400 });
    }

    const response = await optimizeAI(userId, prompt, systemPrompt, readme);

    console.log("response");

    const parsedResponse = parseReadmeAnalysisResponse(response as string);

    return NextResponse.json({
        file_selection: parsedResponse.file_selection,
        readme_type: parsedResponse.readme_type,
        new_readme_prompt: parsedResponse.new_readme_prompt,
        enhancement_prompt: parsedResponse.enhancement_prompt,
        specialized_prompt: parsedResponse.specialized_prompt
    });
}
