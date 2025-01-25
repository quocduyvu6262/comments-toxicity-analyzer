from pydantic import BaseModel


class YouTubeRequest(BaseModel):
    youtube_link: str
