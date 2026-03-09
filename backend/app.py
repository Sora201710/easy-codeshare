from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import judge0

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("FRONTEND_HOST"),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Submission(BaseModel):
    code_text: str


@app.post("/submissions")
def compile_code(req: Submission):
    result = judge0.run(source_code=req.code_text, language=judge0.C)
    return {"message": "received code", "code": result.stdout}
