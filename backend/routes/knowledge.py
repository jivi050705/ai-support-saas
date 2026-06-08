from fastapi import APIRouter, UploadFile, File
from services.rag_service import add_document

router = APIRouter()

@router.post("/upload")
async def upload_doc(file: UploadFile = File(...)):
    content = await file.read()
    text = content.decode("utf-8", errors="ignore")
    add_document(text, filename=file.filename)
    return {"message": f"{file.filename} uploaded and indexed successfully"}