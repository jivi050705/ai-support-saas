import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def get_llm_response(question: str, context: str) -> str:
    prompt = f"""You are a helpful customer support assistant.
Use the context below to answer the question. If unsure, say you don't know.

Context:
{context}

Question: {question}
Answer:"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )
    return response.choices[0].message.content