from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import chat, tickets, knowledge

app = FastAPI(title="AI Customer Support SaaS")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(tickets.router, prefix="/api/tickets", tags=["Tickets"])
app.include_router(knowledge.router, prefix="/api/knowledge", tags=["Knowledge"])

@app.get("/")
def root():
    return {"status": "AI Support SaaS running"}