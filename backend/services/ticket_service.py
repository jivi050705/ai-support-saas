from models.schemas import Ticket
from db.supabase_client import supabase
import uuid
from datetime import datetime

def create_ticket(ticket: Ticket) -> Ticket:
    ticket.id = str(uuid.uuid4())
    ticket.created_at = datetime.utcnow()
    data = ticket.dict()
    data["created_at"] = data["created_at"].isoformat()
    supabase.table("tickets").insert(data).execute()
    return ticket

def get_all_tickets() -> list:
    response = supabase.table("tickets").select("*").execute()
    return response.data