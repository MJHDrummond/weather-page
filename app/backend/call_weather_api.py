import httpx
import time

from fastapi import FastAPI, Response, Query

from app.config.settings import settings

async def call_weather_api(datetime):
    url = settings.weather_url.format(datetime=datetime)
    async with httpx.AsyncClient() as client:
        r = await client.get(url)
        if r.status_code == 200:
            return Response(content=r.content, media_type="image/png")
        return {"error": "Could not fetch image"}