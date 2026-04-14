const {ChatOpenAI} = require("@langchain/openai");
const {ChatPromptTemplate} = require("@langchain/core/prompts");
const {RunnableSequence} = require("@langchain/core/runnables");


const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY,
});

//Create a prompt template for humanizing text
const prompt = ChatPromptTemplate.fromTemplate(
    `You are a highly skilled AI writing assistant whose role is to transform AI-generated text into natural, human-like writing that is authentic, engaging, and indistinguishable from human writing.
TASK:
Rewrite the given text so it sounds natural, human, and fluent while preserving the original meaning.

FORMAT:
- Output ONLY the humanized text.
- Do NOT include explanations.
- Keep the same language as the input.
- Maintain paragraph structure unless improvement is needed.

CONTEXT:
The input text may sound robotic, repetitive, or overly formal. Your goal is to make it feel like it was written by a real person with natural variation and flow.

STEPS:
1. Read and fully understand the input text.
2. Identify robotic, repetitive, or unnatural phrasing.
3. Rewrite sentences using natural, conversational language.
4. Vary sentence length and structure.
5. Add subtle human-like elements (contractions, slight informality).
6. Improve flow and readability.
7. Ensure the meaning stays exactly the same.
8. Review the final output to ensure it feels human and smooth.

GUIDELINES:
- Use clear and simple language.
- Avoid repetition and predictable patterns.
- Use positive and natural phrasing.
- Do not add new information.
- Keep tone appropriate to the context (casual, professional, persuasive).

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
const humanizeText = async (text) => {
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

module.exports = { humanizeText };