import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import { questions } from './questions.js';
import { prompt } from './unpolished-prompt.js';

dotenv.config();

const outputJson = {};

const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"]
});

const filePath = '../out/gpt3.5-turbo-unpolished-prompt2.json';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getAnswer(question) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            { role: 'assistant', content: prompt },
            { role: 'user', content: question }],
        model: 'gpt-3.5-turbo',
    });
    await sleep(1500);
    return chatCompletion.choices[0].message.content;
}

const writeDataToJsonFile = async () => {
    try {
        const jsonData = JSON.stringify(outputJson, null, 2);
        await fs.writeFile(filePath, jsonData);
        console.log('JSON data has been written to', filePath);
    } catch (err) {
        console.error('Error writing JSON file:', err);
    }
};

(async () => {
    let idx = 1;
    const answerPromises = questions.map(async (question) => {
        const answer = await getAnswer(question);
        outputJson[idx++] = {
            "question": question,
            "answer": answer
        };
    });

    await Promise.all(answerPromises);
    writeDataToJsonFile()
})();
