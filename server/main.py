from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from utils.youtube_helpers import get_youtube_comments_helper, analyze_youtube_comments_helper, extract_youtube_id, \
    get_youtube_info
from utils.graph_helpers import histogram, average_score
from models.youtube import YouTubeRequest

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://comments-toxicity-analyzer.vercel.app"],  # Specify the allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


@app.get("/api/youtube/comments/{postId}")
async def getYoutubeComments(postId: str):
    comments = get_youtube_comments_helper(postId, None, [])
    return comments


@app.post("/api/youtube/comments/analyze-sentiment")
async def analyzeSentiment(request: YouTubeRequest):
    youtube_link = request.youtube_link
    youtube_id = extract_youtube_id(youtube_link)
    if not len(youtube_id):
        raise HTTPException(status_code=400, detail="YouTube link is required.")
    info = get_youtube_info(youtube_id)
    comments = get_youtube_comments_helper(youtube_id, None, [])
    metrics_map = analyze_youtube_comments_helper(comments)
    histogram_data = histogram(metrics_map)
    avg_score = average_score(metrics_map)
    res = {
        "info": info,
        "histogram": histogram_data,
        "average": avg_score
    }
    return res
