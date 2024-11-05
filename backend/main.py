# DataVizHub-backend/main.py

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

# CORS for communication between frontend and backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the DataVizHub API"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Read the uploaded file contents
    contents = await file.read()

    try:
        # Read into a DataFrame assuming CSV file format
        df = pd.read_csv(pd.compat.StringIO(contents.decode("utf-8")))
        # Here you might process or save the DataFrame for later
        return {"message": "File uploaded and processed successfully!"}
    except Exception as e:
        return {"error": f"File processing failed: {e}"}
