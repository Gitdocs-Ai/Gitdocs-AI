export async function fetchAIResponse(
    userId: string,
    prompt: string,
    docName: string,
    model: string,
    base_url: string,
    selectedFiles: string[],
    onUpdateMessages: (message: { role: string; content: string }) => void,
    onUpdateContent: (chunk: string) => void,
    onUpdatePreviewContent: (isPreviewing: boolean) => void,
) {
    const endpoint = "/api/fetch/airesponse/generate"; // API endpoint

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userId}`,
            },
            body: JSON.stringify({
                prompt,
                doc_name: docName,
                model,
                base_url,
                selectedFiles,
            }),
        });

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        if (!response.body) {
            throw new Error("Response body is empty");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let currentSection = "normal";
        let normalContent = "";
        let readmeContent = "";
        let conclusionContent = "";
        let inMarkdownBlock = false;
        let markdownBuffer = "";

        // Helper function to update text token by token (preserving whitespace) with a delay.
        async function updateTokenByToken(
            text: string,
            callback: (token: string) => void,
        ) {
            // This regex splits text into tokens (words, punctuation, and whitespace).
            const tokens = text.match(/(\S+|\s+)/g);
            if (tokens) {
                for (const token of tokens) {
                    callback(token);
                    // Wait 5ms between tokens; adjust delay as needed.
                    await new Promise((resolve) => setTimeout(resolve, 5));
                }
            }
        }

        // Enhanced function to handle markdown code blocks
        function parseMarkdownContent(text: string): string {
            // If we're not in a markdown block, check if we're entering one
            if (!inMarkdownBlock) {
                if (text.includes("```markdown")) {
                    inMarkdownBlock = true;
                    // Get content after ```markdown
                    const parts = text.split("```markdown");
                    markdownBuffer = parts.length > 1 ? parts[1] : "";
                    return markdownBuffer;
                }
                // Additional check for markdown code blocks without the "markdown" specifier
                else if (text.includes("```")) {
                    inMarkdownBlock = true;
                    // Get content after ```
                    const parts = text.split("```");
                    // If there's content after the first ```, use it
                    if (parts.length > 1) {
                        // Check if the part right after ``` is a language specifier
                        const firstPart = parts[1].trim();
                        if (
                            firstPart.startsWith("markdown") ||
                            firstPart.startsWith("\nmarkdown")
                        ) {
                            markdownBuffer = parts[1].replace(
                                /^markdown\s*/,
                                "",
                            );
                        } else {
                            markdownBuffer = parts[1];
                        }
                        return markdownBuffer;
                    }
                    return "";
                }
                return text;
            }
            // If we're in a markdown block, check if we're exiting
            else {
                // Check for various ways the markdown block might end
                if (
                    text.includes("```") ||
                    text.includes("markdown```") ||
                    text.includes("```markdown")
                ) {
                    let content = "";
                    // Handle different closing patterns
                    if (text.includes("markdown```")) {
                        const parts = text.split("markdown```");
                        content = parts[0];
                        // Handle any content after the closing ```
                        if (parts.length > 1 && parts[1].trim()) {
                            inMarkdownBlock = false;
                            return content;
                        }
                    } else if (text.includes("```markdown")) {
                        // This is a case where one ``` block ends and another begins
                        const parts = text.split("```markdown");
                        content = parts[0].split("```")[0];
                        // Set up for the next markdown block
                        if (parts.length > 1) {
                            markdownBuffer = parts[1];
                        }
                    } else if (text.includes("```")) {
                        const parts = text.split("```");
                        content = parts[0];
                        // Handle any content after the closing ```
                        if (parts.length > 1 && parts[1].trim()) {
                            inMarkdownBlock = false;
                            return content;
                        }
                    }

                    inMarkdownBlock = false;
                    return content;
                }
                // If we're inside a markdown block and there's no closing tag, return the content as is
                return text;
            }
        }

        while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;

            if (value) {
                let chunk = decoder.decode(value);

                // Handle <<readme>> marker
                if (chunk.includes("<<readme>>")) {
                    const parts = chunk.split("<<readme>>");

                    // Process the text before the marker in the current section
                    if (parts[0].trim().length > 0) {
                        if (currentSection === "normal") {
                            normalContent += parts[0];
                            await updateTokenByToken(
                                parts[0],
                                (token: string) => {
                                    onUpdateMessages({
                                        role: "assistant",
                                        content: token,
                                    });
                                },
                            );
                        } else if (currentSection === "readme") {
                            const parsedContent = parseMarkdownContent(
                                parts[0],
                            );
                            if (parsedContent.trim().length > 0) {
                                readmeContent += parsedContent;
                                await updateTokenByToken(
                                    parsedContent,
                                    onUpdateContent,
                                );
                            }
                        } else if (currentSection === "conclusion") {
                            conclusionContent += parts[0];
                            await updateTokenByToken(
                                parts[0],
                                (token: string) => {
                                    onUpdateMessages({
                                        role: "assistant",
                                        content: token,
                                    });
                                },
                            );
                        }
                    }

                    // Switch to readme mode
                    currentSection = "readme";
                    onUpdatePreviewContent(true);

                    // Process the text after the marker as readme content
                    if (parts[1] && parts[1].trim().length > 0) {
                        const parsedContent = parseMarkdownContent(parts[1]);
                        if (parsedContent.trim().length > 0) {
                            readmeContent += parsedContent;
                            await updateTokenByToken(
                                parsedContent,
                                onUpdateContent,
                            );
                        }
                    }
                }
                // Handle <<conclusion>> marker
                else if (chunk.includes("<<conclusion>>")) {
                    const parts = chunk.split("<<conclusion>>");

                    // Process text before the marker in the current section
                    if (parts[0].trim().length > 0) {
                        if (currentSection === "normal") {
                            normalContent += parts[0];
                            await updateTokenByToken(
                                parts[0],
                                (token: string) => {
                                    onUpdateMessages({
                                        role: "assistant",
                                        content: token,
                                    });
                                },
                            );
                        } else if (currentSection === "readme") {
                            const parsedContent = parseMarkdownContent(
                                parts[0],
                            );
                            if (parsedContent.trim().length > 0) {
                                readmeContent += parsedContent;
                                await updateTokenByToken(
                                    parsedContent,
                                    onUpdateContent,
                                );
                            }
                        } else if (currentSection === "conclusion") {
                            conclusionContent += parts[0];
                            await updateTokenByToken(
                                parts[0],
                                (token: string) => {
                                    onUpdateMessages({
                                        role: "assistant",
                                        content: token,
                                    });
                                },
                            );
                        }
                    }

                    // Switch to conclusion mode
                    currentSection = "conclusion";
                    onUpdatePreviewContent(false);

                    // Insert a separator for the conclusion block
                    onUpdateMessages({
                        role: "assistant",
                        content: "\n\nConclusion:\n",
                    });

                    // Process text after the marker
                    if (parts[1] && parts[1].trim().length > 0) {
                        conclusionContent += parts[1];
                        await updateTokenByToken(parts[1], (token: string) => {
                            onUpdateMessages({
                                role: "assistant",
                                content: token,
                            });
                        });
                    }
                }
                // Handle <<end>> marker
                else if (chunk.includes("<<end>>")) {
                    const parts = chunk.split("<<end>>");

                    // Process any text before the <<end>> marker
                    if (parts[0].trim().length > 0) {
                        if (currentSection === "normal") {
                            normalContent += parts[0];
                            await updateTokenByToken(
                                parts[0],
                                (token: string) => {
                                    onUpdateMessages({
                                        role: "assistant",
                                        content: token,
                                    });
                                },
                            );
                        } else if (currentSection === "readme") {
                            const parsedContent = parseMarkdownContent(
                                parts[0],
                            );
                            if (parsedContent.trim().length > 0) {
                                readmeContent += parsedContent;
                                await updateTokenByToken(
                                    parsedContent,
                                    onUpdateContent,
                                );
                            }
                        } else if (currentSection === "conclusion") {
                            conclusionContent += parts[0];
                            await updateTokenByToken(
                                parts[0],
                                (token: string) => {
                                    onUpdateMessages({
                                        role: "assistant",
                                        content: token,
                                    });
                                },
                            );
                        }
                    }

                    currentSection = "end";
                    onUpdatePreviewContent(false);
                    inMarkdownBlock = false; // Reset markdown state
                    break;
                }
                // No markers in the chunk; process as usual
                else {
                    if (currentSection === "normal") {
                        normalContent += chunk;
                        await updateTokenByToken(chunk, (token: string) => {
                            onUpdateMessages({
                                role: "assistant",
                                content: token,
                            });
                        });
                    } else if (currentSection === "readme") {
                        const parsedContent = parseMarkdownContent(chunk);
                        if (parsedContent.trim().length > 0) {
                            readmeContent += parsedContent;
                            await updateTokenByToken(
                                parsedContent,
                                onUpdateContent,
                            );
                        }
                    } else if (currentSection === "conclusion") {
                        conclusionContent += chunk;
                        await updateTokenByToken(chunk, (token: string) => {
                            onUpdateMessages({
                                role: "assistant",
                                content: token,
                            });
                        });

                        // Handle case where the conclusion was sent but no explicit end marker was received
                        if (
                            chunk.trim().endsWith(".") &&
                            conclusionContent.split("\n").length > 3
                        ) {
                            // If we have a substantial conclusion that ends with a period, we might be done
                            const timerId = setTimeout(() => {
                                // Only trigger this if we don't receive more content within a short time
                                if (currentSection === "conclusion") {
                                    currentSection = "end";
                                    onUpdatePreviewContent(false);
                                    inMarkdownBlock = false;
                                }
                            }, 2000); // 2 second timeout

                            // Clear the timeout if we get more content
                            return () => clearTimeout(timerId);
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
        onUpdateMessages({
            role: "assistant",
            content:
                "\n\nSorry, there was an error processing your request. Please try again.",
        });
        throw error;
    }
}
