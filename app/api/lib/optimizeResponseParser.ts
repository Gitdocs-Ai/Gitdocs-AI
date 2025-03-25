// Define interfaces for the parsed data structures
export interface FileSelection {
    file_path: string;
    importance: 'HIGH' | 'MEDIUM' | 'LOW';
    reason: string;
}

export interface ReadmeType {
    primary_type: 'PROJECT' | 'API' | 'PERSONAL' | 'APPLICATION' | 'CONFIGURATION' | 'OTHER';
    subtype: string;
    use_existing_readme: boolean;
    reasoning: string;
}

export interface SpecializedPrompt {
    prompt_type: string;
    prompt_content: string;
}

export interface ParsedReadmeAnalysis {
    file_selection: FileSelection[];
    readme_type: ReadmeType;
    new_readme_prompt: string;
    enhancement_prompt: string;
    specialized_prompt: SpecializedPrompt;
}

/**
 * Sanitizes JSON string by removing escape characters, extra whitespace, and normalizing structure
 */
function sanitizeJsonString(jsonString: string): string {
    // Remove escaped newlines and quotes
    let cleaned = jsonString.replace(/\\n/g, ' ').replace(/\\"/g, '"');
    
    // Remove literal newlines and normalize whitespace
    cleaned = cleaned.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    
    // If it's wrapped in backticks or triple backticks (code blocks from AI), remove them
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    
    return cleaned;
}

/**
 * Extracts valid JSON from a potentially malformatted string
 */
function extractValidJson(input: string, isArray = false): string {
    const startChar = isArray ? '[' : '{';
    const endChar = isArray ? ']' : '}';
    
    const startIndex = input.indexOf(startChar);
    const endIndex = input.lastIndexOf(endChar);
    
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        return input.substring(startIndex, endIndex + 1);
    }
    
    return isArray ? '[]' : '{}';
}

/**
 * Safely parses JSON with multiple fallback strategies
 */
function safeJsonParse<T>(input: string, defaultValue: T, isArray = false): T {
    if (!input || input.trim() === '') {
        return defaultValue;
    }
    
    try {
        // First try direct parsing
        return JSON.parse(input);
    } catch (error) {
        try {
            // Try sanitizing and parsing
            const sanitized = sanitizeJsonString(input);
            return JSON.parse(sanitized);
        } catch (innerError) {
            try {
                // Try extracting valid JSON structure and parsing
                const extracted = extractValidJson(input, isArray);
                const sanitizedExtracted = sanitizeJsonString(extracted);
                return JSON.parse(sanitizedExtracted);
            } catch (finalError) {
                console.error('All JSON parsing attempts failed:', finalError);
                return defaultValue;
            }
        }
    }
}

/**
 * Parse the structured response from the AI to extract file selection,
 * README type, and all generated prompts.
 * 
 * @param responseText The full text response from the AI
 * @returns An object containing all the parsed information
 */
export function parseReadmeAnalysisResponse(responseText: string): ParsedReadmeAnalysis {
    const result: ParsedReadmeAnalysis = {
        file_selection: [],
        readme_type: {
            primary_type: 'OTHER',
            subtype: '',
            use_existing_readme: false,
            reasoning: ''
        },
        new_readme_prompt: '',
        enhancement_prompt: '',
        specialized_prompt: {
            prompt_type: '',
            prompt_content: ''
        }
    };

    // Handle cases where the whole response might be a JSON array
    try {
        // Try parsing the entire response as JSON first
        const jsonResponse = JSON.parse(responseText);
        
        // If it's an array of objects with specific keys, extract the XML-tagged content
        if (Array.isArray(jsonResponse)) {
            const combinedResponse = jsonResponse.map(item => {
                return Object.values(item).join('\n');
            }).join('\n');
            
            // Update the response text to use this extracted content
            responseText = combinedResponse;
        }
    } catch (error) {
        // Not a JSON response, continue with XML tag parsing
    }

    // Extract file selection
    const fileSelectionMatch = responseText.match(/<file_selection>([\s\S]*?)<\/file_selection>/);
    if (fileSelectionMatch && fileSelectionMatch[1]) {
        const fileSelectionText = fileSelectionMatch[1].trim();
        result.file_selection = safeJsonParse<FileSelection[]>(fileSelectionText, [], true);
    }

    // Extract README type
    const readmeTypeMatch = responseText.match(/<readme_type>([\s\S]*?)<\/readme_type>/);
    if (readmeTypeMatch && readmeTypeMatch[1]) {
        const readmeTypeText = readmeTypeMatch[1].trim();
        const defaultReadmeType: ReadmeType = {
            primary_type: 'OTHER',
            subtype: '',
            use_existing_readme: false,
            reasoning: ''
        };
        result.readme_type = safeJsonParse<ReadmeType>(readmeTypeText, defaultReadmeType);
    }

    // Extract new README prompt (text field, no JSON parsing needed)
    const newReadmeMatch = responseText.match(/<new_readme_prompt>([\s\S]*?)<\/new_readme_prompt>/);
    if (newReadmeMatch && newReadmeMatch[1]) {
        result.new_readme_prompt = newReadmeMatch[1].trim();
    }

    // Extract enhancement prompt (text field, no JSON parsing needed)
    const enhancementMatch = responseText.match(/<enhancement_prompt>([\s\S]*?)<\/enhancement_prompt>/);
    if (enhancementMatch && enhancementMatch[1]) {
        result.enhancement_prompt = enhancementMatch[1].trim();
    }

    // Extract specialized prompt
    const specializedMatch = responseText.match(/<specialized_prompt>([\s\S]*?)<\/specialized_prompt>/);
    if (specializedMatch && specializedMatch[1]) {
        const specializedText = specializedMatch[1].trim();
        const defaultSpecializedPrompt: SpecializedPrompt = {
            prompt_type: 'Unknown',
            prompt_content: specializedText
        };
        
        try {
            // Check if it's empty or just {}
            if (specializedText === '{}' || specializedText === '') {
                result.specialized_prompt = {
                    prompt_type: 'Unknown',
                    prompt_content: ''
                };
            } else {
                result.specialized_prompt = safeJsonParse<SpecializedPrompt>(specializedText, defaultSpecializedPrompt);
            }
        } catch (error) {
            console.error('Specialized prompt parsing failed, using default:', error);
            result.specialized_prompt = defaultSpecializedPrompt;
        }
    }

    return result;
}

/**
 * Extract high importance files from the parsed result
 */
export function getImportantFiles(parsedResult: ParsedReadmeAnalysis): string[] {
    return parsedResult.file_selection
        .filter(file => file.importance === 'HIGH')
        .map(file => file.file_path);
}