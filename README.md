# MindTech: LLM x Mental Health Solution

## About the Team
Team MindTech is a collaboration between the University of Waterloo and the University of Alberta. Led by product manager Catherine and UI/UX designer Ethan, along with ML/AI experts Johnson, Nick, and Andy, the goal is to provide a 24/7 platform for students to manage academic and mental health challenges.

## Problem Formulation
Our project at MindTech directly addresses the critical mental health challenges faced by students, a situation reflected in alarming statistics at the University of Waterloo and globally among young adults. With high rates of depression, anxiety, and suicide contemplation among students, our app aims to fill the gap in overburdened traditional counseling services. Designed as a mental health first-aid tool, it offers immediate support and resilience resources, integrating mindfulness practices to help students build mental strength and manage university pressures.

## Low-Fidelity Design
The original low-fidelity design was built around two core functionalities: journaling and chatbot counseling.​ Our system was designed to analyze journal entries, providing users with insightful summaries, statistics, and visualizations. The second feature is chatbot counseling with a customized version of ChatGPT. ​During our development journey, we made a strategic decision. Given our team's strong interest in large language models and their potential in the field of mental health, we decided to mainly focus on the chatbot aspect of the application.

## Technical Approaches
Our main approach is to use prompt engineering on OpenAI’s GPT APIs. We designed two prompts for our chatbot. The initial prompt we designed was based on our own experience using ChatGPT. The second prompt was adapted from a prompt template from a paper on psychiatric chatbots. In the Evaluation part, we compared the two prompts and decided which prompt is better. 

On the OpenAI dev day on Nov. 6, 2023, there were two new features being released, and the team had an opportunity to try these new APIs and features and integrate them into our project. The Assistant API allows us to use a single prompt across various sessions and users. This means that we can maintain a consistent interaction style or information base for each user without storing session information in our own database.​ GPTs, also known as custom GPT, is essentially Assistant API combined with a frontend on the ChatGPT website. This integration makes it incredibly easy for us to create, configure, update, and share our chatbot.​ 

Finally, another possible approach for creating the chatbot is to fine-tune a large language model. However, fine-tuning an LLM is a very challenging and sophisticated task and requires extensive hardware resources. After discussing with our mentor, we decided that it would be hard to finish the fine-tuning task in four months, and it would be out of the scope of our project.

The full-stack website is implemented with some popular frameworks, such as a React.js frontend, a Python Django backend, and a PostgreSQL database.

## Evaluation
After coming up with the different prompts for our chatbot, we need a systematic way to evaluate the approaches. Evaluating LLMs is a very challenging task, especially in a specialized domain like mental health. We chose to adopt a popular approach to do the evaluation, which is to use a different Evaluator LLM to evaluate the output of our therapist chatbot LLMs. We constructed an evaluation rubric as the prompt for the Evaluator LLM. To generate responses from the therapist chatbots, we used a dataset of conversations from real mental health consultations. The evaluation result was that the Evaluator LLM favored the prompt designed using the template from the paper, although the two prompts achieved similar scores in most categories of our rubric. 

## Reflection
After finishing our project at MindTech, we learned some important lessons. First, we need to know more about psychology to better understand the needs of our target users and conduct evaluations that are more rigorous. Second, we learned that creativity is valuable, but we also need to ensure we complete tasks quickly, as the world of generative AI is developing extremely fast. Finally, the project involved more research than we initially thought. This means we must delve deeply into academia, accepting that encountering failures more often than successes is okay.

## References

June M. Liu, Donghao Li, He Cao, Tianhe Ren, Zeyi Liao, Jiamin Wu. ChatCounselor: A Large Language Models for Mental Health Support. *PGAI CIKM*, 2023.​

Siyuan Chen, Mengyue Wu, Kenny Q. Zhu, Kunyao Lan, Zhiling Zhang, Lyuchun Cui. LLM-empowered Chatbots for Psychiatrist and Patient Simulation: Application and Evaluation. *arXiv preprint arXiv:2305.13614*, 2023.
