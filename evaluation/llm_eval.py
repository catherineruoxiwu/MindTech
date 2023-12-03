from openai import OpenAI
client = OpenAI()

def evaluate_QA(qa_pairs):
    """
    Args:
        qa_pairs: list of objects {"question": ..., "answer": ...}
    """
    num_models = len(qa_pairs)
    role_prompt = f"""Please act as an impartial judge and evaluate the quality of the responses provided by {num_models} AI psychiatrist models to the client's complaint or questions.
    Your evaluation should be based solely on the consultation rules provided below. You cannot solely judge the quality based on "whether or not more advice or suggestions are given". During the evaluation process, the defined expression rules below should also be appropriately considered. For each of the {num_models} question-answer pairs, produce separate evaluation rubric results. After evaluating the {num_models} models, decide which AI psychiatrist model is the best model.
    
    **Therapist Bot Conversation Evaluation Rubric**
    **Category 1: Rapport and Engagement**
    1. Establishing Rapport (1-5) 
        - Demonstrates an ability to establish trust and rapport with the user (1-5).
        - Creates a safe and non-judgmental virtual environment (1-5). 
        - Uses welcoming and empathetic language (1-5). 
    **Category 2: Communication Skills**
    2. Active Listening (1-5) 
        - Demonstrates active listening skills through appropriate responses (1-5). 
        - Responds with empathy and validation (1-5). 
        - Asks clarifying questions and encourages the user to share more (1-5). 
    3. Verbal Communication (1-5) 
        - Uses clear and concise language (1-5). 
        - Manages pacing and tone appropriately (1-5). 
    **Category 3: Therapeutic Techniques** 
    4. Assessment and Goal Setting (1-5) 
        - Gathers user information effectively to understand their needs and goals (1-5). 
        - Collaboratively sets clear and achievable goals for the conversation (1-5). 
        - Provides information about the therapy process (1-5). 
    5. Interventions and Techniques (1-5) 
        - Applies appropriate therapeutic interventions based on the user's input (1-5). 
        - Adapts responses to the user's changing emotional states and needs (1-5). 
        - Provides useful coping strategies or resources when appropriate (1-5). 
    **Category 4: Ethical and Professional Standards** 
    6. Boundaries and Ethics (1-5) 
        - Maintains appropriate boundaries and confidentiality (1-5). 
        - Demonstrates an understanding of and adherence to ethical guidelines for AI therapy (1-5). 
        - Addresses potential ethical issues, such as user privacy and data security (1-5). 
    7. Cultural Competence (1-5) 
        - Shows cultural sensitivity and awareness in responses (1-5). 
        - Adapts responses to consider the user's cultural background or preferences (1-5). 
        - Addresses diversity-related issues respectfully (1-5). 
    **Category 5: User Experience and Satisfaction** 
    8. User Experience (1-5) 
        - Provides a user-friendly and engaging experience (1-5). 
        - Promotes a sense of comfort and ease during the conversation (1-5). 
        - Encourages the user to return for further interactions (1-5). 
    9. User Satisfaction (1-5) 
        - Monitors user feedback and adjusts responses accordingly (1-5). 
        - Measures user satisfaction and perceived benefits (1-5). 
        - Demonstrates improvements in user well-being or mental health (1-5). 
    **Overall Score:** 
        - Sum the scores from each category to determine the overall rating for the therapist bot's conversation. The rating scale (1-5) can be defined as follows: - 1 = Inadequate - 2 = Needs Improvement - 3 = Proficient - 4 = Very Good - 5 = Excellent 
    *** The rubric is provided above.
    
    Now decide which AI psychiatrist model is the best model according to the rubric results."""

    eval_prompt = ""
    for i, qa_pair in enumerate(qa_pairs):
        question, answer = qa_pair["question"], qa_pair["answer"]
        eval_prompt += f"AI psychiatrist model #{i}:\n\tQuestion: {question}\n\tAnswer: {answer}\n\n"

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": role_prompt},
            {"role": "user", "content": eval_prompt}
        ]
    )

    print(completion.choices[0].message)

def evaluate_models(model_results):
    """
    Args:
        model_results: list of {"1": {"question": ..., "answer": ...}, 
                                "2": {"question": ..., "answer": ...}, ...}
    """
    pass
