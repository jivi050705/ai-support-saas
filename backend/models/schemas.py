from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ChatRequest(BaseModel):
    session_id: str
    message: str

class ChatResponse(BaseModel):
    reply: str
    source: Optional[str] = None

class Ticket(BaseModel):
    id: Optional[str] = None
    session_id: str
    issue: str
    status: str = "open"
    created_at: Optional[datetime] = None

class KnowledgeUpload(BaseModel):
    filename: str
    content: str