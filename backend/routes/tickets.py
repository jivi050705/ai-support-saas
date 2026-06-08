from fastapi import APIRouter
from models.schemas import Ticket
from services.ticket_service import create_ticket, get_all_tickets

router = APIRouter()

@router.post("/", response_model=Ticket)
async def new_ticket(ticket: Ticket):
    return create_ticket(ticket)

@router.get("/", response_model=list[Ticket])
async def list_tickets():
    return get_all_tickets()