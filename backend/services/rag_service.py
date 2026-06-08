import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection("knowledge_base")
model = SentenceTransformer("all-MiniLM-L6-v2")

def add_document(text: str, filename: str):
    chunks = [text[i:i+500] for i in range(0, len(text), 500)]
    for i, chunk in enumerate(chunks):
        embedding = model.encode(chunk).tolist()
        collection.add(
            documents=[chunk],
            embeddings=[embedding],
            ids=[f"{filename}_chunk_{i}"]
        )

def query_knowledge_base(query: str, n_results: int = 3) -> str:
    embedding = model.encode(query).tolist()
    results = collection.query(query_embeddings=[embedding], n_results=n_results)
    docs = results.get("documents", [[]])[0]
    return "\n\n".join(docs) if docs else ""