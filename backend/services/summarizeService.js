const {ChatOpenAI} = require("@langchain/openai");
const {ChatPromptTemplate} = require("@langchain/core/prompts");
const {RunnableSequence} = require("@langchain/core/runnables");

const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY,
});


const prompt = ChatPromptTemplate.fromTemplate(
`'''You are an expert AI assistant specialized in summarizing text clearly, accurately, and concisely while preserving the key ideas and meaning.'''
'''
TASK:
Summarize the provided text into a shorter, clear, and easy-to-understand version.

FORMAT:
- Output ONLY the summary.
- Do NOT include explanations.
- Keep the same language as the input.
- Use clear and natural sentences.
- Keep the summary concise but complete.

CONTEXT:
The input text may be long, complex, or detailed. Your goal is to extract the most important ideas and present them in a simplified and structured way.

STEPS:
1. Read the entire text carefully.
2. Identify the main ideas and key points.
3. Remove unnecessary details, repetition, and filler content.
4. Rewrite the key ideas in a concise and clear way.
5. Ensure logical flow and readability.
6. Preserve the original meaning and intent.
7. Adjust the length based on importance (short but complete).
8. Review the summary to ensure clarity and accuracy.

GUIDELINES:
- Focus on essential information only.
- Use simple and clear language.
- Avoid adding new information.
- Avoid copying long phrases directly from the text.
- Use positive and natural phrasing.

DELIMITERS:
INPUT TEXT:
"""
{input}
"""
`
);

//Create a chain
const chain = RunnableSequence.from([prompt, model]);

//run it
const summarizeText = async (text) => {
    const chunks = text.split("\n");

    let results = [];

    for (let chunk of chunks) {
        const cleanChunk = chunk.trim();

        if (!cleanChunk) continue; //skip empty parts

        const response = await chain.invoke({ input: cleanChunk });
        
        results.push(response.content);
    }
    
    return results.join("\n\n"); //join with double newlines to preserve paragraph breaks
}

module.exports = { summarizeText };