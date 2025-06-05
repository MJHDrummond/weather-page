# app/routes/get_weather.py
import os

from fastapi import FastAPI, Response, Query
from fastapi.middleware.cors import CORSMiddleware

from app.backend.call_weather_api import call_weather_api

app = FastAPI()

origins = ["http://localhost:3000"]  # default for local

if os.getenv("RENDER") == "true":  # Render sets this env var
    origins = ["https://mjhdrummond.github.io"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["Content-Type"],
)

@app.get("/api/get_weather")
async def get_weather(datetime: str = Query(
    ...,
    description="Format: YYYYMMDDHHMM")):
    return await call_weather_api(datetime)
