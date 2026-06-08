from fastapi import APIRouter
from models.schemas import ChatRequest, ChatResponse
from services.rag_service import query_knowledge_base
from services.llm_service import get_llm_response

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    context = query_knowledge_base(request.message)
    reply = get_llm_response(request.message, context)
    return ChatResponse(reply=reply, source="knowledge_base")